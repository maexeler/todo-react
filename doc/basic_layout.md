# Grundlegender Aufbau der ToDo Applikation
Wir benötigen einen Toolkit für die GUI-Komponenten (Button, Menu, List etc.) die wir verwenden wollen. Selbstverständlich könnten wir diese selber in React programmieren. Aber wesshalb sollten wir?

Wir werden die Komponenten aus [Material UI](https://material-ui.com/) verwenden. Diese folgen den [Material Guidelines](https://material.io/design/guidelines-overview) von Google. Sie sind deshalb bestens geeignet zur Verwendung im Browser und auf Handys.

## Installation von Material UI

Öffnen sie ein Terminalfenster in Visual Studio Code und geben Sie folgenden Befehl ein:

```
npm install @material-ui/core
npm install @mui/material @emotion/react @emotion/styled
```
Anschliessend ergänzen Sie die Datei [index.html](../public/index.html) mit der Zeile

```
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

Wir werden später [Materiel-Icons](https://material-ui.com/components/icons/) verwenden. Installieren Sie diese ebenfalls.
```
npm install @material-ui/icons
```

## Grundlayout der Applikation

### Header
* Wir wollen einen Header an der oberen Seite der Applikation welcher die gesammte Breite umfasst. Er soll den Titel und die Navigation der Applikation enthalten.

### Body
* Der Body enthält die eigentliche Applikation. Abhängig von der Auflösung des Gerätes soll Links und Rechts vom Body Weissraum angezeigt werden.

### AppLayout
Diese beiden Komponenten werden von der [AppLayout](../src/components/application/AppLayout.tsx)-Komponente angezeigt. Sie ist nicht Applikationsspezifisch. Ihr werden bei der Erstelleng der Header und der Body mitgegeben.

AppLayout besteht aus einer einspaltigen Tabelle mit zwei Zeilen. In der ersten Zeile wird der Header angezeigt, die zweite Zeile besteht wiederum aus einer Tabelle.
Sie besteht aus drei Spalten für den Weissraum links, den Body und den Weissraum rechts. Die Breite der einzelnen Spalten wird über sogenannte [Breakpoints](https://material-ui.com/customization/breakpoints/) definiert. Da eine Tabelle maximal 12 Spalten haben kann, muss die Summe aller Breakpoints jeweils für all Auflösungen 12 betragen.

## Code
### TodoApp
.src/TodoApp.tsx
```javascript
const TodoApp: React.FC = () => {
  return (
    <AppLayout 
      header = {<TodoHeader />}
      body = {<TodoPage />}
    />
    );
}
```
### AppLayout
.src/components/application/AppLayout.tsx
```javascript
import { Grid } from '@material-ui/core'

interface AppProps {
    header: ReactElement
    body: ReactElement;
}

const AppLayout: React.FC<AppProps> = (props) => {
    return (
        <Grid container direction='column'>
            <Grid item /* full width */ >
                {props.header}
            </Grid>
            <Grid item>
                <Grid container direction='row'>
                    <Grid item xs='auto' sm={1} lg={2} />
                    <Grid item xs={12} sm={10} lg={8}>
                        {props.body}
                    </Grid>
                    <Grid item xs='auto' sm={1} lg={2} />
                </Grid>
            </Grid>
        </Grid>
    )
}
```

### TodoHeader
.src/components/todo/TodoHeader.tsx
```javascript
const TodoHeader: React.FC = () => {
    return (
        <h1>ToDo Application</h1>
    )
}
```

### TodoPage
.src/components/todo/TodoPage.tsx
```javascript
const TodoPage: React.FC = () => {
    return (
        <h1>ToDoBody</h1>
    )
}
```

| Previous | Home | Next  |
| -------- |:----:| -----:|
| <- [Git](./git.md) | [Inhaltsübersicht](./setup_project.md) | [Navigation](./navigation.md) ->
