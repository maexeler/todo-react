# TodoView
Unsere TodoView soll je ein Formular für das Erstellen und das Ändern eines ToDos anzeigen.  
Sie können (sollten) sie gelegentlich mit MaterialUI noch etwas schöner gestallten.

```typescript
import NewTodo from './NewTodo'
import EditTodo from './EditTodo'

const TodoView: React.FC = () => {

    return(<>
        <NewTodo />
        <EditTodo />
    </>)
}
```

# NewTodo
Die NewTodo-Komponente erstellt ein neues Todo und gibt es an die TodoForm weiter.  
Die submitFunction muss später angepasst werden und die entsprechende Funktionalität aus dem TodoModel aufrufen.

Auch hier gilt:  
Sie können (sollten) sie gelegentlich mit MaterialUI noch etwas schöner gestallten.

```typescript
import  TodoForm from './TodoForm'
import { TodoImpl } from '../../model/todo'

interface NewTodoProps {}

const NewTodo: React.FC<NewTodoProps> = (props) => {
    return (<>
        <Typography variant='h3'>Create a ToDo</Typography>
        <TodoForm
            todo={new TodoImpl('')}
            submitText='Create a new ToDo'
            submitFunction={(todo)=>{
                console.log('new todo: ', todo)}
            }
            resetFormAfterSubmit={true}
        />
    </>)
}
```

# EditTodo
Die EditTodo-Komponente muss sich irgendwie das aktuelle Todo besorgen. (Wir machen uns hier eines) und gibt es an die TodoForm weiter.  
Auch hier muss die submitFunction muss später angepasst werden und die entsprechende Funktionalität aus dem TodoModel aufrufen.

```typescript
import TodoForm from './TodoForm'
import { TodoImpl } from '../../model/todo'

interface EditTodoProps {}

const EditTodo: React.FC<EditTodoProps> = (props) => {
    // TODO: Get the actual todo and show it
    var existingTodo = new TodoImpl('I\'m an existing todo')
    existingTodo.id = 42

    return (<>
        <Typography variant='h3'>Edit a ToDo</Typography>
        <TodoForm
            todo={existingTodo}
            submitText='Edit ToDo'
            submitFunction={(todo)=>{console.log('edited todo: ', todo)}}
            resetFormAfterSubmit={false}
        />
    </>)
}
```
