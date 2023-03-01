import React from "react";
import { axiosClient } from "../libraries/axiosClient";
import { Area } from "@ant-design/plots";

const ViewChart = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axiosClient
      .get("/views")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log("🧨", err);
      });
  }, []);

  const config = {
    data,
    xField: "timePeriod",
    yField: "value",
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      };
    },
  };

  return <Area {...config} />;
};

export default ViewChart;
