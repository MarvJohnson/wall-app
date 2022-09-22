import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling.css';
import AuthForm from '../AuthForm/AuthForm';

export default function LoginUserForm({ handleLoginUser }) {
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(state) {
    await handleLoginUser(state.username, state.password, handleLoginResponse);
  }

  function handleLoginResponse(user) {
    if (user) navigate('/');
    else setShowFailureMessage(true);
  }

  return (
    <AuthForm
      className="login-user-form"
      title="Login"
      orOptionText="Register"
      orOptionPath="/register_user"
      failureMessage="Login failed!"
      showFailureMessage={showFailureMessage}
      submitButtonText="Login"
      onSubmitCallback={handleSubmit}
      inputs={[
        {
          label: 'Username',
          name: 'username',
          value: ''
        },
        {
          label: 'Password',
          name: 'password',
          type: 'password',
          value: ''
        }
      ]}
    />
  );
}
