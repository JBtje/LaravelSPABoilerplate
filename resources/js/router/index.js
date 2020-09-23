import Vue           from 'vue';
import Router        from 'vue-router';
import DefaultRouter from './DefaultRouter';

// Views
import store from '../store.js';

Vue.use( Router );


const createRouter = () => new Router( {
    mode:            'history', //hash
    linkActiveClass: 'open active',
    routes:          DefaultRouter,
    scrollBehavior( to, from, savedPosition ) {
        if( savedPosition ) {
            return savedPosition;
        }
        else {
            return {x: 0, y: 0};
        }
    },
} );

const router = createRouter();

// Function to clear the routes, so that the user logged in / out have their own routes, with the possibility of
// duplicate names between them, yet with the security that a logged out user cannot "just" see a logged in page
// (because the route doesn't exist).
export function resetRouter( newRoutes ) {
    const newRouter = createRouter();
    router.matcher  = newRouter.matcher; // the relevant part
    if( newRoutes !== undefined ) {
        router.addRoutes( newRoutes );
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
