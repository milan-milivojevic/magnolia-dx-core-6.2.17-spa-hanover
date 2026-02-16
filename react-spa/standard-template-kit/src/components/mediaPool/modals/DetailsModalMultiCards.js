import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import AssetPreview from '../helpers/AssetPreview';
import AssetVersionCard from '../helpers/AssetVersionCard';
import AssetVariantCard from '../helpers/AssetVariantsCard';
import RelatedAssetCard from '../helpers/RelatedAssetCard';
import AlertPopup from '../helpers/AlertPopup';
import DownloadModal from './DownloadModalWithScheme';
import EmailModal from './EmailModal';

import { downloadFileDirect, assetVersionsService, assetVariantsService, assetRelationsService } from '../../../api/searchService';
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
    linkToW2P,
    download_version,
    language,
    selectedOption,
    license,
    isOpen,
    onClose
  } = props;

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMesage] = useState("");
  const [assetVersions, setAssetVersions] = useState([]);
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

  const toggleEmailModal = () => {
    setShowEmailModal(!showEmailModal);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
  }

  const getAssetVersions = async (assetId) => {
    const response = await assetVersionsService(assetId);
    setAssetVersions([]);
    setAssetVersions(response);
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
                  {assetVersions.map((assetVersionData) => (
                    <AssetVersionCard key={assetVersionData.id} assetVersionData={assetVersionData} license={license} />
                  ))}
                </div>
              )}
              {activeTab === 'variants' && (
                <div className='assetVariants list'>
                  {assetVariants.map((assetVariantData) => (
                    <AssetVariantCard key={assetVariantData.id} assetVariantData={assetVariantData} license={license} />
                  ))}
                </div>
              )}
              {activeTab === 'relations' && (
                <div className='relatedAssets list'>
                  {relatedAssets && relatedAssets.map((relatedAssetData) => (
                    <RelatedAssetCard key={relatedAssetData.id} relatedAssetData={relatedAssetData} />
                  ))}
                </div>
              )}
            </div>
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
                  <p><span>Keywords: </span>{keywords}</p>
                }
                {linkToW2P &&
                  <p><span>Link to Brand Template Pool: </span><a className='linkToW2P' href={linkToW2P}>{linkToW2P}</a></p>
                }
              </div>
              <div className='fileFormatActions'>
                <div className={`assetActionButtons show`}>
                  <button onClick={toggleDownloadModal}><FiDownload /></button>
                  <button onClick={copyLink}><FiLink /></button>
                  <button onClick={toggleEmailModal}><FiMail /></button>
                </div>
                <div className='fileFormat'>{fileFormat}</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {showAlert && <AlertPopup showAlert={showAlert} alertMessage={message} />}

      {showDownloadModal && <DownloadModal assetId={assetId} language={language} license={license && license.fields} isOpen={showDownloadModal} onClose={toggleDownloadModal} closeModal={closeDownloadModal} ></DownloadModal>}
      {showEmailModal && <EmailModal assetId={assetId} isOpen={showEmailModal} onClose={toggleEmailModal} closeModal={closeEmailModal}></EmailModal>}

    </div>
  )
}

export default DetailsModal
