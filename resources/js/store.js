import Vue  from 'vue';
import Vuex from 'vuex';

import Language from './store/Language';
import User     from './store/User';

Vue.use( Vuex );

export default new Vuex.Store( {
    modules: {
        Language,
        User,
    },
} );