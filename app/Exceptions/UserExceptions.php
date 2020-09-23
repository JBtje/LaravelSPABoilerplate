<?php

namespace App\Exceptions;

class UserExceptions extends BaseException
{
}

class UserException_NotLoggedIn extends BaseException
{
    // Controller\User\AuthController
    public function getError()
    {
        return __( 'exception.UserException-NotLoggedIn' );
    }
}

class UserException_InvalidUsernamePasswordCombination extends BaseException
{
    public function getError()
    {
        return __( 'exception.UserException-InvalidUsernamePasswordCombination' );
    }
}
