import React from 'react'

import NewTodo from './NewTodo'
import EditTodo from './EditTodo'

import { Grid } from '@mui/material'

import { useStoreState } from "../../store/StoreModel";


const TodoView: React.FC = () => {
    const selectedTodo = useStoreState(state => state.todoModel.selectedTodo)

    return(
        <Grid container direction='column' spacing={1} >
            { selectedTodo === null
                ? <Grid item><NewTodo /></Grid>
                : <Grid item><EditTodo /></Grid>
            }
        </Grid>
    )
}

export default TodoView