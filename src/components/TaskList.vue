<script lang="ts" setup>
  import { TransitionGroup } from 'vue';
  import { Task } from '@/types';

  const props = defineProps<{
    tasks: Task[]
  }>();

  const emits = defineEmits<{
    toggleDone: [id: string];
    removeTask: [id: string];
  }>();

</script>

<template>
  <TransitionGroup name="list" tag="div">
    <article v-for="task in tasks" :key="task.id">
      <label>      
        <input 
          @input="emits('toggleDone', task.id)" 
          :checked="task.done" 
          type="checkbox" 
        />
        <span :class="{ done: task.done }">{{ task.title }}</span>
      </label>
      <button @click="emits('removeTask', task.id)">Remove</button>       
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