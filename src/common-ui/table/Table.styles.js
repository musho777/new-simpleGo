import styled from 'styled-components';
import theme from 'styles/theme';

export const TablePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 10px;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const TableContainer = styled.div`
  flex: 1;
  font-size: 14px;
`;

export const TableWrapper = styled.div`
  width: ${({ $width }) => $width || '100%'};
  background-color: white;
  overflow-x: ${({ $scrollable }) => ($scrollable ? 'auto' : 'visible')};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const Table = styled.div`
  width: 100%;
  display: table;
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

export const TableRow = styled.div`
  display: table-row;
  cursor: ${({ $isExpandable, $hasRowClick }) =>
    $isExpandable || $hasRowClick ? 'pointer' : 'default'};
  color: ${({ $inActive }) => ($inActive ? theme.colors.secondaryText : 'initial')};
  border-bottom: 0.4px solid #dfdfdf80;
  background-color: ${({ $rowColor }) => $rowColor || 'transparent'};

  &:hover {
    background-color: ${({ $hover }) => ($hover ? '#f5f5f5' : 'transparent')};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.div`
  display: table-cell;
  padding: 16px;
  text-align: ${({ $align }) => $align || 'left'};
  width: ${({ $width }) => ($width ? `${$width}px` : 'auto')};
  max-width: ${({ $width, $resizable }) => ($width && $resizable ? `${$width}px` : 'auto')};
  background-color: ${({ $additional }) => ($additional ? ' #D4D8DD33' : 'transparent')};
  overflow: ${({ $resizable }) => ($resizable ? 'hidden' : 'visible')};
  white-space: ${({ $resizable }) => ($resizable ? 'nowrap' : 'normal')};
  text-overflow: ${({ $resizable }) => ($resizable ? 'ellipsis' : 'clip')};
`;

export const TableHeader = styled(TableCell)`
  font-family: Nunito;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  text-transform: uppercase;
  color: #6c757d;
  background-color: ${({ $additional }) => ($additional ? ' #D4D8DD33' : 'transparent')};
  position: relative;
  min-width: 50px;
`;

export const Arrow = styled.img`
  margin-left: 5px;
`;

export const Minus = styled.img`
  margin-left: 5px;
  margin-bottom: 3px;
`;

export const LoadingIcon = styled.img`
  animation: rotate 1s linear infinite;
  width: 100px;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadContainer = styled.div`
  width: 100%;
  min-height: 500px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyWrapper = styled.div`
  height: 100%;
  padding: 145px;
`;

export const ExpandedContentWrapper = styled.div`
  width: 100%;
  padding: 30px 60px;

  .table-header {
    background-color: #f5f5f5;
  }
`;

export const AdditionalHeader = styled.button`
  display: flex;
  padding: 10px;
  width: 50px;
  border: none;
  border-left: 1px solid #dfdfdf80;
  background-color: transparent;
`;

export const Plus = styled.img`
  height: 100%;
`;

export const ResizeHandle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
  cursor: col-resize;
  background-color: transparent;
  border-right: 2px solid transparent;
  transition: border-color 0.2s ease;
  z-index: 10;
  background-color: rgba(45, 108, 223, 0.6);

  &:hover {
    border-right: 2px solid #007bff;
  }

  &:active {
    border-right: 2px solid #0056b3;
  }
`;

export const ResizableTableHeader = styled(TableCell)`
  font-family: Nunito;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  text-transform: uppercase;
  color: #6c757d;
  background-color: ${({ $additional }) => ($additional ? ' #D4D8DD33' : 'transparent')};
  position: relative;
  min-width: 50px;
`;

export const HeaderTitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const ResizeIconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(45, 108, 223, 0.6);
  padding: 2px 6px;
  border-radius: 6px;
`;

export const ResizeIconImg = styled.img`
  width: 16px;
  height: 16px;
`;
