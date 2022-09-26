<script setup>
import { ref } from 'vue'

const todoText = ref('')

const emit = defineEmits(['addTodo'])

const addTodo = () => {
    if (!todoText.value.length) {
        return
    }

    emit('addTodo', {
        id: new Date().getTime(),
        content: todoText.value,
        completed: false
    })
}
</script>

<template>
    <div>
        <input type="text" placeholder="Please input someThing..." v-model="todoText">
        <button @click="addTodo">Add</button>
    </div>
</template>

