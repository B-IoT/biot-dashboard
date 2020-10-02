import axios from 'axios';

const API_URL = 'TODO';
const API_KEY = process.env.REACT_APP_KONTAKT_API_KEY;

const API = axios.create({
  baseURL: API_URL,
  // TODO probably add headers
});

export async function getItemsPositions() {
  try {
    // TODO  const { data } = await axios.get();
  } catch (error) {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
    } else {
      // Something happened in setting up the request and triggered an Error
    }
  }
}
