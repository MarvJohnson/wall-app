import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styling.css';
import AuthForm from '../AuthForm/AuthForm';

export default function RegisterUserForm({ registerUser }) {
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(state) {
    const successfullyRegistered = await registerUser(
      state.email,
      state.username,
      state.password
    );

    if (successfullyRegistered) navigate('/login_user');
    else setShowFailureMessage(true);
  }

  return (
    <AuthForm
      className="register-user-form"
      title="Register"
      orOptionText="Login"
      orOptionPath="/login_user"
      failureMessage="Failed registration!"
      showFailureMessage={showFailureMessage}
      submitButtonText="Register"
      onSubmitCallback={handleSubmit}
      inputs={[
        {
          label: 'Email',
          name: 'email',
          type: 'email',
          value: ''
        },
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
