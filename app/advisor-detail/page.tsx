'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect } from 'react'
import AdvisorInfo from './components/AdvisorDetails'
import { Advisor } from '../types'
import { AdvisorsContext } from '../context/advisors/AdvisorsContext'
import './advisor-detail.css'
import LoadingSpinner from '../components/LoadingSpinner'

const AdvisorDetails = () => {

  const useNavigation = useRouter() 
  const searchParams = useSearchParams()
  const userId = searchParams.get('query') || undefined

  const { searchAdvisorById, isLoading, hasError, advisorById } = useContext(AdvisorsContext)
  const advisorData: Advisor | null = Array.isArray(advisorById) ? advisorById[0] : advisorById

  useEffect(() => {
    if (!userId) {
      useNavigation.push('/')
    }
    searchAdvisorById(userId!)
  }, [userId])

  if(isLoading) return <LoadingSpinner message='Loading Advisor Information' />

  return (
    <>
      {
        advisorData 
          ? <AdvisorInfo />	
          : <p>{hasError}</p>
      }
    </>
  )
}

export default AdvisorDetails

