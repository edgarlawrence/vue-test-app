<template>
  <main>
    <div class="d-flex justify-center align-center custom-container">
      <v-col cols="12" md="9" class="bg-surface-variant">
        <div class="custom-container2">
          <v-carousel show-arrows="hover" cycle hide-delimiters>
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <div class="d-flex fill-height fill-width justify-center align-center">
                <div class="text-h2">
                  {{ slide }}
                </div>
              </div>
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-col>

      <v-col cols="12" md="3">
        <LoginForms />
      </v-col>
    </div>
  </main>
</template>

<script setup>
import LoginForms from '@/components/LoginForms.vue';
import { ref } from 'vue';

const colors = ref([
  'indigo',
  'warning',
  'pink darken-2',
  'red lighten-1',
  'deep-purple accent-4',
])

const slides = ref([
  'Hello',
  'こんにちは',
  '你好',
  'Bonjour',
  '어이'
])

</script>


<style>
.custom-container {
  height: 100vh;
}

.custom-container2 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>