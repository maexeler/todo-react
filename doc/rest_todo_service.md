# TodoService mit REST-Anbindung

## Einen Entwicklungsserver aufsetzen
für das weitere Vorgehen brauchen wir eine Backend (einen Server).

Lassen sie uns einen Entwicklungsserver einrichten, der au den gegebenen Daten automatisch ein REST-Interface erzeugt.

Installieren sie den [typicode server](https://github.com/typicode/json-server) mit:
```
npm install -g json-server
```
Anschliessend kreieren sie die Datei [db.json](../db.json) und füllen diese mit passenden Daten.

Dann starten sie den Server in einem neuen Terminal mit:
```
json-server --watch db.json --port 3003
```

## Den Rest-Service erstellen

Wir haben uns bereits eine Serviceimplementierung geschrieben, [FakeTodoService](../src/service/fakeTodoService.tsx), welche ein Backendzugriff simuliert.

Wir wollen nun eine Implementierung schreiben, welche über ein REST-Interface auf einen Server zugreift, die Daten dort abholt und dort ändert.

Dazu brauchen wir als Erstes eine Bibliothek für die REST-Abfrage via HTTP. Wir erden [Axios](https://github.com/axios/axios#features) verwenden.

Installieren Sie Axios:
```
npm install axios
```
Anschliessend schreiben wir eine neue Serverimplementierung für unseren [TodoService](../src/service/TodoService.tsx)

## Rest TodoService

Erstellen Sie die Datei [restTodoService.tsx](../src/service/restTodoService.tsx) im service-Ordner. Kopieren Sie sich den Inhalt aus [FakeTodoService](../src/service/fakeTodoService.tsx) und fügen diesen ein. Anschliessend müssen wir ihn anpassen.

### HTTP-Zugriff mit axios

Als erstes müssen wir uns ein http-Objekt erstellen. Dieses benötigt eine Basis-URL.Weiter wollen wir die Daten in JSON-Format austauschen.

```typescript
import axios from 'axios'
...
const baseURL: string = 'http://localhost:3003'

// Create an axios instance for the accssses to the server
const http = axios.create({
    baseURL: baseURL,
    timeout: 2000,
    headers: {'Content-Type': 'application/json'},
})
```

http hat die Funktionen get, post, put und delete.
Ausser delete geben alle einen Wert zurück, einen sogenannten Promise.

Ein Promise ist ein Versprechen die Funktion auszuführen und sich nach der Erledigung des Jobs zu melden. Die Ausführung kann erfolgreich, oder fehlerhaft sein. Im Erfolgsfall kriegen wir eine Antwort (response) zurück.

Wir sind aber nur an den Daten der Antwort interessiert. Folgerichtig müssen wir die Daten aus der Antwort extrahieren. Da unser TodService seinerseits wider ein Promise zurückliefern muss, müssen wir die Daten bzw, der erhalten Fehler in einen neuen Promise einpacken und diesen zurückgeben.

Das wir diesen Code nicht in jedem Aufruf neu schreiben wollen, erfinden wir uns eine Hilsfunktion:

```typescript
async function callForData<R>(httpFun: any, uri: string, params?: any): Promise<R> {
    return new Promise<R>((resolve, reject) => {
        httpFun(uri, params)
            .then((response: any) => { resolve(response.data) })
            .catch((error: any) => { reject(error) })
    })
}
```
### Implementierung des TodoServices

Mit dieser Vorbereitung wird die Implementierung des Services simple:

```typescript
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
```

Beachten Sie, dass Sie die Art und den Aufbau der Sub-URLs in der API-Beschreibung des [Typicode-Servers](https://jsonplaceholder.typicode.com) nachschlagen müssen.

## Aktueller TodoService festlegen

Welcher der beiden TodoService-Implementierungen aktiv ist, bestimmen Sie indem Sie den Import in [todo_model.tsx](../src/model/todo_model.tsx) anpassen.

```typescript
// import todoService from'../service/fakeTodoService'
import todoService from'../service/restTodoService'
```

| Previous | Home | Next  |
| -------- |:----:| -----:|
| <- [Datenanbindung der TodoView](./todo_form_with_data.md) | [Inhaltsübersicht](./setup_project.md) | [Material Ui anpassen](./fun_with_materialui.md) ->