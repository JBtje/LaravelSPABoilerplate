<template>
    <footer class="bg-blue-600">
        <div class="container mx-auto px-6 py-4">
            <span class="text-white">{{ $t( 'credits' ) }}<br>{{ $t( 'php-packages' ) }}<br>{{ $t( 'js-packages' ) }}</span>
        </div>
    </footer>
</template>

<i18n>
{
    "en": {
        "credits": "Created with: Laravel, Tailwind, Vue",
        "php-packages": "Laravel, Laravel-Passport, Permissions, Dump server",
        "js-packages": "TypeScript, Laravel-mix, Vuex, Vue-router, vue-i18n,  day.js, fontawesome-free, axios, bundle-analyzer"
    },
    "nl": {
        "credits": "Gemaakt met: Laravel, Tailwind, Vue",
        "php-packages": "Laravel, Laravel-Passport, Permissions, Dump server",
        "js-packages": "TypeScript, Laravel-mix, Vuex, Vue-router, vue-i18n,  day.js, fontawesome-free, axios, bundle-analyzer"
    }
}
</i18n>
