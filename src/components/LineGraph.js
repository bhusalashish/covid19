import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

function LineGraph({ countryName = "india" }) {
    const [data_cases, setDataCases] = useState({});
    const [data_deaths, setDataDeaths] = useState({});
    const [data_recovered, setDataRecovered] = useState({});

    const options = {
        easing: "linear",
        responsive: true,
        legend: {
            display: true,
            position: "bottom",
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: "ll",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        min: 0,
                        callback: function (value, index, values) {
                            return numeral(value).format("0a");
                        },
                    },
                },
            ],
        },
    };

    useEffect(() => {
        const buildChartData = (data, caseType) => {
            if (countryName !== "all" && countryName !== "World")
                data = data.timeline;
            try {
                if (!data.cases) return;
            } catch (e) {
                return;
            }
            let chartData = [];
            let lastDataPoint;
            for (let date in data.cases) {
                if (lastDataPoint) {
                    let newDataPoint = {
                        x: date,
                        y: data[caseType][date] - lastDataPoint,
                    };
                    chartData.push(newDataPoint);
                }
                lastDataPoint = data[caseType][date];
            }
            return chartData;
        };
        const fetchData = async () => {
            await fetch(
                `${
                    countryName === "World" || countryName === "all"
                        ? "https://disease.sh/v3/covid-19/historical/all"
                        : `https://disease.sh/v3/covid-19/historical/${countryName}`
                }`
            )
                .then((response) => response.json())
                .then((data) => {
                    setDataCases(buildChartData(data, "cases"));
                    setDataDeaths(buildChartData(data, "deaths"));
                    setDataRecovered(buildChartData(data, "recovered"));
                });
        };
        fetchData();
    }, [countryName]);
    return (
        <div>
            <h2>{countryName}</h2>
            {data_cases?.length > 0 &&
                data_recovered?.length > 0 &&
                data_deaths?.length > 0 && (
                    <Line
                        options={options}
                        data={{
                            datasets: [
                                {
                                    label: `Cases`,
                                    // backgroundColor: "rgba(204,16,52,0)",
                                    borderColor: "red",
                                    data: data_cases,
                                },
                                {
                                    label: `Recovered`,
                                    // backgroundColor: "rgba(204,16,52,0)",
                                    borderColor: "green",
                                    data: data_recovered,
                                },
                                {
                                    label: `Deaths`,
                                    // backgroundColor: "rgba(204,16,52,0)",
                                    backgroundColor: "#c92739",
                                    borderColor: "#c92739",
                                    data: data_deaths,
                                },
                            ],
                        }}
                    />
                )}
        </div>
    );
}

export default LineGraph;
