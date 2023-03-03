import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearUser, getUser, saveUser } from '../lib/storage'
import { postBookmarks, refreshAuth } from '../lib/repository'
import useAuthAtom from '../stores/useAuthAtom'
import useTabAtom from '../stores/useTabAtom'
import useError from '../utils/useError'

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

    if (!res.ok) {
      if (res.status == 403) {
        loggedOut()
        clearUser()
        navigate('/login')
        return
      }
      updateError(res.error ? `${res.error}` : `${res.status} ${res.statusText}`)
      return
    }

    updateMessage('Successfully added.')
    updateError('')
    clearTab()
  }

  useEffect(() => {
    if (username) return

    ;(async function() {
      const savedUser = await getUser()
      console.log(savedUser)
      const res = await refreshAuth({ id: savedUser ? savedUser.id : '' })
      console.log(res)

      if (!res.ok) {
        loggedOut()
        clearUser()
        navigate('/login')
        return
      }

      saveUser(res.data)
      loggedIn(res.data)
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
