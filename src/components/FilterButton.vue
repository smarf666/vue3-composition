<script lang="ts" setup>
import { TaskFilter } from '@/types';


const props = defineProps<{
    filterType: TaskFilter;
    currentFilter: TaskFilter;
}>()

const emits = defineEmits<{
    setFilter: [filterType: TaskFilter];
}>();
</script>

<template>
    <button class="secondary" :class="{ contrast: currentFilter === filterType }" @click="emits('setFilter', filterType)">{{ filterType }}</button>    
</template>

<style scoped>

</style>