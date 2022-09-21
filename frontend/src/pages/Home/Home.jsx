import './styling.css';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import MessageContainer from '../../components/MessageContainer/MessageContainer';
import MessageInput from '../../components/MessageInput/MessageInput';

export default function Home() {
  return (
    <div className="home-page">
      <Nav />
      <main className="flex-center">
        <div>
          <MessageContainer />
          <MessageInput />
        </div>
      </main>
      <Footer />
    </div>
  );
}
