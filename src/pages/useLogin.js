import { useNavigate } from 'react-router-dom'
import { saveUser } from '../lib/storage'
import { logIn } from '../lib/repository'
import useAuthAtom from '../stores/useAuthAtom'
import useError from '../utils/useError'
import useForm from '../utils/useForm'

function useLogin() {
  const navigate = useNavigate()
  const { loggedIn } = useAuthAtom()
  const { form, updateForm } = useForm({ username: '', password: '' })
  const { error, updateError } = useError()

  const submitFrom = async ({ username = '', password = '' }) => {
    const res = await logIn({ username, password })

    if (!res.ok) {
      updateError(res.error ? `${res.error}` : `${res.status} ${res.statusText}`)
      return
    }

    saveUser(res.data)
    loggedIn(res.data)
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
