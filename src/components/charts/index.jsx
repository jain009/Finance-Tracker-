import { Line, Pie } from "@ant-design/plots";
import React from "react";
import { 
  LineChart, 
  PieChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell 
} from "recharts";


const DesignCharts = ({ sortedTransactions }) => {
  // Line chart data preparation
  const lineData = sortedTransactions.map((item) => ({
    date: item.date,
    amount: item.amount,
    type: item.type
  }));

  // Pie chart data preparation (expenses only)
  const spendingData = sortedTransactions.filter(
    (transaction) => transaction.type === "expense"
  );

  // Categorize expenses
  const categoryMap = spendingData.reduce((acc, transaction) => {
    const { tag, amount } = transaction;
    acc[tag] = (acc[tag] || 0) + amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryMap).map(([tag, amount]) => ({
    tag,
    amount
  }));

  // Line chart config
  const lineConfig = {
    data: lineData,
    xField: 'date',
    yField: 'amount',
    seriesField: 'type',
    color: ['#1890ff', '#f5222d'],
    xAxis: {
      type: 'time',
    },
    tooltip: {
      showMarkers: false,
    },
  };

  // Pie chart config
  const pieConfig = {
    data: pieData,
    angleField: 'amount',
    colorField: 'tag',
    radius: 0.8,
    label: {
      type: 'spider',

      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div className="charts-container"
    style={{justifyContent:"space-evenly",
      height:"31rem"
    }}>
      <div className="chart-wrapper"
      style={{width:"55%"}}
      >
        <h2>Financial Timeline</h2>
        <Line {...lineConfig} />
      </div>
      <div className="chart-wrapper"
         style={{width:"30%"}}>
        <h2>Expense Categories</h2>
        <Pie  {...pieConfig} />
      </div>
    </div>
  );
};

export default DesignCharts;