import React from 'react'
import L from 'leaflet'

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

// custom components
import Uform from './Uform'
import Umap from './Umap'

import dataMarkers from './data.json'

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

const styles = (theme: Theme) =>
  createStyles({
    form: {
      position: 'absolute',
      top: 75,
      left: 75,
      zIndex: 1000
    }
  })

interface intMarker {
  id: string
  name: string
  position: L.LatLngExpression
  image: string
}

interface AppState {
  markers?: intMarker[]
}

class App extends React.Component<WithStyles<typeof styles>, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      markers: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  fetchDataMarkers(income: number, savings: number) {
    let markers: intMarker[] = []
    dataMarkers.results.forEach(m => {
      markers.push({
        id: m.id,
        name: m.name,
        position: { lat: m.latitude, lng: m.longitude },
        image: `https://picsum.photos/200/150?image=${Math.round(
          Math.random() * 100
        )}` //m.image
      })
    })
    this.setState({
      markers
    })
  }

  handleSubmit(income: number, savings: number) {
    // retrieve markers from external source
    this.fetchDataMarkers(income, savings)
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Umap
          center={L.latLng(52, -4.9)}
          zoom={12}
          maxBounds={L.latLngBounds(L.latLng(58.5, -10.5), L.latLng(50, 2.7))}
          markers={this.state.markers}
        />
        <div className={this.props.classes.form}>
          <Uform handleSubmit={this.handleSubmit} minIncome={20000} minSavings={10000}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
