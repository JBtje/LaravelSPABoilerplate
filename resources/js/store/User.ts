import axios from 'axios';
import UserRouter from "../router/UserRouter";
import { resetRouter } from "../router";

const state = {
    user: '',
    access_token: '',
};

const getters = {
    getUser: ( state ) => state.user,
    getToken: ( state ) => state.access_token,
};

const actions = {
    async fetchUser( { commit } ) {
        return await axios.post( '/spa/auth/user' )
            .then( ( response ) => {
                if( response.data.success ) {
                    commit( 'setUser', response.data.user );

                    // Set the routes for logged in users.
                    resetRouter( UserRouter );
                }

                // Pass the message on
                return Promise.resolve( response );
            } ).catch( ( error ) => {
                // Pass the error on
                return Promise.reject( error );
            } );
    },

    async clearSession( { commit } ) {
        return await axios.post( '/spa/auth/logout' )
            .then( ( response ) => {
                commit( 'setAccessToken', '' );
                commit( 'setUser', '' );

                localStorage.removeItem( 'userToken' );
                localStorage.removeItem( 'userData' );

                // Pass the message on
                return Promise.resolve( response );
            } ).catch( ( error ) => {
                // Pass the error on
                return Promise.reject( error );
            } );
    },
};

const mutations = {
    setUser: ( state, user ) => {
        state.user = user;
        localStorage.setObject( 'userData', user );
    },

    setAccessToken: ( state, access_token ) => {
        state.access_token = access_token;
        localStorage.setObject( 'userToken', access_token );
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    },

    logout: ( state ) => {
        state.user = null;
        localStorage.setObject( 'userData', null );
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
