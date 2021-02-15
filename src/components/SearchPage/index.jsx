import React from 'react';
import Composant31 from '../ItemButton';
import './SearchPage.css';
import { Link } from 'react-router-dom';

function HRStatisticsDashboard(props) {
  const {
    queCherchezVous,
    x123,
    trac1945,
    trac1946,
    trac1947,
    trac1948,
    x1232,
    trac1949,
    x1233,
    overlapGroup1,
    trac1943,
    trac1944,
    x1234,
    biotColorTransparent,
    biotColorTransparent2,
    composant31Props,
    composant312Props,
    composant313Props,
    composant314Props,
    composant315Props,
    composant316Props,
    composant317Props,
    composant318Props,
    composant319Props,
    composant3110Props,
    composant3111Props,
    composant3112Props,
    composant3113Props,
    composant3114Props,
    composant3115Props,
    composant3116Props,
    composant3117Props,
  } = props;

  return (
    <div class="container-center-horizontal">
      <div className="hr-statistics-dashboard screen ">
        <div className="que-cherchez-vous axiforma-bold-blue-70px">
          {queCherchezVous}
        </div>
        <div className="search">
          <div className="overlap-group7">
            <div className="rectangle-16827 border-10px-geyser"></div>
            <div className="rectangle-16853 border-class-1"></div>
            <div className="rectangle-16855"></div>
            <div className="x123 axiforma-light-blue-21px">{x123}</div>
          </div>
        </div>
        <div className="auto-flex4">
          <Link to="/hr-statistics-dashboard-2">
            <div className="composant-2-1">
              <div className="overlap-group6">
                <div className="cardiogram">
                  <div className="overlap-group1">
                    <img className="trac-1945" src={trac1945} />
                    <img className="trac-1946" src={trac1946} />
                    <img className="trac-1947" src={trac1947} />
                    <img className="trac-1948" src={trac1948} />
                  </div>
                </div>
                <div className="x123-1 axiforma-medium-blue-18px">{x1232}</div>
              </div>
            </div>
          </Link>
          <Link to="/hr-statistics-dashboard-3">
            <div className="composant-2-2">
              <div className="overlap-group5">
                <div className="ellipse-214"></div>
                <img className="trac-1949" src={trac1949} />
                <div className="x123-2 axiforma-medium-blue-18px">{x1233}</div>
              </div>
            </div>
          </Link>
          <Link to="/hr-statistics-dashboard-4">
            <div className="composant-2-3">
              <div className="overlap-group4">
                <div className="oxygen">
                  <div
                    className="overlap-group1-1"
                    style={{ backgroundImage: `url(${overlapGroup1})` }}
                  >
                    <img className="trac-1943" src={trac1943} />
                    <img className="trac-1944" src={trac1944} />
                  </div>
                </div>
                <div className="x123-3 axiforma-medium-blue-19px">{x1234}</div>
              </div>
            </div>
          </Link>
          <Composant31 text1={composant31Props.text1} />
        </div>
        <div className="auto-flex">
          <Composant31
            text1={composant312Props.text1}
            className="composant-3-"
          />
          <Composant31
            text1={composant313Props.text1}
            className="composant-3--1"
          />
          <Composant31
            text1={composant314Props.text1}
            className="composant-3--1"
          />
          <Composant31
            text1={composant315Props.text1}
            className="composant-3--1"
          />
        </div>
        <div className="auto-flex2">
          <Composant31
            text1={composant316Props.text1}
            className="composant-3-"
          />
          <div className="overlap-group">
            <img className="b-io-t-col-ransparent" src={biotColorTransparent} />
            <Composant31
              text1={composant317Props.text1}
              className="composant-3-9"
            />
            <Composant31
              text1={composant318Props.text1}
              className="composant-3-11"
            />
          </div>
          <Composant31
            text1={composant319Props.text1}
            className="composant-3--1"
          />
          <img
            className="b-io-t-col-ransparent-1"
            src={biotColorTransparent2}
          />
        </div>
        <div className="auto-flex">
          <Composant31
            text1={composant3110Props.text1}
            className="composant-3-"
          />
          <Composant31
            text1={composant3111Props.text1}
            className="composant-3--1"
          />
          <Composant31
            text1={composant3112Props.text1}
            className="composant-3--1"
          />
          <Composant31
            text1={composant3113Props.text1}
            className="composant-3--1"
          />
        </div>
        <div className="auto-flex">
          <Composant31
            text1={composant3114Props.text1}
            className="composant-3-"
          />
          <Composant31
            text1={composant3115Props.text1}
            className="composant-3--1"
          />
          <Composant31
            text1={composant3116Props.text1}
            className="composant-3--1"
          />
          <Composant31
            text1={composant3117Props.text1}
            className="composant-3--1"
          />
        </div>
      </div>
    </div>
  );
}

export default HRStatisticsDashboard;
