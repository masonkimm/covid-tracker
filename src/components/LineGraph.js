import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tootips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

//120days of data
//https://disease.sh/v3/covid-19/historical?lastdays=120

export default function LineGraph({ caseType = 'cases' }) {
  const [data, setData] = useState({});

  const buildGraphData = (data, caseType) => {
    const graphData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          //to calculate new case by subtracting last data from new data.
          y: data[caseType][date] - lastDataPoint,
        };
        graphData.push(newDataPoint);
      }
      lastDataPoint = data[caseType][date];
    }
    return graphData;
  };

  //to fetch graph data
  const url = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120';
  useEffect(() => {
    const fetchData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let graphData = buildGraphData(data, caseType);
          console.log(graphData);
          setData(graphData);
        });
    };
    fetchData();
  }, [caseType]);

  return (
    <div>
      {/* optional chaining; if data exist => */}
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: 'rgba(255, 16, 52,0.3)',
                borderColor: '#CC1034',
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}
