import React, { useState, useEffect } from 'react'
import DetailsModal from '../modals/DetailsModal';
import CreateModal from '../modals/CreateModal';
import { FiEdit, FiHeart, FiLink } from "react-icons/fi";
import { GrZoomIn } from "react-icons/gr";
import TemplatePreview from './TemplatePreview';
import AlertPopup from './AlertPopup';
import moment from "moment";
import { getAPIBase } from '../../../helpers/AppHelpers';
import { findFavourites, addToFavourites, deleteFromFavourites } from '../../../api/w2pSearchService';

const Card = ({ templateData, buttonProps }) => {

  const { detailsButton, favouritesButton, createDocumentButton, copyLinkButton } = buttonProps;

  const isDetailsButton = detailsButton === "true";
  const isFavouritesButton = favouritesButton === "true";
  const isCreateDocumentButton = createDocumentButton === "true";
  const isCopyLinkButton = copyLinkButton === "true";

  const [showDetailsModal, setShowDetailsModal] = useState(false);  
  const [isFavourite, setIsFavourite] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMesage] = useState("");  

  const baseURL = process.env.REACT_APP_MGNL_HOST_NEW; 
  const apiBase = getAPIBase();

  const templateId = templateData.id;
  const isOnline = templateData.online;
  var title = templateData.title;
  var modificationDate = templateData.modificationDate;
  var creationDate = templateData.creationDate; 

  title = title
    ?.replace(/-/g, '_')
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  modificationDate = moment(modificationDate).utc().format('MM/DD/YYYY');
  creationDate = moment(creationDate).utc().format('MM/DD/YYYY');
  
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

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
    setIsImgHovered(false);
  }

  const searchFavourites = async () => {
    const response = await findFavourites();
    const favoriteIds = new Set(response.rows.map(row => row.id));
    setIsFavourite(favoriteIds.has(templateId));
  }

  const linkPath = `${baseURL}${apiBase}/Home/Search-Pages/W2P-Search?query=${templateId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(linkPath)
      .then(() => {
        setShowAlert(true);
        setMesage("Link Copied");
        setTimeout(() => {
          setShowAlert(false);
        }, 2500);
      })
  };

  useEffect(() => {
    searchFavourites();
  }, []);

  const toggleAddToFavourite = () => {
    if (isFavourite) {
      deleteFromFavourites(templateId);
    } else {
      addToFavourites(templateId);
    }
    setIsFavourite(!isFavourite);
  }  

  return (
    <div className='assetCard w2p' onMouseEnter={imageMouseEnter} onMouseLeave={imageMouseLeave}>
      <div className='assetCardPreview w2p' onClick={toggleDetailsModal}>
        <TemplatePreview templateId={templateId} isOnline={isOnline}></TemplatePreview>
      </div>      
      
      <div className='assetCardContent w2p'>
        <h1 className='assetTitle w2p'>{title}</h1>
        <p><span>Template ID: </span>{templateId}</p>
        {}
        {}
      </div>

      <div className={`assetActionButtons w2p ${isImgHovered ? 'show' : ''}`}>
        {isDetailsButton && (
          <button onClick={toggleDetailsModal}><GrZoomIn/></button>
        )}
        {isFavouritesButton && (
          <button onClick={toggleAddToFavourite} className={isFavourite ? 'isFavourite' : 'notFavourite'}><FiHeart/></button>
        )}
        {isCreateDocumentButton && (
          <button onClick={toggleCreateModal}><FiEdit/></button>        
        )}
        {isCopyLinkButton && (
          <button onClick={copyLink}><FiLink/></button>
        )}
      </div>

      {showAlert && <AlertPopup showAlert={showAlert} alertMessage={message} />}

      {showDetailsModal && <DetailsModal  templateId={templateId} isOpen={showDetailsModal} onClose={toggleDetailsModal}></DetailsModal>}      
      {showCreateModal && <CreateModal templateId={templateId} isOpen={showCreateModal} onClose={toggleCreateModal}></CreateModal>}
    </div>
  )
}

export default Card
