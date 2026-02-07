import styled from 'styled-components';

export const ExpandableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ExpandedLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #666;
`;

export const ExpandedValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;
