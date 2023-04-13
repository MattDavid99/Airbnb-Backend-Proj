import React from 'react'
import "./DeleteReviewModal.css"

function DeleteReviewModal({ isOpen, onClose, onDelete, reviewId }) {

  const handleDelete = () => {
    onDelete(reviewId)
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  if (!isOpen) {
    return null
  }


  return (
    <div className={`delete-review-modal ${isOpen ? 'open' : ''}`}>
      <div className="delete-review-modal-content">
        <h4>Are you sure you want to delete this review?</h4>
        <div className="delete-review-modal-buttons">
          <button onClick={handleDelete} className='delete-review-modal-delete-button'>Yes, delete</button>
          <button onClick={handleCancel} className='delete-review-modal-cancel-button'>No, cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteReviewModal
