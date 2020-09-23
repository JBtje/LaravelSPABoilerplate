<template>
    <header class="bg-blue-600">
        <div class="container mx-auto px-6 py-4">
            <span class="text-white">{{ $t( 'credits' ) }}<br>{{ $t( 'php-packages' ) }}<br>{{ $t( 'js-packages' ) }}</span>
        </div>
    </header>
</template>

<i18n>
{
    "en": {
        "credits": "Created with: Laravel, Tailwind, Vue",
        "php-packages": "Laravel, Laravel-Passport, Permissions, Dump server",
        "js-packages": "TypeScript, Laravel-mix, Vuex, Vue-router, vue-i18n,  day.js, fontawesome-free, axios, lodash, bundle-analyzer"
    },
    "nl": {
        "credits": "Gemaakt met: Laravel, Tailwind, Laravel-mix, Vue, Vuex, Vue-router, vue-i18n en day.js",
        "php-packages": "Laravel, Laravel-Passport, Permissions, Dump server",
        "js-packages": "TypeScript, Laravel-mix, Vuex, Vue-router, vue-i18n,  day.js, fontawesome-free, axios, lodash, bundle-analyzer"
    }
}
</i18n>
