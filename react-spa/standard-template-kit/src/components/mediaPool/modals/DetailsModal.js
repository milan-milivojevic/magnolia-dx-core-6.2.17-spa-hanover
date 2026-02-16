import React, { useState, useEffect } from 'react'
import { BsExclamationOctagonFill } from "react-icons/bs";
import Modal from 'react-modal';
import AssetPreview from '../helpers/AssetPreview';
import AssetVersionCard from '../helpers/AssetVersionCard';
import AssetVariantCard from '../helpers/AssetVariantsCard';
import RelatedAssetCard from '../helpers/RelatedAssetCard';
import AlertPopup from '../helpers/AlertPopup';
import DownloadModal from './DownloadModalIframe';
import EmailModal from './EmailModal';
import ShopModal from '../modals/ShopModal';
import B2bModal from '../modals/B2bModal';

import { downloadFileDirect, assetVersionsService, assetVariantsService, assetRelationsService } from '../../../api/searchService';
import { getAPIBase } from '../../../helpers/AppHelpers';

import { AiOutlineClose } from "react-icons/ai";
import { FiDownload, FiLink, FiMail, FiShoppingCart, FiEdit } from "react-icons/fi";
import { ReactComponent as EditAndShop } from '../../../images/home/EditAndShop.svg'

const DetailsModal = (props) => {

  const {
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
    license,
    isOpen,
    onClose,    
    isDownloadButton,
    isEmailButton,
    isCopyLinkButton,
    isShopButton,
    isB2bButton
  } = props;

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showB2bModal, setShowB2bModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMesage] = useState("");
  const [assetVersions, setAssetVersions] = useState([]);
  const [versionsError, setVersionsError] = useState(false);
  const [assetVariants, setAssetVariants] = useState([]);
  const [relatedAssets, setRelatedAssets] = useState([]);
  const [activeTab, setActiveTab] = useState('preview');

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

  const toggleDownloadModal = () => {
    setShowDownloadModal(!showDownloadModal);
  }
  
  const closeDownloadModal = () => {
    setShowDownloadModal(false);
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
  };

  const toggleShopModal = () => {
    setShowShopModal(!showShopModal);
  }

  const toggleB2bModal = () => {
    setShowB2bModal(!showB2bModal);
  }

  const getAssetVersions = async (assetId) => {
    setAssetVersions([]);
    setVersionsError(false);
  
    const response = await assetVersionsService(assetId);

    if (response && response.status === 403) {
      setVersionsError(true);
    } else if(response && response.error) {
      setVersionsError(true);
    } else {
      setAssetVersions(response);
    }
  }  

  const getAssetVariants = async (assetId) => {
    const response = await assetVariantsService(assetId);
    setAssetVariants([]);
    setAssetVariants(response.assetVariants);
  }

  const getRelatedAssets = async (assetId) => {
    const response = await assetRelationsService(assetId);
    setRelatedAssets([]);
    setRelatedAssets(response.assets);
  }

  useEffect(() => {
    getAssetVersions(assetId);
    getAssetVariants(assetId);
    getRelatedAssets(assetId);
  }, []);

  const stopScrolling = () => {
    document.body.style.overflow = 'hidden';
  };

  const allowScrolling = () => {
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    if (isOpen) {
      stopScrolling();
    } else {
      allowScrolling();
    }

    return () => allowScrolling();
  }, [isOpen]);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        contentLabel="Details Modal"
        className='detailsReactModal'
        onRequestClose={() => {
          onClose();
          allowScrolling();
        }}
      >
        <div className='detailsModalWrapper detailOptions'>
          <div class="closeButtonWrapper">
            <div className='navButtons'>
              <button className={activeTab === 'preview' ? 'active' : ''} onClick={() => setActiveTab('preview')}>Preview</button>
              <button className={activeTab === 'versions' ? 'active' : ''} onClick={() => setActiveTab('versions')}>Versions</button>
              <button className={activeTab === 'variants' ? 'active' : ''} onClick={() => setActiveTab('variants')}>Variants</button>
              <button className={activeTab === 'relations' ? 'active' : ''} onClick={() => setActiveTab('relations')}>Relations</button>
            </div>
            <div className="closeButtonDiv">
              <button className="closeButton" onClick={onClose}><AiOutlineClose /></button>
            </div>
          </div>
          <div className='detailsModal'>
            <div className='detailsModalOptions'>

              {activeTab === 'preview' && (
                <AssetPreview assetId={assetId} assetVersion={assetVersion} assetPageCount={assetPageCount} assetResourceType={assetResourceType} isModal={true} />
              )}
              
              {activeTab === 'versions' && (
                <div className='assetVersions list'>
                  {}
                  {versionsError ? (
                    <span className='error'><BsExclamationOctagonFill /> You are not allowed to see the versions list</span>
                  ) : (
                    assetVersions.map((assetVersionData) => (
                      <AssetVersionCard 
                        key={assetVersionData.id} 
                        assetVersionData={assetVersionData} 
                        license={license} 
                      />
                    ))
                  )}
                </div>
              )}
              {activeTab === 'variants' && (
                <div className='assetVariants list'>
                  {assetVariants ? (
                    assetVariants.map((assetVariantData) => (
                      <AssetVariantCard  key={assetVariantData.id} assetVariantData={assetVariantData} license={license} />
                    ))
                  ) : (
                    <span className='error'><BsExclamationOctagonFill /> No variants assigned.</span>
                  )}
                </div>
              )}
              {activeTab === 'relations' && (
                <div className='relatedAssets list'>
                  {relatedAssets ? (
                    relatedAssets.map((relatedAssetData) => (
                      <RelatedAssetCard key={relatedAssetData.id} relatedAssetData={relatedAssetData} />
                    ))
                  ) : (
                    <span className='error'><BsExclamationOctagonFill /> No results found!</span>
                  )}
                </div>
              )}
            </div>
            <div className='detailsModalContent'>
            <div className='detailsModalInfo'>
                <h1 className='assetTitle'>{title}</h1>
                {description &&
                  <p className='assetDescription'><span>Description: </span>{description}</p>
                }
                <p><span>File Name: </span>{assetFileName}</p>
                {itemNumber && 
                  <p><span>Item Number: </span>{itemNumber}</p>
                }
                {vdb && 
                  <p><span>VDB: </span>{vdb}</p>        
                }
                {}
                {poratlPage && 
                  <p><span>Portal Page: </span>{poratlPage}</p>
                } 
                {assetId && 
                 <p><span>Media Pool ID: </span>{assetId}</p>
                }
                {templateId && 
                  <p><span>Web to Print ID: </span>{templateId}</p>
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
              </div>
              <div className='fileFormatActions'>
                <div className={`assetActionButtons show`}>
                  {isDownloadButton && (
                    <button onClick={toggleDownloadModal}><FiDownload/></button>
                  )}
                  {isCopyLinkButton && (
                    <button onClick={copyLink}><FiLink/></button>
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
                <div className='fileFormat'>{fileFormat}</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {showAlert && <AlertPopup showAlert={showAlert} alertMessage={message} />}

      {showDownloadModal && <DownloadModal assetId={assetId} language={language} license={license && license.fields} isOpen={showDownloadModal} onClose={toggleDownloadModal} closeModal={closeDownloadModal}  showAlert={showAlertAfterDownload}></DownloadModal>}
      {showEmailModal && <EmailModal assetId={assetId} isOpen={showEmailModal} onClose={toggleEmailModal} closeModal={toggleEmailModal}></EmailModal>}
      {showShopModal && <ShopModal shopId={shopId ? shopId : shopWithTemplateId} isOpen={showShopModal} onClose={toggleShopModal} closeModal={toggleShopModal}></ShopModal>}
      {showB2bModal && <B2bModal templateId={templateId} isOpen={showB2bModal} onClose={toggleB2bModal} closeModal={toggleB2bModal}></B2bModal>}

    </div>
  )
}

export default DetailsModal
