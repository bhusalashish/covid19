// import React from 'react'
import {useMapEvents} from 'react-leaflet';

function MapCountryChange({location, zoom}) {
    const map = useMapEvents({

    })
    map.flyTo(location, zoom);

    return null
}

export default MapCountryChange
