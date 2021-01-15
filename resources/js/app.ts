/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

require( './bootstrap' );
require( './prototype' );

import {createApp} from 'vue';
import i18n        from './i18n';
import store       from './store';
import router      from './router';
import mixin       from './mixin';
import rulesPlugin from './plugins/rules';
import MainApp     from './components/MainApp.vue';

import {restoreSession} from './helpers/RestoreSession';

// Import ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';


restoreSession( router );

createApp( MainApp )
    .use( i18n )
    .use( store )
    .use( router )
    .use( rulesPlugin, i18n )
    .use( ElementPlus )
    .mixin( mixin )
    .mount( '#app' );
