// The method setObject( key, value ) stored the value as JSON object.
Storage.prototype.setObject = function( key :string, value :any ) {
    try {
        this.setItem( key, JSON.stringify( value ) );
    } catch( domException ) {
        if( ['QuotaExceededError', 'NS_ERROR_DOM_QUOTA_REACHED'].includes( domException.name ) ) {
            console.info( 'Local storage is not supported or the storage quota was exceeded' );
        } else {
            //
        }
    }
};

// The method getObject( key, value ) retrieves the object.
Storage.prototype.getObject = function( key :string ) {
    let value = this.getItem( key );
    try {
        return value && JSON.parse( value );
    } catch( err ) {
        this.setObject( key, false );
    }
};