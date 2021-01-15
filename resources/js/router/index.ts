import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router'

import DefaultRouter from './DefaultRouter';
import store         from '../store';

const router :Router = createRouter( {
    history:         createWebHistory(),
    linkActiveClass: 'open active',
    routes:          DefaultRouter,
    scrollBehavior ( to, from, savedPosition ) {
        if( savedPosition ) {
            return savedPosition;
        }
        else {
            return {top: 0};
        }
    },
} );

// Store the current router.
let curRoutes :RouteRecordRaw[] = DefaultRouter;

// Create an empty router, of which the matcher is used to clear the routes.
const emptyRouter = () => createRouter( {
    history: createWebHistory(),
    routes:  []
} )

// Function to clear the routes, so that the user logged in / out have their own routes, with the possibility of
// duplicate names between them, yet with the security that a logged out user cannot "just" see a logged in page
// (because the route doesn't exist).
export function resetRouter( newRoutes :RouteRecordRaw[] ) {
    if( newRoutes === curRoutes ) {
        // New routes are the same as the old one. Don't update.
        return;
    }

    const newRouter :Router = emptyRouter();
    // @ts-ignore "matcher" is not part of the public API, hence not part of the interface.
    router.matcher             = newRouter.matcher; // the relevant part

    if( newRoutes !== undefined ) {
        newRoutes.forEach((newRoute) => {
            router.addRoute( newRoute );
        })
    }
}

router.beforeEach( function( to, from, next ) {
    // Forward all non-excisting paths to the login page.
    if( to.matched.length === 0 ) {
        if( to.path.indexOf( '/' ) === -1 ) {
            console.error( 'Path is unknown: ' + to.path );
        }
        next( '/login' );
    }

    // Check if the user is logged in
    if( store.state.User.access_token == null ) {
        // Test if the path starts with /login.
        if( to.path.search( '/login' ) === 0 ) {
            next();
        }
        else {
            // You are not logged in, the path does not start with /login, forward to login page.
            next( '/login' );
        }
    }
    else {
        // You are logged in, continue.
        next();
    }
} );

export default router;
