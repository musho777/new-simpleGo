import * as React from 'react';

import { TableVirtuoso } from 'react-virtuoso';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EmptyView from 'pages/components/emptyView';
import styled from 'styled-components';

import empty from '../../assets/empty.svg';
import loadingIcon from '../../assets/loading.svg';
import { LoadContainer, LoadingIcon } from './DailyTable.styles';

const StyledScroller = styled(TableContainer)`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  mask-image: linear-gradient(#000, #000);
  -webkit-mask-image: linear-gradient(#000, #000);

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <StyledScroller component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: 'separate', tableLayout: 'fixed', minWidth: 700 }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};
const DailyTable = ({ columns = [], data = [], loading = false }) => {
  const fixedHeaderContent = () => (
    <TableRow>
      {columns.map((col) => (
        <TableCell
          key={col.key}
          variant="head"
          align={col.numeric ? 'right' : 'left'}
          style={{ width: col.width || 'auto' }}
          sx={{
            backgroundColor: 'background.paper',
            fontWeight: 600,
            fontSize: 12,
            borderBottom: 'none',
          }}
        >
          {col.label}
        </TableCell>
      ))}
    </TableRow>
  );

  const rowContent = (index, row) => (
    <>
      {columns.map((col) => (
        <TableCell
          key={col.key}
          align={col.numeric ? 'right' : 'left'}
          sx={{
            fontSize: 12,
            fontWeight: 600,
            borderBottom: 'none',
            backgroundColor: index % 2 === 0 ? '#ecf1fb' : 'inherit',
          }}
        >
          {col.render ? col.render(row[col.key], row) : row[col.key]}
        </TableCell>
      ))}
    </>
  );

  if (loading) {
    return (
      <LoadContainer>
        <LoadingIcon src={loadingIcon} alt="Loading..." />
      </LoadContainer>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyView title="Արդյունքներ չեն գտնվել" icon={empty} />;
  }

  const rowHeight = 50;
  const headerHeight = 56;
  const maxHeight = 500;

  const calculatedHeight = Math.min(maxHeight, headerHeight + rowHeight * data.length);

  return (
    <Paper style={{ height: calculatedHeight, width: '100%' }}>
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};

export default DailyTable;
