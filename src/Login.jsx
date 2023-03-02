import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Form } from 'react-bootstrap'
import { logIn } from './lib/api'
import useAuth from './lib/useAuth'
import useError from './lib/useError'
import useForm from './lib/useForm'

function Login() {
  const navigate = useNavigate()
  const { loggedIn } = useAuth()
  const { form, updateForm } = useForm({ username: '', password: '' })
  const { error, updateError } = useError()

  const onChange = (prop) => (e) => {
    updateForm(prop, e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const res = await logIn(form)
    const json = await res.json()
    console.log(json.error)

    if (!res.ok) {
      updateError(json.error ? `${json.error}` : `${res.status} ${res.statusText}`)
      return
    }

    loggedIn(json.data)
    navigate('/')
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
