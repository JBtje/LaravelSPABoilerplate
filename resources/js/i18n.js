import Vue     from 'vue';
import VueI18n from 'vue-i18n';

//import de from  './lang/de';
import en from './lang/en';
import nl from './lang/nl';

Vue.use( VueI18n );

export default new VueI18n( {
    locale:                'nl',
    fallbackLocale:        'en',
    silentTranslationWarn: true,

    messages: {
//        de,
        en,
        nl,
    },
} );
