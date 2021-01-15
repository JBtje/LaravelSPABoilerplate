<template>
    <div class="flex flex-col h-screen">
        <app-header/>
        <main class="flex-1">
            <div class="container mx-auto py-4 px-6">
                <router-view/>
            </div>
        </main>
        <app-footer/>
    </div>
</template>

<script lang="js">
import AppHeader from './Header';
import AppFooter from './Footer';

export default {
    name: 'app',
    components: {
        AppHeader,
        AppFooter,
    },
};
</script>