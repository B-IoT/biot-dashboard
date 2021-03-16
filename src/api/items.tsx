import axios from 'axios';

const API_URL = 'https://api.b-iot.ch:8080';
const API = axios.create({
  baseURL: API_URL,
});
const credentials = {
  username: 'andrea',
  password: 'andrea',
};

async function getToken() {
  if (localStorage.getItem('token') === null) {
    const { data } = await API.post('/oauth/token', credentials);
    localStorage.setItem('token', data);
  }

  // Set headers -> return token
  API.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}

/**
 * Get all items matching the category.
 */
export async function getItems() {
  await getToken();
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
  await getToken();
  const { data } = await API.get(`api/items/${itemID}`);
  return data;
}

/**
 * Get the list of categories having at least one item.
 */
export async function getCategories() {
  await getToken();
  const { data } = await API.get(`api/items/categories`);
  return data;
}

/**
 * Creates the item in the backend.
 *
 * @param {object} item the item to create
 */
export async function createItem(item: object) {
  await getToken();
  return await API.post(`api/items`, item);
}
