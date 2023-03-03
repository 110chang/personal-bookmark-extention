import { atom, useAtom } from 'jotai'

const authAtom = atom(null)

function useAuthAtom() {
  const [auth, setAuth] = useAtom(authAtom)
  const id = auth ? auth.id : ''
  const username = auth ? auth.username : ''

  const loggedIn = (data) => {
    console.log(data)
    setAuth(data)
  }

  const loggedOut = () => {
    setAuth(null)
  }

  return {
    id,
    username,
    isLoggedIn: id && username,
    loggedIn,
    loggedOut,
  }
}

export default useAuthAtom
