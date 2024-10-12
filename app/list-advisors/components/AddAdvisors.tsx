import WrappeModalAdvisors from '@/app/components/ModalAdvisorAction'
import { useState } from 'react'

const AddAdvisors = () => {
  const [isOpenModal, isSetOpenModal] = useState<boolean>(false)

  return (
    <>
      <div>
        <button className="btn_add_advisor" onClick={() => isSetOpenModal(!isOpenModal)}>Add Advisor</button>
      </div>
      {isOpenModal && <WrappeModalAdvisors type="createUser" isSetOpenModal={isSetOpenModal} />}
    </>

  )
}

export default AddAdvisors
