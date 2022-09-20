/**
 * The base url used by the axios "Client" instance.
 */
export const BASE_URL =
  process.env.REACT_APP_ENVIRONMENT === 'dev'
    ? 'http://127.0.0.1:8000/api/v1'
    : `${window.location}api/v1`;
