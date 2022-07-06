<?php namespace App\Jobs;

use App\Data\Entities\AbstractEntity;
use App\Support\Bus\DispatcherTrait;
use App\Support\Constants;
use Illuminate\Bus\Queueable;
use Illuminate\Http\JsonResponse;
use League\Fractal\Manager as FractalManager;
use League\Fractal\Resource\Item;
use League\Fractal\Serializer\ArraySerializer;

abstract class Job
{
    use DispatcherTrait;

    /*
    |--------------------------------------------------------------------------
    | Queueable Jobs
    |--------------------------------------------------------------------------
    |
    | This job base class provides a central location to place any logic that
    | is shared across all of your jobs. The trait included with the class
    | provides access to the "queueOn" and "delay" queue helper methods.
    |
    */

    use Queueable;

    /**
     * @param       $data
     * @param array $messages
     * @param int $responseCode
     * @param int $httpCode
     * @return JsonResponse
     */
    public function apiOkResponse(
        $data,
        array $messages = [Constants::RESPONSE_MESSAGE_SUCCESS],
        $responseCode = Constants::RESPONSE_CODE_SUCCESS,
        $httpCode = 200
    ) {
        return $this->apiFormattedResponse(
            Constants::RESPONSE_STATUS_SUCCESS,
            $responseCode,
            $messages,
            $data,
            $httpCode
        );
    }

    /**
     * @param       $status ["OK", "ERROR"]
     * @param       $responseCode "Dynamic response code"
     * @param array $messages []
     * @param       $data
     * @param       $httpCode
     * @return JsonResponse
     */
    public function apiFormattedResponse($status, $responseCode, array $messages, $data, $httpCode)
    {
        return response()->json(
            [
                "status" => $status,
                "response_code" => $responseCode,
                "messages" => $messages,
                "response" => $data,
            ],
            $httpCode
        );
    }

    /**
     * @return array
     */
    protected function defaultDatabaseErrorResponse()
    {
        return [
            'status' => Constants::RESPONSE_STATUS_ERROR,
            'data' => 'Sorry, we could not save the changes. If the error continues, contact technical support.'
        ];
    }

    /**
     * @return array
     */
    protected function defaultDeleteActionDatabaseErrorResponse()
    {
        return [
            'status' => Constants::RESPONSE_STATUS_ERROR,
            'data' => 'Sorry, we could not delete the record from the database. If the error continues, contact technical support.'
        ];
    }

    /**
     * @param $key
     * @param array $data
     * @param $value
     */
    protected function defaultKeyValueWhenEmpty($key, array &$data, $value)
    {
        if (array_key_exists($key, $data)) {
            $data[$key] = empty($data[$key]) ? $value : $data[$key];
        }
    }

    /**
     * @param AbstractEntity $entity
     * @param array $data
     * @param $action
     * @param string $message
     * @return array
     * @throws \ReflectionException
     */
    protected function generateReturn(AbstractEntity $entity, array $data, $action, $message = "")
    {
        if (array_key_exists("return_entity", $data) && !empty($data["return_entity"])) {
            $data = $entity;
        } elseif (array_key_exists("return_transformed_entity", $data) && !empty($data["return_transformed_entity"])) {
            $includes = [];
            $transformerClass = "App\\Data\\Transformers\\" . $this->getTransformerName($entity);

            // Get Transformer class

            if (is_string($data["return_transformed_entity"])) {
                $includes = explode(",", $data["return_transformed_entity"]);
            } elseif (is_array($data["return_transformed_entity"])) {
                $includes = $data["return_transformed_entity"];
            }

            // Set the fractal manager to serialize as array
            $fractalManager = app(FractalManager::class);
            $fractalManager->setSerializer(new ArraySerializer());
            $fractalManager->parseIncludes($includes);

            $item = new Item($entity, app($transformerClass));
            $data = $fractalManager->createData($item)->toArray();
        } else {
            if (!empty($message)) {
                $data = $message;
            } else {
                // Resolve action name
                $pastAction = '';
                switch ($action) {
                    case 'add':
                        $pastAction = 'agregado';
                        break;

                    case 'edit':
                        $pastAction = 'editado';
                        break;

                    case 'delete':
                        $pastAction = 'eliminado';
                        break;
                }

                $name = ucfirst(str_replace("_", " ", snake_case($this->getEntityName($entity))));

                $data = "$name $pastAction correctamente.";
            }
        }

        return ["status" => Constants::RESPONSE_STATUS_SUCCESS, "data" => $data];
    }

    /**
     * @param AbstractEntity $entity
     * @return string
     * @throws \ReflectionException
     */
    protected function getTransformerName(AbstractEntity $entity)
    {
        return $this->getEntityName($entity) . "Transformer";
    }

    /**
     * @param AbstractEntity $entity
     * @return string
     * @throws \ReflectionException
     */
    protected function getEntityName(AbstractEntity $entity)
    {
        $className = (new \ReflectionClass($entity))->getShortName();

        return $className;
    }

    /**
     * @param AbstractEntity $entity
     * @return AbstractEntity
     */
    protected function generateReturn2(AbstractEntity $entity)
    {
        return $entity;
    }

    /**
     * @param $data
     * @return array
     */
    protected function responseError($data)
    {
        return $this->response(Constants::RESPONSE_STATUS_ERROR, $data);
    }

    /**
     * @param $status
     * @param $data
     * @return array
     */
    protected function response($status, $data)
    {
        return ["status" => $status, "data" => $data];
    }

    /**
     * @param $data
     * @return array
     */
    protected function responseSuccess($data)
    {
        return $this->response(Constants::RESPONSE_STATUS_SUCCESS, $data);
    }
}