<template>
    <div v-for="i in filterCounter" :key="i">
        <div class="d-flex justify-space-around py-3 mx-auto" style="width: 80rem;">
            <v-col cols="12" sm="3">
                <!-- {{ selectedItemOne[i - 1] }} -->

                <v-select :clearable="true" :item-value="mapItemValue" v-model="selectedItemOne[i - 1]"
                    :items="mappedItems" item-title="caption" variant="solo">
                </v-select>

            </v-col>
            <v-col cols="12" sm="3">
                <!-- {{ selectedItemTwo[i - 1] }} -->
                <div v-if="taskStore.resFormInfo.filter.datatype === TEXT">
                    <v-select clearable variant="solo" item-value="code" v-model="selectedItemTwo[i - 1]"
                        :items="defaultSelect" item-title="desc">
                    </v-select>
                </div>

                <div v-else-if="taskStore.resFormInfo.filter.datatype === DATE">
                    <v-select clearable variant="solo" item-value="code" v-model="selectedItemTwo[i - 1]"
                        :items="dateSelect" item-title="desc">
                    </v-select>
                </div>

                <div v-else-if="taskStore.resFormInfo.filter.datatype === MONEY">
                    <v-select clearable variant="solo" item-value="code" v-model="selectedItemTwo[i - 1]"
                        :items="moneySelect" item-title="desc">
                    </v-select>
                </div>

                <div v-else-if="taskStore.resFormInfo.filter.datatype === NUMBER">
                    <v-select clearable variant="solo" item-value="code" v-model="selectedItemTwo[i - 1]"
                        :items="numberSelect" item-title="desc">
                    </v-select>
                </div>

                <div v-else>
                    <v-select clearable variant="solo" item-value="code" v-model="selectedItemTwo[i - 1]"
                        :items="defaultSelect" item-title="desc">
                    </v-select>
                </div>
            </v-col>
            <v-col cols="12" sm="3">
                <!-- {{ textFilterOne[i - 1] }} -->
                <v-text-field variant="solo" v-model="textFilterOne[i - 1]"></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="py-5">
                <v-btn v-if="i > 2" @click="filterRemoveHandler(i)" class="mx-3">
                    -
                </v-btn>
                <!-- Conditionally render the plus button -->
                <v-btn v-if="i === filterCounter" @click="filterAddHandler">
                    +
                </v-btn>
            </v-col>
        </div>
    </div>

    <div class="d-flex justify-start mx-auto py-3 actions-bar">
        <div class="mx-2">
            <v-dialog>
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="w-100" v-bind="activatorProps" color="transparent" variant="flat">
                        <font-awesome-icon icon="fa-solid fa-plus" class="mx-2" style="color: green;" />
                        Add
                    </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="Add Data" v-if="isComplete === false">
                        <v-form @submit.prevent="submitHandler">
                            <v-row style="padding: 3rem;">
                                <v-col cols="12" md="6">
                                    <v-select return-object v-model='selectModule'
                                        :items="taskStore.resSelectModule.lookup" item-title="desc" item-value='code'
                                        label="Module">
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="paramCode" @change="handleChange($event)"
                                        label="Parameter Code"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="names" @change="handleChange($event)"
                                        label="Name"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="desc" @change="handleChange($event)"
                                        label="Description"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="values" @change="handleChange($event)"
                                        label="Value"></v-text-field>
                                </v-col>
                            </v-row>
                            <div class='d-flex justify-end px-5 py-3'>
                                <v-spacer></v-spacer>

                                <v-btn class='mx-3' type="button" @click="isActive.value = false">Cancel</v-btn>
                                <v-btn class='mx-3' type="submit">Submit</v-btn>
                            </div>
                        </v-form>
                    </v-card>
                    <v-card class="py-10" style="margin-left: auto; margin-right: auto; width: 35%;" v-else>
                        <div class="d-flex justify-center">
                            <font-awesome-icon icon='fa-solid fa-check' style="height: 10rem;" />
                        </div>
                        <br />
                        <h3 class="text-center"> Data Has been Sucessfully Add</h3>
                    </v-card>
                </template>
            </v-dialog>
        </div>
        <div class="mx-2">
            <v-btn color="transparent">
                <font-awesome-icon icon="fa-solid fa-print" class="mx-2" style="color: green;" />
                Actions

                <v-menu activator="parent">
                    <!-- <v-list>
                        <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list> -->

                    <v-list>
                        <v-list-item>
                            <v-list-item-title @click="exportDataToExcelHandler">
                                Export to Excel
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
        </div>

        <div class="mx-2">
            <v-btn color="transparent" @click="filterHandler">
                <font-awesome-icon icon="fa-solid fa-refresh" class="mx-2" style="color: green;" />
                Refresh </v-btn>
        </div>

        <div class="mx-2">
            <v-btn color="transparent" @click='resetFilterHandler'>
                <font-awesome-icon icon="fa-solid fa-filter" class="mx-2" style="color: green;" />
                Reset Filter </v-btn>
        </div>

        <div class="mx-2">
            <v-btn color="transparent">
                <font-awesome-icon icon="fa-solid fa-gear" class="mx-2" style="color: green;" />
                Settings

                <v-menu activator="parent">
                    <v-list>
                        <v-list-item v-for="(item, index) in itemsSettings" :key="index" :value="index">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
        </div>
    </div>
</template>


<style scoped>
.actions-bar {
    border: 1px solid lightgrey;
    background-color: lightgrey;
    width: 102rem;
}
</style>

<script setup>
import { ref, defineProps, computed, defineEmits } from 'vue';
import { useTaskStore } from '@/store/taskStore';
import { useRoute } from 'vue-router';
import FilterGrid from '@/components/FilterGrid.vue'

const route = useRoute()

defineProps({
    addHandler: Function,
    dateExport: Function
})

const emits = defineEmits(['sendTableVal', 'sendTableToExports']);

const taskStore = useTaskStore()

taskStore.fetchFormInfoForm(route.params.id)

const firstName = ref('')
const filterCounter = ref(2)

const isComplete = ref(false)

const selectedItemOne = ref({})
const selectedItemTwo = ref({})
const selectedItemThree = ref(null)
const selectedItemFour = ref(null)

const textFilterOne = ref([])
const textFilterTwo = ref('')


// const mapItemValue = computed(() => {
//     return function (item) {
//         return { datatype: item.datatype, field: item.field, caption: item.caption };
//     };
// });

const mapItemValue = computed(() => {
    return function (item) {
        return { datatype: item.datatype, field: item.field, caption: item.caption };
    };
});

const mappedItems = computed(() => {
    if (!taskStore.resFormInfo.grid) {
        return [];
    }
    return taskStore.resFormInfo.grid.map(item => {
        console.log('item', item);
        return { ...item, caption: item.caption }; // Ensure 'caption' property is present
    });
});

// const mappedItems = computed(() => {
//     if (!taskStore.resFormInfo.grid) {
//         return [];
//     }

//     return taskStore.resFormInfo.grid.map(item => {
//         console.log('item', item)
//         return { ...item, caption: item.caption }; // Assuming 'caption' is the property you want to display
//     });
// });


const addObjectFilter = ref({
    // "datatype": selectedItemOne.value?.datatype,
    // "field": selectedItemOne.value?.field,
    // "optr": selectedItemTwo.value,
    // "value": textFilterOne.value

    "datatype": selectedItemOne.value?.datatype,
    "field": selectedItemOne.value?.field,
    "optr": selectedItemTwo.value,
    "value": textFilterOne.value
})

console.log('selected item1', selectedItemOne)
console.log('selected item2', selectedItemTwo)

const selectChangeHandler = (index) => {
    console.log('index', index)
    console.log('selectedItemOne', selectedItemOne.value)
};

const reqDataForm = ref({
    formCode: "F_GBSPR",
    start: 0,
    pageSize: 0,
    sort: "UID asc",
    filter: []
});

const resetFilterHandler = () => {
    const params = false;
    emits('sendTableVal', params);
    taskStore.fetchData(route.params.id, reqDataForm.value);
}

const exportDataToExcelHandler = () => {
    emits('sendTableToExports');
}

const lookupSelect = ref([
    { code: "CONTAINS", desc: "Contains" },
    { code: "EQUALS", desc: "Equals" },
    { code: "EMPTY", desc: "Empty" },
    { code: "INCLUDE", desc: "Includes" },
    { code: "STARTWITH", desc: "Start With" },
    { code: "ENDWITH", desc: "End With" },
    { code: "NOTCONTAINS", desc: "Not Contains" },
    { code: "NOTEQUALS", desc: "Not Equals" },
    { code: "NOTEMPTY", desc: "Not Empty" },
])

const dateSelect = ref([
    { code: "EQUALS", desc: "Equals" },
    { code: "EMPTY", desc: "Empty" },
    { code: "GREATER", desc: ">" },
    { code: "GREATERTHAN", desc: ">=" },
    { code: "LESS", desc: "<" },
    { code: "LESSTHAN", desc: "<=" },
    { code: "NOTEQUALS", desc: "Not Equals" },
    { code: "NOTEMPTY", desc: "Not Empty" },
])

const moneySelect = ref([
    { code: "EQUALS", desc: "Equals" },
    { code: "EMPTY", desc: "Empty" },
    { code: "GREATER", desc: ">" },
    { code: "GREATERTHAN", desc: ">=" },
    { code: "LESS", desc: "<" },
    { code: "LESSTHAN", desc: "<=" },
    { code: "NOTEQUALS", desc: "Not Equals" },
    { code: "NOTEMPTY", desc: "Not Empty" },
])

const numberSelect = ref([
    { code: "EQUALS", desc: "Equals" },
    { code: "EMPTY", desc: "Empty" },
    { code: "GREATER", desc: ">" },
    { code: "GREATERTHAN", desc: ">=" },
    { code: "LESS", desc: "<" },
    { code: "LESSTHAN", desc: "<=" },
    { code: "NOTEQUALS", desc: "Not Equals" },
    { code: "NOTEMPTY", desc: "Not Empty" },
])

const defaultSelect = ref([
    { code: "CONTAINS", desc: "Contains" },
    { code: "EQUALS", desc: "Equals" },
    { code: "INCLUDE", desc: "Includes" },
    { code: "EMPTY", desc: "Empty" },
    { code: "STARTWITH", desc: "Start With" },
    { code: "ENDWITH", desc: "End With" },
    { code: "NOTCONTAINS", desc: "Not Contains" },
    { code: "NOTEQUALS", desc: "Not Equals" },
    { code: "NOTEMPTY", desc: "Not Empty" },
])

const getDynamicSelectItems = (index) => {
    const dataType = taskStore.resFormInfo.filter.datatype
    switch (dataType) {
        case "TEXT":
            return lookupSelect.value
        case "DATE":
            return dateSelect.value
        case "MONEY":
            return moneySelect.value
        case "NUMBER":
            return numberSelect.value
        default:
            return []
    }
}


const items = ref([
    { title: 'Export to Excel' },
    { title: 'Export to CSV' },
    { title: 'Export to Delimited TF' },
    { title: 'Import' },
])

const itemsSettings = ref([
    { title: 'Save Filter Template' },
])

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

// Function to add a new filter
const filterAddHandler = () => {
    filterCounter.value++;
    selectedItemOne.value.push({});
    selectedItemTwo.value.push({});
    textFilterOne.value.push('');
};

// Function to remove a filter
const filterRemoveHandler = () => {
    filterCounter.value--;
    selectedItemOne.value.pop();
    selectedItemTwo.value.pop();
    textFilterOne.value.pop();
};

// Function to handle filter submission
const filterHandler = () => {
    const params = true;
    emits('sendTableVal', params);
    const filters = [];
    for (let i = 0; i < filterCounter.value; i++) {
        const filterObj = {
            datatype: selectedItemOne.value[i]?.datatype,
            field: selectedItemOne.value[i]?.field,
            optr: selectedItemTwo.value[i],
            value: textFilterOne.value[i]
        };

        console.log('cek selected', selectedItemOne.value)
        filters.push(filterObj);
    }
    console.log('Filters:', filters);
    taskStore.fetchData(route.params.id, {
        "formCode": route.params.id,
        "start": 0,
        "pageSize": 0,
        "sort": "UID asc",
        "filter": filters
    })
};
</script>