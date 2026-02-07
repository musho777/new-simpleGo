import styled from 'styled-components';

const statusColors = {
  Pending: '#FF6A00',
  Approved: '#15C7A7',
  Rejected: '#E63946',
  Processing: '#2D6CDF',
  Completed: '#15C7A7',
  Seen: '#15C7A7',
  Cancelled: '#6C757D',
  'In Review': '#F2D124',
  Draft: '#6C757D',
};

export const Content = styled.div`
  border-radius: 10px;
  border: 0.4px solid rgba(212, 216, 221, 0.5);
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 100vh;
  height: 100%;
  padding: 20px 0;

  @media screen and (min-width: 1400px) {
    width: 600px;
  }

  @media screen and (max-width: 1400px) {
    width: 100%;
  }
`;

export const HeaderWrapper = styled.div`
  padding: 0 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid #dfdfdf;
  flex-shrink: 0;
`;

export const HistoryWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  mask-image: linear-gradient(#000, #000);
  -webkit-mask-image: linear-gradient(#000, #000);
`;

export const HeaderTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #212529;
`;

export const HeaderIcon = styled.img``;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

export const Icon = styled.img`
  margin-right: 4px;
`;

export const Title = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #212529;
`;

export const DynamicTitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ type }) => statusColors[type] || '#2d6cdf'};
`;

export const StatusInfo = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ type }) => statusColors[type] || '#2d6cdf'};
`;

export const InfoTitle = styled.p`
  margin-left: 4px;
  font-size: 10px;
  font-weight: 400;
  color: #6c757d;
`;

export const InfoWrapper = styled.div`
  font-size: 10px;
  font-weight: 600;
  min-width: 170px !important;
  padding-bottom: 16px;
  border-bottom: 0.4px solid #f1f1f1f1;

  color: #6c757d;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
`;

export const CommentArea = styled.div`
  border-radius: 20px;
  border: 1px solid #d4d8dd;
  background: #fbfcff;
  width: 100%;
  padding: 10px 16px;
  color: #212529;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LeftSide = styled.div`
  display: flex;
  gap: 5px;
  align-items: start;
`;

export const Dropdown = styled.ul`
  width: 152px;
  border-radius: 10px;
  padding: 5px;
  background: #fff;
  box-shadow: 0px 4px 35px 9px rgba(0, 0, 0, 0.12);
  position: absolute;
  top: 212px;
  right: 19px;
  list-style-type: none;

  color: #1d3557;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
`;

export const DropdownItem = styled.li`
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  .menu-icon {
    width: 16px;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const FilterTrigger = styled.div`
  cursor: pointer;
`;

export const Sentence = styled.div`
  display: inline;
  flex: 1;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
`;
