import Todo from '../model/todo'

interface TodoService {
    getTodoList(): Promise<Todo[]>

    addTodo(todo: Todo): Promise<Todo>
    deleteTodo(todo: Todo): Promise<void>
    updateTodo(todo: Todo): Promise<Todo>
}

export default TodoService
