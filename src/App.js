import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@material-ui/core';
//components
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
//util
import { prettyPrintStat, sortData } from './js/util';
import 'leaflet/dist/leaflet.css';
import numeral from 'numeral';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80756,
    lng: -40.4796,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [caseType, setCaseType] = useState('cases');

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  //runs code based on given condition
  useEffect(() => {
    // code will run ONLY once when the component runs
    // if Variable is present, runs EVERYTIME when the component changes.
    // asyc --> send a req, then handle response
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2, //abbreviations
          }));
          //to sort by number of cases >imported from util.js
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);
  // console.log(tableData);

  const onCountryChange = async (event) => {
    const selectedCountryCode = event.target.value;
    // console.log(selectedCountryCode);

    setCountry(selectedCountryCode);

    const url =
      selectedCountryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${selectedCountryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(selectedCountryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  console.log('country info: 💁 🌐', countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <img src={logo} className="app__logo" alt="logo" />

        {/* header */}
        <div className="app__header">
          <h1>Covid-19 Tracker 2020</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              {/* loopthrough list of countries to make a dropdown menu */}
              <MenuItem value="worldwide">World Wide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__infoBoxes">
          <InfoBox
            isRed
            active={caseType === 'cases'}
            title="Infected"
            cases={numeral(countryInfo.todayCases).format('0,0')}
            total={numeral(countryInfo.cases).format('0,0')}
            onClick={(e) => setCaseType('cases')}
          />
          <InfoBox
            active={caseType === 'recovered'}
            title="Recovered"
            cases={numeral(countryInfo.todayRecovered).format('0,0')}
            total={numeral(countryInfo.recovered).format('0,0')}
            onClick={(e) => setCaseType('recovered')}
          />
          <InfoBox
            isRed
            active={caseType === 'deaths'}
            title="Deaths"
            cases={numeral(countryInfo.todayDeaths).format('0,0')}
            total={numeral(countryInfo.deaths).format('0,0')}
            onClick={(e) => setCaseType('deaths')}
          />
        </div>

        {/* map */}
        <div className="app__map">
          <h2>Map of infected {caseType}</h2>
          <Map
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
            caseType={caseType}
          />
        </div>
      </div>
      <div className="app__right">
        <Card>
          {/* table */}

          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h4>
              World Wide Graph <br /> new {caseType}
            </h4>
            {/* graph */}
            <LineGraph caseType={caseType} className="app__graph" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
