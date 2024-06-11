<template>
  <div class="forms">
    <form @submit.prevent="submitData">
      <div v-if="taskStore.resError" class="error-message py-3">
          {{ taskStore.resError.response.data.errors }}
        </div>
      <input type="text" v-model="data.userName" placeholder="username" class="custom-input" /> <br />

      <div v-if="passwordBool">
        <input type="text" v-model="data.password" placeholder="password" class="custom-input" />
        <button v-if="passwordBool" @click="passwordBoolHandler" type="button">
          <img :src="hideImage" alt="eye" class="custom-logos" />
        </button>
      </div>

      <div v-else>
        <input type="password" v-model="data.password" placeholder="password" class="custom-input" />
        <button @click="passwordBoolHandler" type="button">
          <img :src="eyeImage" alt="eye" class="custom-logos" />
        </button>
      </div>
      <br />
      <div class="custom-div-btn">
        <button type="submit" class="custom-button">
          <v-progress-circular v-if="isLoading && !taskStore.resError" color="green" indeterminate></v-progress-circular>
          <span v-else> Login </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import eyeImage from '../assets/eye.png'
import hideImage from '../assets/hide.png'
import { useTaskStore } from '@/store/taskStore';

const taskStore = useTaskStore()

const data = ref({
  userName: 'sa',
  password: 'P@ssw0rd',
  browser: 'Desktop'
})


const passwordBool = ref(false)
const isLoading = ref(false)
const isError = ref({})

const passwordBoolHandler = () => {
  passwordBool.value = !passwordBool.value
}

const submitData = () => {
  isLoading.value = true
  taskStore.loginStore(data.value)
  console.log("username", data.value)
  isError.value = taskStore.resError

  if(taskStore.resError) {
    isLoading.value = false
  }
  console.log("resData state after login:", taskStore.resData);
  console.log('err', isError.value)
}
</script>

<style scoped>
.forms {
  display: flex;
  justify-content: center;
}

.custom-input {
  border: 1px solid grey;
  margin: 10px;
  border-radius: 20px;
  padding: 3px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.custom-input::placeholder {
  padding: 10px;
  color: gray;
}

.custom-div-btn {
  display: flex;
  justify-content: center;
}

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

.custom-logos {
  width: 20px;
  height: 20px;
  position: relative;
  top: 5px;
}

.error-message {
  font-weight: 700;
  color: red;
}
</style>