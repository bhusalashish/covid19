import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from './LocationMarker';
import MapCountryChange from './MapCountryChange';
import DrawCircleOnMap from './DrawCircleOnMap';
import './Map.css';


function Map({countries, casesType, location, zoom}) {
    // console.log("i map is rendering again", location, zoom);

    return (
        <div className="map">
            <MapContainer center={location} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                <MapCountryChange location={location} zoom={zoom}/>
                {
                    countries.map((country) =>{
                        return (
                            <DrawCircleOnMap key={country.name} 
                            country={country}
                            casesType={casesType}
                            />
                        )
                    })
                }
                {/* <CircleMarker center={[51.505, -0.109]} radius={100}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </CircleMarker> */}
            </MapContainer>
            
        </div>
    )
}

export default Map
