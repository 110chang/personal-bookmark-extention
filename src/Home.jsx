import { Alert, Button, Form } from 'react-bootstrap'
import useHome from './useHome'

function Home() {
  const {
    error,
    message,
    tab,
    username,
    submitBookmark,
    updateTab,
  } = useHome()

  const onChange = (prop) => (e) => {
    updateTab({
      ...tab,
      [prop]: e.target.value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    submitBookmark(tab)
  }

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
