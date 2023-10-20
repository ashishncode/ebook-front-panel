import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
  Cell,
} from "recharts";
import axios from "axios";
import { useState, useEffect } from "react";
import { getProgressData } from "../../utility/api";

const Chart = () => {
  const [proData, setProData] = useState({});

  const getProgressDataHandler = () => {
    getProgressData().then((res) => {
      if (res.status === 200) {
        setProData(res?.data);
      }
    });
  };

  useEffect(() => {
    getProgressDataHandler();
  }, []);
  const data = [
    { name: "Complete Book", value: proData?.completedPercentage },
    { name: "Pending Book", value: proData?.incompletePercentage },
    // { name: "Group C", value: 20 },
    // { name: "Group D", value: 200 },
  ];

  const COLORS = ["#26c3cc", "#ffdf6c", "#cf82f1", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default Chart;
