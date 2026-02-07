import {
  ChangedValue,
  HeaderContent,
  HeaderTitle,
  StyledTable,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Components.styles';

const Table = ({ columns = [], data = [] }) => {
  return (
    <StyledTable>
      <TableHead>
        <TableRow>
          {columns?.map((col) => (
            <TableHeader key={col.key}>
              <HeaderContent>
                {col.icon && <span>{col.icon}</span>}
                <HeaderTitle>{col.title}</HeaderTitle>
              </HeaderContent>
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {data?.map((item, index) => (
          <TableRow key={index}>
            {columns.map((col) => {
              const fieldData = item.allFields?.find((f) => f.field === col.dataIndex);
              const isChanged = fieldData?.isChanged;
              const cellValue = col.render
                ? col.render(item[col.dataIndex], item) || '-'
                : item[col.dataIndex] || '-';

              return (
                <TableCell key={col.key}>
                  {isChanged ? <ChangedValue>{cellValue}</ChangedValue> : cellValue}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
