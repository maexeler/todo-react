# Anpassen der MaterialUi-Styles

Die verschiedenen graphischen Aspekte einer Material-UI Applikation können angepasst werden. Die aktuelle Implementierung benutzt noch [Material-UI V3](https://v3.material-ui.com/customization/themes/), sie sollten sich aber besser an der [aktuellen Version von Material-Ui](
https://material-ui.com/customization/theming/) orientieren.  

## Vorgehen
Lassen sie uns etwas einfaches machen. Wir erstellen zwei Themen für das Farbschema. Ein Benutzerdefiniertes welches die Farben Orange und Gelb verwendet, sowie eines für den "dark mode".
Später werden wir dan eines dieser Themen installieren.

### Farbschemas
Wir exportieren das default Thema als ```theme```, unser Farbschema als ```customTheme``` und das "dark-Schema" als ```darkTheme```.

.src/theme/materialui_themes.tsx
```typescript
import { createMuiTheme } from '@material-ui/core/styles'
import { yellow, orange} from '@material-ui/core/colors'

export const theme = createMuiTheme()

export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: orange[500],
    },
  },
})

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})
```

### Ein Schema global installieren
Die Installation des Farbschemas ist einfach. Wie immer wickeln wir unsere Applikation einfach in einen passenden Provider und das Problem ist gelöst. 

Öffnen Sie [index.tsx](../src/index.tsx) und passen Sie den Code folgendermassen an:

```typescript
...
import {ThemeProvider} from '@material-ui/core'
import {theme, customTheme, darkTheme} from './theme/materialui_themes'

ReactDOM.render(
  <ThemeProvider theme={customTheme} > /* use one of the above themes here */
    <StoreProvider store={store}>
      <React.StrictMode>
        <Router>
          <TodoApp />
        </Router>
      </React.StrictMode>
    </StoreProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
```


| Previous | Home | Next  |
| -------- |:----:| -----:|
| <- [Datenanbindung an ein REST-Backend](./rest_todo_service.md) | [Inhaltsübersicht](./setup_project.md) |  ->