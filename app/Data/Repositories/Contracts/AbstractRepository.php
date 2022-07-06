<?php

namespace App\Data\Repositories\Contracts;

use App\Data\Entities\AbstractEntity;
use App\Events\Event;

interface AbstractRepository
{
    /**
     * @param array $data
     * @param bool $fireEvent
     * @return mixed
     */
    public function add(array $data, $fireEvent = false);

    /**
     * @param array $data
     * @param bool $fireEvent
     *
     * @return mixed
     * @internal param bool $fireEvent
     */
    public function addMany(array $data, $fireEvent = false);

    /**
     * @return mixed
     */
    public function all();

    /**
     * @param array $data
     * @param bool|false $fireEvent
     * @return mixed
     */
    public function delete(array $data, $fireEvent = false);

    /**
     * @param array $data
     * @return mixed
     */
    public function deleteIn(array $data);

    /**
     * @param array $where
     * @return mixed
     */
    public function deleteWhere(array $where);

    /**
     * @param array $data
     * @param bool|false $fireEvent
     * @return mixed
     */
    public function edit(array $data, $fireEvent = false);

    /**
     * @param array $where
     * @param array $data
     *
     * @return mixed
     */
    public function editMany(array $where, array $data);

    /**
     * @param array $ids
     * @param array $data
     *
     * @return mixed
     */
    public function editIn(array $ids, array $data);

    /**
     * @param array $search
     * @param array $data
     * @param bool|true $fireEvent
     * @return mixed
     */
    public function editOrCreate(array $search, array $data, $fireEvent = false);

    /**
     * @param $id
     * @return mixed
     */
    public function find($id);

    /**
     * @param $id
     * @return mixed
     */
    public function findOrFail($id);

    /**
     * @param array $ids
     * @param bool $orderBy
     * @param bool $take
     * @return mixed
     */
    public function findIn(array $ids, $orderBy = false, $take = false);

    /**
     * @param $id
     * @return mixed
     */
    public function findOrNew($id);

    /**
     * @param $where
     * @return mixed
     */
    public function first($where);

    /**
     * @param $where
     * @param $fireEvent
     * @return mixed
     */
    public function firstOrCreate($where, $fireEvent = false);

    /**
     * @param $where
     * @return mixed
     */
    public function firstOrNew($where);

    /**
     * @param $query
     * @return mixed
     */
    public function firstRaw($query);

    /**
     * @param array $values
     * @param bool|false $orderBy
     * @param bool|false $take
     * @return mixed
     */
    public function getBetween(array $values, $orderBy = false, $take = false);

    /**
     * @param array $values
     * @param bool $orderBy
     * @return mixed
     */
    public function getFirstBetween(array $values, $orderBy = false);

    /**
     * @param array $values
     * @param bool $orderBy
     * @param bool $take
     * @return mixed
     */
    public function getByFields(array $values, $orderBy = false, $take = false);

    /**
     * @param array $values
     * @param bool $orderBy
     * @param bool $take
     * @return mixed
     */
    public function getByFieldsIn(array $values, $orderBy = false, $take = false);

    /**
     * @param array $value
     * @param bool|false $orderBy
     * @return mixed
     */
    public function getFirstByFields(array $value, $orderBy = false);

    /**
     * @return AbstractEntity
     */
    public function getEntity();

    /**
     * @return AbstractEntity
     */
    public function getSearchableEntity();

    /**
     * @param Event $event
     * @return mixed
     */
    public function fire(Event $event);

    /**
     * @return mixed
     */
    public function paginate();

    /**
     * @param $entityData
     * @return mixed
     */
    public function resolveEntityFromVariable($entityData);

    /**
     * @param AbstractEntity $entity
     * @return mixed
     */
    public function setEntity(AbstractEntity $entity);

    /**
     * @param string $whereRaw
     * @param bool|false $orderBy
     * @param bool|false $take
     * @return mixed
     */
    public function getWhereRaw($whereRaw, $orderBy = false, $take = false);
}