# SPA mit Anbindung an einen Server

Wie wir schon gesehen haben, wird eine Reactapplikation wird mit Vorteil folgendermassen aufgebaut:
![image info](./picts/react-schema.png)

Bislang haben wir den State auschliesslich im store, genauer im Store-Model (in unserem Fall im TodoModel) verwaltet. Was wir als nächstes brauchen ist ein Service welcher die benötigte Funktionalität anbietet und uns mit der Aussenwelt verbindet.

Der Zugriff auf die Serverdaten ist asynchron. Wir setzen eine Abfrage ab und kriegen ein Verprechen dass wir gelegentlich eine Antwort erhalten werden. Wenn die Antwort irgendwann eintrifft, können wir die Daten in unserem Store-Model updaten.

## Serveranbindung mit easy-peasy

Bisher haben wir im Store-Model Actions verwendet. Actions verändern den Zustand der Daten und lösen damit automatisch das Neuzeichnen der abhängigen React-Komponenten aus. Actions sind synchron und eignen sich desshalb nicht für die Serveranbindung.

Was wir brauchen sind Thunks. Thunks sind asynchon. Sie initziieren eine Abfrage an den Server und rufen nach Erhalt der Antwort die passende Action auf.

### State of the Art
Unser TodoModel sieht momentan folgendermassen aus:

```javascript
export interface TodoModel {
    todos: Todo[]

    // Actions
    delete: Action<TodoModel, Todo>
    toggleCompleted: Action<TodoModel, Todo>
}
```

Wir machen die vorhandenen Actions private und definieren die passenden Thunks:
```javascript
export interface TodoModel {
    todos: Todo[]

    // Thunks
    delete:          Thunk<TodoModel, Todo>
    toggleCompleted: Thunk<TodoModel, Todo>

    // Actions
    _delete:  Action<TodoModel, Todo>
    _replace: Action<TodoModel, Todo>
}
```
Anschliessend passen wir die Implementierung von TodoModel an:
```typescript
const todoModel: TodoModel = {
    todos: todos,

    // Thunks
    delete: thunk(async (actions, todo: Todo) => {
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
```
Was uns jetzt noch fehlt ist eindeutig ein TodoService.

## TodoService
Als Erstes erstellen wir ein service package und darin die Datei [TodoService.tsx](../src/service/TodoService.tsx)

Wie immer erst die Idee:
```typescript
import Todo from '../model/todo'

interface TodoService {
    deleteToDo(todo: Todo): Promise<void>
    updateToDo(todo: Todo): Promise<Todo>
}

export default TodoService
```

Dann die Implementierung welch nichts anderes macht als die Ausführung etwas zu verzögern.

/src/service/fakeTodoService.tsx
```typescript
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
```

| Previous | Home | Next  |
| -------- |:----:| -----:|
| <- [State Management in React](./stateManagement_overview.md) | [Inhaltsübersicht](./setup_project.md) | [Daten initialisieren mit Hilfe des TodoService](./init_data_with_service.md) ->