<script lang="ts" setup>
import { TaskFilter } from '@/types';

import { useTaskStore } from '@/stores/task';

const taskStore = useTaskStore();


const props = defineProps<{
    filterType: TaskFilter;    
}>()
</script>

<template>
    <button 
        class="secondary" 
        :class="{ contrast: taskStore.filter === filterType }" 
        @click="taskStore.setFilter(filterType)"
    >
        {{ filterType }}
    </button>  
</template>

<style scoped>

</style>