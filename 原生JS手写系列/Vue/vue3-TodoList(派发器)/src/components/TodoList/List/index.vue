
<script setup>


import listItem from './Item.vue'

const props = defineProps({
    todoList: {
        type: Array,
        default: []
    },
    addCount: {
        type: Number,
        default: 0
    },
    removeCount: {
        type: Number,
        default: 0
    }
})
const Items = []
</script>

<template>
    <div>
        <p>
            <span>已添加过{{ addCount }}条</span> /
            <span>已删除过{{ removeCount }}条</span>
        </p>
        <ul>
            <list-item v-for="item of todoList" :key="item.id" :data="item" />
        </ul>
    </div>
</template>

