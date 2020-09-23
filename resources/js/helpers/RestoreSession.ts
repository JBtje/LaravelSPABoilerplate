import store from '../store.js'

import { resetRouter } from '../router'
import DefaultRouter from '../router/DefaultRouter'
import UserRouter from '../router/UserRouter'

export async function restoreSession( router ) {
    let accessToken = localStorage.getObject( 'userToken' );
    let userData = localStorage.getObject( 'userData' );

    if( userData ) {
        store.commit( 'setUser', userData );
    }

    if( accessToken ) {
        resetRouter( UserRouter );

        store.commit( 'setAccessToken', accessToken );
        store.dispatch( 'fetchUser' ).then( response => {

            // The user is not logged in. Remove all tokens and user info.
            if( !response.data.success ) {
                store.commit( 'setAccessToken', '' );
                store.commit( 'setUser', '' );

                localStorage.removeItem( 'userToken' );
                localStorage.removeItem( 'userData' );

                resetRouter( DefaultRouter );

                return router.push( {
                    name: 'login',
                }, () => {
                } );
            }
        } ).catch( error => {
            console.error( '↓↓ A JS error occurred whilst handling the axios response. ↓↓' );
            console.error( error );
        } );
    }
}
