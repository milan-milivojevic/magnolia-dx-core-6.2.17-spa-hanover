import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { downloadFileDirect } from '../../../api/searchService';
import { AiOutlineClose } from "react-icons/ai";


const EmailModal = ({ assetId, isOpen, onClose, closeModal }) => {

  const selectedOption = 5;
  const language = 'en';
  const download_version = 'FIXED';

  const [recipient, setRecipient] = useState('');
  const [cc, setCC] = useState('');
  const [bcc, setBCC] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copyToMyself, setCopyToMyself] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [progressMessage, setProgressMessage] = useState('');

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW; 

  const toggleCopyToMyself = () => {
    setCopyToMyself(!copyToMyself);
  };

  const getDownloadLink = async () => { 
    const data = await downloadFileDirect(assetId, selectedOption, download_version, language, null);
    if (typeof data[0].download_url !== 'undefined') {
      const url = data[0].download_url;
      console.log("url");
      console.log(url);
      setDownloadLink(url);
      console.log("downloadLink");
      console.log(downloadLink);
    }
  }

  useEffect(() => {
    getDownloadLink();
  }, []);

  const getUserEmail = async () => {
    const response = await fetch(
      `${baseUrl}/rest/administration/users/_current`
    );
    if (response.ok) {
      const data = await response.json();
      const email = data.email;
      console.log("email")
      console.log(email)
      setUserEmail(email);
      console.log("userEmail")
      console.log(userEmail);
    }
  }
  useEffect(() => {
    getUserEmail();
  }, []);

  const sendMail = (e) => {
    e.preventDefault();
    if (recipient !== '' && subject !== '') {

      const config = {
        params: {
          mailFrom: userEmail,
          mailTo: recipient,
          mailCc: cc,
          mailBcc: bcc,
          mailSubject: subject,
          mailBody:
            message +
            '\n\nYou may download the shared asset using this link: \n' +
            downloadLink,
        },
      };

      console.log(config);

      // fetch('/bmMagnoliaMail/sendMailServlet', {
      //   method: 'GET',
      //   params: config.params,
      // })
      // .then((response) => response.json())
      // .then((responseData) => {
      //   setProgressMessage(responseData.msg);
      // })
      // .catch((error) => {
      //   console.log('ERROR: ', error);
      // });

      onClose();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Email Modal"
      className="emailReactModal"
    > 
      <div className='emailModalWrapper'>   
        <div class="closeButtonWrapper">
          <h1 className='titleId'>Send by e-mail (ID: <span>{assetId}</span>)</h1>
          <button className="closeButton" onClick={closeModal}><AiOutlineClose/></button>          
        </div>
        <form onSubmit={sendMail} className='emailModalForm'>
          <div className="emailModalInput">
            <label>To:</label>
            <input
              name="recipient"
              required
              placeholder="example@gmail.com"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="emailModalInput">
            <label>CC:</label>
            <input
              name="cc"
              placeholder="example@gmail.com"
              type="text"
              value={cc}
              onChange={(e) => setCC(e.target.value)}
            />
          </div>
          <div className="emailModalInput">
            <label>BCC:</label>
            <input
              name="bcc"
              placeholder="example@gmail.com"
              type="text"
              value={bcc}
              onChange={(e) => setBCC(e.target.value)}
            />
          </div>
          <div className="emailModalInput">
            <label>Subject:</label>
            <input
              name="subject"
              required
              placeholder="Add a subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="emailModalInput">
            <label>Message:</label>
            <textarea
              name="message"
              placeholder="Add a message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {/* <div className="emailModalInput">
            <label>
              <input
                type="checkbox"
                checked={copyToMyself}
                onChange={toggleCopyToMyself}
              />
              Copy to Myself
            </label>
          </div> */}
          <div className="sendMailButton">
            <button type="submit">Send Mail</button>  
          </div>  
        </form>            
      </div>
    </Modal>
  );
}
export default EmailModal;
