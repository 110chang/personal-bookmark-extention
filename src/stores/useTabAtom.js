import { atom, useAtom } from 'jotai'

const tabAtom = atom({ title: '', url: '', tags: [] })

function useTabAtom() {
  const [tab, setTab] = useAtom(tabAtom)

  const updateTab = ({ title = '', url = '', tags = [] } = {}) => {
    setTab({ title, url, tags })
  }

  const toggleTag = (tagId) => {
    console.log(tab)
    if (tab.tags.find(tag => tag == tagId)) {
      setTab({
        ...tab,
        tags: tab.tags.filter(tag => tag !== tagId),
      })
      return
    }
    setTab({
      ...tab,
      tags: tab.tags.concat([tagId]),
    })
  }

  const clearTab = () => {
    setTab({ title: '', url: '', tags: [] })
  }

  return {
    tab,
    toggleTag,
    updateTab,
    clearTab,
  }
}

export default useTabAtom
