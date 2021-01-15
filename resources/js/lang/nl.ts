import elementUi from 'element-plus/lib/locale/lang/nl';

export default {
    login: {
        username: 'Gebruikersnaam',
    },

    validate: {
        'default': 'Validatie error bij veld %s',
        'required': 'Dit veld is verplicht',
        'enum': '%s moet bestaan in deze lijst %s',
        'whitespace': '%s mag niet leeg zijn',

        date: {
            'format': '%s datum %s is onjuist foor het format %s',
            'parse': '%s datum kon niet geparsed worden, %s is onjuist ',
            'invalid': '%s datum %s is onjuist',
        },

        string: {
            'len': 'De lengte moet precies {0} karaters zijn',
            'min': 'De lengte moet minimaal {0} karakters zijn',
            'max': 'De lengte kan niet langer zijn dan {0} karakters',
            'range': 'De lengte moet tussen de {0} en {1} karakters zijn',
        },

        types: {
            'string': 'De waarde is geen string',
            'method': 'De waarde is geen methode (functie)',
            'array': 'De waarde is geen array',
            'object': 'De waarde is geen object',
            'number': 'De waarde is geen cijfer',
            'date': 'De waarde is geen datum',
            'boolean': 'De waarde is geen boolean',
            'integer': 'De waarde is geen integer',
            'float': 'De waarde is geen float',
            'regexp': 'De waarde is geen geldige regexp',
            'email': 'De waarde is geen geldig emailadres',
            'url': 'De waarde is geen geldige url',
            'hex': 'De waarde is geen hexidecimale waarde',
        },

        number: {
            'len': 'De waarde moet precies {0} lang zijn',
            'min': 'De waarde kan niet kleiner zijn dan {0}',
            'max': 'De waarde kan niet groter zijn dan {0}',
            'range': 'De waarde moet tussen {0} en {1} zijn',
        },

        array: {
            'len': 'De array moet exact {0} lang zijn',
            'min': 'De array mag niet korter zijn dan {0}',
            'max': 'De array mag niet langer zijn dan {0} ',
            'range': 'De array moet tussen {0} en {1} lang zijn',
        },

        pattern: {
            'mismatch': 'De waarde {0} komt niet overeen met het patroon {1}',
        },

        fieldtype: {
            'email': 'Het e-mailadres is ongeldig',
            'password': 'Wachtwoorden komen niet overeen',
            'username': 'De gebruikersnaam bevat tekens die niet zijn toegestaan',
        },
    },

    ...elementUi
};