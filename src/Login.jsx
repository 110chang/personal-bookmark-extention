import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
import useError from './lib/useError';

function useLogin() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const updateForm = (prop, value) => {
    setForm(prev => ({
      ...prev,
      [prop]: value,
    }))
  }

  return {
    form,
    updateForm,
  }
}

function Login() {
  const navigate = useNavigate()
  const { form, updateForm } = useLogin()
  const { error, updateError } = useError()

  const onChange = (prop) => (e) => {
    updateForm(prop, e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username: form.username, password: form.password }),
    })

    if (!res.ok) {
      updateError(`${res.status} ${res.statusText}`)
      return
    }

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
