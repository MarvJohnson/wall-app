import { useNavigate } from 'react-router-dom';
import './styling.css';

export default function Nav() {
  const navigate = useNavigate();

  return (
    <nav className="flex-center-right">
      <button>Sign in</button>
      <p>Welcome User!</p>
    </nav>
  );
}
