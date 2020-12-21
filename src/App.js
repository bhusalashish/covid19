import React, { useState, useEffect } from "react";
import {
    ButtonBase,
    Card,
    CardContent,
    FormControl,
    MenuItem,
    Select,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import CountriesTable from "./components/CountriesTable";
import Graph from "./components/Graph";

//https://disease.sh/v3/covid-19/countries

function App() {
    const [world, setWorld] = useState({});
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("world");
    const [countryInfo, setCountryInfo] = useState({});
    const [tabledata, setTableData] = useState([]);
    const [type, setType] = useState("cases");
    const [location, setLocation] = useState([39, 34]);
    const [zoom, setZoom] = useState(2);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setWorld(data);
                setCountryInfo(data);
            });
    }, []);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
                const sortedData = data.sort((a, b) =>
                    a.cases > b.cases ? -1 : 1
                );
                const countries = sortedData.map((country) => {
                    return {
                        id: country.country,
                        name: country.country,
                        value: country.countryInfo.iso2,
                    };
                });
                setTableData(sortedData);
                setCountries(countries);
            });
    }, []);

    const changeHandle = async (event) => {
        const countrycode = event.target.value;
        setCountry(countrycode);
        if (countrycode === "world") {
            setCountryInfo(world);
            setLocation([39, 34]);
            setZoom(2);
        } else {
            await fetch(
                `https://disease.sh/v3/covid-19/countries/${countrycode}`
            )
                .then((response) => response.json())
                .then((data) => {
                    setCountryInfo(data);
                    setLocation([data.countryInfo.lat, data.countryInfo.long]);
                    if (data.countryInfo.iso3 === "RUS") {
                        setZoom(3);
                    } else {
                        setZoom(4);
                    }
                });
        }
    };

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1 className="app__HeaderText">
                        Novel Covid-19 Statistics
                    </h1>
                    <FormControl>
                        <Select
                            variant="outlined"
                            value={country}
                            onChange={changeHandle}
                        >
                            <MenuItem key={"world"} value="world">
                                World
                            </MenuItem>
                            {countries.map((country) => {
                                return (
                                    <MenuItem
                                        key={country.id}
                                        value={country.value}
                                    >
                                        {" "}
                                        {country.name}{" "}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className="app__stats">
                    <ButtonBase
                        onClick={() => setType("cases")}
                        className="app__info"
                    >
                        <InfoBox
                            className="app__infobox"
                            title="Total Cases"
                            newcases={countryInfo.todayCases}
                            total={countryInfo.cases}
                            active={type === "cases"}
                            isRed
                        />
                    </ButtonBase>
                    <ButtonBase
                        onClick={() => setType("recovered")}
                        className="app__info"
                    >
                        <InfoBox
                            title="Recovered"
                            newcases={countryInfo.todayRecovered}
                            total={countryInfo.recovered}
                            active={type === "recovered"}
                        />
                    </ButtonBase>
                    <ButtonBase
                        onClick={() => setType("deaths")}
                        className="app__info"
                    >
                        <InfoBox
                            title="Deaths"
                            newcases={countryInfo.todayDeaths}
                            total={countryInfo.deaths}
                            isRed
                            active={type === "deaths"}
                        />
                    </ButtonBase>
                    <ButtonBase className="app__info">
                        <InfoBox
                            title="Active"
                            newcases={countryInfo.todayCases}
                            total={
                                countryInfo.cases -
                                (countryInfo.deaths + countryInfo.recovered)
                            }
                            isRed
                        />
                    </ButtonBase>
                </div>

                <Map
                    countries={tabledata}
                    casesType={type}
                    location={location}
                    zoom={zoom}
                />
            </div>

            <div className="app__right">
                <Card>
                    <CardContent>
                        <h3>Total Cases by countries</h3>
                        <CountriesTable countries={tabledata} />
                        <h3>Daily New cases</h3>
                        <Graph country={country} type={type} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default App;
