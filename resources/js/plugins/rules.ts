import validate from './validate';

// Function of async-validator validators, with vue-i18n translations.
const rules = function( i18n ) {
    return {
        required: [
            {
                required: true,
                message:  () => i18n.t( 'validate.required' ),
                trigger:  'blur',
            },
        ],

        password: [
            {
                min:     8,
                max:     64,
                message: () => i18n.t( 'validate.string.range', [8, 64] ),
                trigger: 'change',
            },
        ],

        username: [
            {
                min:     4,
                max:     64,
                message: () => i18n.t( 'validate.string.range', [4, 64] ),
                trigger: 'change',
            },
            {
                pattern: validate.username,
                message: () => i18n.t( 'validate.fieldtype.username' ),
                trigger: 'change',
            },
        ],

        email: [
            {
                pattern: validate.email,
                message: () => i18n.t( 'validate.fieldtype.email' ),
                trigger: 'change',
            },
            {
                min:     5,
                max:     191,
                message: () => i18n.t( 'validate.string.range', [5, 191] ),
                trigger: 'change',
            },
        ],
    };
};

// Export a plugin that can be registered with Vue 3
export default {
    install: ( app, i18n ) => {
        // We need to use i18n.global.t for translations, so just pass on i18n.global
        app.config.globalProperties.$rules = rules( i18n.global );
    },
};