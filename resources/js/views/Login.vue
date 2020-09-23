<template>
    <div class="py-8">
        <el-form ref="form"
                 :model="form"
                 class="max-w-sm"
                 label-width="150px"
                 status-icon>

            <el-form-item :error="errors.username" :label="$t( 'username' )" prop="username">
                <el-input v-model="form.username"
                          @keyup.enter.native="submit"
                ></el-input>
            </el-form-item>

            <el-form-item :error="errors.password" :label="$t( 'password' )" prop="password">
                <el-input v-model="form.password"
                          show-password
                          @keyup.enter.native="submit"></el-input>
            </el-form-item>

            <div class="block text-right">
                <el-button type="submit" @click.native="submit">
                    Sign In
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';

import formMixin from '../mixins/formMixin';

import {resetRouter} from '../router';
import UserRouter    from '../router/UserRouter';

export default {
    mixins: [formMixin],

    data() {
        return {
            form: {
                username: '',
                password: '',
            },
        };
    },

    methods: {
        ...mapMutations( ['setUser', 'setAccessToken'] ),

        submit() {
            axios.post( 'spa/auth/login', {
                username: this.form.username,
                password: this.form.password,
            } ).then( response => {
                if( !this.handleResponse( response ) ) {
                    return;
                }

                this.setUser( response.data.user );
                this.setAccessToken( response.data.access_token );

                // Set the routes for logged in users.
                resetRouter( UserRouter );

                this.$router.push( {
                    name: 'dashboard',
                }, () => {
                } );
            } )
                 .catch( ( error ) => {
                     this.handleErrorResponse( error );
                 } );
        },
    },
};
</script>

<i18n>
{
    "en": {
        "username": "Username",
        "password": "Password"
    },
    "nl": {
        "username": "Gebruikersnaam",
        "password": "Wachtwoord"
    }
}
</i18n>
