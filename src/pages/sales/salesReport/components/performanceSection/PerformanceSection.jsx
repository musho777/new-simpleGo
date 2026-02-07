import { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import box from 'assets/salesReports/box.svg';
import Button from 'common-ui/button';
import MobileList from 'common-ui/mobileList';
import CustomTable from 'common-ui/table/Table';
import {
  selectOverviewTopBranches,
  selectOverviewTopDepartments,
  selectOverviewTopEmployees,
  selectOverviewTopTeams,
  selectTopPerformingEmployeesLoading,
} from 'features/sales/salesSlice';

import {
  ExpandableContainer,
  ExpandableLabel,
  ExpandableRow,
  GradientText,
  Icon,
  IconWrapper,
  MostSoledOffersHeader,
  SalesSection,
  TabWrapper,
  TableRankIndex,
  Tabs,
  TotalLeads,
} from '../../SalesReport.styles';

const PerformanceSection = ({ tabs, activeTab, onTabChange, topPerformingEmployees }) => {
  const [showAllEmployees, setShowAllEmployees] = useState(false);
  const topPerformingEmployeesLoading = useSelector(selectTopPerformingEmployeesLoading);
  const overviewTopEmployees = useSelector(selectOverviewTopEmployees);
  const overviewTopDepartments = useSelector(selectOverviewTopDepartments);
  const overviewTopBranches = useSelector(selectOverviewTopBranches);
  const overviewTopTeams = useSelector(selectOverviewTopTeams);

  const processArrayData = (array, showMore = false, limit = 5) => {
    if (!array) return [];

    const slicedArray = showMore ? array : array.slice(0, limit);
    return slicedArray.map((item, index) => ({
      ...item,
      id: item.id || item.uuid || `${item.entityname}-${index}`,
    }));
  };

  const isMainTabDisabled = useMemo(
    () => (tab) => {
      if (tab === 'Conversion Overview') return false;

      const tabData = getTabData(tab);
      if (!tabData) return true;

      const { top } = tabData;

      return (
        !top ||
        top.length === 0 ||
        top.every(
          (item) =>
            !item ||
            (item.totalLeads === 0 && item.convertedLeads === 0 && item.totalRevenue === 0) ||
            Object.values(item).every(
              (val) => val === 0 || val === null || val === undefined || val === ''
            )
        )
      );
    },
    [overviewTopDepartments, overviewTopBranches, overviewTopTeams, overviewTopEmployees]
  );

  const getTabData = useMemo(
    () => (tab) => {
      switch (tab) {
        case 'Departments':
          return { top: overviewTopDepartments || [] };
        case 'Branches':
          return { top: overviewTopBranches || [] };
        case 'Teams':
          return { top: overviewTopTeams || [] };
        case 'Employees':
          return { top: overviewTopEmployees || [] };
        default:
          return { top: overviewTopDepartments || [] };
      }
    },
    [overviewTopDepartments, overviewTopBranches, overviewTopTeams, overviewTopEmployees]
  );

  const salesTableColumns = useMemo(
    () => [
      {
        key: 'rank',
        title: 'Rank2',
        dataIndex: 'rank',
        render: (_, data, index) => {
          return <TableRankIndex $index={index}>{index + 1}</TableRankIndex>;
        },
      },
      {
        key: 'entityname',
        title: 'Name',
        dataIndex: 'entityname',
        width: '20%',
      },
      {
        key: 'totalLeads',
        title: 'Leads Handled',
        dataIndex: 'totalLeads',
      },
      {
        key: 'convertedLeads',
        title: 'Converted',
        dataIndex: 'convertedLeads',
        render: (totalLeads) => <TotalLeads>{totalLeads}</TotalLeads>,
      },
      {
        key: 'conversionRate',
        title: 'Conversion Rate',
        dataIndex: 'conversionRate',
        render: (conversionRate) => (
          <TotalLeads $bg="#8200DB" $color="#F3E8FF">
            {parseFloat(parseFloat(conversionRate || 0).toFixed(1))} %
          </TotalLeads>
        ),
      },
      {
        key: 'totalRevenue',
        title: 'Revenue',
        dataIndex: 'totalRevenue',
        width: '20%',
        render: (conversionRate) => (
          <p>
            {conversionRate?.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}{' '}
            AMD
          </p>
        ),
      },
    ],
    []
  );

  const mobileColumns = useMemo(
    () => [
      {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
        render: (_, record, index) => (
          <TableRankIndex $index={index}>{(index ?? 0) + 1}</TableRankIndex>
        ),
      },
      {
        title: 'Name',
        dataIndex: 'entityname',
        key: 'entityname',
      },
      {
        title: 'Revenue',
        dataIndex: 'totalRevenue',
        key: 'totalRevenue',
      },
    ],
    []
  );

  const renderExpandableContent = (row) => (
    <ExpandableContainer>
      <ExpandableRow>
        <ExpandableLabel>Leads Handled:</ExpandableLabel>
        <span>{row.totalLeads}</span>
      </ExpandableRow>
      <ExpandableRow>
        <ExpandableLabel>Converted:</ExpandableLabel>
        <TotalLeads>{row.convertedLeads}</TotalLeads>
      </ExpandableRow>
      <ExpandableRow $isLast>
        <ExpandableLabel>Conversion Rate:</ExpandableLabel>
        <TotalLeads $bg="#8200DB" $color="#F3E8FF">
          {parseFloat(parseFloat(row.conversionRate || 0).toFixed(1))} %
        </TotalLeads>
      </ExpandableRow>
    </ExpandableContainer>
  );

  const currentTabData = useMemo(() => {
    const tabData = getTabData(activeTab);
    const sortedData = [...(tabData['top'] || [])].sort(
      (a, b) => (b.convertedLeads || 0) - (a.convertedLeads || 0)
    );
    return processArrayData(sortedData, false, sortedData.length);
  }, [activeTab, getTabData]);

  const employeeData = useMemo(() => {
    const sortedEmployees = [...(topPerformingEmployees || [])].sort(
      (a, b) => (b.convertedLeads || 0) - (a.convertedLeads || 0)
    );
    return processArrayData(sortedEmployees, showAllEmployees);
  }, [topPerformingEmployees, showAllEmployees]);

  return (
    <>
      <TabWrapper>
        {tabs.map((tab) => (
          <Tabs
            key={tab}
            onClick={() => !isMainTabDisabled(tab) && onTabChange(tab)}
            $active={activeTab === tab}
            $disabled={isMainTabDisabled(tab)}
          >
            <p>{tab}</p>
          </Tabs>
        ))}
      </TabWrapper>

      <SalesSection>
        <MostSoledOffersHeader>
          <div>
            <IconWrapper>
              <Icon src={box} alt={'box'} />
            </IconWrapper>
            <GradientText>
              Top Performing {activeTab === 'Conversion Overview' ? 'Department' : activeTab}
            </GradientText>
          </div>
        </MostSoledOffersHeader>
        <CustomTable
          data={currentTabData}
          columns={salesTableColumns}
          loading={false}
          pagination={false}
          hover={true}
          emptyText={`No ${activeTab.toLowerCase()} data available`}
        />
        <MobileList
          columns={mobileColumns}
          data={currentTabData}
          expandable={renderExpandableContent}
          loading={false}
        />
      </SalesSection>

      {activeTab === 'Conversion Overview' && (
        <SalesSection>
          <MostSoledOffersHeader>
            <div>
              <IconWrapper>
                <Icon src={box} alt={'box'} />
              </IconWrapper>
              <GradientText>Top Performing Employees</GradientText>
            </div>
            {topPerformingEmployees?.length > 5 && (
              <Button onClick={() => setShowAllEmployees(!showAllEmployees)}>
                {showAllEmployees ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </MostSoledOffersHeader>
          <CustomTable
            data={employeeData}
            columns={salesTableColumns}
            loading={topPerformingEmployeesLoading}
            pagination={false}
            hover={true}
            emptyText="No employee performance data available"
          />
          <MobileList
            columns={mobileColumns}
            data={processArrayData(topPerformingEmployees, true)}
            expandable={renderExpandableContent}
            loading={topPerformingEmployeesLoading}
          />
        </SalesSection>
      )}
    </>
  );
};

export default PerformanceSection;
