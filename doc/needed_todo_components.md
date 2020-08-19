
# Benötigte ToDo-Komponenten

Unsere Applikation soll in der linken Spalte die Lister aller erfassten ToDos zeigen. In der rechten Spalte ist der Bereich in welchem ein einzelnes ToDo bearbeitet oder erstellt werden kann.
Die TodoPage-Komponente haben wir schon. Wir brauchen also als erstnächstes die TodoContent-Komponente.

## TodoPage
Die TodoPage-Komponente enthält den TodoContent und gegebenenfalls weitere Element.

## TodoContent
Der TodoContent besteht aus einem MaterialUi-Grid mit zwei Spalten. Die linke Spalte enthält eine TodoList-Komponente, die rechte eine TodoViewKomponente.
Das Grid ist so konfiguriert dass die beiden Komponenten untereinander angezeigt werden falls der Bildschirm zu klein wird.

## TodoList
Die TodoList besteht aus einer [MaterialUi-List](https://material-ui.com/components/lists/#lists).

## TodoListItem
TodoListItem bestehen aus MaterialUi-ListItem.

## TodoView
Die TodoView werden wir später implementieren.

# Implementierung

## TodoPage
```javascript
const TodoPage: React.FC = () => {
    return (
        <TodoContent />
    )
}
```

## TodoContent
```javascript
const TodoContent: React.FC = () => {
    return (
        <Grid container direction='row' spacing={1}>
            <Grid item xs={12} sm={4}>
                    <TodoList />
            </Grid>
            <Grid item xs={12} sm={8}>
                    <TodoView />
            </Grid>
        </Grid>
    )
}
```

## TodoList
```javascript
const TodoList: React.FC = () => {
    return(
        <List>
           <TodoListItem />
           <TodoListItem />
           <TodoListItem />
        </List>
    )
}
```

## TodoListItem
```javascript
const TodoListItem: React.FC = () => {
    return(
        <ListItem>
            <h1>TodoListItem</h1>
        </ListItem>
    )
}
```

## TodoView
```javascript
const TodoView: React.FC = () => {
    return(
        <h1>TodoView</h1>
    )
}
```
