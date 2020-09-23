<template>
    <div class="py-8">
        <section v-if="!completed">
            <el-form ref="form"
                     :model="form"
                     :rules="rules"
                     label-width="150px"
                     status-icon>

                <el-form-item :error="errors.username" :label="$t( 'username' )" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>

                <el-form-item :error="errors.email" :label="$t( 'email' )" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>

                <el-form-item :error="errors.password" :label="$t( 'password' )" prop="password">
                    <el-input v-model="form.password" show-password></el-input>
                </el-form-item>

                <el-form-item :error="errors.password_confirmation"
                              :label="$t( 'password_confirmation' )"
                              prop="password_confirmation">
                    <el-input v-model="form.password_confirmation" show-password></el-input>
                </el-form-item>

                <div class="block text-right">
                    <el-button type="submit" @click.native="submit">
                        {{ $t( 'sign up' ) }}
                    </el-button>
                </div>
            </el-form>
        </section>
        <section v-else>
            {{ $t( 'you have been registered, please validate your email address' ) }}
        </section>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import formMixin      from '../mixins/formMixin';

export default {
    mixins: [formMixin],

    data() {
        return {
            completed: false,

            form: {
                username:              '',
                email:                 '',
                password:              '',
                password_confirmation: '',
            },

            rules: {
                username: [
                    ...this.$rules.required,
                    ...this.$rules.username,
                ],

                email: [
                    ...this.$rules.required,
                    ...this.$rules.email,
                ],

                password: [
                    ...this.$rules.required,
                    ...this.$rules.password,
                    {
                        validator: ( rule, value, callback ) => {
                            // Validate the password_confirmation upon change of the password field.
                            if( this.form.password_confirmation.length > 0 ) {
                                this.$refs['form'].validateField( 'password_confirmation', ( valid ) => {
                                    return true;
                                } );
                            }
                            callback();
                        },
                        trigger:   'change',
                    },
                ],

                password_confirmation: [
                    ...this.$rules.required,
                    {
                        validator: ( rule, value, callback ) => {
                            if( this.form.password_confirmation.length > 0 && this.form.password_confirmation !== this.form.password ) {
                                callback( this.$t( 'validate.fieldtype.password' ) );
                            }
                            else {
                                callback();
                            }
                        },
                        trigger:   'change',
                    },
                ],
            },
        };
    },

    methods: {
        ...mapMutations( ['setUser', 'setAccessToken'] ),

        submit() {
            axios.post( 'spa/auth/register', {
                username:              this.form.username,
                email:                 this.form.email,
                password:              this.form.password,
                password_confirmation: this.form.password_confirmation,
            } )
                 .then( ( response ) => {
                     if( !this.handleResponse( response ) ) {
                         return;
                     }

                     this.$router.push( {
                         name: 'login',
                     }, () => {
                     } );
                 } ).catch( ( error ) => {
                    this.handleError( error );
                },
            );
        },
    },
};
</script>

<i18n>
{
    "en": {
        "username": "Username",
        "email": "Email",
        "password": "Password",
        "password_confirmation": "Confirm Paspword",
        "sign up": "Sign up",
        "you have been registered, please validate your email address": "You are registered, please press the link in the mail to activate your account."
    },
    "nl": {
        "username": "Gebruikersnaam",
        "email": "E-mail",
        "password": "Wachtwoord",
        "password_confirmation": "Wachtwoord bevestigen",
        "sign up": "Aanmelden",
        "you have been registered, please validate your email address": "U heeft zicht succesvol aangemeld. Klik op de link in de mail om uw aanmelding te bevestigen."
    }
}
</i18n>
