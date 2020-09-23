<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    public function render( $request, Throwable $exception )
    {
        /* This will replace our 404 response with a JSON response. */
        if( $exception instanceof ModelNotFoundException
            && ($request->isJson() || $request->wantsJson()) ) {
            return response()->json( [
                'message' => 'Resource not found',
            ], 404 );
        }

        if( $exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException ) {
            switch( $exception->getModel() ) {
                case "App\User":
                    throw new UserException_NotExist();
            }
        }

        if( $exception instanceof ThrottleRequestsException ) {
            throw new APIException_TooManyRequests();
        }

        // By sending errors as 200, it will be handled in the normal code in an AJAX request, not in the catch method.
        if( $exception instanceof ValidationException ) {
            $exception->status = 200;
        }

        return parent::render( $request, $exception );
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param AuthenticationException  $exception
     *
     * @return \Illuminate\Http\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     * @throws UserException_NotLoggedIn
     */
    protected function unauthenticated( $request, AuthenticationException $exception )
    {
        if( $request->expectsJson() ) {
            throw new UserException_NotLoggedIn();
        }

        return redirect()->guest( route( 'login' ) );
    }
}
