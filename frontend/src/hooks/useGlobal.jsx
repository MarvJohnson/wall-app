import { useContext } from 'react';
import GlobalContext from '../contexts/globalContext';

export default function useGlobal() {
  const globalContext = useContext(GlobalContext);

  return globalContext;
}
