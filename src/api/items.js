import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const API = axios.create({
  baseURL: API_URL,
  // TODO probably add headers (for auth)
});

/**
 * Get all items (limited to the first 100).
 */
export async function getItems() {
  const { data } = await API.get('/items');
  return data;
}

/**
 * Get the item with the following id.
 *
 * @param {string} _key "item"
 * @param {number} itemID the id of the item
 */
export async function getItem(_key, itemID) {
  const { data } = await API.get(`/items/${itemID}`);
  return data;
}
