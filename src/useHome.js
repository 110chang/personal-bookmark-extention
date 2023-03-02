import { useEffect, useState } from 'react'
import useForm from './lib/useForm'

async function getCurrentTab() {
  if (!chrome || !chrome.tabs) {
    return [{
      title: 'Dummy Title',
      url: 'http://example.com',
    }]
  }
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  return tabs[0]
}

function useHome() {
  const { form, clearForm, initForm, updateForm } = useForm({ title: '', url: '' })
  const [message, setMessage] = useState('')

  const updateMessage = (message) => {
    setMessage(message)
  }

  useEffect(() => {
    ;(async function () {
      const tabs = await getCurrentTab()
      console.log(tabs)
      initForm(tabs[0] || { title: '', url: '' })
    }())
  }, [])

  return {
    form,
    message,
    clearForm,
    updateForm,
    updateMessage,
  }
}

export default useHome
