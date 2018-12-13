import React from 'react'

// Material-Ui components
import {
  MuiThemeProvider,
  createMuiTheme,
  createStyles
} from '@material-ui/core/styles'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// custom components
import Umap from './Umap'

// set a theme for the UI
const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  typography: {
    useNextVariants: true
  }
})

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })

// Main class
class App extends React.Component<WithStyles<typeof styles>, AppState> {
  state = {
    latlng: {
      lat: 51.505,
      lng: -0.09
    },
    zoom: 13
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Typography variant="h4" gutterBottom>
          U map with Material-UI and Leaflet
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Technical test
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <Umap latlng={this.state.latlng} zoom={this.state.zoom}/>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
