import React from 'react';
import { Link } from 'react-router-dom';
import ItemButton from '../../components/ItemButton/ItemButton';
import SearchBar from '../../components/SearchBar/SearchBar';

import ecgIcon from '../../img/ecgIcon.svg';
import bedIcon from '../../img/bedIcon.svg';
import oxygenIcon from '../../img/oxygenIcon.svg';

import './SearchPage.css';
import PlaceholderButton from '../../components/ItemButton/PlaceholderButton';

function SearchPage(props) {
  const {
    searchTitle,
    searchText,
    ecgText,
    bedText,
    oxygenText,
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
            <Link to="/tracking" style={{ textDecoration: 'none' }}>
              <ItemButton text={ecgText} icon={ecgIcon} />
            </Link>
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
          </div>
          <div className="auto-flex">
            <Link to="/tracking" style={{ textDecoration: 'none' }}>
              <ItemButton text={bedText} icon={bedIcon} />
            </Link>
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
          </div>
          <div className="auto-flex">
            <Link to="/tracking" style={{ textDecoration: 'none' }}>
              <ItemButton text={oxygenText} icon={oxygenIcon} />
            </Link>
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
          </div>
          <div className="auto-flex">
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
            <PlaceholderButton text={placeHolder} />
          </div>
          <img className="logo" src={logo} />
        </div>
      </div>
    </container-center-horizontal>
  );
}

export default SearchPage;
