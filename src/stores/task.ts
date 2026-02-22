import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Task, TaskFilter } from '@/types';

export const useTaskStore = defineStore('Task', () => {

  /*
    state
  */
  const tasks = ref<Task[]>([]);
  const filter = ref<TaskFilter>("all");


  /*
    actions
  */
  function addTask(newTask: string) {
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


  /*
    computed
  */
  const totalDone = computed(() => tasks.value.reduce((total, task) => task.done ? total + 1 : total, 0));
  const filteredTasks = computed(() => {
    switch (filter.value) {
      case "all":
        return tasks.value
      case "todo":
        return tasks.value.filter((x) => !x.done)
      case "done":
        return tasks.value.filter((x) => x.done)
    }
  });

  return {
    tasks,
    filter,
    addTask,
    toggleDone,
    removeTask,
    setFilter,
    totalDone,
    filteredTasks
  }
})
