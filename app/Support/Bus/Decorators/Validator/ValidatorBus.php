<?php

namespace App\Support\Bus\Decorators\Validator;

use App\Jobs\Job;
use App\Support\Bus\Contracts\Decorator;
use Illuminate\Contracts\Bus\Dispatcher;

class ValidatorBus implements Decorator
{
    /**
     * @var Dispatcher
     */
    private $dispatcher;

    /**
     * Creates a new class instance
     * @param Dispatcher $dispatcher
     */
    public function __construct(Dispatcher $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    /**
     * Executes the actual functionality
     *
     * @param Job $job
     * @return bool|void
     * @throws \Exception
     */
    function execute(Job $job)
    {
        $validator = app(get_class($job) . "Validator");

        if (!$validator instanceof ValidatorJob) {
            throw new \Exception(
                "Sorry, the class [" . get_class(
                    $validator
                ) . "] must extends from App\\Support\\Bus\\Decorators\\Validator\\ValidatorJob."
            );
        }

        return $validator->validate($job);
    }


}