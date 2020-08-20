import React from 'react'
import { 
    ListItem, 
    ListItemIcon, 
    Checkbox, 
    ListItemText, 
    ListItemSecondaryAction,
    IconButton,
 } from '@material-ui/core'
 import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


import Todo from '../../model/todo'

interface TodoListItemProps {
    todo: Todo;
}

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

export default TodoListItem