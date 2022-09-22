import { useNavigate } from 'react-router-dom';
import './styling.css';
import useGlobal from '../../hooks/useGlobal';

export default function Nav() {
  const navigate = useNavigate();
  const globalContext = useGlobal();

  function handleClickLogin() {
    navigate('/login_user');
  }

  async function handleClickLogout() {
    globalContext.handleLogoutUser();
  }

  return (
    <nav className="flex-center-right">
      {!globalContext.user ? (
        <button className="rounded-button" onClick={handleClickLogin}>
          Login
        </button>
      ) : (
        <div>
          <p className="no-margin">Welcome, {globalContext.user.username}!</p>
          <button className="rounded-button" onClick={handleClickLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
