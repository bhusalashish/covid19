import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'



const getData = (data, type) => {
    const labels = [];
    const labelsdata = [];
    let lastvalue;
    for(let date in data[type]){
        if(!lastvalue){
            lastvalue = data[type][date];
        } else{
            labels.push(date);
            labelsdata.push(data[type][date] - lastvalue);
            lastvalue = data[type][date];
        }
    }
    return [labels, labelsdata];
}



function Graph({country, type}) {
    const [labels, setLabels] = useState([]);
    const [labelsdata, setLabelsData] = useState([]);
    const [countrydata, setCountryData] = useState({});
    const [colour, setColour] = useState('');
    useEffect(() => {
        const fetchData = async () =>{
            if(country === 'world'){
                const worldurl = `https://disease.sh/v3/covid-19/historical/all?lastdays=120`;
                fetch(worldurl)
                .then(response => response.json())
                .then(data => {
                    setCountryData(data);
                    const [labels, labelsdata] = getData(data, type);
                    setLabels(labels);
                    setLabelsData(labelsdata);
                })
            } else{
                const url = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`;
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    setCountryData(data.timeline);
                    const [labels, labelsdata] = getData(data.timeline, type);
                    setLabels(labels);
                    setLabelsData(labelsdata);
                });
            }
        }
        fetchData();
    }, [country]);

    useEffect(() =>{
        switch(type){
            case 'cases':
                setColour('red');
                break;
            case 'deaths':
                setColour('#c02739');
                break;
            case 'recovered':
                setColour('green');
                break;
            default:
                setColour('red');
        }
        const [labels, labelsdata] = getData(countrydata, type);
        setLabels(labels);
        setLabelsData(labelsdata);setLabels(labels);
    }, [type]);

    const data = {
        labels : labels,
        datasets : [
            {  
                label : `New ${type}`,
                backgroundColor: colour,
                // borderColor: '#CC1034',
                borderWidth: 1.5,
                data : labelsdata
            }
        ]
    }
    const options = {
        legend: {
        //   display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        maintainAspectRatio: true,
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
    
    return (
        <div>
            <Line data={data} options={options}/>
        </div>
    )
}

export default Graph
