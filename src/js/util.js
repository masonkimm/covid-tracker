import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const caseTypeColors = {
  cases: {
    hex: '#CC1034',
    // rgb: "rgb(204, 16, 52)",
    // half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    // rgb: "rgb(125, 215, 29)",
    // half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    // rgb: 'rgb(251, 68, 67)',
    // half_op: 'rgba(251, 68, 67, 0.5)',
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format('0.0a')}` : '+0';
export const showDataOnMap = (data, caseType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={caseTypeColors[caseType].hex}
      fillColor={caseTypeColors[caseType].hex}
      radius={
        Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier
      }
    >
      <Popup>
        <div className="info__container">
          <div
            className="info__flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info__name">{country.country}</div>
          {/* formatted to output numbers with commas */}
          <div className="info__confirmed">
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className="info__recovered">
            Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className="info__deaths">
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

//==============LongWay=======================
// export default function graphData(data) {
//   const graphedData = [...data];
//   return graphedData = []
// }
// export default function sortData(data) {
//   const sortedData = [...data];
//   sortedData.sort((a, b) => {
//     if (a.cases > b.cases) {
//       return -1; //false
//     } else {
//       return 1; //true
//     }
//   });
//   return sortedData;
// }
