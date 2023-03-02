import { atom, useAtom } from 'jotai'
import { clearUser, saveUser } from './storage'

const tabAtom = atom({ title: '', url: '' })

function useTabAtom() {
  const [tab, setTab] = useAtom(tabAtom)

  const updateTab = ({ title = '', url = '' } = {}) => {
    setTab({ title, url })
  }

  const clearTab = () => {
    setTab({ title: '', url: '' })
  }

  return {
    tab,
    updateTab,
    clearTab,
  }
}

export default useTabAtom
