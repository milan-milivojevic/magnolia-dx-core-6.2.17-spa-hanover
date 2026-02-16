import React, { useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';


const LinkModal = ({src, isOpen, closeModal}) => {

  const iframeRef = useRef(null);

  const handleIframeLoad = () => {
    if (iframeRef.current) {
      // Access the iframe's document
      const iframeDocument = iframeRef.current.contentDocument;

      // Create a new style element
      const styleElement = iframeDocument.createElement('style');

      // Define your CSS styles here
      const cssStyles = `
        div.headerFallbackContainer, 
        div#bm-header {
          display: none;
        }
        
        body#body {
          background: none;
        }
      `;

      // Set the style element's content to your CSS styles
      styleElement.innerHTML = cssStyles;

      // Append the style element to the iframe's document head
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