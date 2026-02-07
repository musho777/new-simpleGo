import styled from 'styled-components';

export const ListContainer = styled.div`
  width: 100%;
  margin: 16px 0;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 768px) {
    display: ${({ $forceShow }) => !$forceShow && 'none'};
  }
`;

export const HeaderContainer = styled.div`
  border-radius: 8px 8px 0px 0px;
  border-bottom: 0.4px solid #dfdfdf;
  background: #fff;
  display: flex;
  width: 368px;
  padding: 2px 16px;
  align-items: flex-start;
  gap: 10px;

  color: #212529;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
`;

export const RowContainer = styled.div`
  display: flex;
  background-color: #fff;
  align-items: center;

  border-radius: 8px;
  background: #fff;

  width: 100%;
`;

export const Cell = styled.div`
  width: 100%;
  padding: 16px 0 8px 0;
  font-size: 14px;
  text-align: left;
`;

export const ExpandableContent = styled.div``;

export const Icon = styled.img`
  width: 15px;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  border-radius: 8px;
  border-bottom: 0.4px solid #dfdfdf;
  background: #fff;

  border: ${({ $expandedBorder }) => ($expandedBorder ? ' 0.5px solid  #15C7A7' : 'none')};
`;

export const NotFound = styled.div`
  height: 100%;
  margin-top: 100px;
`;

export const ColumnTitle = styled.div`
  display: flex;
`;

export const ExpandableSelect = styled.div`
  padding: 16px 0 8px 8px;
  cursor: pointer;
`;
