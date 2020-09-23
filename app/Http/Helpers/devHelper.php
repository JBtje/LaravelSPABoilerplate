<?PHP
if( !function_exists( 'pr' ) ) {
    function pr( $a )
    {
        print_r( $a );
    }
}
if( !function_exists( 'pre' ) ) {
    function pre( $a )
    {
        echo '<pre>';
        print_r( $a );
        echo '</pre>';
    }
}

if( !function_exists( 'ddc' ) ) {
    function ddc( ...$args )
    {
        header( 'Access-Control-Allow-Origin: *' );
        header( 'Access-Control-Allow-Methods: *' );
        header( 'Access-Control-Allow-Headers: *' );
        http_response_code( 500 );

        foreach( $args as $x ) {
            (new Symfony\Component\VarDumper\VarDumper)->dump( $x );
        }

        die( 1 );
    }
}
