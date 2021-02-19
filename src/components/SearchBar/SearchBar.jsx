import * as React from 'react';
import './SearchBar.css';

export default function SearchBar(props) {
  const { searchText } = props;

  return (
    <div className="search-bar">
      <div className="search-mask">
        <div className="search-shadow" />
        <div className="search-light" />
      </div>
      <div className="search-blur">
        <div className="search-text axiforma-light-blue-21px">{searchText}</div>
      </div>
    </div>
  );
}
