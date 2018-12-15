import React from 'react'
import ReactDOM from 'react-dom'
import L from 'leaflet'

import Umap from './Umap'
import dataMarkers from './data.json'

interface intMarker {
  id: string
  name: string
  position: L.LatLngExpression
  image: string
}

it('renders without crashing', () => {
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
  const div = document.createElement('div')
  ReactDOM.render(
    <Umap
      center={L.latLng(52, -4.9)}
      zoom={12}
      maxBounds={L.latLngBounds(L.latLng(58.5, -10.5), L.latLng(50, 2.7))}
      markers={markers}
    />,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
