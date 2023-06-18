import React from "react";
import styled, { keyframes } from "styled-components";

const spinnerAnimation = keyframes`
from {
        transform: rotate(0deg);
    }
to {
        transform: rotate(360deg);
    }
`;

const SpinnerBody = styled.div`
  height: 4rem;
  width: 4rem;
  border: solid #000;
  border-top-color: #fce571;
  border-radius: 50%;
  animation: ${spinnerAnimation} 800ms linear infinite;
  position: absolute;
  top: 40%;
  left: 50%;
`;

const Spinner = () => {
  return <SpinnerBody data-testid="spinner" />;
};

export default Spinner;
