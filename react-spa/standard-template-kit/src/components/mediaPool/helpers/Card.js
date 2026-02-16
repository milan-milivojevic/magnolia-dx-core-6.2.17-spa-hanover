import React, { useState } from 'react'
import DownloadModal from '../modals/DownloadModalIframe';
import EmailModal from '../modals/EmailModal';
import DetailsModal from '../modals/DetailsModal';
import ShopModal from '../modals/ShopModal';
import B2bModal from '../modals/B2bModal';
import { FiDownload, FiLink, FiMail, FiShoppingCart, FiEdit } from "react-icons/fi";
import { ReactComponent as EditAndShop } from '../../../images/home/EditAndShop.svg'
import { GrZoomIn } from "react-icons/gr";
import { downloadFileDirect } from '../../../api/searchService';
import { getAPIBase } from '../../../helpers/AppHelpers';
import AssetPreview from './AssetPreview';
import AlertPopup from './AlertPopup';
import moment from "moment";

const Card = ({ fields, buttonProps }) => {

  const { downloadButton, emailButton, detailsButton, copyLinkButton, shopButton, b2bButton } = buttonProps;

  const isDownloadButton = downloadButton === "true";
  const isEmailButton = emailButton === "true";
  const isDetailsButton = detailsButton === "true";
  const isCopyLinkButton = copyLinkButton === "true";
  const isShopButton = shopButton === "true";
  const isB2bButton = b2bButton === "true";

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showB2bModal, setShowB2bModal] = useState(false);
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMesage] = useState("");  
  
  const assetId = fields.id.value;
  const assetVersionCount = fields.versionCount?.value - 1;
  const assetVersion = fields.versions?.items[assetVersionCount].fields.versionNumber.value;
  const assetPageCount = fields.currentVersion.fields.fileResource.fields.pageCount.value
  const assetResourceType = fields.currentVersion.fields.fileResource.fields.fileResourceTypeName.value
  const selectedOption = 5;
  const language = 'en';
  const download_version = 'FIXED';
  
  var title = fields.title.value;
  const description = fields.itemDescription?.value || null;
  const assetFileName = fields.currentVersion.fields.fileResource.fields.fileName.value;
  var lastUpdatedTime = fields.lastUpdatedTime?.value;
  var uploadDate = fields.uploadDate?.value;
  var owner = fields.owner?.fields.formattedFullName.value;  
  var fileFormat = fields.currentVersion.fields.fileResource.fields.extension.value;
  const fileSize = fields.currentVersion.fields.fileResource.fields.fileSize.value + ' KB';
  var keywords = fields.keywords?.items || null;
  const license = fields.license || null;
  const itemNumber = fields.itemNumber?.value || null;
  const vdb = fields.vdb?.fields.name.value;
  const poratlPage = fields.customAttribute_34?.fields.value.fields.value.value.EN || "No";
  const faceboookField = fields.customAttribute_41?.fields.value.value.EN || null;
  const linkedinField = fields.customAttribute_42?.fields.value.value.EN || null;  
  const shopWithTemplateId = fields.customAttribute_43?.fields.value.value.EN || null;
  const shopId = fields.customAttribute_44?.fields.value.value.EN || null;
  const templateId = fields.customAttribute_45?.fields.value.value.EN || null;  

  const regex = /\[(.*?)\]\((.*?)\)/;

  const fbMatch = faceboookField ? faceboookField.match(regex) : null;
  const fbLinkName = fbMatch ? fbMatch[1] : '';
  const fbLinkUrl = fbMatch ? fbMatch[2] : '';

  const linkedInMatch = linkedinField ? linkedinField.match(regex) : null;
  const linkedInLinkName = linkedInMatch ? linkedInMatch[1] : '';
  const linkedInLinkUrl = linkedInMatch ? linkedInMatch[2] : '';

  owner = owner.replace(/,/g, "");
  lastUpdatedTime = moment(lastUpdatedTime).utc().format('MM/DD/YYYY');
  uploadDate = moment(uploadDate).utc().format('MM/DD/YYYY');
  fileFormat = fileFormat.toUpperCase();
  keywords = keywords?.join(', ');

  const dataProps = {
    assetId,
    assetVersion,
    assetPageCount,
    assetResourceType,
    vdb,
    title,
    description,
    assetFileName,
    linkedinField,
    faceboookField,
    fbLinkName,
    fbLinkUrl,
    linkedInLinkName,
    linkedInLinkUrl,
    shopId,
    shopWithTemplateId,
    templateId,    
    poratlPage,
    itemNumber,
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
    isDownloadButton,
    isEmailButton,
    isCopyLinkButton,
    isShopButton,
    isB2bButton
  };
  
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

  const toggleShopModal = () => {
    setShowShopModal(!showShopModal);
    setIsImgHovered(false);
  }

  const toggleB2bModal = () => {
    setShowB2bModal(!showB2bModal);
    setIsImgHovered(false);
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

  const downloadFile = async () => {
    window._paq = window._paq || [];
    window._paq.push([
      'trackEvent',
      'Download',
      'downloadFile',
      assetId
    ]);
  
    const data = await downloadFileDirect(assetId, selectedOption, download_version, language, null);
  
    if (typeof data[0].download_url !== 'undefined') {
      if (isMobileDevice()) {
        openLink(data[0].download_url, '_blank');
      } else {
        openLink(data[0].download_url, '_self');
      }
    }
  };
  

  const toggleDownloadModal = () => {
    setShowDownloadModal(!showDownloadModal);    
  }

  const closeDownloadModal = () => {
    setShowDownloadModal(false);
    setIsImgHovered(false);
  }

  const showAlertAfterDownload = () => {
    setShowAlert(true);
    setMesage("Download Started");
    setTimeout(() => {
      setShowAlert(false);
    }, 2500);
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

  const baseURL = process.env.REACT_APP_MGNL_HOST_NEW; 
  const apiBase = getAPIBase();

  const internalLinkPath = `${baseURL}${apiBase}/Home/Search-Pages/MP-Search?query=${assetId}`;

  const copyInternalLink = () => {
    navigator.clipboard.writeText(internalLinkPath)
      .then(() => {
        setShowAlert(true);
        setMesage("Link Copied");
        setTimeout(() => {
          setShowAlert(false);
        }, 2500);
      })
  };

  const exernalLinkPath = `${baseURL}${apiBase}/web/mp/asset-details?assetId=${assetId}&skipHeader=true`;

  const copyExternalLink = () => {
    navigator.clipboard.writeText(exernalLinkPath)
      .then(() => {
        setShowAlert(true);
        setMesage("Link Copied");
        setTimeout(() => {
          setShowAlert(false);
        }, 2500);
      })
  };

  return (
    <div className='assetCard' onMouseEnter={imageMouseEnter} onMouseLeave={imageMouseLeave}>
      <div className='assetCardPreview' onClick={toggleDetailsModal}>
        <AssetPreview assetId={assetId} assetVersion={assetVersion} assetPageCount={assetPageCount} assetResourceType={assetResourceType} isModal={false}></AssetPreview>
      </div>     
             
      <div className='assetCardContent'>
        <h1 className='assetTitle'>{title}</h1>        
        {itemNumber && 
          <p><span>Item Number: </span>{itemNumber}</p>
        }
        {description && 
          <p className='assetDescription'>{description}</p>
        }        
        {faceboookField && 
          <a 
            className="socialMediaLinks" 
            href={fbLinkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {fbLinkName}
          </a>
        }       
        {linkedinField && 
          <a 
            className="socialMediaLinks" 
            href={linkedInLinkUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {linkedInLinkName}
          </a>
        }
        {}
        {}
        {}
        {}
        <div className='fileFormatWrapper'>
          <div className='fileFormat'>{fileFormat}</div>        
        </div>   
      </div>

      <div className={`assetActionButtons ${isImgHovered ? 'show' : ''}`}>
        {isDetailsButton && (
          <button onClick={toggleDetailsModal}><GrZoomIn/></button>
        )}
        {isDownloadButton && (
          <button onClick={toggleDownloadModal}><FiDownload/></button>
        )}
        {isCopyLinkButton && (
          <button onClick={copyInternalLink}><FiLink/></button>
        )}
        {isEmailButton && (
          <button onClick={toggleEmailModal}><FiMail/></button>
        )}
        {isShopButton && shopId && (
          <button onClick={toggleShopModal}><FiShoppingCart/></button>
        )}
        {isShopButton && shopWithTemplateId && (
          <button onClick={toggleShopModal}><EditAndShop/></button>
        )}        
        {isB2bButton && templateId && (
          <button onClick={toggleB2bModal}><FiEdit/></button>
        )}
      </div>

      {showAlert && <AlertPopup showAlert={showAlert} alertMessage={message} />}

      {showDetailsModal && <DetailsModal {...dataProps} isOpen={showDetailsModal} onClose={toggleDetailsModal}></DetailsModal>}      
      {showDownloadModal && <DownloadModal assetId={assetId} language={language} license={license && license.fields} isOpen={showDownloadModal} onClose={toggleDownloadModal} closeModal={closeDownloadModal} showAlert={showAlertAfterDownload}></DownloadModal>}
      {showEmailModal && <EmailModal assetId={assetId} isOpen={showEmailModal} onClose={toggleEmailModal} closeModal={closeEmailModal}></EmailModal>}
      {showShopModal && <ShopModal shopId={shopId ? shopId : shopWithTemplateId} isOpen={showShopModal} onClose={toggleShopModal} closeModal={toggleShopModal}></ShopModal>}
      {showB2bModal && <B2bModal templateId={templateId} isOpen={showB2bModal} onClose={toggleB2bModal} closeModal={toggleB2bModal}></B2bModal>}
    </div>
  )
}

export default Card
