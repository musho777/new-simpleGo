import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`;

export const CustomerIDBadge = styled.div`
  color: #fff;
  text-align: center;
  font-family: Nunito, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  border-radius: 10px;
  background: linear-gradient(135deg, #fdc700 0%, #f0b100 100%);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
  display: inline-block;
`;

export const DateTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.5rem;
  font-size: 12px;
  font-weight: bold;
  max-width: 200px;
  border-radius: 20px;
  background-color: #9747ff1a;
  color: #9747ff;
  cursor: pointer;
`;

export const Container = styled.div`
  padding: 20px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media screen and (max-width: 768px) {
    .table-main-container {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    .mobile-list-main-container {
      display: none;
    }
  }
`;

export const OfferCountBadge = styled.div`
  font-size: 16px;
  font-weight: 400;
  text-align: center;

  color: ${({ $disabled }) => ($disabled ? '#999' : '#2d6cdf')};
  text-decoration-line: ${({ $disabled }) => ($disabled ? 'none' : 'underline')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  &:hover {
    opacity: ${({ $disabled }) => ($disabled ? 1 : 0.8)};
  }
`;

export const EllipsisCell = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

export const ExpandableWrapper = styled.div`
  border: 0.5px solid #dfdfdf80;
  border-right: none;
  border-left: none;
  padding: 17px 0;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 0;
  align-items: center;
  gap: 12px;
`;

export const ExpandedLabel = styled.p`
  color: #6c757d;
  font-size: 14px;
  word-break: break-word;
  min-width: 75px;
`;

export const ExpandedValue = styled.p`
  color: #212529;
  text-align: right;
  word-break: break-word;
  font-size: 14px;
`;

export const Name = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 700;
`;

export const Icon = styled.img``;

export const CrmIconWrapper = styled.div`
  border-radius: 16px;
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #2b7fff 0%, #1d3557 100%);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 10px;
`;

export const HeaderText = styled.div`
  p:first-child {
    color: #101828;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
  }

  p:last-child {
    color: #4a5565;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }
`;
