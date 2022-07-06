<?php

namespace App\Support\Bus;

trait DispatcherTrait
{
    /**
     * @param $job
     * @param array $decorators
     * @return mixed
     * @throws \Exception
     */
    protected function dispatch($job, array $decorators = [])
    {
        return app('App\Support\Bus\Dispatcher')->dispatch($job, $decorators);
    }
}
