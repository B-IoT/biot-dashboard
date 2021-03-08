import './SearchBar.css';
import { Dispatch, SetStateAction } from 'react';

export default function SearchBar(props: {
  setKeyword: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="search-bar">
      <div className="search-mask">
        <div className="search-shadow" />
        <div className="search-light" />
      </div>
      <div className="search-blur">
        <input
          className="search-text axiforma-light-blue-21px"
          placeholder={'Rechercher'}
          onChange={(e) => props.setKeyword(e.target.value)}
        />
      </div>
    </div>
  );
}
