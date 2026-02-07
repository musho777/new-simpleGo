import { useCallback, useMemo, useState } from 'react';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import Pagination from 'common-ui/table/Pagination';
import { useTabletView } from 'modules/billing/hooks/useTabletView';
import EmptyView from 'pages/components/emptyView';

import loadIcon from '../../assets/loading.svg';
import {
  Footer,
  FooterTablet,
  LightTooltip,
  LoadContainer,
  LoadingIcon,
  NotFound,
  Title,
  TitleCount,
  TitleWrapper,
  TitleWrapperTablet,
} from './MuiTable.styles';

const EnhancedTableHead = ({ columns, order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            size={'medium'}
            key={column.id}
            align={column.numeric ? 'right' : 'left'}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
              sx={{
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const MuiTable = ({
  columns,
  data,
  handlePageChange,
  currentPage = 1,
  totalPages = 1,
  handleRowCountChange,
  dataCount,
  count,
  totalAmount,
  loading,
  rowCount,
  handleSortClick,
  showPagination = true,
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(columns?.[0]?.id || '');
  const [selected, setSelected] = useState([]);
  const isTablet = useTabletView();

  const handleRequestSort = useCallback(
    (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
      handleSortClick(order);
    },
    [order, orderBy]
  );

  const handleSelectAllClick = useCallback(
    (event) => {
      if (event.target.checked) {
        const newSelected = data.map((row) => row.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    [data]
  );

  const handleClick = useCallback(
    (event, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    },
    [selected]
  );

  const sortedData = useMemo(() => {
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

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
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
          <Paper sx={{ width: '100%', mb: 2, boxShadow: 'none', overflowY: 'auto' }}>
            <TableContainer>
              <Table>
                <EnhancedTableHead
                  columns={columns}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                  numSelected={selected.length}
                  rowCount={data.length}
                />
                <TableBody>
                  {sortedData.map((row, index) => {
                    return (
                      <TableRow
                        hover={false}
                        tabIndex={-1}
                        key={row.id}
                        sx={{
                          backgroundColor: index % 2 === 0 ? '#ECF1FB' : '#fffff',
                        }}
                      >
                        {columns?.map((column) => (
                          <TableCell
                            size={'medium'}
                            key={column.id}
                            align={column.numeric ? 'right' : 'left'}
                            className={
                              column.id === 'contracts' ? 'text-blue-600 underline' : ''
                            }
                            sx={{
                              maxWidth: column.width || 300,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <LightTooltip
                              title={
                                typeof row[column.id] === 'string' &&
                                row[column.id].length > 21
                                  ? row[column.id]
                                  : ''
                              }
                              placement="top-start"
                              arrow
                            >
                              <span>
                                {row[column.id] === '\n'
                                  ? '-'
                                  : column.render
                                    ? column.render(row[column.id], row)
                                    : (row[column.id] ?? '-')}
                              </span>
                            </LightTooltip>
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          {isTablet ? (
            <FooterTablet>
              {showPagination && (
                <Pagination
                  count={rowCount}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  handleRowCountChange={handleRowCountChange}
                  dataCount={dataCount}
                  editableRowCount
                />
              )}
              {(count || totalAmount) && (
                <TitleWrapperTablet>
                  <Title>Ընդհանուր վճարման ենթակա գումար՝</Title>
                  <TitleCount>
                    {count} դրամ/
                    {totalAmount} դրամից
                  </TitleCount>
                </TitleWrapperTablet>
              )}
            </FooterTablet>
          ) : (
            <Footer>
              {(count || totalAmount) && (
                <TitleWrapper>
                  <Title>Ընդհանուր վճարման ենթակա գումար՝</Title>
                  <TitleCount>
                    {count} դրամ/
                    {totalAmount} դրամից
                  </TitleCount>
                </TitleWrapper>
              )}
              {showPagination && (
                <Pagination
                  count={rowCount}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  handleRowCountChange={handleRowCountChange}
                  dataCount={dataCount}
                  editableRowCount
                />
              )}
            </Footer>
          )}
        </>
      )}
    </Box>
  );
};

export default MuiTable;
