<?php

namespace App\Support\Bus\Decorators\Validator;

use App\Jobs\Job;
use Exception;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Request;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

abstract class ValidatorJob
{
    /**
     * @var Rules
     */
    private $rules;

    /**
     * Creates a new class instance
     * @param Rules $rules
     */
    public function __construct(Rules $rules)
    {
        $this->rules = $rules;
    }

    /**
     * The logic to perform when validating
     *
     * @param Job $job
     * @return bool|Response
     * @throws Exception
     */
    public function validate(Job $job)
    {
        $this->rules->registerRules();

        $factory = app()->make('Illuminate\Validation\Factory');

        $validator = $factory->make(
            $this->getData($job),
            $this->getRules($job),
            $this->messages(),
            $this->attributes()
        );

        $this->addValidationRules($validator);

        if (!$this->authorize()) {
            return $this->unAuthorizeAction();
        }

        if ($validator->fails()) {
            return $this->validationFailsAction($validator);
        }

        return true;
    }

    /**
     * @param Job $job
     * @return mixed
     * @throws Exception
     */
    public function getData(Job $job)
    {
        if (!property_exists($job, 'data')) {
            throw new RuntimeException(
                'Sorry, you need to have a public property called [data] on your job that contains the data, or implement [getData()] on your validator.'
            );
        }

        return $job->data;
    }

    /**
     * Return the rules to use when validating
     *
     * @param Job $job
     * @return array
     */
    abstract function getRules(Job $job);

    /**
     * Set custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [];
    }

    /**
     * Set custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [];
    }

    /**
     * @param $validator
     */
    protected function addValidationRules($validator)
    {
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * The action to perform when the user is not authorize to perform this action
     */
    public function unAuthorizeAction()
    {
        return new Response('Forbidden', 403);
    }

    /**
     * The action to perform when the validation fails
     *
     * @param $validation
     * @return Response
     */
    public function validationFailsAction($validation)
    {
        // Get the fields that has errors and assign them into an array
        $errors = [];
        foreach ($validation->messages()->keys() as $field) {
            $errors[$field] = $validation->messages()->get($field)[0];
        }

        if (app()->runningInConsole()) {
            $display = implode("\n", $validation->messages()->all());
            throw new UnprocessableEntityHttpException(
                "Sorry, the following errors were found when validating the data: \n $display"
            );
        }

        if (Request::ajax()) {
            return response()->json($errors, 422);
        }
        return response()->json($errors, 422);

        if (Request::getHost() == config("api.domain")) {
            return response()->json($errors, 422);
            $errors = implode("|", $validation->messages()->all());
            throw new UnprocessableEntityHttpException($errors);
        }

        return redirect()
            ->back()
            ->withInput(Input::all())
            ->withErrors($validation);
    }
}