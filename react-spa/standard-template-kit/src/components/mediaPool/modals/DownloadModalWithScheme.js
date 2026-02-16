import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { downloadFileDirect } from '../../../api/searchService';
import { AiOutlineClose } from "react-icons/ai";

const DownloadModal = ({ assetId, language, license, isOpen, onClose, closeModal, showAlert }) => {

  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [downloadOptions, setDownloadOptions] = useState([]);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  useEffect(() => {
    fetch(`${baseUrl}/rest/mp/v1.0/assets/${assetId}/downloadSchemes?language=${language}`)
      .then((response) => response.json())
      .then((data) => {
        // Prikaži sve opcije OSIM „Standard" (id: 306)
        const options = (data[0]?.download_schemes || []).filter(
          (scheme) => scheme.id !== 306
        );

        setDownloadOptions(options);
        if (options.length) {
          setSelectedOption(options[0].id);
        } else {
          setSelectedOption(null);
        }
      })
      .catch((error) => console.error('Error fetching download schemes:', error));
  }, [assetId]);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  
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
    // 1. Pratimo event u Matomo – pre nego što stvarno otvorimo link
    window._paq = window._paq || [];
    window._paq.push([
      'trackEvent',
      'Download',          // Kategorija eventa
      'downloadFile',      // Akcija eventa
      assetId              // Label eventa (opciono)
    ]);
  
    // 2. Onda radimo postojeću logiku
    const data = await downloadFileDirect(assetId, selectedOption, download_version, language, null);
  
    if (typeof data[0].download_url !== 'undefined') {
      if (isMobileDevice()) {
        openLink(data[0].download_url, '_blank');
      } else {
        openLink(data[0].download_url, '_blank');
      }
    }
  };

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
    if (license && checkboxChecked) {
      downloadFile();
      onClose();      
    } else {
      downloadFile();
      onClose();     
      showAlert();
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
          <h1 className='titleId'>Asset Download (ID: <span>{assetId}</span>)</h1>
          <button className="closeButton" onClick={closeModal}><AiOutlineClose/></button>          
        </div>
        <div className='downloadModal'> 
          <div className="assetDownloadSchemes">
            <h1 className='titleId'>Download As</h1>  
            <div className='downloadOptions'>
              {downloadOptions.map(option => (
                <label key={option.id}>
                  <input
                    type="radio"
                    name="downloadOption"
                    value={option.id}
                    checked={Number(selectedOption) === option.id}
                    onChange={handleRadioChange}
                  />
                  {option.name}
                </label>
              ))}
            </div>
          </div>
          {license && 
            <div className='licensePermission'>      
              <h1 className='titleId'>Assets Requiring License Permission</h1>  
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
            </div>
          }          
          <div className="downloadButton">
            <button
              onClick={handleDownloadClick}
              // disabled={!checkboxChecked && license}
              // className={checkboxChecked && license ? 'enabled' : 'disabled'}
              className='enabled'
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