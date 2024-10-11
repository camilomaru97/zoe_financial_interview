import { AdvisorsContext } from "@/app/context/advisors/AdvisorsContext"
import { useRouter } from "next/navigation";
import { useContext, useState } from "react"
import UpdateAdvisor from "./UpdateAdvisor";

const AdvisorInfo = () => {

	const { advisorById, deleteAdvisor } = useContext(AdvisorsContext)
	const [message, setMessage] = useState<string>("")
	const useNavigation = useRouter()

  if (!advisorById || typeof advisorById !== 'object' || Array.isArray(advisorById)) {
    return <p>No se encontraron detalles del asesor.</p>;
  }

	const {name, phone, address, avatar, income, id} = advisorById

	const onDeleteAdvisor = (id: string) => {
		deleteAdvisor(id)
		setMessage("Deleting User...")
		setTimeout(() => {
			useNavigation.back()
		},3000)
	}

	if(message !== "") return <p className="message_delete_user">{message}</p>

  return (
    <main className="container_info_advisor">
			<div className="container_box">
				<header>
					<img alt={name} src={avatar} width={150} height={150} style={{ borderRadius: "50%" }} />
					<div>
						<button onClick={() => onDeleteAdvisor(id)}>Delete</button>
						<UpdateAdvisor/>
					</div>
				</header>
				<article className="container_main_info">
					<h2>{name}</h2>
					<p>CFA, CFP</p>
					<p>{address}</p>
					<p>{phone}</p>
				</article>
				<hr />
				<article className="container_info">
					<div><span>ID Number</span> <p>{id}</p></div>
					<div><span>Income</span> <p>{income}</p></div>
					<div><span>Education</span> <p>Notheastern University</p></div>
					<div><span>Title</span> <p>Financial Managment</p></div>
					<div><span>Years of Experience</span> <p>+10</p></div>
				</article>
			</div>
		</main>
  )
}
export default AdvisorInfo