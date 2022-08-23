import React from 'react'
import { 
    ListItem, 
    ListItemIcon, 
    IconButton,
    Typography,
 } from '@material-ui/core'
 import AddIcon from '@material-ui/icons/Add';

import Todo from '../../model/todo'
import { useStoreActions } from "../../store/StoreModel";

interface TodoListItemProps {
    todo: Todo;
}

const TodoListItemNew: React.FC = () => {
    const resetSelectedTodo = useStoreActions(actions => actions.todoModel.resetSelectedTodo)
    return(
      <ListItem>
        <ListItemIcon>
        <IconButton
            edge='start'
            color='primary'
            onClick={() => { resetSelectedTodo() }}
          >
            <AddIcon />
          </IconButton>
        </ListItemIcon>
        <Typography noWrap >
          Add a new ToDo
        </Typography>
    </ListItem>
  )
}

export default TodoListItemNew