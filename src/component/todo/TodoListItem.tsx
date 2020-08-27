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
import { useStoreActions } from "../../store/StoreModel";

interface TodoListItemProps {
    todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({todo}) => {
    const deleteTodo = useStoreActions(actions => actions.todoModel.delete)
    const toggleCompleted = useStoreActions(actions => actions.todoModel.toggleCompleted)
    return(
        <ListItem >
            <ListItemIcon>
              <Checkbox
                edge="start"
                color='primary'
                checked={todo.completed}
                onClick={() => { toggleCompleted(todo) }}
              />
            </ListItemIcon>
            <ListItemText primary={todo.title} />
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                color='secondary'
                onClick={() => { deleteTodo(todo) }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default TodoListItem