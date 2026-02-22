<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  import TaskForm from './components/TaskForm.vue';
  import { Task, TaskFilter } from './types';
  import TaskList from './components/TaskList.vue';
  import FilterButton from './components/FilterButton.vue';

  const message = ref("Tasks App");
  const tasks = ref<Task[]>([]);
  const filter = ref<TaskFilter>("all");

  const totalDone = computed(() => tasks.value.reduce((total, task) => task.done ? total + 1 : total, 0));
  const filteredTasks = computed(() => {
    switch(filter.value) {
      case "all":
        return tasks.value
      case "todo": 
        return tasks.value.filter((x) => !x.done)
      case "done":
        return tasks.value.filter((x) => x.done)
    }
  });
  
  
  function addtask(newTask: string) {    
    tasks.value.push({
      id: crypto.randomUUID(),
      title: newTask,
      done: false
    })
  }

  function toggleDone(id: string) {
    const task = tasks.value.find((task) => task.id === id);
    if (task) {
      task.done = !task.done;
    }
  }

  function removeTask(id: string) {
    const task = tasks.value.findIndex((task) => task.id === id);
    console.log(task)
    if (task !== -1) {
      tasks.value.splice(task, 1)
    }
  }  

  function setFilter(value: TaskFilter) {
    filter.value = value;
  }
  
</script>

<template>
  <main>
    <h1>{{ message }}</h1>  
    <TaskForm @add-task="addtask"/>
    <h3 v-if="!tasks.length">Add a task to get started.</h3>
    <h3 v-else>{{ totalDone }} / {{  tasks.length }} tasks completed</h3>
    <div v-if="tasks.length" class="button-container">

      <FilterButton :currentFilter="filter" filterType="all" @set-filter="setFilter"/>
      <FilterButton :currentFilter="filter" filterType="todo" @set-filter="setFilter"/>
      <FilterButton :currentFilter="filter" filterType="done" @set-filter="setFilter"/>
      
    </div>
    <br>
    <TaskList :tasks="filteredTasks" @toggle-done="toggleDone" @remove-task="removeTask"/>
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
