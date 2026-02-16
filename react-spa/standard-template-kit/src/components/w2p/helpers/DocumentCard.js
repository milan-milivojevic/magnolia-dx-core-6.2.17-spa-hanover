import React, { useState, useEffect } from 'react'
import DocumentDetailsModal from '../modals/DocumentDetailsModal';
import EditModal from '../modals/EditModal';
import DownloadModal from '../modals/DownloadModal';
import EmailModal from '../modals/EmailModal';
import DeleteModal from '../modals/DeleteModal';
import CopyModal from '../modals/CopyModal';
import { FiEdit, FiCopy, FiDownload, FiMail, FiTrash } from "react-icons/fi";
import { GrZoomIn } from "react-icons/gr";
import { MdQueryBuilder } from "react-icons/md";
import DocumentPreview from './DocumentPreview';
import moment from "moment";

const DocumentCard = ({ documentData, buttonProps }) => {

  const { detailsButton, editButton, downloadButton, emailButton, deleteButton } = buttonProps;

  const isDetailsButton = detailsButton === "true";
  const isEditButton = editButton === "true";
  const isDownloadButton = downloadButton === "true";
  const isEmailButton = emailButton === "true";
  const isDeleteButton = deleteButton === "true";

  const [showDetailsModal, setShowDetailsModal] = useState(false);  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [isImgHovered, setIsImgHovered] = useState(false);

  const templateId = documentData.template.id;
  const documentId = documentData.id;
  const documentStatus = documentData.status;
  const logicalPage = documentData.instancePages[0].logicalPage;
  var documentTitle = documentData.title;
  var documentUpdateDate = documentData.updateDate;
  var documentCreationDate = documentData.creationDate; 

  documentTitle = documentTitle
    .replace(/-/g, '_') // Replace dashes with underscores
    .split('_') // Split the string by underscores into an array
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back together with spaces

  documentUpdateDate = moment(documentUpdateDate).utc().format('MM/DD/YYYY');
  documentCreationDate = moment(documentCreationDate).utc().format('MM/DD/YYYY');
  
  const imageMouseEnter = () => {
    setIsImgHovered(true);
  };
  const imageMouseLeave = () => {
    setIsImgHovered(false);
  };

  const toggleDetailsModal = () => {
    setShowDetailsModal(!showDetailsModal);
    setIsImgHovered(false);
  }

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
    setIsImgHovered(false);
  }

  const toggleCopyModal = () => {
    setShowCopyModal(!showCopyModal);
    setIsImgHovered(false);
  }

  const toggleDownloadModal = () => {
    setShowDownloadModal(!showDownloadModal);
    setIsImgHovered(false);
  }

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
    setIsImgHovered(false);
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
    setIsImgHovered(false);
  }  

  return (
    <div className='assetCard w2p' onMouseEnter={imageMouseEnter} onMouseLeave={imageMouseLeave}>
      <div className='assetCardPreview w2p' onClick={toggleDetailsModal}>
        <DocumentPreview documentId={documentId} logicalPage={logicalPage} documentStatus={documentStatus}></DocumentPreview>
      </div>      
      <div className={`assetActionButtons w2p ${isImgHovered ? 'show' : ''}`}>
        {isDetailsButton && (
          <button onClick={toggleDetailsModal}><GrZoomIn/></button>
        )}
        {isEditButton && (
          <>
            {documentStatus === 2 && <button onClick={toggleCopyModal}><FiCopy/></button>}
            {documentStatus !== 2 && <button onClick={toggleEditModal}><FiEdit/></button>}
          </>
        )}
        {isDownloadButton && (
          <button onClick={toggleDownloadModal}><FiDownload/></button>        
        )}
        {isEmailButton && (
          <button onClick={toggleEmailModal}><FiMail/></button>
        )}
        {isDeleteButton && (
          <button onClick={toggleDeleteModal}><FiTrash/></button>
        )}
      </div>
      <div className='assetCardContent w2p'>
        <h1 className='assetTitle w2p'>{documentTitle || "Untitled"}</h1>
        <p><span>Template ID: </span>{templateId}</p>
        <p className='documentUpdateDate'><span><MdQueryBuilder/></span>{documentUpdateDate}</p>       
      </div>

      {showDetailsModal && <DocumentDetailsModal documentId={documentId} isOpen={showDetailsModal} onClose={toggleDetailsModal}></DocumentDetailsModal>}      
      {showEditModal && <EditModal documentId={documentId} isOpen={showEditModal} onClose={toggleEditModal}></EditModal>}
      {showCopyModal && <CopyModal documentId={documentId} isOpen={showCopyModal} onClose={toggleCopyModal}></CopyModal>}
      {showDownloadModal && <DownloadModal documentId={documentId} isOpen={showDownloadModal} onClose={toggleDownloadModal}></DownloadModal>}
      {showEmailModal && <EmailModal documentId={documentId} isOpen={showEmailModal} onClose={toggleEmailModal}></EmailModal>}
      {showDeleteModal && <DeleteModal documentId={documentId} isOpen={showDeleteModal} onClose={toggleDeleteModal}></DeleteModal>}
    </div>
  )
}

export default DocumentCard;