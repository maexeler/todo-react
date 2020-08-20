# TodoListe mit aus einer Liste von Todos füllen

Damit wir unsere TodoList mit ToDos füllen können, brauchen wir Daten.

Lassen Sie uns erst festlegen wie ein Todo aussieht, dann implementieren wir eine Klasse um Todos herzustellen.

## Die Idee Todo
Die Idee was ein Todo ist formulieren wir als ```interface```.

Ein Todo besteht aus einer ID, einem Titel und einem Feld welches weiss, ob ein Todo bereits erledigt ist.

scr/model/todo.tsx
```javascript
export type UniqueKey = string | number | undefined

export default interface Todo {
    id: UniqueKey,
    tittle: string,
    completed: boolean
}
```

Wie sie sehen, habe ich einen Type für die ID definiert. Ein UniqueKey kann die drei Typen string, number oder null als Wert haben.

## Die Implementierung von Todo

scr/model/todo.tsx
```javascript
export class TodoImpl implements Todo {
    id: UniqueKey;
    tittle: string;
    completed: boolean

    constructor(tittle: string) {
        this.id = null;
        this.tittle = tittle
        this.completed = false
    }
}
```
## Daten
Für den Moment erstellen wir uns eine einfache Liste von Todo-Objekten. Da wir diese Todos momentan nur anzeigen wollen, ist das ausreichend.

Später werden wir die Daten in einem lokalen- oder in einem Remote-Repository abspeichern. Die Idee Repository meint ein Datastore mit CRUD-Funktionalität.

src/repository/simple_todo_repository.tsx
```javascript
import ITodo from '../model/todo'

const todoList: ITodo[] = [
    {
        "id": 4,
        "tittle": "Do this",
        "completed": false
    },
    {
        "id": 3,
        "tittle": "Do that",
        "completed": true
    },
    {
        "id": 2,
        "tittle": "Do it again Sam",
        "completed": false
    },
    {
        "id": 1,
        "tittle": "This is very detailed ToDo that says we should do it again and again and again",
        "completed": true
    },
    {
        "tittle": "This is not a love song",
        "completed": true,
        "id": 5
    }
]

export default todoList
```

## Verwenden der Daten in den Komponenten TodoList und TodoListItem

Als Erstes müssen wir TodoListItem so ändern, dass wir ein Todo als Parameter übergeben können. ```props``` enthält das übergebene Todo. Für den Moment geben wir einfach den Titel aus.

src/component/todo/TodoListItem.tsx
```javascript
import Todo from '../../model/todo'

interface TodoListItemProps {
    todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = (props) => {
    return(
        <ListItem>{props.todo.tittle}</ListItem>
    )
}
```

Als Nächstes müssen wir uns in der TodoList-Komponente die Daten besorgen und für jedes vorhandene Todo ein TodoListItem erzeugen.

src/component/todo/TodoList.tsx
```javascript
import TodoListItem from './TodoListItem'
import todoList from '../../repository/simple_todo_repository'

const TodoList: React.FC = () => {
    return(
        <List>
            {todoList.map((todo) => 
                {return <TodoListItem todo={todo}/>}
            )}
        </List>
    )
}
```

## Please make it beautyfull stupid
Oh ja, klar doch. Wir benutzen MaterialUi um das Ding anständig darzustellen.

Jedes TodoListItem soll Links eine Checkbox haben für Erledigt oder nicht,
Mittig soll die Aufgabe erscheinen und Rechts wollen wir einen Button um das Todo zu löschen.

Wir suchen wieder nach einem passenden Beispiel in MaterialUI [List Controls Checkbox](https://material-ui.com/components/lists/#lists) scheint OK zum Starten. Wir klauen uns aber nur den GUI-Teil.

src/component/todo/TodoListItem.tsx
```javascript
...
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const TodoListItem: React.FC<TodoListItemProps> = (props) => {
    return(
        <ListItem key={props.todo.id}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={props.todo.completed}
                onClick={() => {/* should toggle completed */}}
              />
            </ListItemIcon>
            <ListItemText primary={props.todo.tittle} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete todo"
                onClick={() => {/* should delete todo */}}
              >
                <DeleteForeverIcon />
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
```

Passende Icons finden Sie in [material-icons](https://material-ui.com/components/material-icons/).

Beachten Sie, dass Sie ggf. material-ui/icons nachinstallieren müssen.
```
npm install @material-ui/icons
```