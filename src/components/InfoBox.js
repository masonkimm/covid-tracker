import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

export default function InfoBox(props) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${props.active && 'infoBox--selected'} ${
        props.isRed && 'infoBox--selectedIsRed'
      }`}
    >
      <CardContent>
        <h2 className="infoBox__title">{props.title}</h2>
        <h4> New cases: </h4>
        <h2
          className={`infoBox__cases ${!props.isRed && 'infoBox__case--green'}`}
        >
          {props.cases}
        </h2>
        <h4 className="infoBox__total">Total: {props.total}</h4>
      </CardContent>
    </Card>
  );
}
