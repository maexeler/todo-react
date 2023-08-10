import { AppBar, Toolbar, Typography, Button } from '@mui/material'

import {useNavigate} from 'react-router-dom'

const TodoHeader: React.FC = () => {
  const navigate = useNavigate(); // React hook, must be called here

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component='div' sx={{flexGrow: 1}}>
          ToDo Application
                </Typography>
        <Button color="inherit" onClick={() => { navigate('/todo') }}>ToDo</Button>
        <Button color="inherit" onClick={() => { navigate('/about') }}>About</Button>
      </Toolbar>
    </AppBar>
  )
}

export default TodoHeader