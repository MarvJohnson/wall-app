import axios from 'axios';
import { BASE_URL } from '../global';

const Client = new axios.Axios({
  baseURL: BASE_URL
});

export default Client;
