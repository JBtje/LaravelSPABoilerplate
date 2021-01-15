<template>
    <template>
        <el-select class="lang-select" v-model="$i18n.locale" v-if="$i18n.locale">
            <el-option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
                <flag :iso="locale"/> {{ locale }}
            </el-option>
        </el-select>
    </template>
</template>

<script lang="js">
import flag from './Flag';

export default {
    name:       'lang-select',
    components: {
        flag
    }
};
</script>

<style lang="css">
.lang-select{
    width: 100px;
}
</style>