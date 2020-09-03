import { Action, Thunk, action, thunk } from 'easy-peasy'

import Todo from './todo'
import todoService from'../service/fakeTodoService'
// import todoService from'../service/restTodoService'

export interface TodoModel {
    todos: Todo[]

    // Thunks
    initData:        Thunk<TodoModel>

    delete:          Thunk<TodoModel, Todo>
    toggleCompleted: Thunk<TodoModel, Todo>

    // Actions
    _initData: Action<TodoModel, Todo[]>
    _delete:  Action<TodoModel, Todo>
    _replace: Action<TodoModel, Todo>
}

const todoModel: TodoModel = {
    todos: [],

    // Thunks
    initData: thunk(async (actions) => {
        await todoService.getTodoList().then(
            (todoList: Todo[]) => { actions._initData(todoList) }
        )
    }),

    delete: thunk(async (actions, todo) => {
        await todoService.deleteTodo(todo).then(
            () => { actions._delete(todo) }
        )
    }),

    toggleCompleted: thunk(async (actions, todo: Todo) => {
        todo.completed = !todo.completed
        await todoService.updateTodo(todo).then(
            (todo: Todo) => { actions._replace(todo) }
        )
    }),

    // Actions
    _initData: action((state, todoList) => {
        state.todos = todoList.slice() // Shallow copy
    }),

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




