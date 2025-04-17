"use strict";

function todoApp() {
    return {
        activeTab: "",

        toggleAllCompleted: false,

        newTodo: "",

        todos: JSON.parse(localStorage.getItem("todos") ?? "[]"),

        get activeTodos() {
            return this.todos.filter((todo) => !todo.completed);
        },

        get completedTodos() {
            return this.todos.filter((todo) => todo.completed);
        },

        get fetchTodos() {
            switch (this.activeTab) {
                case "active":
                    return this.activeTodos;
                case "completed":
                    return this.completedTodos;
                default:
                    return this.todos;
            }
        },

        addTodo() {
            if (this.newTodo.trim().length) {
                this.todos.unshift({
                    body: this.newTodo,
                    completed: false,
                    editing: false,
                    editCache: this.newTodo,
                    id: crypto.randomUUID(),
                });

                if (this.activeTab === "completed") {
                    this.activeTab = "";
                }

                this.save();

            }

            this.newTodo = "";
        },

        clearCompletedTodos() {
            this.todos = this.activeTodos;
            this.save();
        },

        cancelEdit(todo) {
            todo.editCache = todo.body;
            this.editTodo(todo);
        },

        deleteTodo(id) {
            this.todos = this.todos.filter((todo) => todo.id !== id);
            this.save();
        },

        editTodo(todo) {
            todo.editing = false;

            if (todo.editCache.trim().length < 1) {
                this.deleteTodo(todo.id);
            } else {
                todo.body = todo.editCache;
            }

            this.save();
        },

        save() {
            localStorage.setItem("todos", JSON.stringify(this.todos));
        },

        toggleAllTodos() {
            this.toggleAllCompleted = !this.toggleAllCompleted;
            this.todos.forEach(
                (todo) => (todo.completed = this.toggleAllCompleted)
            );

            this.save();
        },

        toggleComplete(todo) {
            todo.completed = !todo.completed;
            this.save();
        },
    };
}