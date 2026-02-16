import React, { useState } from 'react';
import Modal from 'react-modal';
import { downloadFileDirect } from '../../../api/searchService';
import { AiOutlineClose } from "react-icons/ai";

const DownloadModal = ({ assetId, license, isOpen, onClose, closeModal }) => {

  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const selectedOption = 5;
  const language = 'en';
  const download_version = 'FIXED';
  const licenseId = license?.id?.value || null;
  const licenseType = license?.licenseHolderName?.value;
  const licenseName = license?.licenseName?.value;
  const restrictions = license?.restrictionOtherText?.value;
  const usage = (license?.usageExternal?.value === true ? "External " : "") +
    (license?.usageExternal?.value === true ? "External " : "") +
    (license?.usageOnline?.value === true ? "Online " : "") +
    (license?.usagePrint?.value === true ? "Print " : "") +
    (license?.usageAudio?.value === true ? "Audio " : "") +
    (license?.usageVideo?.value === true ? "Video " : "");

  const downloadFile = async () => {
    const data = await downloadFileDirect(assetId, selectedOption, download_version, language, licenseId);
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

  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  const handleDownloadClick = () => {
    if (checkboxChecked) {
      downloadFile();
      onClose();      
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Download Modal"
      className="downloadReactModal"
    > 
      <div className='downloadModalWrapper'>
        <div class="closeButtonWrapper">
          <h1 className='titleId'>Assets Requiring License Permission (ID: <span>{assetId}</span>)</h1>
          <button className="closeButton" onClick={closeModal}><AiOutlineClose/></button>          
        </div>
        <div className='downloadModal'>          
          <p className='licenseType'>
            <span>License Type:</span> {licenseType}
          </p>
          <p className='licenseName'>
            <span>License Name:</span> {licenseName}
          </p>
          <p className='usage'>
            <span>Usage:</span> {usage}
          </p>
          <p className='restrictions'>
            <span>Other Restrictions:</span> {restrictions}
          </p>
          <label>
            <input
              className='licenseConfirmation'
              type="checkbox"
              checked={checkboxChecked}
              onChange={handleCheckboxChange}
            />
            &nbsp; I have read the licensing terms and will follow them (requirement for
            using the asset).
          </label>
          <div className="downloadButton">
            <button
              onClick={handleDownloadClick}
              disabled={!checkboxChecked}
              className={checkboxChecked ? 'enabled' : 'disabled'}
            >
              Download
            </button>
          </div>
        </div>
      </div>      
    </Modal>
  );
};

export default DownloadModal;