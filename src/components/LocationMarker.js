import React, {useState} from 'react'
import {useMapEvents, Marker, Popup} from 'react-leaflet';
function LocationMarker() {
    const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 5)
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Covid-19 in your Area</Popup>
    </Marker>
  )
}

export default LocationMarker
