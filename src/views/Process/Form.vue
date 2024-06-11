<template>
    <Layout>
        <div>
            <FilterTable @sendTableVal="applyFilters" @sendTableToExports="exportHandler" />
        </div>
        <div class="py-5 mx-5 d-flex justify-center items-center">
            <Tables :items="taskStore.resDataTable.data" :detailFunction="detailFuncHandler" :modalProps="modalActivaor" :isPageFilter="showFilterResult" />
        </div>
    </Layout>
</template>

<script setup>
import Tables from '@/components/Tables.vue';
import Layout from '@/components/Layout.vue';
import TableFormInfo from '@/components/TablesFormInfo.vue'
import FilterTable from '@/components/FilterTable.vue';
import { exportToExcel } from '@/helper/excelUtil';
import { useTaskStore } from '@/store/taskStore';
import { useRoute } from 'vue-router';
import { ref, computed, watch, watchEffect } from 'vue';

const route = useRoute()

const taskStore = useTaskStore()

const selectModule = ref(null)
const names = ref('')
const paramCode = ref('')
const desc = ref('')
const values = ref('')
const showFilterResult = ref(false)


const isActive = ref(false)

const isComplete = ref(false)

const applyFilters = (params) => {
    console.log('params', params)
    showFilterResult.value = params; // Update filter parameters
    console.log('showFilterResult.value', showFilterResult.value)

    if(params === true) {
        showFilterResult.value = true
    } else {
        showFilterResult.value = false
    }
};

watch((showFilterResult.value), (newValue) => {
    showFilterResult.value = newValue; // Update filterParams

    console.log('after update by emit',showFilterResult.value)
});

const refreshTimeout = () => {
    setTimeout(() => {
        window.location.href = '/form/' + route.params.id
    }, 3000)
}

const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const submitHandler = () => {
    taskStore.savePostData(route.params.id, {
        "formCode": route.params.id,
        "action": "ADD",
        "data": {
            "UID": getRandomNumber(1, 10000),
            "screenActionType": "ADD",
            "MODULE": selectModule.value?.code,
            "PAR_NM": names.value,
            "PAR_VALUE": values.value,
            "PAR_CD": paramCode.value,
            "PAR_DESC": desc.value
        },
        "details": []
    })

    isComplete.value = true

    refreshTimeout()
}

const testDetail = () => {
    taskStore.fetchFormDetail(route.params.id, 5)
}

const handleChange = (e) => {
    // Handle the change event
    console.log('Selected item:', selectModule.value.code);
}

const reqDataForm = ref({
    formCode: "F_GBSPR",
    start: 0,
    pageSize: 10,
    sort: "UID asc",
    filter: []
});

const modalActivaor = ref('modalActivator')

const detailFuncHandler = (id) => {
    console.log('ini view', id)
    modalActivaor.value
    taskStore.fetchFormDetail(route.params.id, id)
    taskStore.resDataDetail.data
}

const dataConsole = ref([])
dataConsole.value = taskStore.resDataTable.data

console.log('dataConsole.value', dataConsole)

taskStore.fetchFormInfoForm(route.params.id)
taskStore.fetchData(route.params.id, reqDataForm)
taskStore.fetchModuleDetail(route.params.id)

const exportHandler = (params) => {
    console.log('params', params)

    console.log('export masuk')
    const filename = 'testExcel'
    exportToExcel(taskStore.resDataTable.data, filename)
}
</script>