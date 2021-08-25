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