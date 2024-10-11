'use client'

import ErrorMessage from "./components/ErrorMessage";
import useIncomeValue from "./hooks/useIncomeValue";
import './advisor.css'

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
					<img src="https://zoefin.com/wp-content/uploads/2020/01/zoe_logo_primary.svg"/>
					<h3>Find Your Company Advisors!</h3>
					<p>Search by income to find advisors</p>
				</header>
				<form
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
				message={error ?? ""}
				isVisible={isErrorVisible}
				onClose={handleCloseError}
				duration={5000}
			/>
		</>
	);
}
