import React from 'react'
import { Paper, Typography} from '@mui/material'

import { useStoreState } from '../../store/StoreModel'

interface TodoStatusProps {}

const TodoStatus: React.FC<TodoStatusProps> = (props) => {
    const pendingTodos = useStoreState(state => state.todoModel.pendingTodos)
    const job = (pendingTodos === 1) ? 'duty' : 'duties'
    const info = (pendingTodos === 0) ? 'Nothing to do' : `${pendingTodos}  more ${job} to do`
    return (
        <Paper >
                <Typography
                    variant='h4'
                    align='center'
                >
                    {info}
                </Typography>
        </Paper>
    )
}

export default TodoStatus