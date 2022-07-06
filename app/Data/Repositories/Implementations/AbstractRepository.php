<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Repositories\Contracts\AbstractRepository as RepositoryInterface;
use App\Events\Event;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\DB;
use ReflectionException;

abstract class AbstractRepository implements RepositoryInterface
{
    /**
     * @param array $data
     * @param bool $fireEvent
     * @return mixed|null
     * @throws ReflectionException
     */
    public function add(array $data, $fireEvent = false)
    {
        if (!$newEntity = $this->getEntity()->create($data)) {
            return null;
        }

        if ($fireEvent) {
            $eventName = $this->resolveEventName('AddedEvent');
            $this->fire(new $eventName($newEntity));
        }

        return $newEntity;
    }

    /**
     * Get the Repository Entity
     * @return AbstractEntity
     */
    abstract public function getEntity();

    /**
     * @param $append
     * @return string
     * @throws ReflectionException
     */
    protected function resolveEventName($append): string
    {
        $reflection = new \ReflectionClass($this->getEntity());
        $entityName = $reflection->getShortName();
        $entityPlural = str_plural($entityName);

        if (ends_with($entityPlural, 'y')) {
            $entityPlural = substr($entityPlural, -1) . 'ies';
        }

        return "App\\Events\\" . $entityPlural . "\\" . $entityName . $append;
    }

    /**
     * @param Event $event
     * @return mixed|void
     */
    public function fire(Event $event)
    {
        $dispatcher = app()->make('events');

        $dispatcher->fire($event);
    }

    /**
     * @param array $data
     * @param bool $fireEvent
     * @return bool|mixed
     * @throws ReflectionException
     */
    public function addMany(array $data, $fireEvent = false)
    {
        $entities = [];
        foreach ($data as $entityData) {
            if (count($this->getEntity()->getFillable())) {
                $entities[] = array_intersect_key($entityData, array_flip($this->getEntity()->getFillable()));
            } else {
                $entities[] = $entityData;
            }
        }

        $result = $this->getEntity()->insert($entities);

        if (!$result) {
            return false;
        }

        if ($fireEvent) {
            $eventName = $this->resolveEventName('AddedManyEvent');
            $this->fire(new $eventName($data));
        }

        return true;
    }

    /**
     * @return AbstractEntity[]|Collection|mixed
     */
    public function all()
    {
        return $this->getEntity()->all();
    }

    /**
     * @param array $data
     * @param bool $fireEvent
     * @return mixed|string|null
     * @throws ReflectionException
     */
    public function delete(array $data, $fireEvent = false)
    {
        $primaryKey = $this->getEntity()->getKeyName();

        $deleteEntity = $this->find($data[$primaryKey]);

        if (!$deleteEntity) {
            return null;
        }

        if (!$deleteEntity->delete()) {
            return 'Sorry, we could not delete the the record from the database.';
        }

        if ($fireEvent) {
            $eventName = $this->resolveEventName('DeletedEvent');
            $this->fire(new $eventName($deleteEntity));
        }

        return $deleteEntity;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        return $this->getEntity()->find($id);
    }

    /**
     * @param array $data
     * @return mixed|void
     */
    public function deleteIn(array $data)
    {
        $primaryKey = $this->getEntity()->getKeyName();

        $this->getEntity()->whereIn($primaryKey, $data[str_plural($primaryKey)])->delete();
    }

    /**
     * @param array $where
     * @return bool|mixed|null
     * @throws Exception
     */
    public function deleteWhere(array $where)
    {
        $entity = $this->getEntity();

        foreach ($where as $field => $value) {
            if (!is_array($value)) {
                $value = [$value];
            }

            foreach ($value as $val) {
                $entity = $entity->where($field, $val);
            }
        }

        return $entity->delete();
    }

    /**
     * @param array $data
     * @param bool $fireEvent
     * @return mixed|string|null
     * @throws ReflectionException
     */
    public function edit(array $data, $fireEvent = false)
    {
        $primaryKey = $this->getEntity()->getKeyName();

        $editedEntity = $this->find($data[$primaryKey]);

        if (!$editedEntity) {
            return null;
        }

        $this->updateEntityData($editedEntity, $data);

        if (!$editedEntity->save()) {
            return 'Sorry, we could not save the data into the database.';
        }

        if ($fireEvent) {
            $eventName = $this->resolveEventName('EditedEvent');
            $this->fire(new $eventName($editedEntity));
        }

        return $editedEntity;
    }

    /**
     * Applies the new data to the given entity. This is the point where one would put any custom transformation to be
     * further applied to the edited entity.
     * @param AbstractEntity $editedEntity : The entity being changed.
     * @param array $data : The data coming from the caller to be put in the entity.
     */
    protected function updateEntityData($editedEntity, array $data): void
    {
        $editedEntity->fill($data);
    }

    /**
     * @param array $where
     * @param array $data
     * @return mixed
     */
    public function editMany(array $where, array $data)
    {
        $entity = $this->getEntity();

        foreach ($where as $field => $value) {
            if (!is_array($value)) {
                $value = [$value];
            }

            foreach ($value as $val) {
                if (is_array($val)) {
                    $entity = $entity->where($field, $val[0], $val[1]);
                } else {
                    $entity = $entity->where($field, $val);
                }
            }
        }

        return $entity->update($data);
    }

    /**
     * @param array $ids
     * @param array $data
     * @return int|mixed
     */
    public function editIn(array $ids, array $data)
    {
        return $this->getEntity()->whereIn('id', $ids)->update($data);
    }

    /**
     * @param array $search
     * @param array $data
     * @param bool $fireEvent
     * @return AbstractEntity|mixed|string
     * @throws ReflectionException
     */
    public function editOrCreate(array $search, array $data, $fireEvent = false)
    {
        $where = [];

        foreach ($search as $column) {
            $where[$column] = $data[$column];
        }

        $entity = $this->getFirstByFields($where);

        $eventAppend = 'EditedEvent';

        if (empty($entity)) {
            $eventAppend = 'AddedEvent';
            $entity = $this->getEntity();
        }

        $entity->fill($data);

        if (!$entity->save()) {
            return 'Sorry, we could not save the data into the database.';
        }

        if ($fireEvent) {
            $eventName = $this->resolveEventName($eventAppend);
            $this->fire(new $eventName($entity));
        }

        return $entity;
    }

    /**
     * @param array $values
     * @param bool|false $orderBy
     * @return mixed
     */
    public function getFirstByFields(array $values, $orderBy = false)
    {
        return $this->getByFields($values, $orderBy, 1)->first();
    }

    /**
     * @param array $values
     * @param bool|false $orderBy
     * @param bool|false $take
     * $orderByExample = [ ["id", "name"], ["desc", "asc"] ]
     * @return mixed
     */
    public function getByFields(array $values, $orderBy = false, $take = false)
    {
        $entity = $this->getEntity();

        foreach ($values as $field => $value) {
            if (!is_array($value)) {
                $value = [$value];
            }

            foreach ($value as $val) {
                if (is_array($val)) {
                    $entity = $entity->where($field, $val[0], $val[1]);
                } else {
                    $entity = $entity->where($field, $val);
                }
            }
        }

        if ($orderBy) {
            $this->addOrderByToEntity($entity, $orderBy);
        }

        if ($take) {
            $entity = $entity->take($take);
        }

        return $entity->get();
    }

    /**
     * @param $entity
     * @param $value
     */
    private function addOrderByToEntity($entity, $value): void
    {
        if (!is_array($value[0])) {
            $value[0] = [$value[0]];
        }

        if (!is_array($value[1])) {
            $value[1] = [$value[1]];
        }

        foreach ($value[0] as $index => $field) {
            $entity->orderBy($field, $value[1][$index]);
        }
    }

    /**
     * @param $id
     * @return mixed
     */
    public function findOrFail($id)
    {
        return $this->getEntity()->findOrFail($id);
    }

    /**
     * @param array $ids
     * @param bool|false $orderBy
     * @param bool|false $take
     * @return mixed
     */
    public function findIn(array $ids, $orderBy = false, $take = false)
    {
        $entity = $this->getEntity();

        $entity = $entity->whereIn($entity->getKeyName(), $ids);

        if ($orderBy) {
            $entity = $entity->orderBy($orderBy[0], $orderBy[1]);
        }

        if ($take) {
            $entity = $entity->take($take);
        }

        return $entity->get();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function findOrNew($id)
    {
        return $this->getEntity()->findOrNew($id);
    }

    /**
     * @param $where
     * @return mixed
     */
    public function first($where)
    {
        return $this->getEntity()->where($where)->first();
    }

    /**
     * @param $data
     * @param bool $fireEvent
     * @return mixed
     * @throws ReflectionException
     */
    public function firstOrCreate($data, $fireEvent = false)
    {
        $entity = $this->getEntity()->firstOrCreate($data);

        $eventAppend = 'AddedEvent';

        if ($fireEvent) {
            $eventName = $this->resolveEventName($eventAppend);
            $this->fire(new $eventName($entity));
        }

        return $entity;
    }

    /**
     * @param $where
     * @return mixed
     */
    public function firstOrNew($where)
    {
        return $this->getEntity()->firstOrNew($where);
    }

    /**
     * @param $query
     * @return mixed
     */
    public function firstRaw($query)
    {
        if ($result = DB::select($query)) {
            return $result[0];
        }

        return null;
    }

    /**
     * @param array $values
     * @param bool $orderBy
     * @return mixed
     */
    public function getFirstBetween(array $values, $orderBy = false)
    {
        return $this->getBetween($values, $orderBy, 1);
    }

    /**
     * @param array $values
     * @param bool|false $orderBy
     * @param bool|false $take
     * $orderByExample = [ ["date", "from_date", "to_date"], ["desc", "asc"] ]
     * @return mixed
     */
    public function getBetween(array $values, $orderBy = false, $take = false)
    {
        $entity = $this->getEntity()->query()->whereBetween($values[0], [$values[1], $values[2]]);

        if ($orderBy) {
            $this->addOrderByToEntity($entity, $orderBy);
        }

        if ($take) {
            $entity = $entity->take($take);
        }

        return $entity->get();
    }

    /**
     * @param array $values
     * @param bool|false $orderBy
     * @param bool|false $take
     * @return mixed
     */
    public function getByFieldsIn(array $values, $orderBy = false, $take = false)
    {
        $entity = $this->getEntity();

        foreach ($values as $field => $value) {
            if (!is_array($value)) {
                $value = [$value];
            }

            $entity = $entity->whereIn($field, $value);
        }

        if ($orderBy) {
            $entity = $entity->orderBy($orderBy[0], $orderBy[1]);
        }

        if ($take) {
            $entity = $entity->take($take);
        }

        return $entity->get();
    }

    /**
     * @return AbstractEntity|Application|mixed|null
     * @throws ReflectionException
     */
    public function getSearchableEntity()
    {
        $namespace = "\\App\\Data\\Entities\\Searchable";
        $entity = $this->getEntity();

        if ($entity === null) {
            return null;
        }

        $entityName = (new \ReflectionClass($entity))->getShortName();
        $entityName = 'Searchable' . $entityName;

        $class = $namespace . "\\" . $entityName;

        if (class_exists($class)) {
            return app($class);
        }

        return null;
    }

    #region Helpers

    /**
     * @param string $whereRaw
     * @param bool|false $orderBy
     * @param bool|false $take
     * @return mixed
     */
    public function getWhereRaw($whereRaw, $orderBy = false, $take = false)
    {
        $entity = $this->getEntity()->whereRaw($whereRaw);

        if ($orderBy) {
            $entity = $entity->orderBy($orderBy[0], $orderBy[1]);
        }

        if ($take) {
            $entity = $entity->take($take);
        }

        return $entity->get();
    }

    /**
     * Get a paginated entity data
     * @return mixed
     */
    public function paginate()
    {
        return $this->getEntity()->paginate();
    }

    /**
     * Set the Repository Entity
     * @param $entity
     * @return mixed
     */
    abstract public function setEntity(AbstractEntity $entity);

    #endregion

    /**
     * @param $ent
     * @return mixed
     */
    public function resolveEntityFromVariable($ent)
    {
        $entity = $ent;

        if (!$entity) {
            throw new \InvalidArgumentException('Sorry, to resolve an entity we need a valid entity data.');
        }

        if (is_int($entity) || is_string($entity)) {
            $id = $entity;
            $entity = $this->getEntity();
            $entityTraits = class_uses($entity);

            if (array_key_exists(SoftDeletes::class, $entityTraits)) {
                $entity = $entity->withTrashed();
            }

            $entity = $entity->where("id", $id)->first();
        }

        $entityType = get_class($this->getEntity());

        if (!$entity instanceof $entityType) {
            throw new \InvalidArgumentException('Sorry, to resolve an entity we need a valid entity data.');
        }

        return $entity;
    }

}