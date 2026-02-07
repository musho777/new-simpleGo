import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import loadIcon from 'common-ui/table/loading.svg';
import { getSalesOverview } from 'features/sales/salesActions';
import {
  selectMostSoldOffers,
  selectOverviewLeadMetrics,
  selectOverviewRevenueMetrics,
  selectOverviewTopEmployees,
  selectSalesFunnelAnalytics,
  selectSalesOverviewLoading,
} from 'features/sales/salesSlice';

import { Container, LoadContainer, LoadingIcon } from './SalesReport.styles';
import Filter from './components/filter';
import { useReportSearchParams } from './components/filter/useSearchData';
import { FunnelSection } from './components/funnel';
import MetricsCards from './components/metricsCards';
import MostSoldOffersSection from './components/mostSoldOffersSection';
import PerformanceSection from './components/performanceSection';
import RevenueSection from './components/revenueSection';

const SalesReport = () => {
  const dispatch = useDispatch();
  const salesOverviewLoading = useSelector(selectSalesOverviewLoading);
  const salesFunnelAnalytics = useSelector(selectSalesFunnelAnalytics);
  const mostSoldOffers = useSelector(selectMostSoldOffers);
  const topPerformingEmployees = useSelector(selectOverviewTopEmployees);
  const overviewLeadMetrics = useSelector(selectOverviewLeadMetrics);
  const overviewRevenueMetrics = useSelector(selectOverviewRevenueMetrics);

  const { searchData, setReportSearchData } = useReportSearchParams();
  const activeTab = searchData.tab;
  const [conversionTab, setConversionTab] = useState('Revenue Overview');
  const tabs = ['Conversion Overview', 'Departments', 'Branches', 'Teams', 'Employees'];

  const isConversionTabDisabled = useMemo(
    () => (tab) => {
      if (tab === 'Revenue Overview') return false;

      const data = getConversionRevenueData(tab);
      if (!data || Object.keys(data).length === 0) return true;

      const values = Object.values(data);
      return (
        values.length === 0 ||
        values.every((value) => value === 0 || value === null || value === undefined)
      );
    },
    [overviewRevenueMetrics]
  );

  const getConversionRevenueData = useMemo(
    () => (tab) => {
      if (!overviewRevenueMetrics) return {};

      switch (tab) {
        case 'Revenue Overview':
          return overviewRevenueMetrics.revenueByDepartment || {};
        case 'Departments':
          return overviewRevenueMetrics.revenueByDepartment || {};
        case 'Branches':
          return overviewRevenueMetrics.revenueByBranch || {};
        case 'Teams':
          return overviewRevenueMetrics.revenueByTeam || {};
        case 'Employees':
          return overviewRevenueMetrics.revenueByEmployee || {};
        default:
          return overviewRevenueMetrics.revenueByDepartment || {};
      }
    },
    [overviewRevenueMetrics]
  );

  const getConversionRevenueTitle = useMemo(
    () => (tab) => {
      switch (tab) {
        case 'Revenue Overview':
          return 'Revenue Overview';
        case 'Departments':
          return 'Revenue by Department';
        case 'Branches':
          return 'Revenue by Branch';
        case 'Teams':
          return 'Revenue by Team';
        case 'Employees':
          return 'Revenue by Employee';
        default:
          return 'Revenue Distribution';
      }
    },
    []
  );

  const handleTabChange = (tab) => {
    setReportSearchData({ tab });
  };

  useEffect(() => {
    dispatch(getSalesOverview(searchData));
  }, [
    dispatch,
    searchData.period,
    searchData.startDate,
    searchData.endDate,
    searchData.creatorId,
    searchData.department,
    searchData.leadSourceId,
    searchData.offerId,
    searchData.statusId,
  ]);

  return (
    <>
      <Container>
        {/* <FilterContainer>
          <HeaderWrapper>
            <IconWrapper $variant="header">
              <Icon src={salesReportIcon} alt={'salesReportIcon'} />
            </IconWrapper>
            <div>
              <DashboardTitle>Sales Reports Dashboard</DashboardTitle>
              <DashboardSubtitle>
                Comprehensive sales performance analytics and insights
              </DashboardSubtitle>
            </div>
          </HeaderWrapper>
          <ExportButton>
            <Button>
              <Icon src={exportIcon} alt={'exportIcon'} /> Export Report
            </Button>
          </ExportButton>
        </FilterContainer> */}
        <Filter />
        {salesOverviewLoading ? (
          <Container>
            <LoadContainer>
              <LoadingIcon src={loadIcon} alt="Loading..." />
            </LoadContainer>
          </Container>
        ) : (
          <>
            <MetricsCards overviewLeadMetrics={overviewLeadMetrics} />

            <FunnelSection
              salesFunnelAnalytics={salesFunnelAnalytics}
              overviewLeadMetrics={overviewLeadMetrics}
            />

            <RevenueSection
              overviewLeadMetrics={overviewLeadMetrics}
              overviewRevenueMetrics={overviewRevenueMetrics}
              conversionTab={conversionTab}
              setConversionTab={setConversionTab}
              isConversionTabDisabled={isConversionTabDisabled}
              getConversionRevenueData={getConversionRevenueData}
              getConversionRevenueTitle={getConversionRevenueTitle}
            />

            <PerformanceSection
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              topPerformingEmployees={topPerformingEmployees}
            />

            <MostSoldOffersSection mostSoldOffers={mostSoldOffers} />
          </>
        )}
      </Container>
    </>
  );
};

export default SalesReport;
