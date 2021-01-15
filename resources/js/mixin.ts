export default {
    data() {
        return {
            // System languages.
            languages:       process.env.WEBSITE_LANGUAGES,
            // System version.
            website_version: process.env.WEBSITE_VERSION,
        };
    },

    methods: {
        goto( name ) {
            this.$router.push( {
                name: name,
            }, () => {
            } );
        },
    },
};