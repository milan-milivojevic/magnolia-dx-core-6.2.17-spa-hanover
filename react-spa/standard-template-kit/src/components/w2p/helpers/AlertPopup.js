import React, { useEffect, useState } from 'react';
import styled from "styled-components"

const Alert = styled.div`
    position: fixed;
    top: 12%;
    left: 45%;
    background-color: #7ca940;
    color: #fff;
    z-index: 9999999;
    padding: 20px;
`

const AlertPopup = ({ showAlert, alertMessage }) => {
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (showAlert) {
      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
      }, 2500);
    }
  }, [showAlert]);

  return alertVisible ? (
    <Alert>
      {alertMessage}
    </Alert>
  ) : null;
};

export default AlertPopup;
