<template>
    <div class="py-8">
        <p class="mb-2 text-xl">Logging out...</p>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import formMixin      from '../mixins/formMixin';

export default {
    mixins: [formMixin],

    data() {
        return {};
    },

    methods: {
        ...mapMutations( ['logout'] ),
    },

    mounted() {
        this.logout();

        this.$router.push( {
            name: 'login',
        }, () => {
        } );
    },
};
</script>
