import React, { useState } from 'react'
import Modal from 'react-modal';
import AssetPreview from '../helpers/AssetPreview';
import AlertPopup from '../helpers/AlertPopup';
import DownloadModal from './DownloadModal';
import EmailModal from './EmailModal';

import { downloadFileDirect } from '../../../api/searchService';
import { getAPIBase } from '../../../helpers/AppHelpers';

import { AiOutlineClose } from "react-icons/ai";
import { FiDownload, FiLink, FiMail } from "react-icons/fi";


const DetailsModal = (props) => {

  const {
    assetId,
    assetVersion,
    assetPageCount,
    assetResourceType,
    vdb,
    title,
    description,
    lastUpdatedTime,
    uploadDate,
    owner,
    fileFormat,
    fileSize,
    keywords,
    download_version,
    language,
    selectedOption,
    fields,
    isOpen, 
    onClose
     } = props;

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMesage] = useState("");

  const baseURL = process.env.REACT_APP_MGNL_HOST_NEW; 
  const apiBase = getAPIBase();

  const downloadFile = async () => {

    const data = await downloadFileDirect(assetId, selectedOption, download_version, language, null);

    if (typeof data[0].download_url !== 'undefined') {        
  
      if (isMobileDevice()) {
        openLink(data[0].download_url, '_blank');
      } else {
        openLink(data[0].download_url, '_self');
      }
    }
  }

  const isMobileDevice = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  const openLink = (download_url, location) => {
    const a = document.createElement('a');
    a.setAttribute('href', download_url);
    a.setAttribute('target', location);
    a.click();
  };

  const linkPath = `${baseURL}${apiBase}/Home/Search-Pages/MP-Search?query=M-${assetId}`;

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

  const keywordsString = keywords?.join(', ');

  const toggleDownloadModal = () => {
    if (fields.license) {
      setShowDownloadModal(!showDownloadModal);
      if (showDownloadModal) {
        setShowAlert(true);
        setMesage("Download Started");
        setTimeout(() => {
          setShowAlert(false);
        }, 2500);
      }
    } else {
      downloadFile();
      setShowAlert(true);
      setMesage("Download Started");
      setTimeout(() => {
        setShowAlert(false);
      }, 2500);
    }    
  }
  const closeDownloadModal = () => {
    setShowDownloadModal(false);
  }

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
    if (showEmailModal) {
      setShowAlert(true);
      setMesage("Email Sent");
      setTimeout(() => {
        setShowAlert(false);
      }, 2500);
    }
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Details Modal"
        className='detailsReactModal'
      >
        <div className='detailsModalWrapper'>
          <div class="closeButtonWrapper">
           <button className="closeButton" onClick={onClose}><AiOutlineClose/></button>
          </div>
          <div className='detailsModal'>
            <AssetPreview assetId={assetId} assetVersion={assetVersion} assetPageCount={assetPageCount} assetResourceType={assetResourceType} isModal={true}></AssetPreview>
            <div className='detailsModalContent'>
              <div className='detailsModalInfo'>
                <h1 className='assetTitle'>{title}</h1>
                {description && 
                  <p className='assetDescription'><span>Description: </span>{description}</p>
                }
                <p><span>Asset ID: </span>{assetId}</p>
                <p><span>Asset Contact: </span>{owner}</p>
                <p><span>File Size: </span>{fileSize}</p>
                <p><span>VDB: </span>{vdb}</p>
                <p><span>Upload Date: </span>{uploadDate}</p>
                <p><span>Last change: </span>{lastUpdatedTime}</p>            
                {keywords && 
                <p><span>Keywords: </span>{keywordsString}</p>
                }
              </div>                            
              <div className='fileFormatActions'>
                <div className={`assetActionButtons show`}>
                  <button onClick={toggleDownloadModal}><FiDownload/></button>
                  <button onClick={copyLink}><FiLink/></button>
                  <button onClick={toggleEmailModal}><FiMail/></button>
                </div>
                <div className='fileFormat'>{fileFormat}</div>        
              </div>   
            </div>
          </div>
        </div>
      </Modal>

      {showAlert && <AlertPopup showAlert={showAlert} alertMessage={message} />}

      {showDownloadModal && <DownloadModal assetId={assetId} license={fields.license && fields.license.fields} isOpen={showDownloadModal} onClose={toggleDownloadModal} closeModal={closeDownloadModal} ></DownloadModal>}
      {showEmailModal && <EmailModal assetId={assetId} isOpen={showEmailModal} onClose={toggleEmailModal} closeModal={closeEmailModal}></EmailModal>}

    </div>
  )
}

export default DetailsModal