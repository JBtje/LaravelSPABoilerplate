import {createI18n} from 'vue-i18n'

//import de from  './lang/de'
import en from './lang/en'
import nl from './lang/nl'

import {restoreLanguage} from './helpers/RestoreLanguage'

restoreLanguage()

export default createI18n( {
    locale:                restoreLanguage(),
    fallbackLocale:        'en',
    silentTranslationWarn: true,

    messages: {
//        de,
        en,
        nl,
    },
} );
