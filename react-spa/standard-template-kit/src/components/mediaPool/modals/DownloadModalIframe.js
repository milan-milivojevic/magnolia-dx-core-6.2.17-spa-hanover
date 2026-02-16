import React, { useRef, useCallback } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';

const DownloadModalIframe = ({ assetId, isOpen, onClose }) => {
  const iframeRef = useRef(null);

  const handleIframeLoad = useCallback(() => {
    const iframeElem = iframeRef.current;
    if (!iframeElem) return;

    try {
      const doc = iframeElem.contentDocument || iframeElem.contentWindow.document;
      if (!doc) return;

      const footer = doc.getElementById('bmPopupFooter');
      if (footer) {
        footer.style.backgroundColor = '#fff';
        footer.style.borderTop = 'none';
        footer.style.height = '40px';
      }

      const styleTag = doc.createElement('style');
      styleTag.innerHTML = `
        /* All elements inside iframe with class "actionButton" */
        #bmPopupFooter {
          background-color: #b7bdc4;
          border-top: none;
          height: 40px;
        }
        .actionButton, .actionButtonDisabled {
          background-color: #b7bdc4;
          border-radius: 4px;
          background-image: none;
          font-family: 'Roboto', sans-serif !important;
          padding: 8px 16px;
          font-size: 14px !important;
          border-color: #999;
          color: #000 !important;
          width: 68px;
          text-align: center;
          margin-right: 12px !important;
        }
        .actionButton:hover {
          background-color: #d5d5d5;
          color: #000 !important;
          border-color: #999;
        }
        #actionButtonEnabled, #actionButtonDisabled  {
          margin-right: 30px !important;
        }
      `;
      doc.head.appendChild(styleTag);

      const cancelBtn = doc.getElementById('cancelButton');
      if (cancelBtn) {
        cancelBtn.onclick = null;
        cancelBtn.addEventListener('click', (e) => {
          e.preventDefault();
          onClose();
        });
      }
    } catch (err) {
      console.error('Failed to inject CSS or listener into iframe:', err);
    }
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Download Modal"
      className="detailsReactModal"
    >
      <div className="detailsModalWrapper iframe">
        <div className="closeButtonWrapper">
          <button className="closeButton" onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>

        <div className="detailsModal w2p">
          {}
          <iframe
            ref={iframeRef}
            className="detailsIframe"
            title="Asset Download"
            src={`/MediapoolDownloadMedia.do?popup=true&mediaGUID=${assetId}`}
            onLoad={handleIframeLoad}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DownloadModalIframe;
