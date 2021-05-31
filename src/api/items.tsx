import axios from 'axios';
import { convertDate, Item } from '../utils/items';

const API = axios.create({ baseURL: 'https://api.b-iot.ch:8080' });

export function fetchToken() {
  const token = localStorage.getItem('token');
  API.defaults.headers.common = { Authorization: 'Bearer ' + token };
}

/**
 * Request the authentication token
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
  fetchToken();
  const params = {
    params: {
      category: category,
    },
  };
  const { data } = await API.get('api/items', params);
  return data;
}

/**
 * Get all items.
 */
export async function getItems() {
  fetchToken();
  const { data } = await API.get('api/items');
  return data;
}

/**
 * Get the item with the following id.
 *
 * @param {number} itemID the id of the item
 */
export async function getItem(itemID: number) {
  fetchToken();
  const { data } = await API.get(`api/items/${itemID}`);
  return data;
}

/**
 * Get the list of categories having at least one item.
 */
export async function getCategories() {
  fetchToken();
  const { data } = await API.get(`api/items/categories`);
  return data;
}

/**
 * Creates the item in the backend.
 *
 * @param {object} item the item to create
 */
export async function createItem(item: object) {
  fetchToken();
  return await API.post(`api/items`, item);
}

/**
 * Updates the item in the backend.
 *
 * @param {number} id the id of the item
 * @param {object} item the item to update
 */
export async function updateItem(id: number, item: Item) {
  fetchToken();
  return await API.put(`api/items/` + id, cleanItem(item));
}

/**
 * Cleans the given item, removing null fields and formatting purchaseDate and purchasePrice.
 *
 * @param item the item to clean
 * @returns the item cleaned
 */
export function cleanItem(item: Item): Record<string, unknown> {
  // Remove null fields
  const clean = Object.fromEntries(Object.entries(item).filter(([_, v]) => v != null));

  if (clean.purchaseDate) {
    // Extract date-only ISO string
    const date = convertDate(clean.purchaseDate);
    if (date) clean.purchaseDate = date.toISOString().split('T')[0];
  }

  if (clean.purchasePrice) {
    // Extract purchasePrice as float (was already validated before)
    clean.purchasePrice = parseFloat(clean.purchasePrice);
  }

  return clean;
}