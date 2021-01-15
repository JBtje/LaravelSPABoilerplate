import {createStore} from 'vuex';

import Language from './store/Language';
import User     from './store/User';

export default createStore( {
    modules: {
        Language,
        User,
    },
} );