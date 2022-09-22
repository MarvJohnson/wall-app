import './styling.css';
import RegisterUserForm from '../../components/RegisterUserForm/RegisterUserForm';

export default function Register({ registerUser }) {
  return (
    <main className="register-page flex-center vh-max">
      <RegisterUserForm registerUser={registerUser} />
    </main>
  );
}
