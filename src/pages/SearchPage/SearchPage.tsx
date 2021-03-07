import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ItemButton from '../../components/ItemButton/ItemButton';
import PlaceholderButton from '../../components/ItemButton/PlaceholderButton';

import ecgIcon from '../../img/ecgIcon.svg';
import bedIcon from '../../img/bedIcon.svg';
import oxygenIcon from '../../img/oxygenIcon.svg';

import './SearchPage.css';
import Logo from '../../components/Logo/Logo';
import { simplifyText } from '../../utils/items';

function SearchPage() {
  // useQuery getCategories
  const items = useMemo(
    () => [
      { itemName: 'ECG', itemIcon: ecgIcon },
      { itemName: 'Lit', itemIcon: bedIcon },
      { itemName: 'Oxygène', itemIcon: oxygenIcon },
    ],
    []
  );
  const placeholders = new Array(17).fill(1).map(() => <PlaceholderButton />);

  const [keyword, setKeyword] = useState('');
  const [buttons, setButtons] = useState([<PlaceholderButton />]);
  useEffect(
    () =>
      setButtons(
        items
          .filter(
            (item) =>
              keyword === '' ||
              simplifyText(item.itemName).includes(simplifyText(keyword))
          )
          .map((item) => (
            <ItemButton text={item.itemName} icon={item.itemIcon} />
          ))
      ),
    [items, keyword]
  );

  return (
    <div className="search-page">
      <h1 className="search-title axiforma-bold-blue-70px">
        {'Que cherchez-vous ?'}
      </h1>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      <div className="result-grid">
        {buttons}
        {placeholders}
      </div>
      <Logo />
    </div>
  );
}

export default SearchPage;
