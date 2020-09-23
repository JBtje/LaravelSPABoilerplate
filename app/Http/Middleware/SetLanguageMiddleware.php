<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLanguageMiddleware
{
    use ValidatesRequests;

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     *
     * @return mixed
     */
    public function handle( Request $request, Closure $next )
    {
        $lang = config( 'language.default' );

        // Get the user language from the header.
        $l = $request->header( 'Language' );
        if( $l !== NULL && in_array( $l, config( 'language.supported' ) ) ) {
            $lang = $l;
        }
        else {
            // Use the browser default, to set the client's language.
            $l = substr( $_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2 );
            if( $l !== NULL && in_array( $l, config( 'language.supported' ) ) ) {
                $lang = $l;
            }
        }

        App::setLocale( $lang );

        return $next( $request );
    }
}
