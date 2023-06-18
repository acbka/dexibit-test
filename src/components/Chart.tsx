import React from "react";
import styled from "styled-components";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Layout = styled.div`
  border: 2px solid lightgrey;
  border-radius: 5px;
  margin: 48px;
  padding: 24px;
`;

interface ChartInterface {
  name: string[];
  speed: number[];
}

const Chart = ({ name, speed }: ChartInterface) => {
  const options: Highcharts.Options = {
    title: {
      text: "Speed by Starship",
    },
    xAxis: {
      categories: name,
    },
    yAxis: {
      title: {
        text: "Speed",
      },
    },
    series: [
      {
        data: speed,
        name: "Starships",
        type: "column",
        color: "#fce571",
      },
    ],
    accessibility: {
      enabled: false,
    },
  };

  return (
    <Layout>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Layout>
  );
};

export default Chart;
