'use client'

import { Advisor, AdvisorsState } from "@/app/types"
import { AdvisorsContext } from "./AdvisorsContext"
import { useReducer } from "react"
import { advisorReducer } from "./advisorReducer"
import { getAdvisorsByValueApi, postAdvisorsApi, deleteAdvisorApi } from "@/app/service/advisorsService"

const INITIAL_STATE: AdvisorsState = {
    isLoading: true,
    hasError: false,
    data: [],
		advisorById: []
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

const AdvisorProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(advisorReducer, INITIAL_STATE)
  
	const searchAdvisor = async (value?: string) => {
		getAdvisorsByValueApi(undefined, value)
			.then(data => dispatch({ type: 'setAdvisors', payload: data}))
			.catch(error => dispatch({ type: 'setAdvisorsError', payload: error.message}))	
	}

	const searchAdvisorById = async (id?: string) => {
		getAdvisorsByValueApi(id, undefined)
			.then(data => dispatch({ type: 'setAdvisorById', payload: data}))
			.catch(error => dispatch({ type: 'setAdvisorsError', payload: error.message}))	
	}

	const createNewAdvisor = async (data: Advisor) => {
		postAdvisorsApi(data)
			.then(data => dispatch({ type: 'createAdvisor', payload: data}))
			.catch(error => dispatch({ type: 'createAdvisorError', payload: error.message}))
	}
	
	const deleteAdvisor = async (id:string) => {
		deleteAdvisorApi(id)
			.then(() => dispatch({ type: 'deleteAdvisor', payload: id }))
			.catch(error => dispatch({ type: 'deleteAdvisorError', payload: error.message}))
	}

	const updateAdvisor = async (id:string) => {
		updateAdvisor(id)
			.then(data => console.log(data))
			.catch(error => console.log(error))
	}

  return (
    <AdvisorsContext.Provider value={{
        ...state,

				//Methods
				searchAdvisor,
				searchAdvisorById,
				createNewAdvisor,
				deleteAdvisor,
				updateAdvisor

				
    }}>
        {children}
    </AdvisorsContext.Provider>
  )
}
export default AdvisorProvider