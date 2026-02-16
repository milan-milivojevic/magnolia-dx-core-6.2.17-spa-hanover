import React, { useEffect, useState } from 'react';
import styled from "styled-components"

const Alert = styled.div`
    position: fixed;
    top: 12%;
    left: 45%;
    background-color: #7ca940;
    color: #fff;
    font-size: 16px;
    font-family: MuseoSans700;
    z-index: 9999999;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
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
