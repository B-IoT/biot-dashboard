import axios from 'axios';
import { Category, convertDate, Item } from '../utils/items';

export const SERVER_URL = 'http://localhost:8080';
export const REFETCH_INTERVAL = 3000;
const API = axios.create({ baseURL: SERVER_URL });

/**
 * Fetches the token from the local storage and returns it.
 *
 * @return the auth token
 */
export function fetchToken() {
  const token = localStorage.getItem('token');
  API.defaults.headers.common = { Authorization: 'Bearer ' + token };
  return token;
}

/**
 * Requests the authentication token.
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
    localStorage.setItem('username', username);
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
 * Get the user information.
 */
export async function getUserInfo() {
  fetchToken();
  const { data } = await API.get('api/users/me');
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
 * Get the list of categories.
 */
export async function getCategories(): Promise<Array<Category>> {
  fetchToken();
  const { data } = await API.get(`api/items/categories`);
  return data;
}

/**
 * Creates the item in the backend.
 *
 * @param {object} item the item to create
 */
export async function createItem(item: Item) {
  fetchToken();
  delete item.id;
  return await API.post(`api/items`, cleanItem(item));
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
 * Deletes the item in the backend.
 *
 * @param {number} id the id of the item
 */
export async function deleteItem(id: number) {
  fetchToken();
  return await API.delete(`api/items/` + id);
}

/**
 * Cleans the given item, removing null fields and formatting purchaseDate and purchasePrice.
 *
 * @param item the item to clean
 * @returns the item cleaned
 */
export function cleanItem(item: Item): Record<string, unknown> {
  function cleanDate(date: string) {
    const cleanDate = convertDate(date);
    if (cleanDate) {
      cleanDate.setDate(cleanDate.getDate() + 1);
      return cleanDate;
    }
    return null;
  }

  function parseDate(date: Date) {
    return date.toISOString().split('T')[0];
  }

  // Remove null fields
  const clean = Object.fromEntries(
    Object.entries(item).filter(([_, v]) => v !== null)
  );

  if (clean.purchaseDate) {
    // Extract date-only ISO string
    const date = cleanDate(clean.purchaseDate);
    if (date) clean.purchaseDate = parseDate(date);
  }

  if (clean.maintenanceDate) {
    // Extract date-only ISO string
    const date = cleanDate(clean.maintenanceDate);
    if (date) clean.maintenanceDate = parseDate(date);
  }

  clean.lastModifiedDate = parseDate(new Date());

  // Extract purchasePrice as float (was already validated before)
  clean.purchasePrice =
    clean.purchasePrice && clean.purchasePrice !== ''
      ? parseFloat(clean.purchasePrice)
      : 0;

  return clean;
}
