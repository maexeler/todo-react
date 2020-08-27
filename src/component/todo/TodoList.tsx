import React from 'react'
import { List } from '@material-ui/core'

import TodoListItem from './TodoListItem'
import { useStoreState } from "../../store/StoreModel";

const TodoList: React.FC = () => {
    const todoList = useStoreState(state => state.todoModel.todos)
    return(
        <List>
            {todoList.map((todo) => 
                { return <TodoListItem key={todo.id} todo={todo}/> }
            )}
        </List>
    )
}

export default TodoList