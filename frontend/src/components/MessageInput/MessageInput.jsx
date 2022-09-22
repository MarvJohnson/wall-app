import { useState } from 'react';
import './styling.css';

export default function MessageInput({ onSubmit }) {
  const [newMessage, setNewMessage] = useState('');

  function handleChange(event) {
    setNewMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(newMessage);
    setNewMessage('');
  }

  return (
    <form
      className="message-input rounding-medium surface2"
      onSubmit={handleSubmit}
    >
      <input
        className="surface2"
        type="text"
        placeholder="Enter message here..."
        value={newMessage}
        onChange={handleChange}
      />
      <button className="surface3 bright-hover" type="submit">
        send
      </button>
    </form>
  );
}
