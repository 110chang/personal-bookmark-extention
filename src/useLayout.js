import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { logOut as apiLogOut } from './lib/repository'
import { getCurrentTab } from './lib/chromeTab'
import useAuthAtom from './lib/useAuthAtom'
import useTabAtom from './lib/useTabAtom'

function useLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn, loggedOut } = useAuthAtom()
  const { updateTab } = useTabAtom()

  const logOut = async () => {
    const res = await apiLogOut()

    if (!res.ok) {
      console.error('logout failed')
    }

    loggedOut()
    navigate('/login');
  }

  useEffect(() => {
    ;(async function () {
      const tab = await getCurrentTab()
      updateTab(tab || { title: '', url: '' })
    }())
  }, [location])

  return {
    isLoggedIn,
    logOut,
  }
}

export default useLayout
