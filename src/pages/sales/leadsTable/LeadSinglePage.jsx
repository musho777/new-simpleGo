import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import Button from 'common-ui/button';
import MobileList from 'common-ui/mobileList';
import { Table } from 'common-ui/table';
import { getSalesLeads } from 'features/sales/salesActions';
import { selectSalesLeads, selectSalesLeadsLoading } from 'features/sales/salesSlice';

import {
  AddNewLeadWrapper,
  CheckboxBox,
  CheckboxInput,
  CheckboxLabel,
  Container,
  ExpandableRowWrapper,
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  FilterContainer,
  Header,
  ProjectType,
  Span,
  TableSection,
} from './LeadSinglePage.styles';
import Filter from './filter';
import { useLeadSearchParams } from './filter/useSearchData';

const LeadSinglePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subprojectId } = useParams();
  const [searchParams] = useSearchParams();

  const leads = useSelector(selectSalesLeads);
  const loading = useSelector(selectSalesLeadsLoading);

  const [selected, setSelected] = useState('all');
  const [resetKey, setResetKey] = useState(0);

  const { searchData, setLeadSearchData, resetSearchData } = useLeadSearchParams();

  const truncateText = (text, maxLength = 12) => {
    if (!text) return '—';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const truncateTextForLeadName = (text, maxLength = 16) => {
    if (!text) return '—';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const handleChange = (name) => {
    setSelected(name);
    setLeadSearchData({ filterType: name });
  };

  const handleResetSearchData = () => {
    resetSearchData();
    setResetKey((prev) => prev + 1);
  };

  const onPaginationChange = (page) => {
    setLeadSearchData({ page });
  };

  const handleRowClick = (row) => {
    const projectId = searchParams.get('projectId');
    const path = projectId
      ? `/leads/${row.uuid}?projectId=${projectId}`
      : `/leads/${row.uuid}`;
    navigate(path);
  };

  useEffect(() => {
    if (subprojectId) {
      dispatch(
        getSalesLeads({
          ...searchData,
          subprojectId,
        })
      );
    }
  }, [dispatch, subprojectId, searchData]);

  const columns = useMemo(
    () => [
      {
        key: 'leadName',
        title: 'Lead Name',
        dataIndex: 'leadName',
        renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
        render: (text) => {
          return <span style={{ cursor: 'pointer' }}>{truncateTextForLeadName(text)}</span>;
        },
      },
      {
        key: 'address',
        title: 'Address',
        dataIndex: 'address',
        renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
        render: (text) => {
          return <span style={{ cursor: 'pointer' }}>{truncateTextForLeadName(text)}</span>;
        },
      },
      {
        key: 'phoneNumber',
        title: 'Phone number',
        dataIndex: 'phoneNumber',
        render: (text) => {
          return <span>{truncateTextForLeadName(text)}</span>;
        },
      },
      {
        key: 'lastUpdated',
        title: 'Last Update',
        dataIndex: 'lastUpdated',
        render: (date) => (date ? new Date(date).toLocaleDateString('en-GB') : '—'),
      },
      {
        key: 'addedByName',
        title: 'Created by',
        dataIndex: 'addedByName',
      },
      {
        key: 'sourceName',
        title: 'Source',
        dataIndex: 'sourceName',
      },
      {
        key: 'status',
        title: 'Status',
        dataIndex: 'status',
        renderTooltip: (text) => text?.length > 10 && <span>{text}</span>,
        render: (value, data) => {
          return (
            <ProjectType $color={data.statusColor}>
              {truncateText(value?.toUpperCase(), 10)}
            </ProjectType>
          );
        },
      },
    ],
    []
  );
  const mobileColumns = useMemo(() => [
    {
      key: 'leadName',
      title: 'Lead Name',
      dataIndex: 'leadName',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (text, row) => {
        return (
          <Span onClick={() => handleRowClick(row)}>{truncateTextForLeadName(text, 10)}</Span>
        );
      },
    },
    {
      key: 'address',
      title: 'Address',
      dataIndex: 'address',

      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (text) => {
        return <Span>{truncateTextForLeadName(text, 10)}</Span>;
      },
    },
  ]);
  const handleAddNewLeadNavigation = () => {
    navigate('/sales/search-lead');
  };

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <ExpandableRowWrapper>
          <ExpandedLabel>Phone number</ExpandedLabel>
          <ExpandedValue>{row?.phoneNumber}</ExpandedValue>
        </ExpandableRowWrapper>
        <ExpandableRowWrapper>
          <ExpandedLabel>Last Update</ExpandedLabel>
          <ExpandedValue>
            {row.lastUpdated ? new Date(row.lastUpdated).toLocaleDateString('en-GB') : '—'}
          </ExpandedValue>
        </ExpandableRowWrapper>
        <ExpandableRowWrapper>
          <ExpandedLabel>Status</ExpandedLabel>
          <ExpandedValue>
            <ProjectType $color={row.statusColor}>
              {truncateText(row.status?.toUpperCase(), 10)}
            </ProjectType>
          </ExpandedValue>
        </ExpandableRowWrapper>
        <ExpandableRowWrapper>
          <Button secondary onClick={() => handleRowClick(row)}>
            View Details
          </Button>
        </ExpandableRowWrapper>
      </ExpandableWrapper>
    </>
  );

  return (
    <Container>
      <CheckboxBox>
        <Header>
          <Button className="h-38" onClick={() => navigate(-1)}>
            {'<'} Back to subprojects
          </Button>
        </Header>
      </CheckboxBox>
      <AddNewLeadWrapper>
        <FilterContainer>
          <CheckboxLabel $active={selected === 'all'} onClick={() => handleChange('all')}>
            <CheckboxInput type="checkbox" checked={selected === 'all'} readOnly />
            All
          </CheckboxLabel>

          <CheckboxLabel $active={selected === 'b2b'} onClick={() => handleChange('b2b')}>
            <CheckboxInput type="checkbox" checked={selected === 'b2b'} readOnly />
            B2B Leads
          </CheckboxLabel>

          <CheckboxLabel $active={selected === 'b2c'} onClick={() => handleChange('b2c')}>
            <CheckboxInput type="checkbox" checked={selected === 'b2c'} readOnly />
            B2C Leads
          </CheckboxLabel>
        </FilterContainer>
        <Button onClick={handleAddNewLeadNavigation} width="90px" height="38px" secondary>
          + Add New Lead
        </Button>
      </AddNewLeadWrapper>

      <Filter
        key={resetKey}
        searchData={searchData}
        setSearchData={setLeadSearchData}
        resetSearchData={handleResetSearchData}
      />

      <TableSection>
        <Table
          data={leads?.leads}
          columns={columns}
          loading={loading}
          emptyText="There are no leads yet"
          totalPages={leads?.totalPages}
          currentPage={leads?.page}
          onPaginationChange={onPaginationChange}
          onRowClick={handleRowClick}
        />
        <MobileList
          columns={mobileColumns}
          data={leads?.leads}
          expandable={renderExpandableContent}
          onPaginationChange={onPaginationChange}
          currentPage={leads?.page}
          totalPages={leads?.totalPages}
        />
      </TableSection>
    </Container>
  );
};

export default LeadSinglePage;
