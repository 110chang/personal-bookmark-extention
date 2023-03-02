import { atom, useAtom } from 'jotai'
import { clearUser, saveUser } from './storage'

const authAtom = atom(null)

function useAuth() {
  const [auth, setAuth] = useAtom(authAtom)
  const id = auth ? auth.id : ''
  const username = auth ? auth.username : ''

  const loggedIn = (data) => {
    setAuth(data)
    saveUser(data)
  }

  const loggedOut = () => {
    setAuth(null)
    clearUser()
  }

  return {
    id,
    username,
    loggedIn,
    loggedOut,
  }
}

export default useAuth
