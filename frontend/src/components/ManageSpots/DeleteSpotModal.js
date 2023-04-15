import React from 'react'
import "./DeleteSpotModal.css"

function DeleteSpotModal({ showModal, onClose, onDelete }) {

  if (!showModal) return null


  return (

    <div className="modal-background">
      <div className="modal">
        <h3>Are you sure you want to delete this spot?</h3>
        <div className="modal-buttons">
          <button onClick={onDelete} className="modal-delete">Yes, Delete</button>
          <button onClick={onClose} className="modal-cancel">No, Cancel</button>
        </div>
      </div>
    </div>

  )
}

export default DeleteSpotModal
