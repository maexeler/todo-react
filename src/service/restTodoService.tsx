import axios from 'axios'

import TodoService from './TodoService'
import Todo from '../model/todo'

// a) If you would like to have a local server:
// --------------------------------------------
//
// 1) Load an typicode server by:
// npm install -g json-server

// 2) Create the file 'db.json' with approptiate data

// 3) Start the typicode server in terminal with:
// json-server --watch db.json --port 3003

// b) If you would like to use an existing server:
// -----------------------------------------------
//
// use the typicode server from jsonplaceholder

// const baseURL: string = 'http://localhost:3003'
const baseURL: string = 'https://jsonplaceholder.typicode.com'

// Let's create an axios instance
// for the accssses to the server
const http = axios.create({
    baseURL: baseURL,
    timeout: 2000,
    headers: {'Content-Type': 'application/json'},
})

// Use this function if you are only interested in the data on success
async function callForData<R>(httpFun: any, uri: string, params?: any): Promise<R> {
    return new Promise<R>((resolve, reject) => {
        httpFun(uri, params)
            .then((response: any) => { resolve(response.data) })
            .catch((error: any) => { reject(error) })
    })
}

class RestTodoService implements TodoService {
    
    async getTodoList(): Promise<Todo[]> {
        return callForData(http.get, '/todos?_limit=15')
    }

    async addTodo(todo: Todo): Promise<Todo> {
        return callForData(http.post, '/todos', todo)
    }

    async deleteTodo(todo: Todo): Promise<void> {
        return callForData(http.delete, `/todos/${todo.id}`)
    }

    async updateTodo(todo: Todo): Promise<Todo> {
        return callForData(http.put, `/todos/${todo.id}`, todo)
    }
}

const todoService = new RestTodoService()
export default todoService