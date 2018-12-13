import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'

import { createStyles } from '@material-ui/core/styles'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

L.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'

const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    mapcontainer: {
      height: '700px',
      // padding: spacing.unit * 2,
      // textAlign: 'center',
      backgroundColor: palette.text.secondary
    }
  })


class Umap extends React.Component<UmapProps, UmapState> {
  constructor(props: UmapProps){
    super(props)
    this.state = {
      latlng: this.props.latlng,
      zoom: this.props.zoom
    }
  }

  handleClick = (evt: L.LeafletMouseEvent) => {
    this.setState({
      latlng: evt.latlng
    })
    console.log('Umap/handleClick', evt)
  }

  render() {
    return (
      <div id="umap" className={this.props.classes.mapcontainer}>
        <Map
          center={this.state.latlng}
          zoom={this.state.zoom}
          onclick={this.handleClick}
          ref="umap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* <Marker position={this.state.latlng}>
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker> */}
        </Map>
      </div>
    )
  }
}

export default withStyles(styles)(Umap)
