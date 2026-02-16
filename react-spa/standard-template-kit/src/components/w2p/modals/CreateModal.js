import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';
import { findInstanceId } from '../../../api/w2pSearchService';


const CreateModal = ({ templateId, isOpen, onClose }) => {
  
  console.log("Create Modal")

  const iframeRef = useRef(null);

  const [instanceId, setInstanceId] = useState([]);

  const getInstanceId = async (templateId) => {
    const response = await findInstanceId(templateId);
    setInstanceId(response);
    console.log("[searchById response]");
    console.log(response);
    console.log("----------------------");
  }

  useEffect(() => {
    getInstanceId(templateId);
  }, [templateId]);

  const handleIframeLoad = () => {
    if (iframeRef.current) {
      // Access the iframe's document
      const iframeDocument = iframeRef.current.contentDocument;

      // Create a new style element
      const styleElement = iframeDocument.createElement('style');

      // Define your CSS styles here
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

      // Set the style element's content to your CSS styles
      styleElement.innerHTML = cssStyles;

      // Append the style element to the iframe's document head
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
          <h1 className='titleId'>Create Document (Template ID: <span>{templateId}</span>)</h1>
          <button className="closeButton" onClick={onClose}><AiOutlineClose/></button>          
        </div>
        <div className='createModal w2p'>          
          <iframe className="createTemplateIframe"
                  ref={iframeRef}
                  title={"Template Details"}
                  src={'/DocumentWizard.do?advertInstanceId=' + instanceId + '&skin=magnolia'}
                  onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </div>      
    </Modal>
  );
};

export default CreateModal