import axios from 'axios'

import TodoService from './TodoService'
import Todo from '../model/todo'

// Let's create an axios instance
// for the accssses to jsonplaceholder
const http = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
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

class FakeTodoService implements TodoService {
    
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

const todoService = new FakeTodoService()
export default todoService