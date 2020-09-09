import React from 'react'
import { 
    ListItem, 
    ListItemIcon, 
    Checkbox, 
    ListItemSecondaryAction,
    IconButton,
    Typography,
 } from '@material-ui/core'
 import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Todo from '../../model/todo'
import { useStoreState, useStoreActions } from "../../store/StoreModel";

interface TodoListItemProps {
    todo: Todo;
}

const TodoListItem: React.FC<TodoListItemProps> = ({todo}) => {
    const deleteTodo = useStoreActions(actions => actions.todoModel.delete)
    const toggleCompleted = useStoreActions(actions => actions.todoModel.toggleCompleted)

    const selectedTodo = useStoreState(state => state.todoModel.selectedTodo)
    const setSelectedTodo = useStoreActions(actions => actions.todoModel.setSelectedTodo)
    return(
      <ListItem
        selected={selectedTodo ? (todo.id === selectedTodo.id) : false}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            color='primary'
            checked={todo.completed}
            onClick={() => { toggleCompleted(todo) }}
          />
        </ListItemIcon>
        <Typography
          noWrap
          onClick={() => { setSelectedTodo(todo) }}
        >
          {todo.title}
        </Typography>
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