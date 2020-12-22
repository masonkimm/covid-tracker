import React from 'react';
import './Table.css';
import numeral from 'numeral';

export default function Table(props) {
  return (
    <div className="table">
      {props.countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>{numeral(country.cases).format('0,0')}</td>
        </tr>
      ))}
    </div>
  );
}
