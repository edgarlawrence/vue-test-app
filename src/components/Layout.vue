<template>
    <v-layout class="rounded rounded-md">
        <!--Sidebar-->
        <v-navigation-drawer style="background-color: #E1F7F5;">
            <div class="img-container d-flex justify-center py-5">
                <RouterLink to="/home">
                    <img :src="ArraLogo" alt="arra-logo" style="width: 200px; margin-bottom: 2rem" />
                </RouterLink>
            </div>

            <v-list v-model:opened="open">
                <div v-for="(item, index) in taskStore.resMenu.data">
                    <v-list-group :value="item.label">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" :title="item.label"></v-list-item>
                        </template>

                        <v-list-group v-for="(itemss, index) in item.subItems" :value="itemss.label">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" :title="itemss.label"></v-list-item>
                            </template>

                            <v-list-item v-for="(item, index) in itemss.subItems" :value="item.label">
                                <RouterLink :to="item.link" style="text-decoration: none; color: black"> {{ item.label
                                    }} </RouterLink>
                            </v-list-item>
                        </v-list-group>
                    </v-list-group>
                </div>
            </v-list>

        </v-navigation-drawer>
        <!--End of Sidebar-->

        <!-- Topbar -->
        <v-app-bar :elevation="0" style="background-color: #E1F7F5;">
            <template v-slot:prepend>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>Dashboard</v-app-bar-title>

            <v-btn icon="mdi-heart"></v-btn>

            <v-btn color="primary">
                Menu

                <v-menu activator="parent">
                    <v-list class="py-5 pl-3">
                        <v-list-item-title>
                            <button @click="logoutHandler">Logout</button>
                        </v-list-item-title>
                    </v-list>
                </v-menu>
            </v-btn>
        </v-app-bar>
        <!--End of Topbar -->

        <v-main class="mx-5 my-5" style="min-height: 200px;">
            <slot></slot>
        </v-main>
    </v-layout>
</template>

<style></style>

<script setup>
import { useTaskStore } from '@/store/taskStore';
import ArraLogo from '../assets/arra-logo.png'
import '../assets/styles/custom-vuetify.css'
import { ref } from 'vue';

const taskStore = useTaskStore()

const boolMenu = ref(false)

const open = ref(['open'])

taskStore.fetchFormInfoFormSkote();

const logoutHandler = () => {
    taskStore.logout()
}

</script>