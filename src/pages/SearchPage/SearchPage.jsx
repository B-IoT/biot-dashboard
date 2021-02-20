import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ItemButton from '../../components/ItemButton/ItemButton';
import PlaceholderButton from '../../components/ItemButton/PlaceholderButton';

import ecgIcon from '../../img/ecgIcon.svg';
import bedIcon from '../../img/bedIcon.svg';
import oxygenIcon from '../../img/oxygenIcon.svg';
import logo from '../../img/logo.png';

import './SearchPage.css';
import Logo from '../../components/Logo/Logo';

function SearchPage() {
  return (
    <div className="search-page">
      <h1 className="search-title axiforma-bold-blue-70px">
        {'Que cherchez-vous ?'}
      </h1>
      <SearchBar searchText={'Rechercher'} />
      <div className="result-grid">
        <div className="auto-flex">
          <ItemButton text={'ECG'} icon={ecgIcon} />
          <PlaceholderButton />
          <PlaceholderButton />
          <PlaceholderButton />
          <PlaceholderButton />
        </div>
        <div className="auto-flex">
          <ItemButton text={'Lit'} icon={bedIcon} />
          <PlaceholderButton />
          <PlaceholderButton />
          <PlaceholderButton />
          <PlaceholderButton />
        </div>
        <div className="auto-flex">
          <ItemButton text={'Oxygène'} icon={oxygenIcon} />
          <PlaceholderButton />
          <PlaceholderButton />
          <PlaceholderButton />
          <PlaceholderButton />
        </div>
        <div className="auto-flex">
          <PlaceholderButton />
          <PlaceholderButton />
          <PlaceholderButton />
          <PlaceholderButton />
          <PlaceholderButton />
        </div>
        <Logo />
      </div>
    </div>
  );
}

export default SearchPage;
