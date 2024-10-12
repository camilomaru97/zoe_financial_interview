'use client'

import ModalAdvisorAction from '@/app/components/ModalAdvisorAction'
import { useState } from 'react'

const UpdateAdvisor = () => {
  const [isOpenModal, isSetOpenModal] = useState<boolean>(false)
  return (
    <>
      <button onClick={() => isSetOpenModal(!isOpenModal)}>Edit Advisor</button>
      {isOpenModal && <ModalAdvisorAction type="updateUser" isSetOpenModal={isSetOpenModal} />}
    </>
  )
}
export default UpdateAdvisor