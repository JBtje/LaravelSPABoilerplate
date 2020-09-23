/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

require( './bootstrap' );

import Vue from 'vue';

import i18n    from './i18n';
import router  from './router';
import store   from './store';
import MainApp from './components/MainApp';

import {restoreSession}  from './helpers/RestoreSession';
import {restoreLanguage} from './helpers/RestoreLanguage';
import rules             from './rules';

restoreSession( router );
i18n.locale = restoreLanguage();

Vue.prototype.$rules = rules( i18n );

new Vue( {
    el:         '#app',
    i18n,
    store,
    router,
    components: {
        MainApp,
    },
} );
