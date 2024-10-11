'use client'

import { AdvisorProvider } from "../context"
import useFormModal from "../hooks/useFormModal"

interface Props {
	type: 'createUser' | 'updateUser'
	isSetOpenModal: (value: boolean) => void
}

const ModalAdvisorAction = ({type, isSetOpenModal}: Props) => {

	const {
		formValuesItems,
		successMessageVisible,
		error,
		hasError,
    onChangeValue,
    onHandleSubmit
  } = useFormModal({isSetOpenModal})


	return (
		<main className="container_add_advisor">
			<div className="form_container">
				<div className="box_form">
					<h2>{type === "createUser" ? "Create Advisor" : "Update User"}</h2>
					<hr />
					<form
						onSubmit={onHandleSubmit}
					>
						<div className="add_input_advisor">
							{
								formValuesItems.map((value, index) => (
									<div key={index}>
										<label>{value.label}</label>
											<input 
												type={value.type}
												autoComplete="off"
												name={value.name}
												onChange={onChangeValue}
												value={value.value}
											/>
											{error && error[value.name] && <p style={{ color: 'red' }}>{error[value.name]}</p>}
									</div>
								))
							}
						</div>
						<div className="modal_container_buttons">
							<button onClick={() => isSetOpenModal(false)}>Go Back</button> 
							<button type="submit">Save Changes</button> 
						</div>
					</form>
					{hasError && <p>{hasError}</p>}
					{successMessageVisible && <p style={{ marginTop: '1rem', textAlign: 'center', color: '#28a745' }}>El usuario fue creado satisfactoriamente</p>}
				</div>
			</div>
		</main>

	)
}

const WrappeModalAdvisors = ({type, isSetOpenModal}: Props) => (
	<AdvisorProvider>
		<ModalAdvisorAction type={type} isSetOpenModal={isSetOpenModal} />
	</AdvisorProvider>
)

export default WrappeModalAdvisors;
