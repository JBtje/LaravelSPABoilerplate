<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default language
    |--------------------------------------------------------------------------
    |
    | Default language to serve the user, if no language is set by the user or
    | can be determined based on the browser information.
    |
    */

    'default' => env( 'APP_LANG', 'en' ),

    /*
    |--------------------------------------------------------------------------
    | Supported language
    |--------------------------------------------------------------------------
    |
    | Array containing the supported languages for ths system.
    |
    */

    'supported' => explode( ',', env( 'APP_LANG_SUPPORTED', 'en' ) ),
];
