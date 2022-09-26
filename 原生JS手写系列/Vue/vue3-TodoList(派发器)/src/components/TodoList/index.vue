<script setup>

import FormComp from './Form/index.vue'

import ListComp from './List/index.vue'

import { provide } from 'vue'

import {
    todoReducer, ADD_TODO, TOGGLE_TODO, REMOVE_TODO
} from '../store'

const { todoList, addCount, removeCount, todoDispatch } = todoReducer()

provide('todoHandlers', {

    toggleTodo: todoDispatch(TOGGLE_TODO),
    removeTodo: todoDispatch(REMOVE_TODO)
})

const addTodo = todoDispatch(ADD_TODO);

const list = []
</script>

<template>

    <form-comp @add-todo="addTodo" />
    <list-comp :todo-list="todoList" :add-count="addCount" :remove-count="removeCount" />
</template>

