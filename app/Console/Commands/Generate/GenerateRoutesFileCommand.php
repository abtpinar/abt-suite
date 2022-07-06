<?php

namespace App\Console\Commands\Generate;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Console\Input\InputArgument;

class GenerateRoutesFileCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:routes-file {type} {url}';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate routes file from controller';
    /**
     * @var string
     */
    protected $type = "Routes File";
    /**
     * @var Filesystem
     */
    private $files;

    /**
     * Create a new command instance.
     *
     * @param Filesystem $files
     */
    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->files = $files;
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $path = $this->getFilePath() . ".php";

        $this->makeDirectory($path);
        $this->files->put($path, $this->getFileContent());

        $this->info($this->type . ' created successfully.');
    }

    #region Helpers

    /**
     * @return string
     */
    protected function getFilePath()
    {
        return base_path("routes/" . $this->argument("type") . "/" . $this->argument("url"));
    }

    /**
     * Build the directory for the class if necessary.
     *
     * @param string $path
     * @return string
     */
    protected function makeDirectory($path)
    {
        if (!$this->files->isDirectory(dirname($path))) {
            $this->files->makeDirectory(dirname($path), 0777, true, true);
        }
    }

    /**
     * @return mixed
     */
    protected function getFileContent()
    {
        $stub = $this->files->get($this->getStub());

        return $this->createRoutes($stub);
    }

    /**
     * @return string
     */
    protected function getStub()
    {
        return __DIR__ . '/stubs/routes-file.stub';
    }

    /**
     * @param $stub
     *
     * @return mixed
     */
    protected function createRoutes($stub)
    {
        $url = $this->argument("url");
        $exploded = explode("/", $url);
        $exploded = array_map(
            function ($item) {
                return ucfirst(camel_case($item));
            },
            $exploded
        );

        $partialControllerClass = implode("\\", $exploded) . "Controller";
        $controllerClass = "\\App\\Http\\Controllers\\" . $partialControllerClass;

        $postRoutes = $getRoutes = [];

        if (class_exists($controllerClass)) {
            $reflection = new \ReflectionClass($controllerClass);

            foreach ($reflection->getMethods() as $method) {
                if ($method->getDeclaringClass()->getName() === $reflection->getName()) {
                    if (starts_with($method->name, ["get", "post"])) {
                        $parameters = $methodUrl = $methodUrlSubStr = $routeMethod = $arrayType = "";

                        $routeClass = str_replace("\\", "\\\\", $partialControllerClass);

                        foreach ($method->getParameters() as $parameter) {
                            if (!$parameter->hasType()) {
                                $optional = $parameter->isOptional() ? "?" : "";
                                $parameters .= "/{" . $parameter->name . $optional . "}";
                            }
                        }

                        if (starts_with($method->name, "get")) {
                            $methodUrlSubStr = 3;
                            $routeMethod = $arrayType = "get";
                        } elseif (starts_with($method->name, "post")) {
                            $methodUrlSubStr = 4;
                            $routeMethod = $arrayType = "post";
                        }

                        $methodUrl = str_replace(
                            "_",
                            "-",
                            $url . "/" . snake_case(
                                substr($method->name, $methodUrlSubStr, strlen($method->name))
                            )
                        );
                        $finalArray = $arrayType . "Routes";
                        array_push(
                            $$finalArray,
                            "Route::" . $routeMethod . "(\"" . $methodUrl . $parameters . "\", \"" . $routeClass . "@" . $method->name . "\");"
                        );
                    }
                }
            }

            $stub = str_replace("DummyGetRoutes", implode("\n", $getRoutes), $stub);
            $stub = str_replace("DummyPostRoutes", implode("\n", $postRoutes), $stub);
        }

        return $stub;
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['type', InputArgument::REQUIRED, 'The route type web|api'],
            ['url', InputArgument::REQUIRED, 'The controller url'],
        ];
    }

    #endregion
}
