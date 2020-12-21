import React from 'react'
import { Circle, Popup } from 'react-leaflet'

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
    },
};

function DrawCircleOnMap({country, casesType='recovered'}) {
    console.log(casesTypeColors[casesType].hex);
    return (
        <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        fillOpacity={0.4}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
        >
            <Popup>
                Hey I am a popup
            </Popup>
        </Circle>
    )
}

export default DrawCircleOnMap
