<script lang="ts" setup>
  import { TransitionGroup } from 'vue';
  import { useTaskStore } from '@/stores/task';

  const taskStore = useTaskStore();

</script>

<template>
  <TransitionGroup name="list" tag="div">
    <article v-for="task in taskStore.filteredTasks" :key="task.id">
      <label>      
        <input 
          @input="taskStore.toggleDone(task.id)" 
          :checked="task.done" 
          type="checkbox" 
        />
        <span :class="{ done: task.done }">{{ task.title }}</span>
      </label>
      <button @click="taskStore.removeTask(task.id)">Remove</button>       
    </article>
  </TransitionGroup>
</template>

<style scoped>
.done {
  text-decoration: line-through;
}
article {
  display: flex;
  justify-content: space-between;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>