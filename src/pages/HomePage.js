import React from 'react';
import { Typography } from '@material-ui/core';
import { useQuery } from 'react-query';

import { getItems, getItem } from '../api/items';

export default function HomePage() {
  // const initialItems = [
  //   {
  //     type: 'X',
  //     service: 'Bloc 1',
  //     id: 1,
  //     battery: 50,
  //     status: 'Indisponible',
  //     latitude: 6.6,
  //     longitude: 46.5,
  //   },
  //   {
  //     type: 'Y',
  //     id: 2,
  //     service: 'Bloc 2',
  //     battery: 30,
  //     status: 'Indisponible',
  //     latitude: 6.6,
  //     longitude: 46.4,
  //   },
  //   {
  //     type: 'Y',
  //     id: 2,
  //     service: 'Bloc 2',
  //     battery: 30,
  //     status: 'Indisponible',
  //     latitude: 6.6,
  //     longitude: 46.4,
  //   },
  //   {
  //     type: 'Y',
  //     id: 2,
  //     service: 'Bloc 2',
  //     battery: 30,
  //     status: 'Indisponible',
  //     latitude: 6.6,
  //     longitude: 46.4,
  //   },
  //   {
  //     type: 'Y',
  //     id: 2,
  //     service: 'Bloc 2',
  //     battery: 30,
  //     status: 'Indisponible',
  //     latitude: 6.6,
  //     longitude: 46.4,
  //   },
  //   {
  //     type: 'Y',
  //     id: 2,
  //     service: 'Bloc 2',
  //     battery: 30,
  //     status: 'Indisponible',
  //     latitude: 6.6,
  //     longitude: 46.4,
  //   },
  //   {
  //     type: 'Z',
  //     id: 2,
  //     service: 'Bloc 1',
  //     battery: 100,
  //     status: 'Disponible',
  //     latitude: 6.5668,
  //     longitude: 46.5191,
  //   },
  // ];
  
  // const { data: items } = useQuery('items', getItems, {
  //   initialData: initialItems,
  // });

  const { data } = useQuery('items', getItems);

  // const { data: item, error, isError } = useQuery(['item', 2], getItem);

  // if (isError) {
  //   console.log(error.message);
  // }

  // console.log(items);

  // console.log(item);

  return <Typography>Home</Typography>;
}
