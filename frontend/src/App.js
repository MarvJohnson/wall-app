import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import GlobalContext from './contexts/globalContext';
import {
  loginUser,
  logoutUser,
  registerUser,
  getAllMessages,
  sendMessage,
  getAuthenticatedUser
} from './services/api';

function App() {
  const [user, setUser] = useState(null);

  /**
   * Takes the credentials provided by the user and attempts to log them in using the api service.
   * @param {string} username - The user's account username.
   * @param {string} password - The user's account password.
   * @param {function} callback - The function to invoke after attempting to log the user in.
   */
  async function handleLoginUser(username, password, callback) {
    const loggedInUser = await loginUser(username, password);

    if (loggedInUser) setUser(loggedInUser);

    callback(loggedInUser);
  }

  async function handleLogoutUser() {
    await logoutUser();
    setUser(null);
  }

  async function handleGetAllMessages() {
    const response = await getAllMessages();

    return response;
  }

  useEffect(() => {
    getAuthenticatedUser().then((user) => {
      if (user) setUser(user);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        handleLogoutUser
      }}
    >
      <div className="App" data-theme="light">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleGetAllMessages={handleGetAllMessages}
                sendMessage={sendMessage}
              />
            }
          />
          <Route
            path="login_user"
            element={<Login handleLoginUser={handleLoginUser} />}
          />
          <Route
            path="register_user"
            element={<Register registerUser={registerUser} />}
          />
        </Routes>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
