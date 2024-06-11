<template>
    <v-data-table theme="dark" :items="items" class="w-75">
        <template #bottom></template>
    </v-data-table>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    items: Array
})
</script>