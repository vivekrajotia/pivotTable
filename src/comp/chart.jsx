import * as React from "react";
import { Column } from "@ant-design/plots";

const data = [
  {
    tradetype: "Fixed",
    monthwise: 600,
    month: "Dec 22",
  },
  {
    tradetype: "Fixed",
    monthwise: 40,
    month: "Oct 22",
  },
  {
    tradetype: "Basis",
    monthwise: -7600,
    month: "Dec 22",
  },
  {
    tradetype: "Basis",
    monthwise: 0,
    month: "Oct 22",
  },
];

function AntDesignCharts() {
  const config = {
    data,
    xField: "month",
    yField: "monthwise",
    seriesField: "tradetype",
  };
  return (
    <>
      <h2>Ant Design Charts</h2>
      <Column {...config} />
    </>
  );
};

export default AntDesignCharts;
