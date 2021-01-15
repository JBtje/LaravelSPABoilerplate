<template>
    <header class="bg-blue-600">
        <div class="container mx-auto px-6 py-4">
            <router-link :to="{ name: 'index' }"
                         class="text-white text-3xl cursor-pointer"
                         tag="h3">Laravel SPA
            </router-link>

            <lang-select class="inline-block float-right"/>
        </div>
    </header>
</template>

<script lang="js">
import LangSelect from './LangSelect';

export default {
    name:       'app-header',
    components: {
        LangSelect,
    },
};
</script>