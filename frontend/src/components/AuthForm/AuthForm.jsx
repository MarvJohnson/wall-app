import { Link } from 'react-router-dom';
import './styling.css';
import AuthInput from '../AuthInput/AuthInput';
import useFormState from '../../hooks/useFormState';
import LinedIndicator from '../LinedIndicator/LinedIndicator';

export default function AuthForm({
  className = '',
  title = 'Form',
  failureMessage = '',
  showFailureMessage = false,
  submitButtonText = 'Submit',
  onSubmitCallback = () => {},
  orOptionText = 'OrOption',
  orOptionPath = '',
  inputs = []
}) {
  const [state, updateState, resetState] = useFormState(
    inputs.reduce((initialState, nextInput) => {
      return {
        ...initialState,
        [nextInput.name]: nextInput.value
      };
    }, {})
  );

  function handleSubmit(event) {
    event.preventDefault();

    onSubmitCallback(state);
    resetState();
  }

  return (
    <form
      className={`${className} auth-form surface1 padded-medium rounding-medium`}
      onSubmit={handleSubmit}
    >
      <h3 className="no-margin">{title}</h3>
      {showFailureMessage && (
        <div className="flex-center fail-color">
          <p className="no-margin">{failureMessage}</p>
        </div>
      )}
      {inputs.map((input, idx) => (
        <AuthInput
          key={idx}
          label={input.label}
          name={input.name}
          type={input.type}
          value={state[input.name]}
          onChange={updateState}
        />
      ))}
      <button
        className="full-width no-border surface3 rounding-medium"
        type="submit"
      >
        {submitButtonText}
      </button>
      <LinedIndicator />
      <div className="flex-center">
        <Link to={orOptionPath}>{orOptionText}</Link>
      </div>
    </form>
  );
}
