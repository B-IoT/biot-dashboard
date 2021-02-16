import React from 'react';
import { Link } from 'react-router-dom';
import Composant35 from '../../components/Composant35';
import './SearchPage.css';

function SearchPage(props) {
  const {
    searchtitle,
    searchtext,
    trac1945,
    trac1946,
    trac1947,
    trac1948,
    ecgtext,
    trac1949,
    bedtext,
    overlapGroup,
    trac1943,
    trac1944,
    oxygentext,
    logo,
    composant35Props,
    composant352Props,
    composant353Props,
    composant354Props,
    composant355Props,
    composant356Props,
    composant357Props,
    composant358Props,
    composant359Props,
    composant3510Props,
    composant3511Props,
    composant3512Props,
    composant3513Props,
    composant3514Props,
    composant3515Props,
    composant3516Props,
    composant3517Props,
  } = props;

  return (
    <div class="container-center-horizontal">
      <div className="searchpage screen ">
        <div className="search-title axiforma-bold-blue-70px">
          {searchtitle}
        </div>
        <div className="search-bar">
          <div className="overlap-group20">
            <div className="rectangle-16827 border-10px-geyser"></div>
            <div className="rectangle-16853 border-class-1"></div>
            <div className="search-blur"></div>
            <div className="search-text axiforma-light-blue-21px">
              {searchtext}
            </div>
          </div>
        </div>
        <div className="auto-flex4">
          <div className="auto-flex3">
            <Link to="/ecgpage">
              <div className="link">
                <div className="overlap-group19">
                  <div className="ecg-icon">
                    <div className="overlap-group">
                      <img className="trac-1945" src={trac1945} />
                      <img className="trac-1946" src={trac1946} />
                      <img className="trac-1947" src={trac1947} />
                      <img className="trac-1948" src={trac1948} />
                    </div>
                  </div>
                  <div className="ecg-text axiforma-medium-blue-18px">
                    {ecgtext}
                  </div>
                </div>
              </div>
            </Link>
            <Composant35 text16={composant35Props.text16} />
            <Composant35
              text16={composant352Props.text16}
              className="composant-3-"
            />
            <Composant35
              text16={composant353Props.text16}
              className="composant-3-"
            />
            <Composant35
              text16={composant354Props.text16}
              className="composant-3-"
            />
          </div>
          <div className="auto-flex">
            <Link to="/ecgpage">
              <div className="bed">
                <div className="overlap-group18">
                  <div className="ellipse-214"></div>
                  <img className="trac-1949" src={trac1949} />
                  <div className="bed-text axiforma-medium-blue-18px">
                    {bedtext}
                  </div>
                </div>
              </div>
            </Link>
            <Composant35
              text16={composant355Props.text16}
              className="composant-3-"
            />
            <Composant35
              text16={composant356Props.text16}
              className="composant-3-"
            />
            <Composant35
              text16={composant357Props.text16}
              className="composant-3-"
            />
            <Composant35
              text16={composant358Props.text16}
              className="composant-3-"
            />
          </div>
          <div className="auto-flex">
            <Link to="/ecgpage">
              <div className="link">
                <div className="overlap-group17">
                  <div className="oxygen-icon">
                    <div
                      className="overlap-group-1"
                      style={{ backgroundImage: `url(${overlapGroup})` }}
                    >
                      <img className="trac-1943" src={trac1943} />
                      <img className="trac-1944" src={trac1944} />
                    </div>
                  </div>
                  <div className="oxygen-text axiforma-medium-blue-19px">
                    {oxygentext}
                  </div>
                </div>
              </div>
            </Link>
            <Composant35
              text16={composant359Props.text16}
              className="composant-3-"
            />
            <Composant35
              text16={composant3510Props.text16}
              className="composant-3-"
            />
            <Composant35
              text16={composant3511Props.text16}
              className="composant-3-"
            />
            <Composant35
              text16={composant3512Props.text16}
              className="composant-3-"
            />
          </div>
          <div className="auto-flex">
            <Composant35
              text16={composant3513Props.text16}
              className="composant-3-25"
            />
            <Composant35
              text16={composant3514Props.text16}
              className="composant-3-"
            />
            <Composant35
              text16={composant3515Props.text16}
              className="composant-3-"
            />
            <Composant35
              text16={composant3516Props.text16}
              className="composant-3-"
            />
            <Composant35
              text16={composant3517Props.text16}
              className="composant-3-"
            />
          </div>
          <img className="logo" src={logo} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
