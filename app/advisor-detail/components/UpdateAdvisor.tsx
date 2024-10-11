'use client'

import WrappeModalAdvisors from "@/app/components/ModalAdvisorAction"
import { useState } from "react"

const UpdateAdvisor = () => {
   const [isOpenModal, isSetOpenModal] = useState<boolean>(false)
  return (
    <>
        <button onClick={() => isSetOpenModal(!isOpenModal)}>Edit Advisor</button>
        {isOpenModal && <WrappeModalAdvisors type="updateUser" isSetOpenModal={isSetOpenModal} />}
    </>
  )
}
export default UpdateAdvisor