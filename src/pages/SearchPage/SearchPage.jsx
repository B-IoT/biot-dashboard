import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import ItemButton from '../../components/ItemButton/ItemButton';
import PlaceholderButton from '../../components/ItemButton/PlaceholderButton';

import ecgIcon from '../../img/ecgIcon.svg';
import bedIcon from '../../img/bedIcon.svg';
import oxygenIcon from '../../img/oxygenIcon.svg';
import logo from '../../img/logo.png';

import './SearchPage.css';

function SearchPage(props) {
  const {
    searchTitle,
    searchText,
    ecgText,
    bedText,
    oxygenText,
    placeHolder,
  } = props;

  return (
    <div className="search-page screen ">
      <h1 className="search-title axiforma-bold-blue-70px">{searchTitle}</h1>
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
        <img className="logo" src={logo} alt="BIoT logo" />
      </div>
    </div>
  );
}

export default SearchPage;
