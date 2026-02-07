import styled from 'styled-components';

export const TableContainer = styled.div`
  flex: 1;
  border: 1px solid #e1e9f0;
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHeader = styled.div`
  padding: 12px;
  background-color: #ffffff;
  font-weight: 600;
  color: #212529;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e1e9f0;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    padding: 12px;
    text-align: left;
    position: relative;
  }

  td:not(:last-child),
  th:not(:last-child) {
    border-right: 1px solid #e1e9f0;
  }

  tr:nth-child(even) {
    background-color: #ecf1fb;
  }

  tr {
    background-color: #ffffff;
  }

  td {
    color: #212529;
    font-size: 14px;
  }
`;
