import { Advisor } from "../types";

export const getEnvVariable = (name: string):string => {
	console.log(typeof name)
	const value = process.env[name]?.toString()
	console.log(value)
	if (typeof value !== 'string') {
		throw new Error(`Environment variable ${name} is missing or not a string.`)
	}
	return value;
};

export const filteredAdvisors = (data:Advisor[], value: string) => {
	const incomeValue = Number(value)
	const averageIncomeRange = {
		min: incomeValue - 10000,
		max: incomeValue + 10000,
	};
	return data.filter(advisor => {
		return advisor.income >= averageIncomeRange.min && advisor.income <= averageIncomeRange.max
	})
};

export const formattedIncome = (income: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(income)
};

export const formatIncomeValue = (value: string): string => {
	const cleanedValue = value.replace(/\D/g, "")
	const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	return `$${formattedValue}`
};


// Regex
export const incomeCleanRegex = /[\$,]/g;


