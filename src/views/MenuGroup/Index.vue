<template>
    <Layout>
        <div class="py-5 mx-5 d-flex justify-center items-center">
            <TablesMenuGroup :items="taskStore.resDataTable.data" :isLoading="isLoading" />
        </div>
    </Layout>
</template>

<script setup>
import TablesMenuGroup from '@/components/TablesMenuGroup.vue'
import Layout from '@/components/Layout.vue';
import TableFormInfo from '@/components/TablesFormInfo.vue'
import FilterTable from '@/components/FilterTable.vue';
import { exportToExcel } from '@/helper/excelUtil';
import { useTaskStore } from '@/store/taskStore';
import { useRoute } from 'vue-router';
import { ref, computed, watch, watchEffect } from 'vue';

const route = useRoute()

const taskStore = useTaskStore()

const isLoading = ref(true)

setTimeout(() => {
    isLoading.value = false

    taskStore.fetchMenuGroup(route.params.id)
    taskStore.fetchMenuGroupGetData(route.params.id, {
        "formCode": route.params.id,
        "start": 0,
        "pageSize": 10,
        "sort": "UID desc",
        "filter": taskStore.resDataTable.filter
    })
}, 3000);

</script>