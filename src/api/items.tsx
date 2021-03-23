import axios from 'axios';

const API = axios.create({ baseURL: 'https://api.b-iot.ch:8080' });
const credentials = {
  username: 'andrea',
  password: 'andrea',
};

const token = localStorage.getItem('token');
if (token === null) {
  API.post('/oauth/token', credentials).then((response) => {
    localStorage.setItem('token', response.data);
    API.defaults.headers.common = { Authorization: 'Bearer ' + response.data };
  });
} else {
  API.defaults.headers.common = { Authorization: 'Bearer ' + token };
}

/**
 * Get all items matching the category.
 */
export async function getItemsByCategory(category: string) {
  const params = {
    params: {
      category: category,
    },
  };
  const { data } = await API.get('api/items', params);
  return data;
}

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
