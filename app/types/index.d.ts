export interface Advisor {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	avatar: string;
	income: number;
}

export interface AdvisorSort {
	id: string
	name: string
	income: number
}

export type AdvisorAction = 
	{type: 'setAdvisors', payload: Advisor[]} |
	{type: 'setAdvisorsError', payload: boolean} |
	{type: 'setAdvisorsErrorById', payload: boolean} |
	{type: 'setAdvisorById', payload: Advisor[]} |
	{type: 'createAdvisor', payload: Advisor} |
	{type: 'createAdvisorError', payload: boolean} | 
	{type: 'deleteAdvisor', payload: string} | 
	{type: 'deleteAdvisorError', payload: boolean} | 
	{type: 'updateAdvisor', payload: Advisor} | 
	{type: 'updateAdvisorError', payload: boolean}

export interface AdvisorsState {
	isLoading: boolean
	hasError: boolean
	data: Advisor[] | []
	advisorById: Advisor[] | [] 
}

export interface PlacesContextProps {
	isLoading: boolean
	hasError: boolean | string
	data: Advisor[] | []
	advisorById: Advisor[] | Advisor | []

	//Methods
	searchAdvisor: (value: string) => Promise<any>
	searchAdvisorById: (value: string) => Promise<any>
	createNewAdvisor: (data: Advisor) => Promise<any>
	deleteAdvisor: (id: string) => Promise<any>
	updateAdvisor: (id: string) => Promise<any>
	
}
