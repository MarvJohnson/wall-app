import { useState, useEffect } from 'react';
import './styling.css';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import MessageContainer from '../../components/MessageContainer/MessageContainer';
import MessageInput from '../../components/MessageInput/MessageInput';
import useGlobal from '../../hooks/useGlobal';

export default function Home({ handleGetAllMessages, sendMessage }) {
  const [messages, setMessages] = useState([]);
  const globalContext = useGlobal();

  async function handleSubmitMessage(newMessage) {
    if (!globalContext.user) return;

    const addedMessage = await sendMessage(newMessage);
    const newMessages = [...messages, addedMessage];
    setMessages(newMessages);
  }

  useEffect(() => {
    handleGetAllMessages().then((fetchedMessages) => {
      setMessages(fetchedMessages);
    });
  }, []);

  return (
    <div className="home-page vh-max">
      <Nav />
      <main className="flex-center">
        <div>
          <MessageContainer messages={messages} />
          {globalContext.user && (
            <MessageInput onSubmit={handleSubmitMessage} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
