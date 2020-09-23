import validate from './validate.js';

// Regular Expressions to validate specific form input
export default function( i18n ) {
    return {
        required: [
            {
                required: true,
                message:  () => i18n.t( 'validate.required' ),
                trigger:  'change',
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
