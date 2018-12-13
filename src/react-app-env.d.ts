/// <reference types="react-scripts" />

interface AppState {
  latlng: L.LatLngExpression
}

interface UmapProps {
  classes: WithStyles
  latlng: L.LatLngExpression
  zoom: number
}

interface UmapState {
  latlng: L.LatLngExpression
  zoom: number
}