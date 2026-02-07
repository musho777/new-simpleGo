import React from 'react';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { chartStyles } from '../SalesReport.styles';

const TopDepartmentsSalesChart = ({ data = [] }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div style={chartStyles.tooltip}>
          <p style={chartStyles.tooltipTitle}>{data.name}</p>
          <p style={chartStyles.tooltipValue}>
            Revenue: {payload[0].value?.toLocaleString()} AMD
          </p>
        </div>
      );
    }
    return null;
  };

  const formatXAxisLabel = (value) => {
    if (value >= 1000000) {
      return `${value / 1000000}M AMD`;
    } else if (value >= 1000) {
      return `${value / 1000}k AMD`;
    }
    return `${value} AMD`;
  };

  return (
    <ResponsiveContainer width="100%" height={data.length * 75}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
      >
        <defs>
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <XAxis
          type="number"
          tick={chartStyles.xAxisTick}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatXAxisLabel}
        />
        <YAxis
          dataKey="name"
          type="category"
          width={100}
          tick={chartStyles.yAxisTick}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="amount" fill="url(#barGradient)" radius={[0, 4, 4, 0]} name="Revenue" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopDepartmentsSalesChart;
