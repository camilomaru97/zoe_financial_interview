'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect } from "react"
import AdvisorInfo from "./components/AdvisorDetails"
import { Advisor } from "../types"
import { AdvisorsContext } from "../context/advisors/AdvisorsContext"
import AdvisorProvider from "../context/advisors/AdvisorProvider"
import "./advisor-detail.css"

const AdvisorDetails = () => {

	const useNavigation = useRouter() 
	const searchParams = useSearchParams()
	const userId = searchParams.get('query') || undefined;

	const { searchAdvisorById, isLoading, hasError, advisorById } = useContext(AdvisorsContext)
	const advisorData: Advisor | null = Array.isArray(advisorById) ? advisorById[0] : advisorById;

	useEffect(() => {
		if (!userId) {
				useNavigation.push(`/`);
		}
		searchAdvisorById(userId!)
	}, [userId]);

	if(isLoading) return <p>Cargando...</p>

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

const WrappedAdvisorsById = () => (
	<AdvisorProvider>
		<AdvisorDetails />
	</AdvisorProvider>
)

export default WrappedAdvisorsById;

