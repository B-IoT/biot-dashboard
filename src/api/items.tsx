import axios from 'axios';

const API = axios.create({ baseURL: 'https://api.b-iot.ch:8080' });
const credentials = {
  username: 'andrea',
  password: 'andrea',
};

if (localStorage.getItem('token') === null) {
  API.post('/oauth/token', credentials)
    .then((response) => localStorage.setItem('token', response.data));
}

API.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    API.post('/oauth/token', credentials)
      .then((response) => localStorage.setItem('token', response.data));
    API.defaults.headers.common = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }
  return error;
});

/**
 * Get all items matching the category.
 */
export async function getItems() {
  const { data } = await API.get('api/items');
  return data;
}

// /**
//  * Get all items matching the category.
//  */
// export async function getItems(category: string) {
//   const { data } = await API.get('api/items?category=' + category);
//   return data;
// }

/**
 * Get the item with the following id.
 *
 * @param {number} itemID the id of the item
 */
export async function getItem(itemID: number) {
  const { data } = await API.get(`api/items/${itemID}`);
  return data;
}

/**
 * Get the list of categories having at least one item.
 */
export async function getCategories() {
  const { data } = await API.get(`api/items/categories`);
  return data;
}

/**
 * Creates the item in the backend.
 *
 * @param {object} item the item to create
 */
export async function createItem(item: object) {
  return await API.post(`api/items`, item);
}
