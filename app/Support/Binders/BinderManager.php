<?php

namespace App\Support\Binders;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\Str;

class BinderManager
{
    /**
     * @var Str
     */
    protected $str;

    public function __construct(Str $str)
    {
        $this->str = $str;
    }

    /**
     * @param Application $app
     */
    public function register(Application $app)
    {
        $binderInterface = "App\\Support\\Binders\\Contracts\\Binder";

        $binders = $this->getValidBinders(__NAMESPACE__ . "\\Binders", __DIR__ . "/Binders", $binderInterface);

        foreach ($binders as $binder) {
            app($binder)->registerServiceProviders($app);
        }
    }

    /**
     * @param $namespace
     * @param $path
     * @param $extends
     * @return array
     */
    protected function getValidBinders($namespace, $path, $extends)
    {
        return $this->getValidFiles("BinderManager.php", $namespace, $path, $extends);
    }

    /**
     * @param $endsWith
     * @param $namespace
     * @param $path
     * @param $extends
     * @return array
     */
    protected function getValidFiles($endsWith, $namespace, $path, $extends)
    {
        // Get all the files and directories
        $allFiles = scandir($path);

        // Check is a file and a Binder
        $validFiles = [];
        foreach ($allFiles as $file) {
            if (is_file($file) || $this->str->endsWith($file, $endsWith)) {
                $validFiles[] = $file;
            }
        }

        // Check there are valid binders
        if (count($validFiles) < 1) {
            return [];
        } else {
            // Itinerate all the valid files and get the classes
            $returnClasses = [];
            foreach ($validFiles as $validFile) {
                $phpCode = file_get_contents($path . '/' . $validFile);
                $classes = $this->getPhpClasses($phpCode);

                // Get only the classes in the name space
                $namespaceClasses = $this->getClassesInNamespace($classes, $namespace);

                // Check if the classes in the namespace implements the binder interface
                foreach ($namespaceClasses as $class) {
                    $reflectionClass = new \ReflectionClass($class);

                    if ($reflectionClass->getParentClass()->name === $extends || $reflectionClass->implementsInterface(
                            $extends
                        )) {
                        $returnClasses[] = $reflectionClass->getName();
                    }
                }
            }

            return $returnClasses;
        }
    }

    /**
     * @param $phpCode
     * @return array
     */
    protected function getPhpClasses($phpCode)
    {
        $classes = [];

        $namespace = 0;
        $tokens = token_get_all($phpCode);
        $count = count($tokens);
        $dlm = false;
        for ($i = 2; $i < $count; $i++) {
            if ((isset($tokens[$i - 2][1]) && ($tokens[$i - 2][1] == "phpnamespace" || $tokens[$i - 2][1] == "namespace")) ||
                ($dlm && $tokens[$i - 1][0] == T_NS_SEPARATOR && $tokens[$i][0] == T_STRING)) {
                if (!$dlm) {
                    $namespace = 0;
                }
                if (isset($tokens[$i][1])) {
                    $namespace = $namespace ? $namespace . "\\" . $tokens[$i][1] : $tokens[$i][1];
                    $dlm = true;
                }
            } elseif ($dlm && ($tokens[$i][0] != T_NS_SEPARATOR) && ($tokens[$i][0] != T_STRING)) {
                $dlm = false;
            }
            if (($tokens[$i - 2][0] == T_CLASS || (isset($tokens[$i - 2][1]) && $tokens[$i - 2][1] == "phpclass"))
                && $tokens[$i - 1][0] == T_WHITESPACE && $tokens[$i][0] == T_STRING) {
                $class_name = $tokens[$i][1];
                if (!isset($classes[$namespace])) {
                    $classes[$namespace] = [];
                }
                $classes[$namespace][] = $class_name;
            }
        }
        return $classes;
    }

    /**
     * @param $classes
     * @param $namespace
     * @return array
     */
    protected function getClassesInNamespace($classes, $namespace)
    {
        $returnClasses = [];

        if (isset($classes[$namespace])) {
            foreach ($classes[$namespace] as $class) {
                $returnClasses[] = $namespace . "\\" . $class;
            }
        }

        return $returnClasses;
    }

    /**
     * @param $namespace
     * @param $path
     * @param $extends
     * @return array
     */
    protected function getValidServiceProviders($namespace, $path, $extends)
    {
        return $this->getValidFiles("ServiceProvider.php", $namespace, $path, $extends);
    }
}