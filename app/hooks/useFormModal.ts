'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { AdvisorsContext } from '../context'
import { Advisor } from '../types'

const initialValue:Advisor = {
  avatar: '',
  name: '',
  id: '',
  income: 0,
  email: '',
  phone: '',
  address: '',
}

interface Props {
  isSetOpenModal: (value: boolean) => void
}

const useFormModal = ({ isSetOpenModal }: Props) => {

  const [formValues, setFormValues] = useState(initialValue)
  const { name, id, income, email, phone, address } = formValues
  const [error, setError] = useState<{ [key: string]: string }>({})
  const { createNewAdvisor, hasError } = useContext(AdvisorsContext)
  const [successMessageVisible, setSuccessMessageVisible] = useState<boolean>(false)

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
    setError((prevErrors) => ({ ...prevErrors, [name]: '' }))
  }

  const validateForm = () => {
    let isValid = true
    const errors: { [key: string]: string } = {}

    formValuesItems.forEach(item => {
      const { name, value } = item
      if (!value) {
        isValid = false
        errors[name] = `${name} is required`
      }
    })

    return { isValid, errors }
  }

  const formValuesItems = [
    { type: 'text', label: 'Name', value: name, name: 'name' },
    { type: 'text', label: 'ID Number', value: id, name: 'id' },
    { type: 'number', label: 'Income', value: income, name: 'income' },
    { type: 'text', label: 'Email', value: email, name: 'email' },
    { type: 'text', label: 'Phone', value: phone, name: 'phone' },
    { type: 'text', label: 'Address', value: address, name: 'address' }
  ]

  const onHandleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError({})
    const { isValid, errors } = validateForm()
    if (isValid) {
      setFormValues(initialValue)
      createNewAdvisor(formValues)
      setSuccessMessageVisible(true)
      setTimeout(() => {
        setSuccessMessageVisible(false)
        isSetOpenModal(false)
      }, 5000)
			
    } else {
      setError(errors)
    }
  }


  return {
    formValuesItems,
    successMessageVisible,
    error,
    hasError,
    onChangeValue,
    onHandleSubmit
  }
}
export default useFormModal