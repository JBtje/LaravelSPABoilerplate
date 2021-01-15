<?php

namespace App\Exceptions;

use Exception;

class BaseException extends Exception
{
    public $errors = [];
    public $args   = [];

    public function __construct( $message = '', $code = 200, Exception $previous = NULL, ...$args )
    {
        if( isset( $args[0] ) && is_array( $args[0] ) && !isset( $args[1] ) ) {
            $this->args = $args[0];
        }
        else {
            $this->args = $args;
        }

        parent::__construct( $message, $code, $previous );
    }

    public function render( $request )
    {
        $response['message'] = $this->getError();
        $response['success'] = false;

        if( !empty( $this->errors ) ) {
            $response['errors'] = $this->errors;
        }

        if( config( 'app.debug' ) ) {
            $path = pathinfo( $this->getFile() );

            $response['line']   = $this->getLine();
            $response['folder'] = $path['dirname'];
            $response['file']   = $path['basename'];
        }

        // Merge the extra array in the output.
        // Do this at last, so you can overwrite the other outputs.
        if( isset( $this->extra ) && !empty( $this->extra ) ) {
            $response = array_merge( $response, $this->extra );
        }

        if( $request->isJson() || $request->wantsJson() ) {
            return response()->json( $response, $this->getCode() );
        }

        return response( $response['message'], $this->getCode() );
    }

    public function getError()
    {
        return 'Variable \'' . $this->getMessage() . '\' was not found';
    }
}
