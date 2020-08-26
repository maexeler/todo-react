import { Action, Thunk, action, thunk } from 'easy-peasy'

import Todo from './todo'
import todos from '../repository/simple_todo_repository'
import todoService from'../service/fakeTodoService'

export interface TodoModel {
    todos: Todo[]

    // Thunks
    delete:          Thunk<TodoModel, Todo>
    toggleCompleted: Thunk<TodoModel, Todo>

    // Actions
    _delete:  Action<TodoModel, Todo>
    _replace: Action<TodoModel, Todo>
}

const todoModel: TodoModel = {
    todos: todos,

    // Thunks
    delete: thunk(async (actions, todo) => {
        await todoService.deleteToDo(todo)
        .then(() => {
            actions._delete(todo)
        })
    }),

    toggleCompleted: thunk(async (actions, todo: Todo) => {
        todo.completed = !todo.completed
        const updatedTodo = await todoService.updateToDo(todo)
        actions._replace(updatedTodo)
    }),

    // Actions
    _delete: action((state, todo) => {
        for( var i = 0; i < state.todos.length; i++) { 
            if ( state.todos[i].id === todo.id) {
                state.todos.splice(i, 1); 
            }
         }
    }),

    _replace: action((state, todo) => {
        for( var i = 0; i < state.todos.length; i++) { 
            if ( state.todos[i].id === todo.id) {
                state.todos[i] = {...todo} // Copy todo so state changes
            }
         }
    })
}

export { todoModel }




