import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

import { createStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

L.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'

const styles = (theme: Theme) =>
  createStyles({
    markerImage: {
      width: 200
    }
  })

interface intMarker {
  id: string
  name: string
  position: L.LatLngExpression
  image: string
}

interface MarkersProps {
  classes: {
    markerImage: string
  }
  markers?: intMarker[]
}

interface MarkersState {
  markers?: intMarker[]
}

class Markers extends React.Component<MarkersProps, MarkersState> {
  constructor(props: MarkersProps) {
    super(props)
    this.state = {
      markers: props.markers
    }
  }

  static getDerivedStateFromProps(
    nextProps: MarkersProps,
    prevState: MarkersState
  ) {
    if (prevState.markers !== nextProps.markers) {
      return {
        markers: nextProps.markers
      }
    }
    return null
  }

  render() {
    return (
      this.state.markers &&
      this.state.markers.map((m: intMarker, idx: number) => (
        <Marker position={m.position} key={idx}>
          <Popup>
            <h4>{m.name}</h4>
            <img src={m.image} className={this.props.classes.markerImage} />
          </Popup>
        </Marker>
      ))
    )
  }
}

export default withStyles(styles)(Markers)
