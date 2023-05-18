# Material UI
Die einfachste Art und Weise die MaterialUI-Library zu lernrn besteht darin, sich die [Beispiele](https://material-ui.com/getting-started/usage/) darin anzusehen, eine geignete Komponente auszuwählen, sich den Code zu kopieren und diesen anzupassen.

## Beispiel: TodoHeader
Lassen Sie uns das anhand der TodoHeader-Komponente durchspielen.

Öffnen Sie die Beschreibung für die [AppBar](https://material-ui.com/components/app-bar/). Bereits das erste Beispiel 'Simple App Bar' scheint passend. Der Button <> öffnet den dazu gehörigen Sourcecode.

Kopieren Sie ```const useStyles = ...``` und fügen Sie die ```<AppBar position="static"> ...</AppBar>``` Komponente an der passenden Stelle ein.
Vergessen Sie nicht, die nötigen Imports zu kopieren.

Die TodoHeader-Komponente sieht nun so aus:
```javascript
import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import {useNavigate} from 'react-router-dom'

const TodoHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AppBar position='static' >
            <Toolbar >
                <Typography variant='h6' component='div' sx={{flexGrow: 1}}> 
                    ToDo Application
                </Typography>
                <Button 
                    color='inherit'
                    onClick={()=>{navigate('/todo')}}
                >
                    Todo Page
                </Button>
                <Button 
                    color='inherit'
                    onClick={()=>{navigate('/about')}}
                >
                    About Page
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default TodoHeader```
Was bleibt, ist die Aufgabe bei einem Button-Click die passende Seite aufzurufen.

Eine kurze Suche im Netz ergiebt, dass die Bibliothek 'react-router-dom' die Funktion ```useHistory()``` besitzt, welche wir verwenden können um uns die Routerhistory zu besorgen und dorthin einen neuen Link zu pushen.

Bleibt noch die Frage, wie wir einen Button dazu bringen etwas zu tun wenn er geklickt wird.
&lt;Button>-Komponenten besitzten das Attribut onClick={}. Innerhalb der geschweiften Klammern muss eine Callback-Funkton angegeben werden, welche zum Zeitpunkt des Clicks ausgeführt wird.
In unserem Fall sieht sie so aus: ```() => { /*should do something*/ }```. In iherem Body können wir dann unseren Job erledigen.

Mit diesem Wissen ergänzen wir unseren Code der nun folgendermassen aussieht:
```javascript
import { useHistory } from 'react-router-dom';

const TodoHeader: React.FC = () => {
    const classes = useStyles();
    const history = useHistory(); // React hook, must be called here

    return (
        // Stolen from https://material-ui.com/components/app-bar/#app-bar
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    ToDo Application
                </Typography>
                <Button
                    color="inherit"
                    onClick={() => {history.push('/todo')
                >ToDo</Button>
                <Button
                    color="inherit"
                    onClick={() => {history.push('/about')
                >About</Button>
            </Toolbar>
        </AppBar>
    )
}
```

| Previous | Home | Next  |
| -------- |:----:| -----:|
| <- [Navigation](./navigation.md) | [Inhaltsübersicht](./setup_project.md) |  [Benötigte ToDo-Komponenten](./needed_todo_components.md) ->
