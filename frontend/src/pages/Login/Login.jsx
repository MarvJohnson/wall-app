import './styling.css';
import LoginUserForm from '../../components/LoginUserForm/LoginUserForm';

export default function Login({ handleLoginUser }) {
  return (
    <main className="login-page flex-center vh-max">
      <LoginUserForm handleLoginUser={handleLoginUser} />
    </main>
  );
}
