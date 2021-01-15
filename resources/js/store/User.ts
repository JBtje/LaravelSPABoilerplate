import {ActionTree, MutationTree} from "vuex"
import UserRouter                 from "../router/UserRouter";
import {resetRouter}              from "../router";

class State {
    user :any;
    access_token :any;
}

interface User {
    user :any,
    access_token :string,
}

const state = <State> {
    user:         '',
    access_token: '',
};

const getters = {
    getUser:  ( state :User ) => state.user,
    getToken: ( state :User ) => state.access_token,
};

const actions = <ActionTree<State, any>> {
    async fetchUser( {commit} ) {
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

    async clearSession( {commit} ) {
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

const mutations = <MutationTree<State>> {
    setUser: ( state :User, user :any ) => {
        state.user = user;
        localStorage.setObject( 'userData', user );
    },

    setAccessToken: ( state :User, access_token :string ) => {
        state.access_token = access_token;
        localStorage.setObject( 'userToken', access_token );
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    },

    logout: ( state :User ) => {
        mutations.setAccessToken( state, null )
        mutations.setUser( state, null )
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
