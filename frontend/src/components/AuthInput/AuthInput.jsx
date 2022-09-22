import './styling.css';

export default function AuthInput({
  label,
  name = '',
  value,
  onChange,
  type = 'text'
}) {
  return (
    <div className="auth-input">
      <label>
        {label}
        <br />
        <input
          className="full-width"
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required
        />
      </label>
    </div>
  );
}
