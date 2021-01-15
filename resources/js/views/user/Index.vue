<template>
    <div class="py-8">
        <p>{{ $t( 'Welcome to the index!' ) }}</p>
        <div v-if="!getUser" class="mt-4">
            <router-link :to="{ name: 'login' }"
                         class="px-4 py-1 text-white tracking-wide focus:outline-none bg-blue-500 hover:bg-blue-600 mr-4"
                         tag="button">{{ $t( 'Login' ) }}
            </router-link>
            <router-link :to="{ name: 'register' }"
                         class="px-4 py-1 text-white tracking-wide focus:outline-none bg-blue-500 hover:bg-blue-600"
                         tag="button">{{ $t( 'Register' ) }}
            </router-link>
        </div>
        <div v-else class="mt-4">
            <span class="text-gray-800 block">{{ $t( 'You are already authenticated, would you like to go to the dashboard?' ) }}</span><br>
            <router-link :to="{ name: 'dashboard' }"
                         class="px-4 py-1 text-white tracking-wide focus:outline-none bg-blue-500 hover:bg-blue-600"
                         g="button"
                         tap>{{ $t( 'Dashboard' ) }}
            </router-link>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed: {
        ...mapGetters( ['getUser'] ),
    },
};
</script>

<i18n>
{
    "en": {
        "Welcome to the index!": "Welcome to the index!",
        "Login": "Login",
        "Register": "Register",
        "You are already authenticated, would you like to go to the dashboard?": "You are already authenticated, would you like to go to the dashboard?",
        "Dashboard": "Dashboard"
    },
    "nl": {
        "Welcome to the index!": "Welcome op de index pagina!",
        "Login": "Inloggen",
        "Register": "Registreren",
        "You are already authenticated, would you like to go to the dashboard?": "U bent al aangemeld. Wilt u naar het dashboard?",
        "Dashboard": "Dashboard"
    }
}
</i18n>