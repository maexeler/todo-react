// import { createMuiTheme } from '@material-ui/core/styles'
// import { yellow, orange} from '@material-ui/core/colors'

import { createTheme } from "@mui/material/styles"
import { yellow, orange} from "@mui/material/colors"

export const theme = createTheme()

export const themeCustom = createTheme({
  palette: {
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: orange[500],
    },
  },
})

export const themeDark = createTheme({
  palette: {
    mode: 'dark',
  },
})