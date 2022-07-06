<?php

namespace App\Support\Bus;

use App\Jobs\Job;
use App\Support\Bus\Contracts\Decorator;

class Dispatcher
{
    /**
     * Dispatch a job to its appropriate handler.
     *
     * @param mixed $job
     * @param array $decorators
     * @return mixed
     * @throws \Exception
     */
    public function dispatch($job, array $decorators)
    {
        $response = null;

        $job = $this->resolveJob($job);

        foreach ($decorators as $decorator) {
            $decorator = app($decorator);

            if (!$decorator instanceof Decorator) {
                throw new \Exception(
                    "Sorry, the class [" . get_class(
                        $decorator
                    ) . "] must implements App\\Support\\Bus\\Contracts\\Decorator interface."
                );
            }

            $response = $decorator->execute($job);

            if ($response !== true) {
                break;
            }
        }

        if ($response !== true && $response !== null) {
            return $response;
        }

        return app('Illuminate\Contracts\Bus\Dispatcher')->dispatch($job);
    }

    protected function resolveJob($job)
    {
        if (is_string($job)) {
            $job = app()->makeWith($job, ["data" => \Request::all()]);
        }

        if (!$job instanceof Job) {
            throw new \Exception("Sorry, the class [" . get_class($job) . "] must extends App\\Jobs\\Job.");
        }

        return $job;
    }
}