import elementUi from 'element-ui/lib/locale/lang/en';

export default {
    login: {
        username: 'Username',
    },

    validate: {
        'default': 'Validation error on field %s',
        'required': 'This field is required',
        'enum': '%s must be one of %s',
        'whitespace': '%s cannot be empty',

        req: {
            'emailOrPhone': 'Email or mobile phone number is required',
        },

        date: {
            'format': '%s date %s is invalid for format %s',
            'parse': '%s date could not be parsed, %s is invalid ',
            'invalid': '%s date %s is invalid',
        },

        string: {
            'len': 'The input length must be exactly {0} characters',
            'min': 'The input length must be at least {0} characters',
            'max': 'The input length cannot be longer than {0} characters',
            'range': 'The input length should be between {0} and {1} characters',
        },

        types: {
            'string': 'The input is not a string',
            'method': 'The input is not a method (function)',
            'array': 'The input is not an array',
            'object': 'The input is not an object',
            'number': 'The input is not a number',
            'date': 'The input is not a date',
            'boolean': 'The input is not a boolean',
            'integer': 'The input is not an integer',
            'float': 'The input is not a float',
            'regexp': 'The input is not a valid regexp',
            'email': 'The input is not a valid email address',
            'url': 'The input is not a valid url',
            'hex': 'The input is not a valid hexidecimal value',
        },

        number: {
            'len': 'The input must equal {0}',
            'min': 'The input cannot be less than {0}',
            'max': 'The input cannot be greater than {0}',
            'range': 'The input must be between {0} and {1}',
        },

        array: {
            'len': 'The array must be exactly {0} in length',
            'min': 'The array cannot be less than {0} in length',
            'max': 'The array cannot be greater than {0} in length',
            'range': 'The array must be between {0} and {1} in length',
        },

        pattern: {
            'mismatch': 'The value {0} does not match pattern {1}',
        },

        fieldtype: {
            'email': 'The email address is invalid',
            'password': 'Passwords do not match',
            'username': 'The username contains disallowed characters',
        },

        ...elementUi
    }
};