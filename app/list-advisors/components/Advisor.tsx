'use client'

import { type Advisor } from "@/app/types"
import { formattedIncome } from "@/app/utils"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

interface Props {
	advisors: Advisor
}

const Advisor = ({ advisors }: Props) => {

	const {name, income, id} = advisors
	const useNavigation = useRouter() 

	const formatIcomeValue = useMemo(()=> {
		return formattedIncome(income) 
	},[income]) 

	const handleViewProfile = (id: string) => {
		useNavigation.push(`/advisor-detail?query=${id}`)
	}

	return (
		<>
			<tbody>
				<tr>
					<td className="rows_style">
						<p>
							{name}
						</p>
						<span 
							className="view-profile" 
							onClick={() => handleViewProfile(id)}
						>
							See Advisor Details
						</span>
					</td>
					<td>{formatIcomeValue}</td>

				</tr>
			</tbody>
		</>

	)
}
export default Advisor
