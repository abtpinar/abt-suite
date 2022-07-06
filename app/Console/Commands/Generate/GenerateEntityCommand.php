<?php

namespace App\Console\Commands\Generate;

use Illuminate\Console\GeneratorCommand;

class GenerateEntityCommand extends GeneratorCommand
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = "generate:entity {name} {--repository-contract} {--repository} {--repository-service-provider} {--transformer} {--plain}";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new entity class';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Entity';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        parent::handle();

        if ($this->option('repository-contract')) {
            $this->callCreateRepositoryContract();
        }

        if ($this->option('repository')) {
            $this->callCreateRepository();
        }

        if ($this->option('repository-service-provider')) {
            $this->callCreateRepositoryServiceProvider();
        }

        if ($this->option('transformer')) {
            $this->callCreateTransformer();
        }

        if (!$this->option('plain')) {
            $this->callCreateAllCompanionClasses();
        }
    }

    /**
     * @return void
     */
    protected function callCreateRepositoryContract()
    {
        app('Illuminate\Contracts\Console\Kernel')->call(
            'generate:repository-contract',
            ['name' => $this->getRepositoryName()]
        );
    }

    /**
     * @return string
     */
    protected function getRepositoryName()
    {
        return ucfirst(str_plural($this->getNameInput()) . "Repository");
    }

    /**
     * @return void
     */
    protected function callCreateRepository()
    {
        app('Illuminate\Contracts\Console\Kernel')->call('generate:repository', ['name' => $this->getRepositoryName()]);
    }

    /**
     * @return void
     */
    protected function callCreateRepositoryServiceProvider()
    {
        app('Illuminate\Contracts\Console\Kernel')->call(
            'generate:repository-service-provider',
            ['name' => $this->getRepositoryServiceProviderName()]
        );
    }

    /**
     * @return string
     */
    protected function getRepositoryServiceProviderName()
    {
        return $this->getRepositoryName() . "ServiceProvider";
    }

    protected function callCreateTransformer()
    {
        app('Illuminate\Contracts\Console\Kernel')->call(
            'generate:transformer',
            ['name' => $this->getTransformerName()]
        );
    }

    /**
     * @return string
     */
    protected function getTransformerName()
    {
        return $this->getNameInput() . "Transformer";
    }

    /**
     * @return void
     */
    protected function callCreateAllCompanionClasses()
    {
        $this->callCreateRepositoryContract();
        $this->callCreateRepository();
        $this->callCreateRepositoryServiceProvider();
    }

    /**
     * @return mixed
     */
    public function getStub()
    {
        return __DIR__ . '/stubs/entity.stub';
    }

    /**
     * Get the default namespace for the class.
     *
     * @param string $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace . '\Data\Entities';
    }

    /**
     * Replace the namespace for the given stub.
     *
     * @param string $stub
     * @param string $name
     * @return $this
     */
    protected function replaceNamespace(&$stub, $name)
    {
        parent::replaceNamespace($stub, $name);

        $stub = str_replace(
            'DummyTableName',
            strtolower(snake_case(str_plural($this->getNameInput()))),
            $stub
        );

        return $this;
    }
}
