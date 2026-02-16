import React, { useRef, useCallback } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';

const DownloadModalIframe = ({ assetId, isOpen, onClose }) => {
  // 1. Create a ref to the <iframe> so we can inspect its content once it loads
  const iframeRef = useRef(null);

  // 2. When the iframe finishes loading, grab its document:
  const handleIframeLoad = useCallback(() => {
    const iframeElem = iframeRef.current;
    if (!iframeElem) return;

    // Try/catch in case the iframe content is ever cross-origin
    try {
      const doc = iframeElem.contentDocument || iframeElem.contentWindow.document;
      if (!doc) return;

      // 3a. Override styles on #bmPopupFooter
      const footer = doc.getElementById('bmPopupFooter');
      if (footer) {
        // Example: change background and padding. Adjust as needed.
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

      // 3b. Hijack the “Cancel” button inside the iframe so it runs onClose()
      const cancelBtn = doc.getElementById('cancelButton');
      if (cancelBtn) {
        // Remove any existing onclick to avoid duplicate behavior
        cancelBtn.onclick = null;
        // Attach our own listener
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
          {/* 1. Attach the ref and the onLoad handler */}
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
