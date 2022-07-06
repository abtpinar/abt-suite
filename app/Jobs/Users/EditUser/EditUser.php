<?php namespace App\Jobs\Users\EditUser;

use App\Data\Repositories\Contracts\UsersRepository;
use App\Jobs\Job;

class EditUser extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var UsersRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param UsersRepository $repository
     */
    public function __construct(array $data, UsersRepository $repository)
    {
        $this->repository = $repository;
        $this->data = $data;
    }

    #endregion

    /**
     * Execute the job.
     *
     * @return mixed
     */
    public function handle()
    {
        $editedEntity = $this->repository->find($this->data['id']);

        if ($editedEntity) {
            $editedEntity->deletePicture();
        }

        $entity = $this->repository->edit($this->data, false);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        if (array_key_exists('roles', $this->data)) {
            $entity->roles()->sync($this->data['roles']);
        }


        // If the subordinates key exists it means the user being edited
        // was set as a master
        if (array_key_exists('subordinates', $this->data)) {
            // First clear the old subordinates the user might have hav
            $oldSubordinates = $entity->subordinates;
            foreach ($oldSubordinates as $subordinate) {
                $subordinate->master_id = null;
                $subordinate->save();
            }

            // Then get all the users whose ids are those sent in the subordinates
            // request property, which is an array of ids
            $subordinates = $this->repository->find($this->data['subordinates']);

            // For every subordinate user found
            foreach ($subordinates as $subordinate) {
                // Change the user's master
                $subordinate->master_id = $entity->id;

                // If the user happened to be a master 
                // change it so now they're not
                $subordinate->is_master = false;
                $subordinate->save();
            }

            // If the user being edited previously had a master
            // clear it
            $entity->master_id = null;

            // Convert the user being edited to master
            $entity->is_master = true;
            $entity->save();
        }

        // If the master_id exists then the user being edited was set as
        // a subordinate of anothe user
        if (array_key_exists('master_id', $this->data)) {
            // Find any subordinates the user might have
            $oldSubordinates = $entity->subordinates;

            // Remove this user as a master of those users
            foreach ($oldSubordinates as $subordinate) {
                $subordinate->master_id = null;
                $subordinate->save();
            }

            // Set this user's is_master prop to false
            $entity->is_master = false;
            $entity->save();
        }

        return $this->generateReturn($entity, $this->data, "edit");
    }
}
