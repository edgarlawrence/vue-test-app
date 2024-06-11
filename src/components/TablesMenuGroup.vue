<template>
    <div v-if="isLoading === true">
        <v-progress-circular color="primary" indeterminate :size="77" :width="5"></v-progress-circular>
    </div>
    <div v-else>
        <v-table class="w-100">
            <thead>
                <tr>
                    <th class="text-center">
                        Action
                    </th>
                    <th class="text-left">
                        UID
                    </th>
                    <th class="text-left">
                        MODULE
                    </th>
                    <th class="text-left">
                        PAR_CD
                    </th>
                    <th class="text-left">
                        PAR_DESC
                    </th>
                    <th class="text-left">
                        PAR_NM
                    </th>
                    <th class="text-left">
                        PAR_VALUE
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td style="display: flex">
                        <!-- View detail-->
                        <v-dialog>
                            <template v-slot:activator="{ props: modalProps }">
                                <v-btn @click="detailFunction(item.UID)" v-bind="modalProps" variant="flat">
                                    <font-awesome-icon icon='fa-solid fa-eye' />
                                </v-btn>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card title="View Data">
                                    <div v-for="(item, index) in taskStore.resDataDetail.data" class="py-5 px-5">
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <v-text-field :v-model="item.UID" :label="item.UID"
                                                    disabled></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field :v-model="item.MODULE" :label="item.MODULE"
                                                    disabled></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field :v-model="item.PAR_CD" :label="item.PAR_CD"
                                                    disabled></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field :v-model="item.PAR_DESC" :label="item.PAR_DESC"
                                                    disabled></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field :v-model="item.PAR_NM" :label="item.PAR_NM"
                                                    disabled></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6" v-if="PAR_VALUE != null">
                                                <v-text-field :v-model="item.PAR_VALUE" :label="item.PAR_VALUE"
                                                    disabled></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </div>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                        <!--end of View detail-->

                        <!-- Edit Data-->
                        <v-dialog>
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn @click='detailFuncEditHandler(item.UID)' v-bind="activatorProps" variant="flat">
                                    <font-awesome-icon icon='fa fa-edit' />
                                </v-btn>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card title="Edit Data" v-if="isComplete === false">
                                    <form @submit.prevent="submitEditHandler">
                                        <v-row style="padding: 3rem;">
                                            <v-col cols="12" md="6">
                                                <v-select return-object v-model='selectModuleEdit'
                                                    :items="taskStore.resSelectModule.lookup" item-title="desc"
                                                    item-value='code' label="Module">
                                                </v-select>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field v-model="paramCodeEdit" label="Parameter Code"
                                                    disabled></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field v-model="namesEdit" label="Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field v-model="descEdit" label="Description"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                <v-text-field v-model="valuesEdit" label="Value"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </form>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn class='mx-3' type="button" @click="isActive.value = false">Cancel</v-btn>
                                        <v-btn class='mx-3' @click='submitEditHandler' type="submit">Submit</v-btn>
                                    </v-card-actions>
                                </v-card>
                                <v-card class="py-10" style="margin-left: auto; margin-right: auto; width: 35%;" v-else>
                                    <div class="d-flex justify-center">
                                        <font-awesome-icon icon='fa-solid fa-edit' style="height: 10rem;" />
                                    </div>
                                    <br />
                                    <h3 class="text-center"> Data Has been Sucessfully Edit</h3>
                                </v-card>
                            </template>
                        </v-dialog>
                        <!-- Edit Data-->

                        <v-dialog>
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-btn @click='deleteDataHandler(item.UID)' v-bind="activatorProps" variant="flat">
                                    <font-awesome-icon icon='fa-solid fa-trash' />
                                </v-btn>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card class="py-10" style="margin-left: auto; margin-right: auto; width: 35%;">
                                    <div class="d-flex justify-center">
                                        <font-awesome-icon icon='fa-solid fa-trash' style="height: 10rem;" />
                                    </div>
                                    <br />
                                    <h3 class="text-center"> Data Has been Sucessfully Delete</h3>
                                </v-card>
                            </template>
                        </v-dialog>
                        <!-- Delete Data-->
                        <!-- <button @click='paginatedPages'> click me </button> -->
                    </td>
                    <td class="text-center">
                        {{ item.UID }}
                    </td>
                    <td class="text-center">
                        {{ item.GROUP_ID }}
                    </td>
                    <td class="text-center">
                        {{ item.GROUP_NAME }}
                    </td>
                    <td class="text-center">
                        {{ item.GROUP_DESC }}
                    </td>
                    <td v-if="item.ACTIVE === true" class="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                            <path fill="#484de5" fill-rule="evenodd" stroke="#484de5" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25z"
                                clip-rule="evenodd" />
                        </svg>
                    </td>
                    <td v-else class="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                            <path fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25z"
                                clip-rule="evenodd" />
                        </svg>

                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script setup>
import { computed, defineProps, toRaw } from 'vue';
import { useTaskStore } from '@/store/taskStore';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, watchEffect } from 'vue';

const props = defineProps({
    items: Array,
    detailFunction: Function,
    editFunction: Function,
    addFunction: Function,
    modalProps: String,
    pages: Number,
    totalPages: Function,
    updatePages: Function,
    itemsLength: Number,
    paginationLength: Number,
    isPageFilter: Boolean,
    isLoading: Boolean
})

// const route = useRoute()

// const taskStore = useTaskStore()

// const isLoading = ref(true)

// const selectModuleEdit = ref(null)
// const namesEdit = ref('')
// const paramCodeEdit = ref('')
// const descEdit = ref('')
// const valuesEdit = ref('')
// const isActive = ref(false)
// const isComplete = ref(false)

// watch(props, (newProps) => {
//     paginatedItems.value = newProps.items
//     console.log('current page', newProps.items.length)
//     currPageLength.value = newProps.items.length
//     console.log('currpage length', currPageLength.value)
//     totalPageLength.value = Math.ceil(currPageLength.value / 10)
// })


// const detailFuncEditHandler = (id) => {
//     taskStore.fetchFormDetail(route.params.id, id)
//     taskStore.resDataDetail.data
//     selectModuleEdit.value = taskStore.resDataDetail.data[0]?.MODULE
//     namesEdit.value = taskStore.resDataDetail.data[0].PAR_NM
//     paramCodeEdit.value = taskStore.resDataDetail.data[0].PAR_CD
//     descEdit.value = taskStore.resDataDetail.data[0].PAR_DESC
//     valuesEdit.value = taskStore.resDataDetail.data[0].PAR_VALUE
// }

// const refreshTimeout = () => {
//     setTimeout(() => {
//         isLoading.value = false
//         window.location.href = '/form/' + route.params.id
//     }, 3000)
// }

// const submitEditHandler = (id) => {
//     console.log('dah kesubmit')
//     taskStore.fetchFormDetail(route.params.id, id)
//     taskStore.savePostData(route.params.id, {
//         "formCode": route.params.id,
//         "action": "Edit",
//         "data": {
//             "UID": taskStore.resDataDetail.data[0].UID,
//             "screenActionType": "EDIT",
//             "MODULE": selectModuleEdit.value?.code,
//             "PAR_NM": namesEdit.value,
//             "PAR_VALUE": valuesEdit.value,
//             "PAR_CD": paramCodeEdit.value,
//             "PAR_DESC": valuesEdit.value
//         },
//         "details": []
//     })

//     isComplete.value = true

//     refreshTimeout()
// }

// const deleteDataHandler = (id) => {
//     console.log('data sudah kehapus');
//     taskStore.fetchFormDetail(route.params.id, id);

//     const data = taskStore.resDataDetail.data[0];

//     // Extract required properties from data object
//     const { UID, MODULE, PAR_NM, PAR_VALUE, PAR_CD, PAR_DESC } = data;

//     taskStore.savePostData(route.params.id, {
//         "data": {
//             "UID": UID,
//             "MODULE": MODULE?.code,
//             "PAR_NM": PAR_NM,
//             "PAR_VALUE": PAR_VALUE,
//             "PAR_CD": PAR_CD,
//             "PAR_DESC": PAR_DESC,
//             "screenActionType": "REMOVE"
//         },
//         "details": []
//     })
//     isComplete.value = true

//     refreshTimeout()
// }
</script>