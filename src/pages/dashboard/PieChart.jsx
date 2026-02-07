import React from 'react';

import { Cell, Pie, PieChart } from 'recharts';

const data = [
  { name: 'Marketing team', value: 45, color: '#4A90E2' },
  { name: 'Development team', value: 25, color: '#50E3C2' },
  { name: 'Design team', value: 20, color: '#4AC8F0' },
  { name: 'Support team', value: 10, color: '#F5A623' },
];

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="14"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const MyPieChart = () => {
  return (
    <PieChart width={252} height={252}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        labelLine={false}
        label={CustomLabel}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={10} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default MyPieChart;
