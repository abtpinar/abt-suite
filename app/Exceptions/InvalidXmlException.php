<?php

namespace App\Exceptions;

/**
 * Exception to throw when an error occurs while parsing an XML file
 */
class InvalidXmlException extends \Exception
{

    /**
     * @param string $message
     */
    public function __construct($message)
    {
        parent::__construct($message);
    }

}
