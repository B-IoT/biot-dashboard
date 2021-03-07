import axios from 'axios';

const API_URL = 'https://api.b-iot.ch:8080';
const API = axios.create({
  baseURL: API_URL,
});
const credentials = {
  username: 'andrea',
  password: 'andrea',
};
API.post('/oauth/token', credentials).then(
  (response) =>
    (API.defaults.headers.common = { Authorization: `Bearer ${response.data}` })
);

/**
 * Get all items (limited to the first 100).
 */
export async function getItems() {
  const { data } = await API.get('api/items');
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
