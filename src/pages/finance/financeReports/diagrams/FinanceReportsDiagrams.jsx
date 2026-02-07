import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CustomDatePicker from 'common-ui/customDatePicker';
import {
  getAccountingTypeChart,
  getAmountAnalysisChart,
  getCostRatioChart,
  getTopDepartmentsChart,
} from 'features/financeRequest/financeRequestActions';
import {
  selectAccountingTypeChartData,
  selectAccountingTypeChartLoading,
  selectAmountAnalysisData,
  selectAmountAnalysisLoading,
  selectCostRatioData,
  selectCostRatioLoading,
  selectTopDepartmentsData,
  selectTopDepartmentsLoading,
} from 'features/financeRequest/financeRequestSlice';
import Navigation from 'pages/components/navigation';
import Switch from 'pages/components/switch';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import {
  ChartLabel,
  ChartLabelWrapper,
  ChartWrapper,
  DateFilterWrapper,
  DatePickerWrapper,
  DiagramCard,
  DiagramPlaceholder,
  DiagramText,
  DiagramTitle,
  DiagramsWrapper,
  HeaderWrapper,
  PageWrapper,
} from './FinanceReportsDiagrams.styled';
import SVGPieChart from './SVGPieChart';
import { useDiagramsSearchData } from './useSearchData';

const FinanceReportsDiagrams = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchData, setDiagramsSearchData, resetSearchData } = useDiagramsSearchData();

  const TABS = [
    { name: 'Finance Tickets', path: '/finance-request' },
    {
      name: 'Finance Reports',
      path: '/finance-reports/diagrams',
    },
  ];
  const accountingTypeData = useSelector(selectAccountingTypeChartData);
  const accountingTypeLoading = useSelector(selectAccountingTypeChartLoading);
  const amountAnalysisData = useSelector(selectAmountAnalysisData);
  const amountAnalysisLoading = useSelector(selectAmountAnalysisLoading);
  const topDepartmentsData = useSelector(selectTopDepartmentsData);
  const topDepartmentsLoading = useSelector(selectTopDepartmentsLoading);
  const costRatioData = useSelector(selectCostRatioData);
  const costRatioLoading = useSelector(selectCostRatioLoading);

  useEffect(() => {
    const params = {};
    if (searchData.startDate) params.startDate = searchData.startDate;
    if (searchData.endDate) params.endDate = searchData.endDate;

    dispatch(getAccountingTypeChart(params));
    dispatch(getAmountAnalysisChart(params));
    dispatch(getTopDepartmentsChart(params));
    dispatch(getCostRatioChart(params));
  }, [dispatch, searchData]);
  const expenseData = topDepartmentsData
    ? topDepartmentsData.map((item) => ({
        name: item.department,
        amount: item.totalSpend,
      }))
    : [];

  const budgetData = amountAnalysisData
    ? [
        {
          name: 'Total Requested',
          amount: amountAnalysisData.totalRequested,
        },
        {
          name: 'Total Approved',
          amount: amountAnalysisData.totalApproved,
        },
        {
          name: 'Total Paid',
          amount: amountAnalysisData.totalPaid,
        },
      ]
    : [];

  const colors = [
    '#9747FF',
    '#F63DB7',
    '#F1B71D',
    '#5CDCB4',
    '#67C8EB',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
  ];

  const accountingTypeChartData = accountingTypeData
    ? accountingTypeData.map((item, index) => ({
        name: item.accountingType,
        value: item.count,
        color: colors[index % colors.length],
      }))
    : [];

  const costRatioChartData = costRatioData
    ? costRatioData.map((item, index) => ({
        name: item.expenseType,
        value: item.amount,
        color: colors[index % colors.length],
      }))
    : [];

  const pathRefs = React.useRef([]);
  const pathRefs2 = React.useRef([]);

  const total = accountingTypeChartData.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentages = accountingTypeChartData.map((item, index) => ({
    ...item,
    percentage: total > 0 ? Math.round((item.value / total) * 100) : 0,
    index,
  }));

  const approvalTotal = costRatioChartData.reduce((sum, item) => sum + item.value, 0);
  const approvalDataWithPercentages = costRatioChartData.map((item, index) => ({
    ...item,
    percentage: approvalTotal > 0 ? Math.round((item.value / approvalTotal) * 100) : 0,
    index,
  }));

  const handleLabelHover = (index, isHovering) => {
    if (pathRefs.current[index]) {
      if (isHovering) {
        pathRefs.current[index].style.transform =
          `translate(${pathRefs.current[index].dataset.hoverX}, ${pathRefs.current[index].dataset.hoverY})`;
      } else {
        pathRefs.current[index].style.transform = 'translate(0, 0)';
      }
    }
  };

  const handleApprovalLabelHover = (index, isHovering) => {
    if (pathRefs2.current[index]) {
      if (isHovering) {
        pathRefs2.current[index].style.transform =
          `translate(${pathRefs2.current[index].dataset.hoverX}, ${pathRefs2.current[index].dataset.hoverY})`;
      } else {
        pathRefs2.current[index].style.transform = 'translate(0, 0)';
      }
    }
  };

  const handleDateChange = (field, value) => {
    setDiagramsSearchData({ [field]: value });
  };

  const handleViewModeChange = (mode) => {
    if (mode === 'list' || mode === 'table') {
      resetSearchData();
      navigate('/finance-reports');
    }
  };

  return (
    <PageWrapper>
      <HeaderWrapper>
        <Navigation className="nav" tabs={TABS} />
        <Switch onSwitch={handleViewModeChange} value="grid" page="users" />
      </HeaderWrapper>
      <DateFilterWrapper>
        <DatePickerWrapper>
          <CustomDatePicker
            label="From Date"
            value={searchData.startDate}
            onChange={(value) => handleDateChange('startDate', value)}
            placeholder="Select start date"
            clearable
          />
        </DatePickerWrapper>
        <DatePickerWrapper>
          <CustomDatePicker
            label="To Date"
            value={searchData.endDate}
            onChange={(value) => handleDateChange('endDate', value)}
            placeholder="Select end date"
            clearable
          />
        </DatePickerWrapper>
      </DateFilterWrapper>
      <DiagramsWrapper>
        <DiagramCard>
          <div>
            <DiagramTitle>Accounting Type</DiagramTitle>
            <DiagramText>Distribution of request type</DiagramText>
          </div>
          <ChartWrapper>
            {accountingTypeLoading ? (
              <DiagramPlaceholder>Loading accounting type data...</DiagramPlaceholder>
            ) : dataWithPercentages.length === 0 ? (
              <DiagramPlaceholder>No accounting type data available</DiagramPlaceholder>
            ) : (
              <>
                <SVGPieChart data={dataWithPercentages} pathRefs={pathRefs} />
                <ChartLabelWrapper>
                  {dataWithPercentages.map((item, index) => (
                    <ChartLabel
                      key={index}
                      color={item.color}
                      onMouseEnter={() => handleLabelHover(index, true)}
                      onMouseLeave={() => handleLabelHover(index, false)}
                    >
                      {item.name}: {item.percentage}%
                    </ChartLabel>
                  ))}
                </ChartLabelWrapper>
              </>
            )}
          </ChartWrapper>
        </DiagramCard>
        <DiagramCard>
          <DiagramTitle>Amount Analysis</DiagramTitle>
          <DiagramText>Requested vs Approved vs Paid</DiagramText>
          <ChartWrapper>
            {amountAnalysisLoading ? (
              <DiagramPlaceholder>Loading amount analysis data...</DiagramPlaceholder>
            ) : budgetData.length === 0 ? (
              <DiagramPlaceholder>No amount analysis data available</DiagramPlaceholder>
            ) : (
              <ResponsiveContainer width="100%" height={300} minHeight={250}>
                <BarChart
                  data={budgetData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    content={({ payload, label }) => {
                      if (!payload || payload.length === 0) return null;
                      return (
                        <div
                          style={{
                            background: 'white',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            fontSize: '12px',
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              color: '#333',
                              fontWeight: 'bold',
                              fontSize: '12px',
                            }}
                          >
                            {label}
                          </p>
                          {payload.map((entry, index) => (
                            <p
                              key={index}
                              style={{ margin: '2px 0', color: entry.color, fontSize: '11px' }}
                            >
                              {entry.value?.toLocaleString()} AMD
                            </p>
                          ))}
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="amount" fill="#67C8EB" name="Amount" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartWrapper>
        </DiagramCard>
        <DiagramCard>
          <DiagramTitle>Top Departments by Spend</DiagramTitle>
          <DiagramText>Total paid amounts by department</DiagramText>
          <ChartWrapper>
            {topDepartmentsLoading ? (
              <DiagramPlaceholder>Loading top departments data...</DiagramPlaceholder>
            ) : expenseData.length === 0 ? (
              <DiagramPlaceholder>No top departments data available</DiagramPlaceholder>
            ) : (
              <ResponsiveContainer width="100%" height={300} minHeight={250}>
                <BarChart
                  layout="vertical"
                  data={expenseData}
                  margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                >
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10 }} />
                  <Tooltip
                    content={({ payload }) => {
                      if (!payload || payload.length === 0) return null;
                      return (
                        <div
                          style={{
                            background: 'white',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            fontSize: '12px',
                          }}
                        >
                          <p style={{ margin: 0, color: '#333', fontSize: '11px' }}>
                            {payload[0]?.payload?.name}: {payload[0]?.value?.toLocaleString()}{' '}
                            AMD
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="amount" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartWrapper>
        </DiagramCard>

        <DiagramCard>
          <div>
            <DiagramTitle>Fixed vs Variable vs Semi-Variable Costs</DiagramTitle>
            <DiagramText>Cost distribution by request type</DiagramText>
          </div>
          <ChartWrapper>
            {costRatioLoading ? (
              <DiagramPlaceholder>Loading cost ratio data...</DiagramPlaceholder>
            ) : approvalDataWithPercentages.length === 0 ? (
              <DiagramPlaceholder>No cost ratio data available</DiagramPlaceholder>
            ) : (
              <>
                <SVGPieChart data={approvalDataWithPercentages} pathRefs={pathRefs2} />
                <ChartLabelWrapper>
                  {approvalDataWithPercentages.map((item, index) => (
                    <ChartLabel
                      key={index}
                      color={item.color}
                      onMouseEnter={() => handleApprovalLabelHover(index, true)}
                      onMouseLeave={() => handleApprovalLabelHover(index, false)}
                    >
                      {item.name}: {item.value?.toLocaleString()} AMD
                    </ChartLabel>
                  ))}
                </ChartLabelWrapper>
              </>
            )}
          </ChartWrapper>
        </DiagramCard>
      </DiagramsWrapper>
    </PageWrapper>
  );
};

export default FinanceReportsDiagrams;
