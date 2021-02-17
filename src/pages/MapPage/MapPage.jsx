import React from 'react';
import { Link } from 'react-router-dom';
import './MapPage.css';

function MapPage(props) {
  const {
    backtext,
    ecgtitle,
    maplight,
    trac1950,
    trac1951,
    trac1953,
    trac1954,
    trac1955,
    trac1956,
    trac1960,
    trac1961,
    trac1962,
    trac1963,
    trac1964,
    trac1965,
    trac1966,
    trac1967,
    trac1968,
    trac1969,
    trac1970,
    trac1971,
    trac1972,
    trac1973,
    trac1974,
    trac1975,
    trac1976,
    trac1977,
    trac1978,
    trac1979,
    trac19782,
    trac19792,
    trac19783,
    trac19793,
    trac19784,
    trac19794,
    trac19785,
    trac19795,
    trac19786,
    trac19796,
    trac19787,
    trac19797,
    trac19788,
    trac19798,
    trac19789,
    trac19799,
    trac197810,
    trac197910,
    trac1980,
    trac1981,
    trac1982,
    trac1983,
    trac1984,
    trac1985,
    trac1986,
    trac1987,
    trac1988,
    trac1989,
    trac1990,
    trac1991,
    mapshadow,
    trac19502,
    trac19512,
    trac19532,
    trac19542,
    trac19552,
    trac19562,
    trac19602,
    trac19612,
    trac19622,
    trac19632,
    trac19642,
    trac19652,
    trac19662,
    trac19672,
    trac19682,
    trac19692,
    trac19702,
    trac19712,
    trac19722,
    trac19732,
    trac19742,
    trac19752,
    trac19762,
    trac19772,
    trac197811,
    trac197911,
    trac197812,
    trac197912,
    trac197813,
    trac197913,
    trac197814,
    trac197914,
    trac197815,
    trac197915,
    trac197816,
    trac197916,
    trac197817,
    trac197917,
    trac197818,
    trac197918,
    trac197819,
    trac197919,
    trac197820,
    trac197920,
    trac19802,
    trac19812,
    trac19822,
    trac19832,
    trac19842,
    trac19852,
    trac19862,
    trac19872,
    trac19882,
    trac19892,
    trac19902,
    trac19912,
    maprimlight,
    trac19503,
    trac19513,
    trac19533,
    trac19543,
    trac19553,
    trac19563,
    trac19603,
    trac19613,
    trac19623,
    trac19633,
    trac19643,
    trac19653,
    trac19663,
    trac19673,
    trac19683,
    trac19693,
    trac19703,
    trac19713,
    trac19723,
    trac19733,
    trac19743,
    trac19753,
    trac19763,
    trac19773,
    trac197821,
    trac197921,
    trac197822,
    trac197922,
    trac197823,
    trac197923,
    trac197824,
    trac197924,
    trac197825,
    trac197925,
    trac197826,
    trac197926,
    trac197827,
    trac197927,
    trac197828,
    trac197928,
    trac197829,
    trac197929,
    trac197830,
    trac197930,
    trac19803,
    trac19813,
    trac19823,
    trac19833,
    trac19843,
    trac19853,
    trac19863,
    trac19873,
    trac19883,
    trac19893,
    trac19903,
    trac19913,
    map,
    trac19504,
    trac19514,
    trac19534,
    trac19544,
    trac19554,
    trac19564,
    trac19604,
    trac19614,
    trac19624,
    trac19634,
    trac19644,
    trac19654,
    trac19664,
    trac19674,
    trac19684,
    trac19694,
    trac19704,
    trac19714,
    trac19724,
    trac19734,
    trac19744,
    trac19754,
    trac19764,
    trac19774,
    trac197831,
    trac197931,
    trac197832,
    trac197932,
    trac197833,
    trac197933,
    trac197834,
    trac197934,
    trac197835,
    trac197935,
    trac197836,
    trac197936,
    trac197837,
    trac197937,
    trac197838,
    trac197938,
    trac197839,
    trac197939,
    trac197840,
    trac197940,
    trac19804,
    trac19814,
    trac19824,
    trac19834,
    trac19844,
    trac19854,
    trac19864,
    trac19874,
    trac19884,
    trac19894,
    trac19904,
    trac19914,
    caption1,
    caption2,
    caption3,
  } = props;

  return (
    <div class="container-center-horizontal">
      <div className="ecgpage screen ">
        <Link to="/searchpage">
          <div className="back-button">
            <div className="rectangle-16874"></div>
            <div className="back-text axiforma-book-normal-blue-30px">
              {backtext}
            </div>
          </div>
        </Link>
        <div className="auto-flex2">
          <div className="ecg-title axiforma-bold-blue-70px">{ecgtitle}</div>
          <div className="overlap-group2">
            <div className="map">
              <img className="map-item" src={maplight} />
              <img className="map-item" src={mapshadow} />
              <img className="map-rim-light" src={maprimlight} />
              <img className="map-item" src={map} />
            </div>
            <div className="green-tracker border-3px-caribbean-green"></div>
            <div className="orange-tracker border-3px-pomegranate"></div>
            <div className="blue-tracker4 border-3px-blue"></div>
            <div className="blue-tracker3 border-3px-blue"></div>
            <div className="blue-tracker2 border-3px-blue"></div>
            <div className="blue-tracker1 border-3px-blue"></div>
          </div>
        </div>
        <div className="auto-flex1">
          <div className="caption-tracker1 border-3px-blue"></div>
          <div className="caption-tracker2 border-3px-pomegranate"></div>
          <div className="caption-tracker3 border-3px-caribbean-green"></div>
        </div>
        <div className="auto-flex22">
          <div className="caption1 axiforma-medium-dove-gray-25px">
            {caption1}
          </div>
          <div className="caption2 axiforma-medium-dove-gray-25px">
            {caption2}
          </div>
          <div className="caption3 axiforma-medium-dove-gray-25px">
            {caption3}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
