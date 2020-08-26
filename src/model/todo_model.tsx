import { Action, action } from 'easy-peasy'

import Todo from './todo'
import todos from '../repository/simple_todo_repository'

export interface TodoModel {
    todos: Todo[]

    // Actions
    delete: Action<TodoModel, Todo>
    toggleCompleted: Action<TodoModel, Todo>
}

const todoModel: TodoModel = {
    todos: todos,

    delete: action((state, todo) => {
        for( var i = 0; i < state.todos.length; i++){ 
            if ( state.todos[i].id === todo.id) {
                state.todos.splice(i, 1); 
            }
         }
    }),

    toggleCompleted: action((state, todo) => {
        for( var i = 0; i < state.todos.length; i++){ 
            if ( state.todos[i].id === todo.id) {
                state.todos[i].completed = !state.todos[i].completed
            }
         }
    })
}

export { todoModel }




