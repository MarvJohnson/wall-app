import './styling.css';

export default function MessageInput() {
  /**
   * Sends the contents of a user's message to the backend to be processed.
   * @param {object} event - The event corrosponding to the submission of the message-input form.
   */
  function handleSubmit(event) {
    event.preventDefault();
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
      />
      <button className="surface3 bright-hover" type="submit">
        send
      </button>
    </form>
  );
}
