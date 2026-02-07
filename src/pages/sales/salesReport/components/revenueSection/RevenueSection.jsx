import { useMemo } from 'react';

import { CHART_COLORS } from 'constants/constants';

import {
  GradientText,
  MostSoledOffersHeader,
  SalesSection,
  TabWrapper,
  Tabs,
} from '../../SalesReport.styles';
import {
  SalesConversionChart,
  SalesPerformancePieChart,
  TopDepartmentsSalesChart,
} from '../../diagrams';
import TotalRevenue from '../totalRevenue';

const RevenueSection = ({
  overviewLeadMetrics,
  overviewRevenueMetrics,
  conversionTab,
  setConversionTab,
  isConversionTabDisabled,
  getConversionRevenueData,
  getConversionRevenueTitle,
}) => {
  const conversionTabs = ['Revenue Overview', 'Departments', 'Branches', 'Teams', 'Employees'];

  const getTop10RevenuePerformersForPieChart = useMemo(() => {
    if (!overviewRevenueMetrics?.revenueByEmployee) return [];
    return Object.entries(overviewRevenueMetrics.revenueByEmployee)
      .map(([name, revenue]) => ({
        name: name,
        value: revenue || 0,
        amount: revenue || 0,
        color:
          CHART_COLORS[
            Object.keys(overviewRevenueMetrics.revenueByEmployee).indexOf(name) %
              CHART_COLORS.length
          ],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [overviewRevenueMetrics?.revenueByEmployee]);

  return (
    <>
      <TotalRevenue
        convertedCount={overviewLeadMetrics?.convertedLeads}
        total={overviewRevenueMetrics.totalRevenue}
      />

      <TabWrapper>
        {conversionTabs.map((tab) => (
          <Tabs
            key={tab}
            onClick={() => !isConversionTabDisabled(tab) && setConversionTab(tab)}
            $active={conversionTab === tab}
            $disabled={isConversionTabDisabled(tab)}
          >
            <p>{tab}</p>
          </Tabs>
        ))}
      </TabWrapper>

      {conversionTab !== 'Employees' &&
        Object.keys(getConversionRevenueData(conversionTab)).length !== 0 && (
          <SalesSection>
            <MostSoledOffersHeader>
              <GradientText>{getConversionRevenueTitle(conversionTab)}</GradientText>
            </MostSoledOffersHeader>
            <SalesConversionChart
              revenueData={getConversionRevenueData(conversionTab)}
              height={400}
            />
          </SalesSection>
        )}

      {(conversionTab === 'Revenue Overview' || conversionTab === 'Employees') && (
        <SalesSection>
          <MostSoledOffersHeader>
            <GradientText>Top 10 Performers by Revenue</GradientText>
          </MostSoledOffersHeader>
          <TopDepartmentsSalesChart data={getTop10RevenuePerformersForPieChart} />
        </SalesSection>
      )}

      {(conversionTab === 'Revenue Overview' || conversionTab === 'Employees') &&
        getTop10RevenuePerformersForPieChart.length !== 0 && (
          <SalesSection>
            <MostSoledOffersHeader>
              <GradientText>Top 10 Performers by Revenue</GradientText>
            </MostSoledOffersHeader>
            <SalesPerformancePieChart data={getTop10RevenuePerformersForPieChart} />
          </SalesSection>
        )}
    </>
  );
};

export default RevenueSection;
