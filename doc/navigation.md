# Navigation

Unsere Single Page Application (SPA) soll drei Seiten besitzen. Die TodoPage zeigt unsere Applikation. Die AboutPage zeigt Informationen zu unserer Applikation an. Eine weitere Seite, PageNotFound soll angezeigt werden, falls eine ungültige URL eingegeben wird.

Unser Header soll es ermöglichen, die Todo- und die AboutPage direkt anzuspringen.

## Vorgehen
Als Erstes brauchen wir einen neuen Git-Branch, navigation. Erstellen Sie diesen mittels 'GitHub Desktop' und wechseln Sie zu diesem.

Erstellen Sie dann die folgenden Komponenten:

### AboutPage
.src/component/about/AboutPage.tsx
```javascript
const AboutPage: React.FC = () => {
    return (
        <h1>AboutPage</h1>
    )
}
```
Die AboutPage soll unter der URL [/about]() erreichbar sein.

### TodoPage
Die TodoPage existiert bereits.
Die TodoPage soll unter der URL [/todo]() erreichbar sein.

### PageNotFoundPage
./src/notfound/PageNotFoundPage.tsx
```javascript
const PageNotFoundPage: React.FC = () => {
    return (
        <h1>PageNotFoundPage</h1>
    )
}
```
Jede URL ausser [/todo]() und [/about]() sollen die PageNotFoundPage anzeigen.

## Navigation in React
Damit wir in React navigieren können, brauchen wir eine neue Bibliothek, react-router-dom. Installieren Sie diese.
```
npm install react-router-dom
```
Da wir Typescript benutzen müssen wir noch die passenden Typedefinitionen nachinstallieren.
```
npm install @types/react-router-dom
```

Um die Navigation zum laufen zu beringen, müssen wir drei Dinge tun:
1) Die Applikation in eine Routerkomponente verpacken
2) In der Applikation die anzuzeigende Komponente abhängig von der erhaltenen URL anzeigen
3) Die Headerkomponente mit passenden Links ausstatten

### Die Applikation in eine Routerkomponente verpacken
Öffnen Sie [index.tsx](../src/index.tsx) und passen Sie den Code folgendermassen an:
```javascript
import {BrowserRouter as Router} from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TodoApp />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
```

### Anzeige der Page abhängig von URL
In der Datei [TodoApp.tsx](../src/TodoApp.tsx) wird momentan im body fix die TodoPage-Komponente angezeigt.
Wir berechnen anhand der aktuellen URL die benötigte Komponente und benutzen dies als body.

Ändern Sie TodoApp folgendermassen:
```javascript
import React from 'react'
import AppLayout from './components/application/AppLayout'
import TodoHeader from './components/todo/TodoHeader'
import TodoPage from './components/todo/TodoPage'
import AboutPage from './components/about/AboutPage'
import PageNotFoundPage from './components/notfound/PageNotFoundPage'

import { useLocation } from 'react-router-dom'

const TodoApp: React.FC = () => {
  let body = <PageNotFoundPage />
  switch (useLocation().pathname) {
    case '/':      { body = <TodoPage />;  break }
    case '/todo':  { body = <TodoPage />;  break }
    case '/about': { body = <AboutPage />; break }
  }
  return (
    <AppLayout 
      header = {<TodoHeader />}
      body = {body}
    />
    );
}

export default TodoApp
```
Sie können ihren Code bereits ausprobieren indem sie die passende URL im Browser eingeben.

### Anpassen der Header-Komponente
Wir ergänzen die [TodoHeader-Komponente](../src/components/todo/TodoHeader.tsx) um eine Liste von Links. Das sieht nicht schön aus, erfüllt aber den Zweck.

```javascript
const TodoHeader: React.FC = () => {
    return (
        <div>
            <h1>ToDo Application</h1>
            <ul>
                <li><a href='/todo'>TodoPage</a></li>
                <li><a href='/about'>AboutPage</a></li>
            </ul>
        </div>
    )
}
```

## Git Branch mergen
Wir haben die Navigation erfolgreich implementiert und wollen nun unseren Navigation branch mit dem Master vereinigen.
* Gehen sie zu Github Desktop und wählen sie den master branch aus. 
* Wählen sie Branch->Merge into current branch..., selektieren sie 'navigation' und klicken sie 'Create merge commit'

Erstellen sie einen neuen branch oder arbeiten sie auf dem master weiter.  
Beachten sie, dass sie den gewünschten branch in Visual ggf. auswählen müssen.


| Previous | Home | Next  |
| -------- |:----:| -----:|
| <- [Erstellen des Grundlayouts](./basic_layout.md) | [Inhaltsübersicht](./setup_project.md) |  [ToDo GUI](./materialui_introduction.md) ->