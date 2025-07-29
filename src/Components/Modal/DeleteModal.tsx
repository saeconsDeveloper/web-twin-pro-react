import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Modal from './Modal'

const DeleteModal = ({onClose, onDelete} : any) => {
  return (
    <Modal
              icon={<FontAwesomeIcon icon={faCircleExclamation} />}
              title={"Are you sure?"}
              subtitle={"You wont be able to revert this!"}
              onClose={onClose}
              onDelete={onDelete}
            />
  )
}

export default DeleteModal