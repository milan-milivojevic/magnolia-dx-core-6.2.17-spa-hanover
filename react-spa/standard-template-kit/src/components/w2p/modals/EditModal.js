import React, { useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';

const EditModal = ({ documentId, isOpen, onClose }) => {
  
  console.log("Create Modal")

  const iframeRef = useRef(null);

  const handleIframeLoad = () => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;

      const styleElement = iframeDocument.createElement('style');

      const cssStyles = `
        div#bm-header {
            display: none;
        }        
        div#bm-body {
            height: 100vh;
            padding: 0;
            margin: 0;
        }        
        body#body.bgImage {
            background: 0;
        }
      `;

      styleElement.innerHTML = cssStyles;

      iframeDocument.head.appendChild(styleElement);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Create Modal"
      className="createReactModal"
    > 
      <div className='detailsModalWrapper w2p'>
        <div class="closeButtonWrapper w2p">
          <h1 className='titleId'>Edit Document</h1>
          <button className="closeButton" onClick={onClose}><AiOutlineClose/></button>          
        </div>
        <div className='createModal w2p'>          
          <iframe className="createTemplateIframe"
                  ref={iframeRef}
                  title={"Template Details"}
                  src={'/DocumentWizard.do?advertInstanceId=' + documentId}
                  onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </div>      
    </Modal>
  );
};

export default EditModal
