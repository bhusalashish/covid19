import React from "react";
import { Circle, Popup } from "react-leaflet";
import countriesarea from "./util";
const casesTypeColors = {
    cases: {
        hex: "#fb4443",
        multiplier: 800,
    },
    recovered: {
        hex: "darkGreen",
        multiplier: 1200,
    },
    deaths: {
        hex: "#CC1034",
        multiplier: 2000,
    },
};

function DrawCircleOnMap({ country, casesType = "recovered" }) {
    let area = countriesarea[country.countryInfo.iso3];
    if (!area) {
        area = 800;
    }
    // let radius = parseInt(
    //     (country.population / area) *
    //         Math.sqrt(area / 90000) *
    //         Math.sqrt(country[casesType])
    // );
    let radius = parseInt(
        (country[casesType] / country.population) * 20 * area
    );
    if (!radius) radius = 0;
    if (radius > 1523903) {
        radius = 1000000;
    }
    if (radius > 1000000 && casesType !== "death") {
        radius = 700000;
    }
    console.log(country.country, area, radius);
    return (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={{
                color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex,
                fillOpacity: 0.2,
            }}
            radius={radius}
        >
            <Popup>
                {country.country} <br /> {country[casesType]}
            </Popup>
        </Circle>
    );
}

export default DrawCircleOnMap;
