import { Action, Computed, action, computed } from 'easy-peasy'

import Todo from './todo'
import todoList from '../repository/simple_todo_repository'

const shortid = require('shortid');

export interface TodoModel {
    todos: Todo[]

    // Thunks
    initData:        Action<TodoModel>

    add:             Action<TodoModel, Todo>
    modify:          Action<TodoModel, Todo>
    delete:          Action<TodoModel, Todo>
    toggleCompleted: Action<TodoModel, Todo>

    // Display State & Actions
    selectedTodo: Todo | null
    setSelectedTodo: Action<TodoModel, Todo>

    pendingTodos: Computed<TodoModel, number>
}

const todoModel: TodoModel = {
    todos: [],

    // Thunks
    initData: action((state) => {
        state.todos = todoList.slice() // Shallow copy
    }),

    add: action((state, todo) => {
        todo.id = shortid() // Generate unique id
        state.todos = [{...todo}, ...state.todos]
    }),

    modify: action((state, todo) => {
        for( var i = 0; i < state.todos.length; i++) { 
            if ( state.todos[i].id === todo.id) {
                state.todos[i] = {...todo} // Copy todo so state changes
            }
        }
    }),

    delete: action((state, todo) => {
        for( var i = 0; i < state.todos.length; i++) { 
            if ( state.todos[i].id === todo.id) {
                state.todos.splice(i, 1); 
            }
        }
        if (state.selectedTodo && todo.id === state.selectedTodo.id) {
            state.selectedTodo = null
        }
    }),

    toggleCompleted: action((state, todo: Todo) => {
        todo.completed = !todo.completed
        for( var i = 0; i < state.todos.length; i++) { 
            if ( state.todos[i].id === todo.id) {
                state.todos[i] = {...todo} // Copy todo so state changes
            }
        }
    }),

    // Display State & Actions
    selectedTodo: null,

    setSelectedTodo: action((state, todo) => {
        state.selectedTodo = {...todo}
    }),

    pendingTodos: computed((state) => {
        const counter = (sum: number, todo: Todo): number => sum + (todo.completed ? 0 : 1)
        return state.todos.reduce(counter, 0)
    })
}

export { todoModel }
