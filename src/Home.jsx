import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Form } from 'react-bootstrap'
import { refreshAuth, postBookmarks } from './lib/api'
import { getUser } from './lib/storage'
import useAuthAtom from './lib/useAuthAtom'
import useError from './lib/useError'
import useTabAtom from './lib/useTabAtom'
import useHome from './useHome'

function Home() {
  const navigate = useNavigate()
  const { username, loggedIn, loggedOut } = useAuthAtom()
  const { error, updateError } = useError()
  const { message, updateMessage } = useHome()
  const { tab, updateTab, clearTab } = useTabAtom()

  const onChange = (prop) => (e) => {
    updateTab({
      ...tab,
      [prop]: e.target.value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const res = await postBookmarks(tab)
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

  return (
    <div className="Home">
      <h1>Hello, {username}</h1>
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
