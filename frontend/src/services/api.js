import Client from '../configs/axios';

/**
 * Makes a call to the backend api to fetch any messages stored in the database.
 * @returns An array of all the messages currently stored in the database on the backend.
 */
export async function getAllMessages() {
  try {
    const response = await Client.get('messages/');
    const fetchedMessages = JSON.parse(response.data);

    return fetchedMessages;
  } catch (err) {
    console.log('Failed to fetch all messages!', err);

    return [];
  }
}

/**
 * Takes the message the user wrote and makes a post request to the backend to have it stored in the database.
 * @param {string} message - A string representing a message the user wrote, or an error if the message failed to be sent.
 */
export async function sendMessage(message) {
  try {
    const response = await Client.post('messages/new/', {
      messageContent: message
    });
    const newlyCreatedMessage = response.data;

    return newlyCreatedMessage;
  } catch (err) {
    console.log(`Failed to send message [${message}]`, err);

    return '[Error] Failed to send message!';
  }
}

/**
 * Makes a call to the backend api to attempt to log the user in with the credentials they've provided.
 * @param {string} username - The user's account username.
 * @param {string} password - The user's account password.
 * @returns The user object belonging to the logged in user, or null if the provided credentials were invalid.
 */
export async function loginUser(username, password) {
  try {
    const response = await Client.post('auth/login_user/', {
      username,
      password
    });
    const user = JSON.parse(response.data);

    return user;
  } catch (err) {
    console.log('Failed to log in with the credentials provided!', err);

    return null;
  }
}

/**
 * Makes a call to the backend api to attempt to log the user out. This will delete their session data and update components
 * that are rendered based on user authentication.
 */
export async function logoutUser() {
  await Client.post('auth/logout_user/');
}

/**
 * Makes a call to the backend api to attempt to register a new account with the credentials the user provided.
 * @param {string} email - The email the user would like to use to register their account.
 * @param {string} username - The username the user would like to use to register their account.
 * @param {string} password - The password the user would like to use to register their account.
 * @returns A boolean representing the success/failure of the user's attempt to register a new account.
 */
export async function registerUser(email, username, password) {
  try {
    const response = await Client.post('auth/register_user/', {
      email,
      username,
      password
    });
    const successfullyRegistered = response.status === 201;

    return successfullyRegistered;
  } catch (err) {
    console.log('Failed to register as a new user!', err);

    return false;
  }
}
