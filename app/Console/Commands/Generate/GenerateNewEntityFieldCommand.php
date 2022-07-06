<?php

namespace App\Console\Commands\Generate;

use Illuminate\Console\Command;

class GenerateNewEntityFieldCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = "generate:new-entity-field {entity-name} {field-name} {--skip=*}";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new entity field';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Entity field';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        // Add entity, transformer, migration, jobs (add, edit) validation
        $entityName = $this->argument("entity-name");
        $fieldName = $this->argument("field-name");
        $skip = $this->option("skip");

        if (!in_array("entity", $skip)) {
            $this->printLine();
            $this->warn("Adding field to entity...");
            $this->addToEntity($entityName, $fieldName);
        }

        if (!in_array("transformer", $skip)) {
            $this->printLine();
            $this->warn("Adding field to transformer...");
            $this->addToTransformer($entityName, $fieldName);
        }

        if (!in_array("migration", $skip)) {
            $this->printLine();
            $this->warn("Adding field to migration...");
            $this->addToMigration($entityName, $fieldName);
        }

        if (!in_array("add-job", $skip)) {
            $this->printLine();
            $this->warn("Adding field to 'add job'...");
            $this->addToAddJob($entityName, $fieldName);
        }

        if (!in_array("edit-job", $skip)) {
            $this->printLine();
            $this->warn("Adding field to 'edit job'...");
            $this->addToEditJob($entityName, $fieldName);
        }
    }

    protected function printLine()
    {
        echo "\n";
        $this->warn("---------------------------------------------------------------");
        echo "\n";
    }

    protected function addToEntity($entityName, $fieldName)
    {
        $class = $this->resolveEntity($entityName, true);

        // Check class exists
        if (is_null($class)) {
            $this->info("Skipping adding field to the entity because we could not find the entity [$entityName].");
            return;
        }

        $reflectionClass = new \ReflectionClass($class);
        $reflectionProperties = $reflectionClass->getDefaultProperties();

        // Check class has fillable property
        if (!array_key_exists("fillable", $reflectionProperties)) {
            $this->info(
                "Skipping adding field to the entity because the entity [$class] does not have a [fillable] property."
            );
            return;
        }

        $fillables = $reflectionProperties["fillable"];

        // Check filed is not already in the fillables
        if (in_array($fieldName, $fillables)) {
            $this->info(
                "Skipping adding field to the entity because the entity [" . $class . "::fillable] already has [$fieldName]."
            );
            return;
        }

        // At this point all the validations has been completed, so we can add the field to the fillable property
        $fileName = $reflectionClass->getFileName();
        $content = file_get_contents($fileName);

        $patternWithCommaAtTheEnd = '/protected \$fillable = \[\n(.*)(,)\n(\s*)\];/s';
        $patternWithoutCommaAtTheEnd = '/protected \$fillable = \[\n(.*)\n(.*)\];/s';
        $finalGroup = "3";

        if (preg_match($patternWithCommaAtTheEnd, $content)) {
            $finalPattern = $patternWithCommaAtTheEnd;
        } else {
            $finalGroup = "2";
            $finalPattern = $patternWithoutCommaAtTheEnd;
        }

        $content = preg_replace(
            $finalPattern,
            "protected \$fillable = [" . PHP_EOL . "\${1}," . PHP_EOL . "        \"$fieldName\"," . PHP_EOL . "\${" . $finalGroup . "}];",
            $content
        );

        file_put_contents($fileName, $content);

        $this->info("Added [$fieldName] to [" . $class . "::fillable]");
    }

    protected function resolveEntity($entity, $returnString = false)
    {
        $namespace = "\\App\\Data\\Entities";
        $class = $namespace . "\\" . $entity;

        if (class_exists($class)) {
            return $returnString ? $class : app($class);
        }

        return null;
    }

    protected function addToTransformer($entityName, $fieldName)
    {
        $class = $this->resolveTransformer($entityName, true);

        // Check class exists
        if (is_null($class)) {
            $this->info("Skipping adding field to the transformer because we could not find the transformer [$class].");
            return;
        }

        $reflectionClass = new \ReflectionClass($class);

        $fileName = $reflectionClass->getFileName();
        $content = file_get_contents($fileName);

        $pattern = '/public function transform\(((.*)(\$.*))\)\n(.*){(.*)return \[(.*)(\n(\s*)(\]);(.*))}/s';
        $matches = [];

        if (preg_match($pattern, $content, $matches)) {
            if (isset($matches[6])) {
                $arrayContent = $matches[6];
                $arrayContent = preg_replace("/('|\")(.*)('|\")(.*)=>(.*),/", "\${2},", $arrayContent);
                $arrayContent = preg_replace("/\n|\s/", "", $arrayContent);
                $array = explode(",", $arrayContent);

                if (array_key_exists($fieldName, $array)) {
                    $this->info(
                        "Skipping adding field to the entity because the transformer [" . $class . "::transform()] already has [$fieldName]."
                    );
                    return;
                }
            }
        } else {
            $this->error(
                "We could not process the transformer file. You will have to add the filed manually. This normally happens when the file is too big and regex does not work."
            );
            return;
        }

        // At this point all the validations has been completed, so we can add the field to the transform method
        $patternWithCommaAtTheEnd = '/public function transform\(((.*)(\$.*))\)\n(.*){(.*)return \[(.*)(,)(\n(\s*)(\]);(.*))}/s';
        $patternWithoutCommaAtTheEnd = $pattern;
        $finalGroup = "8";

        if (preg_match($patternWithCommaAtTheEnd, $content)) {
            $finalPattern = $patternWithCommaAtTheEnd;
        } else {
            $finalGroup = "7";
            $finalPattern = $patternWithoutCommaAtTheEnd;
        }

        $content = preg_replace(
            $finalPattern,
            "public function transform(\${1})" . PHP_EOL . "\${4}{\${5}return [\${6}," . PHP_EOL . "\${4}\${4}\${4}'" . $fieldName . "' => \${3}->" . $fieldName . ",\${" . $finalGroup . "}}",
            $content
        );

        file_put_contents($fileName, $content);

        $this->info("Added [$fieldName] to [" . $class . "::transform()]");
    }

    protected function resolveTransformer($entity, $returnString = false)
    {
        $namespace = "\\App\\Data\\Transformers";
        $class = $namespace . "\\" . $entity . "Transformer";

        if (class_exists($class)) {
            return $returnString ? $class : app($class);
        }

        return null;
    }

    #region Resolvers

    protected function addToMigration($entityName, $fieldName)
    {
        $file = $this->resolveMigrationFile($entityName);

        // Check file exists
        if (is_null($file)) {
            $this->info("Skipping adding field to the migration because we could not find the migration file.");
            return;
        }

        $columnStatement = $this->resolveMigrationColumn($fieldName);
        $beforeColumn = $this->resolveMigrationBeforeColumn($file);

        if (is_null($beforeColumn)) {
            $this->info("Skipping adding field to the migration because we could not find where to add it.");
            return;
        }

        $content = file_get_contents($file);
        $content = preg_replace(
            '/(\n)(.*)\$table->(?(?!foreign)[a-z]+)\((\'|")' . $beforeColumn . '(\'|")(.*)/i',
            "\n            " . $columnStatement . "\${0}",
            $content
        );

        file_put_contents($file, $content);

        $this->info("Added [$fieldName] to the migration file.");
    }

    protected function resolveMigrationFile($entity)
    {
        $path = base_path("database/migrations");

        $table = $this->resolveEntity($entity)->getTable();
        $file = "create_" . $table . "_table.php";

        $files = glob($path . "/*$file");
        $filesSelection = collect($files)->transform(
            function ($record) {
                $tmp = explode("/", $record);
                return end($tmp);
            }
        )->toArray();

        if (count($files) > 1) {
            return $path . "/" . $this->choice('Select the migration file.', $filesSelection, 0, 3);
        }

        if (count($files) == 1) {
            return $files[0];
        }

        return null;
    }

    protected function resolveMigrationColumn($fieldName)
    {
        $types = [
            "bigInteger",
            "binary",
            "boolean",
            "char",
            "date",
            "dateTime",
            "dateTimeTz",
            "decimal",
            "double",
            "enum",
            "float",
            "integer",
            "ipAddress",
            "json",
            "jsonb",
            "longText",
            "macAddress",
            "mediumInteger",
            "mediumText",
            "morphs",
            "nullableMorphs",
            "smallInteger",
            "string",
            "text",
            "time",
            "timeTz",
            "tinyInteger",
            "timestamp",
            "timestampTz",
            "uuid",
        ];

        $columnType = $this->choice('Select the column type:', $types, null);
        $withinParenthesis = "";

        switch ($columnType) {
            case "bigInteger":
            case "integer":
            case "mediumInteger":
            case "smallInteger":
            case "tinyInteger":
                $result = $this->choice(
                    "Select options: (ex: 0,1,2...)",
                    ["none", "autoIncrement", "unsigned"],
                    0,
                    null,
                    true
                );
                $autoIncrement = (boolean)in_array("autoIncrement", $result);
                $unsigned = (boolean)in_array("unsigned", $result);
                $withinParenthesis = "('$fieldName', " . ($autoIncrement ? "true" : "false") . ", " . ($unsigned ? "true" : "false") . ")";
                break;

            case "binary":
            case "boolean":
            case "date":
            case "dateTime":
            case "dateTimeTz":
            case "ipAddress":
            case "json":
            case "jsonb":
            case "longText":
            case "macAddress":
            case "mediumText":
            case "text":
            case "time":
            case "timeTz":
            case "timestamp":
            case "timestampTz":
            case "uuid":
                $withinParenthesis = "('$fieldName')";
                break;

            case "char":
            case "string":
                $length = (int)$this->ask("Enter the length:", 255);
                $withinParenthesis = "('$fieldName', $length)";
                break;

            case "decimal":
            case "double":
            case "float":
                $total = (int)$this->ask("Enter total:", 8);
                $places = (int)$this->ask("Enter places:", 2);
                $withinParenthesis = "('$fieldName', $total, $places)";
                break;

            case "enum":
                $options = explode(",", $this->ask("Enter options: (option1,option2,...)", ""));
                $withinParenthesis = "('$fieldName', ['" . implode("','", $options) . "'])";
                break;

            case "morphs":
            case "nullableMorphs":
                $indexName = $this->ask("Enter index name:", null);
                $indexName = $indexName === null ?: "'$indexName'";
                $withinParenthesis = "('$fieldName', $indexName)";
                break;
        }

        $statement = '$table->' . $columnType . $withinParenthesis;

        if ($this->confirm("Add default value?")) {
            $default = $this->ask("Default value: (remember to include quotes if you value is a string)");
            $statement .= "->default(" . $default . ")";
        }

        if ($this->confirm("Is it nullable?")) {
            $statement .= "->nullable()";
        }

        if ($this->confirm("Is it indexed?")) {
            $statement .= "->index()";
        }

        if ($this->confirm("Add comments?")) {
            $comment = $this->ask("Comment value: (Remember you cannot add quotes in your comments)");
            $statement .= '->comment = "' . $comment . '"';
        }

        return $statement . ";";
    }

    protected function resolveMigrationBeforeColumn($file)
    {
        $content = file_get_contents($file);
        $matches = [];
        preg_match_all('/\$table->(?(?!foreign)[a-z]+)\((\'|")([a-z0-9_-]+)(\'|")(.*)/i', $content, $matches);
        $fields = isset($matches[2]) ? $matches[2] : [];

        if (count($fields)) {
            return $this->choice("Add column before which existing column:", $fields);
        }

        return null;
    }

    protected function addToAddJob($entityName, $fieldName)
    {
        $namespace = "\\App\\Jobs";
        $entityPlural = str_plural($entityName);

        $validatorClass = $namespace . "\\" . $entityPlural . "\\Add" . $entityName . "\\Add" . $entityName . "Validator";

        if (!class_exists($validatorClass)) {
            $this->info(
                "Skipping adding field to the 'add' validator because the class [$validatorClass] does not exist."
            );
            return;
        }

        $rules = $this->ask("Enter validation rules: (do not include any double quotation)", 0);
        $rules = $rules ?: "";
        $statement = ",\n" . '            "' . $fieldName . '" => "' . $rules . '",' . "\n";

        $file = (new \ReflectionClass($validatorClass))->getFileName();
        $content = file_get_contents($file);

        $matches = [];
        if (preg_match_all("/public function (.*)\((.*)?\)/", $content, $matches)) {
            $indexKey = array_search("getRules", $matches[1]);
            unset($matches[1][$indexKey]);
            $this->error(
                "Since your validator implements not only 'getRules' but [" . implode(
                    ",",
                    $matches[1]
                ) . "], we cannot add the field. You will have to add it manually."
            );
            return;
        }

        $patternWithCommaAtTheEnd = '/\[(.*)(,)\n(\s+)\];/s';
        $patternWithoutCommaAtTheEnd = '/\[(.*)\n(\s+)\];/s';
        $finalGroup = "3";

        if (preg_match($patternWithCommaAtTheEnd, $content)) {
            $finalPattern = $patternWithCommaAtTheEnd;
        } else {
            $finalGroup = "2";
            $finalPattern = $patternWithoutCommaAtTheEnd;
        }

        $content = preg_replace($finalPattern, "[\${1}$statement\${$finalGroup}];", $content);

        file_put_contents($file, $content);

        $this->info("Added [$fieldName] to the add validation job.");
    }

    protected function addToEditJob($entityName, $fieldName)
    {
        $namespace = "\\App\\Jobs";
        $entityPlural = str_plural($entityName);

        $validatorClass = $namespace . "\\" . $entityPlural . "\\Edit" . $entityName . "\\Edit" . $entityName . "Validator";

        if (!class_exists($validatorClass)) {
            $this->info(
                "Skipping adding field to the 'edit' validator because the class [$validatorClass] does not exist."
            );
            return;
        }

        $rules = $this->ask("Enter validation rules: (do not include any double quotation)", 0);
        $rules = $rules ?: "";
        $statement = ",\n" . '            "' . $fieldName . '" => "' . $rules . '",' . "\n";

        $file = (new \ReflectionClass($validatorClass))->getFileName();
        $content = file_get_contents($file);

        $matches = [];
        if (preg_match_all("/public function (.*)\((.*)?\)/", $content, $matches)) {
            $indexKey = array_search("getRules", $matches[1]);
            unset($matches[1][$indexKey]);
            $this->error(
                "Since your validator implements not only 'getRules' but [" . implode(
                    ",",
                    $matches[1]
                ) . "], we cannot add the field. You will have to add it manually."
            );
            return;
        }

        $patternWithCommaAtTheEnd = '/\[(.*)(,)\n(\s+)\];/s';
        $patternWithoutCommaAtTheEnd = '/\[(.*)\n(\s+)\];/s';
        $finalGroup = "3";

        if (preg_match($patternWithCommaAtTheEnd, $content)) {
            $finalPattern = $patternWithCommaAtTheEnd;
        } else {
            $finalGroup = "2";
            $finalPattern = $patternWithoutCommaAtTheEnd;
        }

        $content = preg_replace($finalPattern, "[\${1}$statement\${$finalGroup}];", $content);

        file_put_contents($file, $content);

        $this->info("Added [$fieldName] to the edit validation job.");
    }

    #endregion
}
