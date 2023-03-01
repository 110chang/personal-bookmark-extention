import { useState } from 'react';

function useError() {
  const [error, setError] = useState('')

  const updateError = (error) => {
    setError(error)
  }

  return {
    error,
    updateError,
  }
}

export default useError
