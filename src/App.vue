<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterView } from 'vue-router';
  import TaskForm from './components/TaskForm.vue';  
  import TaskList from './components/TaskList.vue';
  import FilterButton from './components/FilterButton.vue';
  import { useTaskStore } from '@/stores/task'

  const taskStore = useTaskStore()

  const message = ref("Tasks App");  


</script>

<template>
  <main>
    <h1>{{ message }}</h1>  
    <TaskForm />
    <h3 v-if="!taskStore.tasks.length">Add a task to get started.</h3>
    <h3 v-else>{{ taskStore.totalDone }} / {{  taskStore.tasks.length }} tasks completed</h3>
    <div v-if="taskStore.tasks.length" class="button-container">

      <!--remove the emitters and props-->
      <FilterButton filterType="all" />
      <FilterButton filterType="todo" />
      <FilterButton filterType="done" />
      
    </div>
    <br>
    <TaskList />
  </main>

  <RouterView/>
</template>
  
<style scoped>
  main {
    max-width: 600px;
    margin: 1rem auto;
  }  
  .button-container {
    display: flex;
    gap: 1rem;
    justify-content: end;
  }
</style>
