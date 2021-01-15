<?php

namespace App\Exceptions;

class UserExceptions extends BaseException
{
}

class UserException_NotLoggedIn extends BaseException
{
    public function getError()
    {
        return __( 'exception.UserException_NotLoggedIn' );
    }
}

class UserException_InvalidUsernamePasswordCombination extends BaseException
{
    public function getError()
    {
        return __( 'exception.UserException_InvalidUsernamePasswordCombination' );
    }
}
