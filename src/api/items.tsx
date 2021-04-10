import axios from 'axios';

const API = axios.create({ baseURL: 'https://api.b-iot.ch:8080' });
const token = localStorage.getItem('token');
const tokenDate = localStorage.getItem('tokenDate');

// Check if token exists and if it is younger than 6 days (in milliseconds)
if (
  token === null ||
  tokenDate === null ||
  Date.now() - parseInt(tokenDate) > 518400000
) {
  // Route to login page
} else {
  API.defaults.headers.common = { Authorization: 'Bearer ' + token };
}

/**
 * Get all items matching the category.
 */
export async function authenticate(username: string, password: string) {
  const credentials = {
    username: username,
    password: password,
  };

  try {
    const { data } = await API.post('/oauth/token', credentials);
    localStorage.setItem('token', data);
    localStorage.setItem('tokenDate', Date.now().toString());
    API.defaults.headers.common = { Authorization: 'Bearer ' + data };

    return true;
  } catch (error) {
    return false;
  }
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
