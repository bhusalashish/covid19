import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import "./App.css";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import CountriesTable from "./components/CountriesTable";
import Graph from "./components/Graph";
import LineGraph from "./components/LineGraph";
import { Button } from "@material-ui/core";

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

    const countriesForGraph = [
        "UK",
        "Turkey",
        "Italy",
        "Spain",
        "Argentina",
        "USA",
        "India",
        "Brazil",
        "Russia",
        "France",
    ];

    const handleTypeChange = (type) => {
        setType(type);
    };

    return (
        <div className="app">
            <div className="app__upper">
                <div className="app__left">
                    <div className="app__heading">
                        <span className="app__heading__redtext">COVID-19</span>{" "}
                        CORONAVIRUS PANDEMIC
                    </div>
                    <div className="app__header">
                        <h1 className="app__HeaderText">
                            <span className="app__header__text">Daily</span>{" "}
                            Statistics
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
                                            {country.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="app__stats">
                        <InfoBox
                            onClick={() => handleTypeChange("cases")}
                            className="app__infobox"
                            title="Confirmed"
                            newcases={countryInfo.todayCases}
                            total={countryInfo.cases}
                            active={type === "cases"}
                        />
                        <InfoBox
                            onClick={() => handleTypeChange("recovered")}
                            className="app__infobox"
                            title="Recovered"
                            newcases={countryInfo.todayRecovered}
                            total={countryInfo.recovered}
                            active={type === "recovered"}
                        />
                        <InfoBox
                            onClick={() => handleTypeChange("deaths")}
                            className="app__infobox"
                            title="Deaths"
                            newcases={countryInfo.todayDeaths}
                            total={countryInfo.deaths}
                            active={type === "deaths"}
                        />
                    </div>

                    <Map
                        countries={tabledata}
                        casesType={type}
                        location={location}
                        zoom={zoom}
                    />
                </div>

                <div className="app__right">
                    <div className="app__sidetable">
                        <div className="table__title">
                            <h2>Table Report</h2>
                            <Button
                                variant="outlined"
                                color="secondary"
                                href="#full__table"
                                // disabled
                            >
                                See more
                            </Button>
                        </div>
                        <CountriesTable countries={tabledata} />
                    </div>
                    <div className="app__sidegraph">
                        <h3>Daily New {type}</h3>
                        <Graph country={country} type={type} />
                    </div>
                </div>
            </div>
            <div className="app__lower">
                <div className="app__graph">
                    {countriesForGraph.map((country) => (
                        <div className="app__graph__item">
                            <LineGraph key={country} countryName={country} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
