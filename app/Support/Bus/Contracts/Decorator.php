<?php

namespace App\Support\Bus\Contracts;

use App\Jobs\Job;

interface Decorator
{
    function execute(Job $job);
}