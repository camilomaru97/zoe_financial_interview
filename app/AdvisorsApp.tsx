'use client'

import ErrorMessage from './components/ErrorMessage'
import useIncomeValue from './hooks/useIncomeValue'
import './advisor.css'
import Image from 'next/image'

export default function AdvisorsApp() {

  const {
    error,
    income,
    isErrorVisible,
    handleIncomeChange,
    handleCloseError,
    onHandleSubmit
  } = useIncomeValue()

  return (
    <>
      <main className="advisor_value_container">
        <header>
          <Image alt='zoefin-logo' width='110' height='110' src="https://zoefin.com/wp-content/uploads/2020/01/zoe_logo_primary.svg"/>
          <h3>Find Your Company Advisors!</h3>
          <p>Search by income to find advisors</p>
        </header>
        <form
          className='current_income_value'
          onSubmit={onHandleSubmit}
        >
          <label>Current Income</label>
          <input 
            type="text"
            value={income}
            onChange={handleIncomeChange}
          />
          <button className="btn_search"
            type="submit"
          >
						Search Now
          </button>
        </form>
      </main>
      <ErrorMessage
        message={error ?? ''}
        isVisible={isErrorVisible}
        onClose={handleCloseError}
        duration={5000}
      />
    </>
  )
}
