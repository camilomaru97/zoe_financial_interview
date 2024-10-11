import { memo, useEffect } from "react"

interface Props {
	message: string
	isVisible: boolean
	onClose: () => void
	duration?: number
}

const ErrorMessage = ({message, isVisible, onClose, duration}: Props) => {
	useEffect(() => {
		if(isVisible && duration){
			const timer = setTimeout(() => {
				onClose()
			}, duration)
			return () => clearTimeout(timer)
		}
	},[isVisible, duration, onClose])

	return isVisible
		? <div className={`error-message ${isVisible ? 'visible' : ''}`}>
			<span>{message}</span>
			<button onClick={onClose}>
			</button>
			</div>
		: null 
}
export default memo(ErrorMessage)
