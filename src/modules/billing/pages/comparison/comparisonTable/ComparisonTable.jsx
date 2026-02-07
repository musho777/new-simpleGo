import React from 'react';

import { StyledTable, TableContainer, TableHeader } from './ComparisonTable.styles';

const ComparisonTable = ({ header, rows }) => {
  return (
    <TableContainer>
      <TableHeader>
        <span>{header}</span>
      </TableHeader>
      <StyledTable>
        <tbody>
          {rows?.map((row, index) => (
            <tr key={index}>
              <td
                style={{
                  color: index >= rows.length - 1 ? '#2D6CDF' : 'inherit',
                }}
              >
                {row.label}
              </td>
              <td
                style={{
                  color: index >= rows.length - 1 ? '#2D6CDF' : 'inherit',
                }}
              >
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default ComparisonTable;
