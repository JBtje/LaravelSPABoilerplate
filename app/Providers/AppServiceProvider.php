<?php

namespace App\Providers;

use Illuminate\Support\Arr;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Allow setting a specific guard per route group.
        // https://github.com/laravel/framework/issues/12087
        $this->app['router']->matched( function( \Illuminate\Routing\Events\RouteMatched $e ) {
            $route = $e->route;
            if( !Arr::has( $route->getAction(), 'guard' ) ) {
                return;
            }
            $routeGuard = Arr::get( $route->getAction(), 'guard' );
            $this->app['auth']->resolveUsersUsing( function( $guard = NULL ) use ( $routeGuard ) {
                return $this->app['auth']->guard( $routeGuard )->user();
            } );
            $this->app['auth']->setDefaultDriver( $routeGuard );
        } );

        // https://stackoverflow.com/questions/32372437/does-laravels-tosql-method-mask-ids-column-value-being-replaced-by-question
        \Illuminate\Database\Query\Builder::macro( 'toRawSql', function() {
            return array_reduce( $this->getBindings(), function( $sql, $binding ) {
                return preg_replace( '/\?/', is_numeric( $binding ) ? $binding : "'" . $binding . "'", $sql, 1 );
            }, $this->toSql() );
        } );
        \Illuminate\Database\Eloquent\Builder::macro( 'toRawSql', function() {
            return ($this->getQuery()->toRawSql());
        } );
    }
}
