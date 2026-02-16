import React, { useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';

const LinkModal = ({src, isOpen, closeModal}) => {

  const iframeRef = useRef(null);

  const handleIframeLoad = () => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;

      const styleElement = iframeDocument.createElement('style');

      const cssStyles = `
        div.headerFallbackContainer, 
        div#bm-header {
          display: none;
        }
        
        body#body {
          background: none;
        }
      `;

      styleElement.innerHTML = cssStyles;

      iframeDocument.head.appendChild(styleElement);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Link Modal"
      className="detailsReactModal"
    > 
      <div className='detailsModalWrapper iframe'>
        <div class="closeButtonWrapper">
          <button className="closeButton" onClick={closeModal}><AiOutlineClose/></button>
        </div>
        <div className='detailsModal w2p'>          
          <iframe className="detailsIframe"
                  ref={iframeRef}
                  title={"iFrame Link"}
                  src={src}
                  onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </div>      
    </Modal>
  );
};

export default LinkModal;
