import './SearchBar.css';

export default function SearchBar(props: { searchText: string }) {
  return (
    <div className="search-bar">
      <div className="search-mask">
        <div className="search-shadow" />
        <div className="search-light" />
      </div>
      <div className="search-blur">
        <div className="search-text axiforma-light-blue-21px">
          {props.searchText}
        </div>
      </div>
    </div>
  );
}
