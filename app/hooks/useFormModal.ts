'use client'

import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AdvisorsContext } from '../context'
import { Advisor } from '../types'
import { isValidEmail } from '../utils'

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
	type: 'createUser' | 'updateUser'
}

export enum Action {
  createUser,
  updateUser,
}

const useFormModal = ({ isSetOpenModal, type }: Props) => {

  const [formValues, setFormValues] = useState(initialValue)
  const { name, id, income, email, phone, address } = formValues
  const [error, setError] = useState<{ [key: string]: string }>({})
  const { createNewAdvisor, hasError, advisorById, updateAdvisor } = useContext(AdvisorsContext)
  const [successMsg, setsuccessMsg] = useState<string>('')


  const formValuesItems = [
    { type: 'text', label: 'Name', value: name, name: 'name' },
    { type: 'text', label: 'ID Number', value: id, name: 'id' },
    { type: 'number', label: 'Income', value: income, name: 'income' },
    { type: 'text', label: 'Email', value: email, name: 'email' },
    { type: 'text', label: 'Phone', value: phone, name: 'phone' },
    { type: 'text', label: 'Address', value: address, name: 'address' }
  ]

  useEffect(() => {
    if (type === Action[0]) {
      setFormValues(initialValue)
    } else if (advisorById) {
      setFormValues(advisorById as Advisor)
    }
  }, [type, advisorById])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (successMsg) {
      timeoutId = setTimeout(() => {
        isSetOpenModal(false)
        setsuccessMsg('')
      }, 3000)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [successMsg, isSetOpenModal])

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
      if (name === 'email' && !isValidEmail(value as string)) {
        isValid = false
        errors[name] = 'Please enter a valid email address'
      }
    })

    return { isValid, errors }
  }

  const onHandleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError({})
		
    const { errors } = validateForm()
    const isCreatingAdvisor = type === Action[0]
    const isUpdatingAdvisor = type === Action[1]

    if (isCreatingAdvisor) {
      createNewAdvisor(formValues)
      setFormValues(initialValue)
      setsuccessMsg('You can view or edit the advisor details now.')
    } else if (isUpdatingAdvisor) {
      updateAdvisor(formValues)
      setFormValues(initialValue)
      setsuccessMsg('The advisor details have been updated successfully.')
    } else {
      setError(errors)
      return
    }
  }

  return {
    formValuesItems,
    error,
    hasError,
    successMsg,
    setFormValues,
    onChangeValue,
    onHandleSubmit
  }
}
export default useFormModal