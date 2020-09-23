<template>
    <div class="py-8">
        <p>{{ getUser.username }}, Welcome to your dashboard!</p>
        <br>
        <button class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 focus:outline-none text-base"
                type="button"
                @click="logoutUser">
            Logout
        </button>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import formMixin                from '../../mixins/formMixin';

export default {
    mixins: [formMixin],

    computed: {
        ...mapGetters( ['getUser'] ),
    },
    methods:  {
        ...mapActions( ['clearSession'] ),
        async logoutUser() {
            await this.clearSession().then( response => {

                this.handleResponse( response );

                this.$router.push( {
                    name: 'login',
                }, () => {
                } );
            } ).catch( error => {
                this.handleErrorResponse( error );
            } );
        },
    },
};
</script>
