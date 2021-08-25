# Daten initialisieren mit Hilfe des TodoService
Vor wir Daten von einem Server laden können müssen wir unser TodoModel um die Fähigkeit erweitern, seine Daten zu initialisieren.

Wir brauchen also einen neuen Thunk, initData und eine passende Action für die Iplementierung.

## TodoModel
Bringen Sie das ```TodoModel``` auf den neuesten Stand.

/src/model/todo_model.tsx
```typescript
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
```

Damit wir initData implementieren können, müssen wir die Funktionalität ```getDodoList``` im Service erstellen. Wenn wir gerade dabei sind, lassen Sie uns auch die Fähigkeit ```addTodo``` einfügen.

## TodoService
Bringen Sie den ```TodoService``` auf den neuesten Stand.

/src/service/TodoService
```typescript
interface TodoService {
    getTodoList(): Promise<Todo[]>

    addTodo(todo: Todo): Promise<Todo>
    deleteTodo(todo: Todo): Promise<void>
    updateTodo(todo: Todo): Promise<Todo>
}
```

## React Hook für die Dateninitialisierung
Als nächstes brauchen wir eine Funktion welche ```initData``` einmal aufruft. Es ist eine React-Hook funktion und ihr Name muss mit 'use' beginnen.

React-Hook Funktionen laufen jedesmal wenn eine Komponente neu erstellt (neu gezeichnet) wird. 

/src/model/todo_data_init_hook.tsx
```typescript
import { useEffect } from 'react'
import { useStoreActions } from '../store/StoreModel';

/**
 * Call this funtion in application component.
 * 
 * Afterwards the todo data is initialized.
 */
const useTodoInitDataHook = () => {
    const initData = useStoreActions(actions => actions.todoModel.initData)
    useEffect(
        () => {
            initData()
            console.log('initTodoModelHook() called')
            // eslint-disable-next-line
        }, []  // Only run the effect once
    )
}

export { useTodoInitDataHook }
```

Wir benutzen sie in der TodoApp folgendermassen:

/src/TodoApp.tsx
```typescript
import { useTodoInitDataHook } from './model/todo_data_int_hook'
...

const TodoApp: React.FC = () => {
  useTodoInitDataHook()
  ...
  return (
    <AppLayout 
      header = {<TodoHeader />}
      body = {body}
    />
    );
}

```

## Implemetierung TodoModel

src/model/todo_model.tsx

```typescript
const todoModel: TodoModel = {
    todos: [],

    // Thunks
    initData: thunk(async (actions) => {
        await todoService.getTodoList().then(
            (todoList: Todo[]) => {
                 actions._initData(todoList)
            }
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
```

## Implementierung FakeTodoService
```FakeTodoService``` ist neu als Klasse implementiert. Sie enthält ihre Daten in ```_todo``` welche in ```getTodoList()``` initialisiert wird.

Alle Funktionen ausser der ```addTodo(...)``` Funktion geben ihre Argumente zeitverzögert, aber unverändert zurück.

/src/service/fakeTodoService.tsx
```typescript
import TodoService from './TodoService'
import Todo from '../model/todo'
import todos from '../repository/simple_todo_repository'

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
        todo.id = shortid.shortid.generate()
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
```

| Previous | Home | Next  |
| -------- |:----:| -----:|
| <- [Datenanbindung an ein Backend](./stateManagement_with_server.md) | [Inhaltsübersicht](./setup_project.md) | [Erstellen eines ToDos-Formulars](./todo_form.md) ->