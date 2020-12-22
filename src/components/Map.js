import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import MapCountryChange from "./MapCountryChange";
import DrawCircleOnMap from "./DrawCircleOnMap";
import "./Map.css";

function Map({ countries, casesType, location, zoom }) {
    return (
        <div className="map">
            <MapContainer center={location} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                <MapCountryChange location={location} zoom={zoom} />
                {countries.map((country) => {
                    return (
                        <DrawCircleOnMap
                            key={country.name}
                            country={country}
                            casesType={casesType}
                        />
                    );
                })}
            </MapContainer>
        </div>
    );
}

export default Map;
