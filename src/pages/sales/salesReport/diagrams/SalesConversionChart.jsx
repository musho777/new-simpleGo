import React from 'react';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import {
  ConversionTooltipContainer,
  ConversionTooltipItem,
  ConversionTooltipLabel,
} from './Diagram.styles';

const SalesConversionChart = ({ revenueData = {}, height = 300 }) => {
  const formatRevenueData = (revenueData) => {
    if (!revenueData || Object.keys(revenueData).length === 0) return [];

    return Object.entries(revenueData)
      .filter(([, revenue]) => revenue && revenue > 0)
      .map(([department, revenue]) => ({
        name: department,
        amount: revenue,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);
  };

  const chartData = formatRevenueData(revenueData);

  return (
    <ResponsiveContainer width="100%" height={height} minHeight={250}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip
          content={({ payload, label }) => {
            if (!payload || payload.length === 0) return null;
            return (
              <ConversionTooltipContainer>
                <ConversionTooltipLabel>{label}</ConversionTooltipLabel>
                {payload.map((entry, index) => (
                  <ConversionTooltipItem key={index} color={entry.color}>
                    {entry.value?.toLocaleString('en-US', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}{' '}
                    AMD
                  </ConversionTooltipItem>
                ))}
              </ConversionTooltipContainer>
            );
          }}
        />
        <Bar dataKey="amount" fill="#67C8EB" name="Revenue" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesConversionChart;
