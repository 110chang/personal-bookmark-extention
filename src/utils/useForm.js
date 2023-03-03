import { useState } from 'react'

function useForm(defaultValues = {}) {
  const [form, setForm] = useState(defaultValues)

  const initForm = (values) => {
    setForm(values)
  }

  const updateForm = (prop, value) => {
    setForm(prev => ({
      ...prev,
      [prop]: value,
    }))
  }

  const clearForm = () => {
    setForm(defaultValues)
  }

  return {
    form,
    initForm,
    clearForm,
    updateForm,
  }
}

export default useForm
