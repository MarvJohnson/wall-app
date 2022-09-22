import { useState, useRef } from 'react';

export default function useFormState(...initialState) {
  const cachedInitialState = useRef({
    ...initialState
  });
  const [state, setState] = useState({
    ...cachedInitialState.current[0]
  });

  function updateState(event) {
    const target = event.target;
    const fieldName = target.name;
    const fieldValue = target.value;
    const finalState = {
      ...state,
      [fieldName]: fieldValue
    };

    setState(finalState);
  }

  function resetState() {
    const finalState = {
      ...cachedInitialState.current[0]
    };

    setState(finalState);
  }

  return [state, updateState, resetState];
}
