<template>
    <div>
      <div v-for="index in itemCount" :key="index">
        <!-- Use index as the value for the select input -->
        <select v-model="selectedItems[index - 1]">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <!-- Display the selected value for each select input -->
        <p>Selected value: {{ selectedItems[index - 1] }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const itemCount = ref(5); // Number of items in the loop
  const selectedItems = ref([]); // Array to store selected values
  
  // Initialize selectedItems array with default values based on the itemCount
  for (let i = 0; i < itemCount.value; i++) {
    selectedItems.value.push('option1'); // Default value for each select input
  }
  </script>
  