import React from 'react';
import { Link } from 'react-router-dom';
import ItemButton from '../../components/ItemButton/ItemButton';
import SearchBar from '../../components/SearchBar/SearchBar';

import './SearchPage.css';

function SearchPage(props) {
  const {
    searchTitle,
    searchText,
    ecgText,
    ecgIcon,
    bedText,
    bedIcon,
    oxygenText,
    oxygenIcon,
    overlapGroup,
    logo,
    placeHolder,
  } = props;

  return (
    <container-center-horizontal>
      <div className="searchpage screen ">
        <div className="search-title axiforma-bold-blue-70px">
          {' '}
          {searchTitle}{' '}
        </div>

        <SearchBar searchText={searchText} />

        <div className="result-grid">
          <div className="auto-flex">
            <Link to="/tracking">
              <div className="link">
                <div className="overlap-group19">
                  <div className="ecg-icon">
                    <div className="overlap-group">
                      <img
                        src={process.env.PUBLIC_URL + ecgIcon}
                        alt="ECG icon"
                      />
                    </div>
                  </div>
                  <div className="ecg-text axiforma-medium-blue-18px">
                    {ecgText}
                  </div>
                </div>
              </div>
            </Link>
            <ItemButton text16={placeHolder.text16} />
            <ItemButton text16={placeHolder.text16} />
            <ItemButton text16={placeHolder.text16} />
            <ItemButton text16={placeHolder.text16} />
          </div>
          <div className="auto-flex">
            <Link to="/tracking">
              <div className="bed">
                <div className="overlap-group18">
                  <div className="ellipse-214" />
                  <img className="trac-1949" src={bedIcon} />
                  <div className="bed-text axiforma-medium-blue-18px">
                    {bedText}
                  </div>
                </div>
              </div>
            </Link>
            <ItemButton text16={placeHolder.text16} />
            <ItemButton text16={placeHolder.text16} />
            <ItemButton text16={placeHolder.text16} />
            <ItemButton text16={placeHolder.text16} />
          </div>
          <div className="auto-flex">
            <Link to="/tracking">
              <div className="link">
                <div className="overlap-group17">
                  <div className="oxygen-icon">
                    <div
                      className="overlap-group-1"
                      style={{ backgroundImage: `url(${overlapGroup})` }}
                    >
                      <img className="trac-1943" src={oxygenIcon} />
                    </div>
                  </div>
                  <div className="oxygen-text axiforma-medium-blue-19px">
                    {oxygenText}
                  </div>
                </div>
              </div>
            </Link>
            <ItemButton text16={placeHolder.text16} />
            <ItemButton text16={placeHolder.text16} />
            <ItemButton text16={placeHolder.text16} />
            <ItemButton text16={placeHolder.text16} />
          </div>
          <div className="auto-flex">
            <ItemButton text16={placeHolder.text16} className="composant-3-" />
            <ItemButton text16={placeHolder.text16} />
            <ItemButton text16={placeHolder.text16} />
            <ItemButton text16={placeHolder.text16} />
            <ItemButton text16={placeHolder.text16} />
          </div>
          <img className="logo" src={logo} />
        </div>
      </div>
    </container-center-horizontal>
  );
}

export default SearchPage;
