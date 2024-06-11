<template>
    <!-- MenuGroup component -->
    <v-list-group value="Admin">
      <!-- Activate menuToggleHandler when activated -->
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="Admin" @click="menuToggleHandler"></v-list-item>
      </template>
      <!-- Content of v-list-group -->
      <h1>aaa</h1>
    </v-list-group>
  </template>
  
  <script>
  // Import necessary modules if any
  export default {
    props: {
      menuToggleHandler: Function // Prop to receive menuToggleHandler function
    }
  }
  </script>