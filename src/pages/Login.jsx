import { Alert, Button, Form } from 'react-bootstrap'
import useLogin from './useLogin'

function Login() {
  const {
    error,
    form,
    updateForm,
    submitFrom,
  } = useLogin()

  const onChange = (prop) => (e) => {
    updateForm(prop, e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    submitFrom(form)
  }

  return (
    <div className="Login">
      <h1>Login</h1>
      <Form className="d-flex flex-column" onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control name="username" placeholder="Username" type="text" value={form.username} onChange={onChange('username')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" placeholder="Password" type="password" value={form.password} onChange={onChange('password')} />
        </Form.Group>
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

export default Login
