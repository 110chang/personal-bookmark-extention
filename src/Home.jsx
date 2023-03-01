import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
import useError from './lib/useError';

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

function useTab() {
  const [tab, setTab] = useState({
    title: '',
    url: '',
  })
  const [message, setMessage] = useState('')

  const updateTab = (prop, value) => {
    setTab(prev => ({
      ...prev,
      [prop]: value,
    }))
  }

  const clearTab = () => {
    setTab({
      title: '',
      url: '',
    })
  }

  const updateMessage = (message) => {
    setMessage(message)
  }

  // TODO: dom readyに移動またはauth guard追加
  useEffect(() => {
    ;(async function () {
      const tabs = await getCurrentTab()
      setTab(tabs[0])
    }())
  }, [])

  return {
    tab,
    message,
    clearTab,
    updateTab,
    updateMessage,
  }
}

function Home() {
  const navigate = useNavigate()
  const { error, updateError } = useError()
  const { tab, message, clearTab, updateTab, updateMessage } = useTab()

  const onChange = (prop) => (e) => {
    updateTab(prop, e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('http://127.0.0.1:5000/api/bookmarks', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ title: tab.title, url: tab.url }),
    })

    const json = await res.json()
    console.log(json)

    if (!res.ok) {
      updateError(`${res.status} ${res.statusText}`)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
      return
    }

    updateMessage('Successfully added.')
    clearTab()
  }

  return (
    <div className="Home">
      <h1>Home</h1>
      <Form className="d-flex flex-column" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" placeholder="Title" type="text" value={tab.title} onChange={onChange('title')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="url">
          <Form.Label>URL</Form.Label>
          <Form.Control name="url" placeholder="URL" type="text" value={tab.url} onChange={onChange('url')} />
        </Form.Group>
        {error ? (
          <Alert variant="danger">
            {error}
          </Alert>
        ) : null}
        <Button variant="primary" type="submit" className="mx-auto">
          Submit
        </Button>
        {message ? (
          <Alert variant="success" className="mt-3">
            {message}
          </Alert>
        ) : null}
      </Form>
    </div>
  )
}

export default Home
