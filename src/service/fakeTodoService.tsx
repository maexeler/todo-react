import TodoService from './TodoService'
import Todo from '../model/todo'
import todos from '../data/todo_data'

// npm install shortid
const shortid = require('shortid');

class FakeTodoService implements TodoService {

    _todos: Todo[]

    constructor() {
        this._todos = [];
    }
    
    async getTodoList(): Promise<Todo[]> {
        this._todos = todos
        return new Promise( (resolve, reject) => {
            setTimeout(() => resolve(this._todos), 1000)
        })
    }

    async addTodo(todo: Todo): Promise<Todo> {
        // Add a unique id
        todo.id = shortid()
        return new Promise( (resolve, reject) => {
            setTimeout(() => resolve(todo), 100)
        })
    }

    async deleteTodo(todo: Todo): Promise<void> {
        return new Promise( (resolve, reject) => {
            setTimeout(() => resolve(), 100)
        })
    }

    async updateTodo(todo: Todo): Promise<Todo> {
        return new Promise( (resolve, reject) => {
            setTimeout(() => resolve(todo), 100)
        })
    }
}

const todoService = new FakeTodoService()
export default todoService