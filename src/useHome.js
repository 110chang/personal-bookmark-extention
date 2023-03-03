import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthAtom from './lib/useAuthAtom'
import useError from './lib/useError'
import useTabAtom from './lib/useTabAtom'
import { postBookmarks, refreshAuth } from './lib/api'
import { getUser } from './lib/storage'

function useHome() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const { username, loggedIn, loggedOut } = useAuthAtom()
  const { error, updateError } = useError()
  const { tab, updateTab, clearTab } = useTabAtom()

  const updateMessage = (message) => {
    setMessage(message)
  }

  const submitBookmark = async ({ title = '', url = '' }) => {
    const res = await postBookmarks({ title, url })
    const json = await res.json()

    if (!res.ok) {
      if (res.status == 403) {
        loggedOut()
        navigate('/login')
        return
      }
      updateError(json.error ? `${json.error}` : `${res.status} ${res.statusText}`)
      return
    }

    updateMessage('Successfully added.')
    clearTab()
  }

  useEffect(() => {
    console.log(username)
    if (username) return

    ;(async function() {
      const savedUser = await getUser()
      console.log(savedUser)
      const res = await refreshAuth({ id: savedUser ? savedUser.id : '' })
      const json = await res.json()

      if (!res.ok) {
        loggedOut()
        navigate('/login')
        return
      }

      loggedIn(json.data)
    }())
  }, [username])

  return {
    error,
    message,
    tab,
    username,
    clearTab,
    loggedIn,
    loggedOut,
    submitBookmark,
    updateError,
    updateMessage,
    updateTab,
  }
}

export default useHome
