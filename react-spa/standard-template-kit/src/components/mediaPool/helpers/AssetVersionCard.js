import React, { useState } from 'react'
import { MdOutlinePictureAsPdf, MdDownload } from "react-icons/md";
import { downloadFileDirect } from '../../../api/searchService';
import AssetPreview from './AssetPreview';
import AlertPopup from './AlertPopup';
import moment from "moment";

const AssetVersionCard = ({ assetVersionData }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMesage] = useState("");  
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const assetId = assetVersionData.assetId;
  const versionID =assetVersionData.id;
  const assetVersion = assetVersionData.versionNumber;
  var uploadDate = assetVersionData.insertedTime;
  const owner = assetVersionData.uploader.name;
  const assetPageCount = assetVersionData.fileResource.pageCount;
  const assetResourceType = assetVersionData.fileResource.fileResourceTypeName
  const actionsMask = assetVersionData.actionsMask;
  var title = assetVersionData.fileResource.fileName;
  var fileFormat = assetVersionData.fileResource.suffix;
  const fileSize = assetVersionData.fileResource.fileSize + ' KB';

  const selectedOption = 5;
  const language = 'en';
  const download_version = 'FIXED';

  title = title
    .replace(/-/g, '_') // Replace dashes with underscores
    .split('_') // Split the string by underscores into an array
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' '); // Join the words back together with spaces

  uploadDate = moment(uploadDate).utc().format('MM/DD/YYYY');
  fileFormat = fileFormat.toUpperCase();

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

  const toggleDownloadModal = () => {
    if (assetVersionData.license) {
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

  return (
    <div className='assetCard'>
      <div className='assetCardPreview'>
        <AssetPreview assetId={assetId} assetVersion={assetVersion} assetPageCount={assetPageCount} assetResourceType={assetResourceType} isModal={false}></AssetPreview>
      </div>      
      <div className={`assetActionButtons show`}>        
        {actionsMask === 15 && (
          <button onClick={toggleDownloadModal}><MdOutlinePictureAsPdf/></button>
        )}
        <button onClick={toggleDownloadModal}><MdDownload/></button>        
      </div>
      <div className='assetCardContent'>
        <p><span>Version: </span>{assetVersion}</p>
        <p><span>Prepared by: </span>{owner}</p>
        <p><span>File name: </span>{title}</p>
        <p><span>Upload date:</span>{uploadDate}</p>
      </div>

      {showAlert && <AlertPopup showAlert={showAlert} alertMessage={message} />}
    </div>
  )
}

export default AssetVersionCard