<template>
    <div>
        <Layout>
            <h3 class="text-center py-5" style="letter-spacing: 1px;"> Dashboard </h3>
            <button type="button" @click="toggleTableVisibility" class="custom-button">Toggle Table</button>
            <div v-if="showTable && tablesArrays" class="py-5 mx-5">
                <Tables :items="tablesArrays" />
            </div>
            <div v-else>
                {{ null }}
            </div>

            <div class="my-5">
                <!-- <TableFormInfo :items="taskStore.resFormInfo.grid" /> -->
            </div>
        </Layout>
    </div>
</template>

<style scoped>
button {
    color: #0E46A3;
    font-weight: 700;
}

button:hover {
    color: white;
    font-weight: 700;
    transition: 1s;
}

.custom-button {
    background-color: white;
    padding-left: 4rem;
    padding-right: 4rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: center;
    border-radius: 20px;
    margin-top: 0.5rem;
    width: 100%;
    border: 1px solid #0E46A3;
}

.custom-button:hover {
    background-color: #0E46A3;
    padding-left: 4rem;
    padding-right: 4rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: center;
    border-radius: 20px;
    margin-top: 0.5rem;
    width: 100%;
    border: 1px solid #0E46A3;
}
</style>


<script setup>
import Layout from '@/components/Layout.vue';
import Lists from '@/components/Lists.vue';
import Tables from '@/components/Tables.vue';
import TableFormInfo from '@/components/TablesFormInfo.vue'
import { useTaskStore } from '@/store/taskStore';
import { ref, onMounted } from 'vue';

const taskStore = useTaskStore();
const tablesArrays = ref([])
const infoFormArrays = ref([])
const showTable = ref(false)

const fetchData = () => {
    taskStore.fetchData('F_GBSPR', reqDataForm.value);
    tablesArrays.value = taskStore.resDataTable.data
    console.log('showtable', showTable.value)
    console.log('table pinia', taskStore.resDataTable.data)
}

taskStore.fetchFormInfoForm('F_GBSPR')
infoFormArrays.value = taskStore.resFormInfo.grid
console.log('table pinia', taskStore.resFormInfo.grid)


const toggleTableVisibility = () => {
    showTable.value = !showTable.value;
    fetchData()
};

const reqDataForm = ref({
    formCode: "F_GBSPR",
    start: 0,
    pageSize: 0,
    sort: "UID asc",
    filter: []
});

onMounted(fetchData); // Fetch data when component is mounted
</script>