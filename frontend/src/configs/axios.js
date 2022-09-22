import axios from 'axios';
import { BASE_URL } from '../global';

/**
 * A pre-configured axios instance for ajax requests.
 */
const Client = new axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default Client;
