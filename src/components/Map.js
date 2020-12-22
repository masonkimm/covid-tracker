import React from 'react';
import './Map.css';
import { Map as LeafleftMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../js/util';

function Map(props) {
  return (
    <div className="map">
      <LeafleftMap center={props.center} zoom={props.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* loop through and render circles(sized based on infected number) */}
        {showDataOnMap(props.countries, props.caseType)}
      </LeafleftMap>
    </div>
  );
}

export default Map;
