import { useNavigate } from 'react-router-dom'
import { logIn } from './lib/api'
import useAuthAtom from './lib/useAuthAtom'
import useError from './lib/useError'
import useForm from './lib/useForm'

function useLogin() {
  const navigate = useNavigate()
  const { loggedIn } = useAuthAtom()
  const { form, updateForm } = useForm({ username: '', password: '' })
  const { error, updateError } = useError()

  const submitFrom = async ({ username = '', password = '' }) => {
    const res = await logIn({ username, password })
    const json = await res.json()

    if (!res.ok) {
      updateError(json.error ? `${json.error}` : `${res.status} ${res.statusText}`)
      return
    }

    loggedIn(json.data)
    navigate('/')
  }

  return {
    error,
    form,
    updateForm,
    submitFrom,
  }
}

export default useLogin
