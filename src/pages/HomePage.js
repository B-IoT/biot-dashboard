import React from 'react';
import { Typography } from '@material-ui/core';
import { useQuery } from 'react-query';

import { getItems, getItem } from '../api/items';

export default function HomePage() {
  const { data: items } = useQuery('items', getItems);

  const { data: item, error, isError } = useQuery(['item', 2], getItem);

  if (isError) {
    console.log(error.message);
  }

  console.log(items);

  console.log(item);

  return <Typography>Home</Typography>;
}
