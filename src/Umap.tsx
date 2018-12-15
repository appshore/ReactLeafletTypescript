import React from 'react'
import { Map, MapControl, TileLayer, ZoomControl } from 'react-leaflet'

// Add leaflet to get types
import L from 'leaflet'
// and leaflet url to imgs
L.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'

// Material UI
import { createStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

import Markers from './Markers'

const styles = (theme: Theme) =>
  createStyles({
    map: {
      backgroundColor: theme.palette.text.secondary
    },
    form: {
      top: 100,
      left: 100
    }
  })

interface intMarker {
  id: string
  name: string
  position: L.LatLngExpression
  image: string
}

interface UmapProps {
  classes: {
    map: string
    form: string
  }
  center: L.LatLngExpression
  maxBounds: L.LatLngBounds
  zoom: number
  markers?: intMarker[]
}

interface UmapState {
  mapHeight: number
  mapWidth: number
  bounds?: L.LatLngBounds
  zoom?: number
  markers?: intMarker[]
}

class Umap extends React.Component<UmapProps, UmapState> {
  constructor(props: UmapProps) {
    super(props)
    this.state = {
      mapHeight: window.innerHeight,
      mapWidth: window.innerWidth,
      zoom: props.zoom,
      markers: props.markers || []
    }
    this.resizeMap = this.resizeMap.bind(this)
  }

  private mapRef = React.createRef<Map>()

  resizeMap() {
    if (!this.mapRef.current) {
      return
    }
    this.setState({
      mapHeight: window.innerHeight,
      mapWidth: window.innerWidth,
      bounds: this.props.maxBounds,
      zoom: this.mapRef.current.leafletElement.getBoundsZoom(
        this.props.maxBounds
      )
    })
  }

  componentDidMount() {
    // set the map
    this.resizeMap()
    // add the lister on resize
    window.addEventListener('resize', this.resizeMap)
  }

  componentWillUnmount() {
    // remove the listener
    window.removeEventListener('resize', this.resizeMap)
  }

  static getDerivedStateFromProps(nextProps: UmapProps, prevState: UmapState) {
    if (prevState.markers !== nextProps.markers) {
      return {
        markers: nextProps.markers
      }
    }
    return null
  }

  render() {
    return (
      <Map
        className={this.props.classes.map}
        style={{ height: this.state.mapHeight, width: this.state.mapWidth }}
        center={this.props.center}
        zoom={this.state.zoom}
        bounds={this.state.bounds}
        maxBounds={this.props.maxBounds}
        maxBoundsViscosity={1}
        ref={this.mapRef}
        zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="topright" />
        <Markers markers={this.state.markers} />
      </Map>
    )
  }
}

export default withStyles(styles)(Umap)
