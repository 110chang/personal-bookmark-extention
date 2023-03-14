import { Alert, Button, Form } from 'react-bootstrap'
import useHome from './useHome'

function Home() {
  const {
    error,
    tab,
    tags,
    username,
    submitBookmark,
    toggleTag,
    updateTab,
  } = useHome()

  const onChange = (prop) => (e) => {
    updateTab({
      ...tab,
      [prop]: e.target.value,
    })
  }

  const onTagChanged = (e) => {
    toggleTag(e.target.value)
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

        {tags.length == 0 ? null : (
          <Form.Group className="mb-3" controlId="tags">
            {tags.map(tag => (
              <Form.Check
                key={`tags-${tag.id}`}
                id={`tags-${tag.id}`}
                name="tags"
                checked={tag.checked}
                inline
                label={tag.tagname}
                type="checkbox"
                value={tag.id}
                onChange={onTagChanged}
              />
            ))}
          </Form.Group>
        )}

        {error ? (
          <Alert variant="danger">
            {error}
          </Alert>
        ) : null}
        <Button variant="primary" type="submit" className="mx-auto">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Home
