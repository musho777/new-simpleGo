import styled from 'styled-components';

const statusColors = {
  High: '#15C7A7',
  Urgent: '#E63946',
  Low: '#F2D124',
  Closed: '#212529',
  Resolved: '#15C7A7',
  'To Do': '#6C757D',
  Task: '#2D6CDF',
  Bug: '#E63946',
  Suggestion: '#F63DB7',
  Feature: '#15C7A7',
  Support: '#FF6A00',
  Waiting: '#FF6A00',
  Reopen: '#7367F0',
  Rejected: '#E63946',
};

export const Content = styled.div`
  border-radius: 10px;
  border: 0.4px solid rgba(212, 216, 221, 0.5);
  background: #fff;
  display: flex;
  flex-direction: column;
  min-height: 450px;
  max-height: 100%;
  height: 100%;
  @media screen and (min-width: 1400px) {
    width: 600px;
  }

  @media screen and (max-width: 1400px) {
    width: 100%;
  }
`;

export const HeaderWrapper = styled.div`
  padding: 20px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background: linear-gradient(89deg, #2b7fff 42.71%, #6b9efb 98.98%);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

export const HistoryWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;

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
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

export const HeaderIcon = styled.img``;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  border-radius: 14px;
  border: 2px solid #e5e7eb;
  background: linear-gradient(135deg, #f9fafb 0%, #fff 100%);
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 4px 12px 0 rgba(0, 0, 0, 0.15),
      0 2px 6px -1px rgba(0, 0, 0, 0.15);
    border-color: #d1d5db;
  }
`;

export const Icon = styled.img`
  filter: ${({ index }) =>
    index % 2 === 0
      ? 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(217deg) brightness(104%) contrast(97%)'
      : 'brightness(0) saturate(100%) invert(64%) sepia(88%) saturate(1204%) hue-rotate(135deg) brightness(100%) contrast(101%)'};
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
  color: ${({ type, index }) => {
    if (index !== undefined) {
      return index % 2 === 0 ? '#2d6cdf' : '#15C7A7';
    }
    return statusColors[type] || '#2d6cdf';
  }};
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
  display: flex;
  flex: 1;
  flex-direction: column;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
  gap: 15px;
`;

export const IconWrapper = styled.div`
  border-radius: 10px;
  background: ${({ index }) =>
    index % 2 === 0 ? 'rgba(45, 108, 223, 0.1)' : 'rgba(21, 199, 167, 0.10)'};
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
