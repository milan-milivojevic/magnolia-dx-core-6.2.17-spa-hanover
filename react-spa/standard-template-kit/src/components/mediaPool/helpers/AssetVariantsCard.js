import React, { useState } from 'react'
import DownloadModal from '../modals/DownloadModal';
import EmailModal from '../modals/EmailModal';
import DetailsModal from '../modals/DetailsModal';
import { FiDownload, FiLink, FiMail } from "react-icons/fi";
import { GrZoomIn } from "react-icons/gr";
import { downloadFileDirect } from '../../../api/searchService';
import { getAPIBase } from '../../../helpers/AppHelpers';
import AssetPreview from './AssetPreview';
import AlertPopup from './AlertPopup';
import moment from "moment";

const AssetVariantCard = ({ assetVariantData, license }) => {

  const isDownloadButton = "true";
  const isEmailButton = "true";
  const isDetailsButton = "true";

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMesage] = useState("");  

  const baseURL = process.env.REACT_APP_MGNL_HOST_NEW; 
  const apiBase = getAPIBase();

  const assetId = assetVariantData.id;
  const assetVersionCount = assetVariantData.versionCount;
  const assetVersion = assetVariantData.resourceVersion.versionNumber;
  const assetPageCount = assetVariantData.resourceVersion.fileResource.pageCount;
  const assetResourceType = assetVariantData.resourceVersion.fileResource.fileResourceTypeName;

  const selectedOption = 5;
  const language = 'en';
  const download_version = 'FIXED';
  
  var title = assetVariantData.assetTitle;
  const description = assetVariantData?.description || null;
  var lastUpdatedTime = assetVariantData.lastUpdatedTime;
  var uploadDate = assetVariantData.uploadDate;
  var owner = assetVariantData.resourceVersion.uploader.name;
  var fileFormat = assetVariantData.resourceVersion.fileResource.suffix;
  const fileSize = assetVariantData.resourceVersion.fileResource.fileSize + ' KB';
  const keywords = assetVariantData?.keywords || null;
  const linkToW2P = assetVariantData?.customAttribute_126?.fields.value.value;

  title = title
    .replace(/-/g, '_') // Replace dashes with underscores
    .split('_') // Split the string by underscores into an array
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back together with spaces
  
  owner = owner.replace(/,/g, "");
  lastUpdatedTime = moment(lastUpdatedTime).utc().format('MM/DD/YYYY');
  uploadDate = moment(uploadDate).utc().format('MM/DD/YYYY');
  fileFormat = fileFormat.toUpperCase();

  const dataProps = {
    assetId,
    assetVersion,
    assetPageCount,
    assetResourceType,
    title,
    description,
    lastUpdatedTime,
    uploadDate,
    owner,
    fileFormat,
    fileSize,
    keywords,
    linkToW2P,
    download_version,
    language,
    selectedOption,
    assetVariantData
  };
  
  const imageMouseEnter = () => {
    setIsImgHovered(true);
  };
  const imageMouseLeave = () => {
    setIsImgHovered(false);
  };
  
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

  const toggleDetailsModal = () => {
    setShowDetailsModal(!showDetailsModal);
    setIsImgHovered(false);
  }
  const toggleDownloadModal = () => {
    if (license) {
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
      setIsImgHovered(false);
      setShowAlert(true);
      setMesage("Download Started");
      setTimeout(() => {
        setShowAlert(false);
      }, 2500);
    }    
  }

  const closeDownloadModal = () => {
    setShowDownloadModal(false);
    setIsImgHovered(false);
  }

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
    setIsImgHovered(false);
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
    setIsImgHovered(false);
  }

  return (
    <div className='assetCard' onMouseEnter={imageMouseEnter} onMouseLeave={imageMouseLeave}>
      <div className='assetCardPreview' onClick={toggleDetailsModal}>
        <AssetPreview assetId={assetId} assetVersion={assetVersion} assetPageCount={assetPageCount} assetResourceType={assetResourceType} isModal={false}></AssetPreview>
      </div>      
      <div className={`assetActionButtons ${isImgHovered ? 'show' : ''}`}>
        {isDetailsButton && (
          <button onClick={toggleDetailsModal}><GrZoomIn/></button>
        )}
        {isDownloadButton && (
          <button onClick={toggleDownloadModal}><FiDownload/></button>
        )}
        {isEmailButton && (
          <button onClick={toggleEmailModal}><FiMail/></button>
        )}
      </div>
      <div className='assetCardContent'>
        <h1 className='assetTitle'>{title}</h1>
        <p><span>Asset ID: </span>{assetId}</p>
        {/* <p><span>Asset Contact: </span>{owner}</p> */}
        <p><span>File Size:</span>{fileSize}</p>
        <p><span>Upload Date:</span>{uploadDate}</p>
        <p><span>Asset Type:</span>{assetResourceType}</p>
        {/* <p><span>Last change: </span>{lastUpdatedTime}</p> */}
        {/* {keywords && 
          <ul className='assetKeywords'>
            {keywords.map(keyword => <li className='Keyword ID' key={keyword}>{keyword}</li>)}
          </ul>
        } */}
        {/* <div className='fileFormatWrapper'>
          <div className='fileFormat'>{fileFormat}</div>        
        </div> */}
      </div>

      {showAlert && <AlertPopup showAlert={showAlert} alertMessage={message} />}

      {showDetailsModal && <DetailsModal {...dataProps} isOpen={showDetailsModal} onClose={toggleDetailsModal}></DetailsModal>}      
      {showDownloadModal && <DownloadModal assetId={assetId} license={license && license.fields} isOpen={showDownloadModal} onClose={toggleDownloadModal} closeModal={closeDownloadModal}></DownloadModal>}
      {showEmailModal && <EmailModal assetId={assetId} isOpen={showEmailModal} onClose={toggleEmailModal} closeModal={closeEmailModal}></EmailModal>}
    </div>
  )
}

export default AssetVariantCard;