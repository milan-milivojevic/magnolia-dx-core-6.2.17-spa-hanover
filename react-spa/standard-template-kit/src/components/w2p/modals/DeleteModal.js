import React from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';

const DeleteModal = ({ documentId, isOpen, onClose }) => {
  
  const BASE_URL = process.env.REACT_APP_MGNL_HOST_NEW; 

  const deleteDocument = () => {
    fetch(`${BASE_URL}/wp/rest/instances/${documentId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log("Document deleted successfully");
        onClose();
      } else {
        console.error("Failed to delete the document");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Create Modal"
      className="createReactModal"
    > 
      <div className='deleteModalWrapper w2p'>
        <div class="closeButtonWrapper w2p">
          <h1 className='titleId'>Confirm Delete</h1>
          <button className="closeButton" onClick={onClose}><AiOutlineClose/></button>          
        </div>
        <div className='deleteModal w2p'>          
          <div className='deleteText'>Do you really want to delete this document?</div>
          <div className='actionButtons'>
            <button className='cancelDelete' onClick={onClose}>Cancel</button>
            <button className='deleteButton' onClick={deleteDocument}>Delete</button>
          </div>
        </div>
      </div>      
    </Modal>
  );
};

export default DeleteModal;