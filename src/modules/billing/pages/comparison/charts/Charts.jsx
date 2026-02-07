import { useMobileView } from 'modules/billing/hooks/useMobileView';
import { useTabletView } from 'modules/billing/hooks/useTabletView';
import {
  Bar,
  BarChart,
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ChartContainer,
  ChartHeader,
  ChartWrapper,
  HeaderTitle,
  MonthColor,
  MonthTitle,
  MonthView,
  MonthWrapper,
  Title,
} from './Charts.styles';

const Charts = ({ barData, pieData, totalPaymentsAmount, dateRange1, dateRange2 }) => {
  const isTablet = useTabletView();
  const isMobile = useMobileView();

  return (
    <ChartHeader>
      <HeaderTitle>Ամփոփում</HeaderTitle>
      <ChartContainer $isTablet={isTablet || isMobile}>
        <ChartWrapper>
          <ResponsiveContainer width="100%">
            <BarChart layout="vertical" data={barData}>
              <XAxis type="number" />
              <YAxis
                dataKey="name"
                type="category"
                width={180}
                tick={{ fontSize: 12, width: 250 }}
                tickMargin={20}
              />
              <Tooltip
                content={({ payload }) => {
                  if (!payload || payload.length === 0) return null;

                  return (
                    <div
                      style={{
                        background: 'white',
                        padding: '10px',
                        border: '1px solid #ccc',
                      }}
                    >
                      {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                          {entry.dataKey} : {entry.value}
                        </p>
                      ))}
                    </div>
                  );
                }}
              />

              <Bar
                dataKey="Առաջին միջակայք"
                fill="#2D6CDF"
                barSize={20}
                radius={[5, 5, 5, 5]}
              />
              <Bar
                dataKey="Երկրորդ միջակայք"
                fill="#FF6A00"
                barSize={20}
                radius={[5, 5, 5, 5]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper $isTablet={isTablet || isMobile}>
          {isMobile || isTablet ? (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Title>Վճարումների ընդհանուր գումար</Title>
              <MonthWrapper>
                <MonthView>
                  <MonthColor />
                  <MonthTitle>{dateRange1}</MonthTitle>
                </MonthView>
                <MonthView>
                  <MonthColor $isNext={true} />
                  <MonthTitle>{dateRange2}</MonthTitle>
                </MonthView>
              </MonthWrapper>
            </div>
          ) : (
            <Title>Վճարումների ընդհանուր գումար</Title>
          )}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={80}
                outerRadius={130}
                fill="#8884d8"
                label={({ value, cx, cy, midAngle, innerRadius, outerRadius }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  const formattedValue = (value / 1000000).toFixed(0) + ' մլն';

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="white"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={12}
                      fontWeight="500"
                    >
                      {formattedValue}
                    </text>
                  );
                }}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <Label
                  value={`${totalPaymentsAmount} դրամ`}
                  position="center"
                  fontSize={16}
                  fontWeight="600"
                  fill="#6C757D"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>
        {!isMobile && !isTablet && (
          <MonthWrapper>
            <MonthView>
              <MonthColor />
              <MonthTitle>Առաջին միջակայք</MonthTitle>
            </MonthView>
            <MonthView>
              <MonthColor $isNext={true} />
              <MonthTitle>Երկրորդ միջակայք</MonthTitle>
            </MonthView>
          </MonthWrapper>
        )}
      </ChartContainer>
    </ChartHeader>
  );
};

export default Charts;
