<script setup lang="ts">
  import { ref } from 'vue';
  

  const emit = defineEmits<{
    addTask: [newTask: string]
  }>();

  

  const newTask = ref("");
  const error = ref("");

  function formSubmitted() {
    if (newTask.value.trim()){
      emit("addTask", newTask.value);
      newTask.value = "";
      error.value = "";
    } else {
      error.value = "Task cannot be empty";
    }
  }
</script>

<template>
  <main>    
    <form @submit.prevent="formSubmitted">
      <label>
        New Task
        <input v-model="newTask" type="text" :aria-invalid="!!error || undefined" @input="error = ''">
        <small>{{ error }}</small>
      </label>
      <div class="buttonContainer">
        <button>Add</button>
      </div>      
    </form>    
  </main>
</template>
  
<style scoped>
  main {
    max-width: 600px;
    margin: 1rem auto;
  }
  .buttonContainer {
    display: flex;
    justify-content: end;
  }
</style>
