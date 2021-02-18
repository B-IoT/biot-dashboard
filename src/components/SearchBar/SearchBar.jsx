import * as React from 'react';
import './SearchBar.css';

export default function SearchBar(props) {
  const { searchtext } = props;

  return (
    <div className="search-bar">
      <div className="overlap-group">
        <div className="rectangle-16827 border-10px-geyser" />
        <div className="rectangle-16853 border-class-1" />
        <div className="search-blur" />
        <div className="search-text axiforma-light-blue-21px">{searchtext}</div>
      </div>
    </div>
  );
}
