import Todo from '../model/todo'

interface TodoService {
    deleteToDo(todo: Todo): Promise<void>
    updateToDo(todo: Todo): Promise<Todo>
}

export default TodoService
