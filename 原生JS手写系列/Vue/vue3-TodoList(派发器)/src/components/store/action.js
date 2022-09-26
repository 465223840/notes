export default function (state) {

    const onAddTodo = (todo) => {
        state.todoList.push(todo);
        addCount();
    }

    const onToggleTodo = (id) => {
        state.todoList = state.todoList.map(item => {
            item.id === id && (item.completed = !item.completed);
            return item
        })
    }

    const onRemoveTodo = (id) => {
        state.todoList = state.todoList.filter(item => item.id !== id);
        removeCount()
    }

    function addCount() {
        state.addCount += 1;
    }
    function removeCount() {
        state.removeCount += 1;
    }


    return {
        onAddTodo,
        onRemoveTodo,
        onToggleTodo
    }
}