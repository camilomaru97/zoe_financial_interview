'use client'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { formatIncomeValue, incomeCleanRegex } from '../utils'

const useIncomeValue = () => {

  const [error, setError] = useState<string | null>(null)
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false)
  const [income, setIncome] = useState<string>('')
  const useNavigation = useRouter() 

  const VALID_INPUTS = {
    maxLength: 6
  }

  const handleIncomeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const formattedValue = formatIncomeValue(event.target.value)
    setIncome(formattedValue)
  }

  const onHandleSubmit = (event: ChangeEvent<HTMLFormElement>):void => {
    event.preventDefault()
    const cleanedValue = income.replace(incomeCleanRegex, '') 
    if (!cleanedValue || cleanedValue.length !== VALID_INPUTS.maxLength) {
      setError('6 digits are the required length')
      setIsErrorVisible(true)
    } else {
      useNavigation.push(`/list-advisors?query=${cleanedValue}`)
    }
  }

  const handleCloseError = () => {
    setIsErrorVisible(false)
    setError(null)
  }

  return {
    income,
    error,
    isErrorVisible,
    handleIncomeChange,
    handleCloseError,
    onHandleSubmit
  }
}
export default useIncomeValue
