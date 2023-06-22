import React from "react";
import styled from "styled-components";
import { StarshipInterface } from "../pages/HomePage";

type ColumnProps = {
  size?: number;
  weight?: number;
  right?: string;
  top?: string;
};

const Layout = styled.div`
  border: 2px solid lightgrey;
  border-radius: 5px;
  margin: 48px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: start;
`;

const Column = styled.div<ColumnProps>`
  flex: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  padding: 24px;
  border-right: ${({ right }) => (right ? "2px solid lightgrey" : "none")};
  border-top: ${({ top }) => (top ? "2px solid lightgrey" : "none")};
  min-width: 70px;
`;

interface TableInterface {
  starships: StarshipInterface[];
}

const Table = ({ starships }: TableInterface) => {
  return (
    <>
      <Title>Starships</Title>
      <Layout>
        <Row>
          <Column size={1} right="true" weight={600}>
            Starship
          </Column>
          <Column size={3} weight={600}>
            Speed
          </Column>
        </Row>
        {starships.map(({ name, max_atmosphering_speed }) => (
          <Row key={name}>
            <Column size={1} right="true" top="true">
              {name}
            </Column>
            <Column size={3} top="true">
              {parseInt(max_atmosphering_speed) || "n/a"}
            </Column>
          </Row>
        ))}
      </Layout>
    </>
  );
};

export default Table;
