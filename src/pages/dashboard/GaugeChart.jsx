import React from 'react';

import { Cell, Pie, PieChart } from 'recharts';

const GaugeChart = () => {
  const actual = 60;
  const target = 90;

  const data = [
    { name: 'actual', value: actual },
    { name: 'rest', value: 100 - actual },
  ];

  return (
    <div
      style={{
        width: 600,
        height: 350,
        background: 'white',
        textAlign: 'center',
        paddingTop: 20,
      }}
    >
      <div
        style={{
          fontSize: '16px',
          fontWeight: '700',
          marginBottom: '10px',
          color: '#0A1931',
        }}
      >
        Closing Target VS Actual
      </div>

      <PieChart width={600} height={450}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          innerRadius="60%"
          outerRadius="100%"
          paddingAngle={2}
          dataKey="value"
        >
          <Cell fill="url(#gradient)" />
          <Cell fill="#2D6CDF" />
        </Pie>

        <defs>
          <linearGradient id="gradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#4F83E3" />
            <stop offset="50%" stopColor="#4F83E3" />
            <stop offset="100%" stopColor="#2D6CDF" />
          </linearGradient>
        </defs>
      </PieChart>

      <div
        style={{
          marginTop: '-250px',
          fontSize: '30px',
          fontWeight: '700',
          color: '#0A1931',
        }}
      >
        {actual}%
      </div>

      <div
        style={{
          marginTop: '-250px',
          marginLeft: '65%',
          transform: 'rotate(25deg)',
          transformOrigin: 'left',
          color: '#0A1931',
          fontSize: '20px',
          fontWeight: '700',
        }}
      >
        Target {target}%
      </div>
    </div>
  );
};

export default GaugeChart;
