import React from "react";
import { styled } from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f2f5f4;
  height: 100vh;
`;

const Title = styled.h1`
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
`;

const Image = styled.img`
  width: 200px;
`;

interface ErrorPageInterface {
  title?: string;
}

const ErrorPage = ({ title }: ErrorPageInterface) => {
  return (
    <Layout>
      <Image src="darth-vader.svg" alt="404 error" />
      <Title>{title ? `${title} Error` : null}</Title>
      <Paragraph>You underestimate the power of the dark side</Paragraph>
    </Layout>
  );
};

export default ErrorPage;
