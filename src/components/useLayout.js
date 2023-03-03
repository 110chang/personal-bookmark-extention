import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { clearUser } from '../lib/storage'
import { logOut as apiLogOut } from '../lib/repository'
import { getCurrentTab } from '../lib/extention/tab'
import useAuthAtom from '../stores/useAuthAtom'
import useTabAtom from '../stores/useTabAtom'

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

    clearUser()
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
