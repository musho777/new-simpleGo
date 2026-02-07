import { Fragment, useCallback, useMemo, useState } from 'react';

import Pagination from 'common-ui/table/Pagination';
import { LoadContainer, LoadingIcon } from 'common-ui/table/Table.styles';
import EmptyView from 'pages/components/emptyView';

import {
  Cell,
  Col,
  ColumnTitle,
  ExpandableContent,
  ExpandableSelect,
  HeaderContainer,
  Icon,
  ListContainer,
  NotFound,
  RowContainer,
} from './MobileList.styles';
import down from './down.svg';
import loadIcon from './loading.svg';
import up from './up.svg';

const MobileList = ({
  forceShow = false,
  columns,
  data,
  expandable,
  onPaginationChange,
  loading,
  handleSortClick,
  currentPage = 1,
  totalPages = 1,
  externalComponent,
  editableRowCount,
  count,
  dataCount,
  handleRowCountChange,
  pageOptions = [10, 25, 50],
  onRowClick,
}) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(columns?.[0]?.id || '');

  const handleRequestSort = useCallback(
    (event, property) => {
      let newOrder = 'asc';
      newOrder = order === 'asc' ? 'desc' : 'asc';
      setOrder(newOrder);
      setOrderBy(property);
      handleSortClick(newOrder);
    },
    [order, orderBy, handleSortClick]
  );
  const sortedData = useMemo(() => {
    if (data?.length === 0 || !data) {
      return [];
    }

    return [...data].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, order, orderBy]);

  const handlePageChange = (page) => {
    if (onPaginationChange) {
      onPaginationChange(page);
    }
  };

  const toggleExpand = (key) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ListContainer $forceShow={forceShow} className="mobile-list-main-container">
      <HeaderContainer className="mobile-list-header">
        {columns?.map((column) => (
          <Cell
            key={column.key || column.dataIndex}
            onClick={(e) => column.sortable && handleRequestSort(e, column.dataIndex)}
          >
            <ColumnTitle>
              {column.title}
              {column.sortable && (
                <Icon src={orderBy === column.dataIndex && order === 'asc' ? up : down} />
              )}
            </ColumnTitle>
          </Cell>
        ))}
      </HeaderContainer>
      {loading ? (
        <LoadContainer>
          <LoadingIcon src={loadIcon} alt="Loading..." />
        </LoadContainer>
      ) : sortedData?.length === 0 ? (
        <NotFound>
          <EmptyView className="empty-view" title="Արդյունքներ չեն գտնվել" />
        </NotFound>
      ) : (
        <>
          {sortedData?.map((row) => (
            <Fragment key={row?.uuid || row?.id}>
              <Col $expandedBorder={expandedRows[row?.uuid]}>
                <RowContainer onClick={() => onRowClick && onRowClick(row)}>
                  {columns.map((column) => (
                    <Cell key={column.key || column.dataIndex}>
                      {column.render
                        ? column.render(row[column.dataIndex], row)
                        : row[column.dataIndex]}
                    </Cell>
                  ))}
                  {expandable && (
                    <ExpandableSelect
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(row?.uuid || row?.id);
                      }}
                    >
                      {expandedRows[row?.uuid] ? <Icon src={up} /> : <Icon src={down} />}
                    </ExpandableSelect>
                  )}
                </RowContainer>
                <div>
                  {expandable && (expandedRows[row?.uuid] || expandedRows[row?.id]) && (
                    <Cell>
                      <ExpandableContent colSpan={columns.length + 1}>
                        {expandable(row)}
                      </ExpandableContent>
                    </Cell>
                  )}
                </div>
              </Col>
            </Fragment>
          ))}
        </>
      )}
      {externalComponent}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        editableRowCount={editableRowCount}
        count={count}
        dataCount={dataCount}
        handleRowCountChange={handleRowCountChange}
        pageOptions={pageOptions}
      />
    </ListContainer>
  );
};

export default MobileList;
