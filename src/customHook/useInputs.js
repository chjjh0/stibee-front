import { useState, useCallback } from 'react';

function useInputs(inittialState) {
  const [state, setState] = useState(inittialState);

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setState(state => ({
      ...state,
      [name]: value
    }))
  }, [])

  return [state, onChange]
}

export default useInputs;