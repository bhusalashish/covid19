import React from "react";
import { Circle, Popup } from "react-leaflet";
import countriesarea from "./util";
import numeral from "numeral";
import "./DrawCircleOnMap.css";
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
    let radius = parseInt(
        (country[casesType] / country.population) * 20 * area
    );
    if (!radius) radius = 0;
    if (radius > 1523903) {
        radius = 1000000;
    }
    if (radius > 1000000) {
        radius = 700000;
    }
    if (casesType === "deaths") {
        radius = radius * 2;
    }
    return (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={{
                color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex,
                fillOpacity: 0.4,
            }}
            radius={radius}
        >
            <Popup className="popup__info">
                <div>
                    <div>
                        <img
                            src={country.countryInfo.flag}
                            width="100vw"
                            alt={country.country}
                        ></img>
                    </div>
                    <div>
                        <h3>{country.country}</h3>
                    </div>
                    <div className="popup__case__type">
                        Confirmed : {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="popup__case__type">
                        Recovered: {numeral(country.recovered).format("0,0")}{" "}
                    </div>
                    <div className="popup__case__type">
                        Deceased : {numeral(country.deaths).format("0,0")}{" "}
                    </div>
                </div>
            </Popup>
        </Circle>
    );
}

export default DrawCircleOnMap;
