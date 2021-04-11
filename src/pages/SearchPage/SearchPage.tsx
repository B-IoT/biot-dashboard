import React, { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';
import ItemButton from '../../components/ItemButton/ItemButton';
import PlaceholderButton from '../../components/ItemButton/PlaceholderButton';

import './SearchPage.css';
import { simplifyText } from '../../utils/items';
import { useQuery } from 'react-query';
import { getCategories } from '../../api/items';
import LogOut from '../../components/LogOut/LogOut';

function SearchPage() {
  const [categories, setCategories] = useState([] as string[]);
  const { data } = useQuery('categories', getCategories);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);
  const placeholders = new Array(17)
    .fill(1)
    .map((_, index) => (
      <PlaceholderButton key={'PlaceholderButton_' + index} />
    ));

  const [keyword, setKeyword] = useState('');
  const [buttons, setButtons] = useState([
    <PlaceholderButton key="PlaceholderButton_init" />,
  ]);
  useEffect(
    () =>
      setButtons(
        categories
          .filter(
            (category) =>
              keyword === '' ||
              simplifyText(category).includes(simplifyText(keyword))
          )
          .map((category) => <ItemButton key={category} itemName={category} />)
      ),
    [categories, keyword]
  );

  return (
    <div className="search-page">
      <h1 className="search-title axiforma-bold-blue-70px">
        {'Que cherchez-vous ?'}
      </h1>
      <Input
        setKeyword={setKeyword}
        defaultText="Rechercher"
        width={550}
        style={{ marginTop: 50 }}
        isPassword={false}
      />
      <div className="result-grid">
        {buttons}
        {placeholders}
      </div>
      <LogOut />
    </div>
  );
}

export default SearchPage;
