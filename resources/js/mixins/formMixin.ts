export default {
    data() {
        return {
            showLoader: false,
            errors:     {},
        };
    },

    methods: {
        formMixin_onSubmit( event = undefined ) {
            this.showLoader     = true;
            this.errors         = {};
            this.message        = null;
        },

        handleErrorResponse( error ) {
            if( error.response === undefined ) {
                this.showLoader = false;

                console.error( '↓↓ A JS error occurred whilst handling the axios response. ↓↓' );
                console.error( error );
                return false;
            }

            return this.handleResponse( error.response );
        },

        handleResponse( response ) {
            // If "errors" is set, something is wrong in the validation. Show what is wrong in the respective fields.
            if( response.data.errors !== undefined ) {
                this.parseError( response );
                return false;
            }

            // Clear errors
            this.errors = {};

            if( response.data.success !== undefined ) {
                if( response.data.success === true ) {
                    if( response.data.message !== undefined ) {
                        this.showMessage( response.data.message );
                    }
                    return true;
                }
                else {
                    // We have a valid response, but an error. Show the error.
                    if( response.data.message !== undefined ) {
                        this.showMessage( response.data.message, 'error' );
                    }
                    return false;
                }
            }

            this.showMessage( 'error while connecting to the server', 'error' );
            return null;
        },

        parseError( response ) {
            let err = {};
            if( response.data.errors ) {
                err = response.data.errors;
            }
            else {
                return;
            }
            this.errors = {};

            for( let fieldName in err ) {
                // Add the message to the message box.
                for( let i in err[fieldName] ) {
                    if( this.errors[fieldName] === undefined ) {
                        this.errors[fieldName] = '';
                    }
                    this.errors[fieldName] += err[fieldName][i];
                }
            }

            if( response.data.message ) {
                this.showMessage( response.data.message, 'error' );
            }
            else {
                this.showMessage( this.$t( 'The given data was invalid.' ), 'error' );
            }
        },

        showMessage( text, type = 'success' ) {
            if( text.length === 0 ) {
                return;
            }

            if( ['success', 'warning', 'message', 'error'].indexOf( type ) < 0 ) {
                console.error( 'Message type does not exist', type );
            }

            // Set the default display time to 5 seconds.
            let duration = 5000;

            // Don't automatically close error messages.
            if( type === 'error' ) {
                duration = 10000;
            }

            // Close the previous message, even if it is an error.
            if( this._messageInstance ) {
                this._messageInstance.close();
            }

            this._messageInstance = this.$message( {
                dangerouslyUseHTMLString: true,
                showClose:                true,
                message:                  this.$t( text ),
                type:                     type,
                duration:                 duration,
            } );

            this.showLoader = false;
        },
    },
};
