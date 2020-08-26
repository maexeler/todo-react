import TodoService from './TodoService'
import Todo from '../model/todo'

const todoService: TodoService = {
    deleteToDo(todo: Todo): Promise<void> {
        console.log('todo: delete todo from fake data')
        return new Promise( (resolve, reject) => {
            setTimeout(() => resolve(), 100)
            }
        )
    },

    updateToDo(todo: Todo): Promise<Todo> {
        console.log('todo: update todo in fake data')
        return new Promise( (resolve, reject) => {
            setTimeout(() => resolve(todo), 100)
            }
        )
    }
}

export default todoService