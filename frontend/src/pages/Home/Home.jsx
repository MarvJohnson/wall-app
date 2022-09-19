import { useEffect } from 'react';
import './styling.css';
import Client from '../../configs/axios';

export default function Home() {
  // Todo: THIS useEffect JUST FOR THE INITIAL COMMIT -- REPLACE WITH SOMETHING MEANINGFUL
  useEffect(() => {
    Client.get('/').then((data) => console.log(data));
  }, []);

  return <div></div>;
}
