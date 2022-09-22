import './styling.css';

export default function MessageContainer({ messages }) {
  return (
    <div className="message-container surface1 rounding-medium">
      {messages.map((message, idx) => (
        <p className="no-margin no-padding text1" key={idx}>
          {message.user}: {message.messageContent}
        </p>
      ))}
    </div>
  );
}
