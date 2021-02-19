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

function SearchPage() {
  const constants = {
    placeHolderText: '...',
  };

  return (
    <div className="search-page screen ">
      <h1 className="search-title axiforma-bold-blue-70px">
        {'Que cherchez-vous ?'}
      </h1>
      <SearchBar searchText={'Rechercher'} />
      <div className="result-grid">
        <div className="auto-flex">
          <Link to="/tracking" style={{ textDecoration: 'none' }}>
            <ItemButton text={'ECG'} icon={ecgIcon} />
          </Link>
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
        </div>
        <div className="auto-flex">
          <Link to="/tracking" style={{ textDecoration: 'none' }}>
            <ItemButton text={'Lit'} icon={bedIcon} />
          </Link>
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
        </div>
        <div className="auto-flex">
          <Link to="/tracking" style={{ textDecoration: 'none' }}>
            <ItemButton text={'Oxygène'} icon={oxygenIcon} />
          </Link>
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
        </div>
        <div className="auto-flex">
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
          <PlaceholderButton text={constants.placeHolderText} />
        </div>
        <a href="https://biot.webflow.io">
          <img className="logo" src={logo} alt="BIoT logo" />
        </a>
      </div>
    </div>
  );
}

export default SearchPage;
