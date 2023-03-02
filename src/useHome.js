import { useState } from 'react'

function useHome() {
  const [message, setMessage] = useState('')

  const updateMessage = (message) => {
    setMessage(message)
  }

  return {
    message,
    updateMessage,
  }
}

export default useHome
