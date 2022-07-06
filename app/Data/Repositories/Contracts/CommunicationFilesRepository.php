<?php

namespace App\Data\Repositories\Contracts;

interface CommunicationFilesRepository extends AbstractRepository
{
    public function findCommunicationFiles();
}
