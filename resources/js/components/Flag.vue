<template>
    <div class="Blaat"></div>
    <span v-if="iso" class="flag-icon" :class="flagIconClass" :title="title || iso"></span>
</template>

<script>
export default {
    name:     'flag',
    props:    {
        iso:     {type: String, default: null},
        title:   {type: String, default: null},
        squared: {type: Boolean, default: false},
    },
    computed: {
        flagIconClass() {
            return ((!!this.squared) ? 'flag-icon-squared ' : '') + 'flag-icon-' + (this.iso === 'en' ? 'gb' : this.iso).toLowerCase();
        },
    },
};
</script>

<style lang="scss">
$flag-icon-css-include: 'de', 'nl', 'gb';
$flag-icon-css-path: '~flag-icon-css/flags';

@import '~flag-icon-css/sass/flag-icon.scss';
</style>
