import styled from 'styled-components';
import theme from 'styles/theme';

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: Row;
  gap: 20px;
`;

export const Content = styled.div`
  border-radius: 10px;
  border: 0.4px solid rgba(212, 216, 221, 0.5);
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .uploaded-files-wrapper {
    flex-wrap: wrap;
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-bottom: 0.4px solid rgba(212, 216, 221, 0.5);
  padding-bottom: 20px;
`;

export const Title = styled.h1`
  color: #212529;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 80%;
  cursor: pointer;
`;

export const DetailsRow = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const AssigneeWatcherWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: start;
`;

export const DetailHeaderTitle = styled.p`
  color: #6c757d;
  font-size: 14px;
  line-height: 24px;
`;

export const DetailTitle = styled.p`
  color: #6c757d;
  font-size: 14px;
  line-height: 24px;
  min-width: 130px;
`;

export const DetailInfo = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  cursor: pointer;
`;

export const RowWithSpace = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  button {
    max-width: 75px;
    height: 32px;

    color: #212529;
    font-size: 12px;
    font-weight: 700;
    line-height: 150%;
  }

  @media screen and (max-width: 1256px) {
    flex-wrap: wrap;
  }
`;
export const ReasonWrapper = styled.div``;
export const CommentArea = styled.div`
  word-wrap: break-word;
  overflow-wrap: anywhere;
  border-radius: 20px;
  border: 1px solid #d4d8dd;
  background: #fbfcff;
  padding: 20px;
  color: #212529;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  > p {
    color: #212529;
    font-family: Nunito;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; /* 150% */
  }
`;
export const HistoryDiv = styled.div`
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
export const Icon = styled.img`
  width: ${({ width }) => width || '15px'};
  height: ${({ height }) => height || '15px'};
`;
export const FieldItemRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AssigneeWatchersWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  padding: 5px;
`;

export const AssigneeShowWatchersWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  padding: 5px 10px 5px 10px;
`;

export const ShowAll = styled.div`
  min-width: 230px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: absolute;
  bottom: -12px;
  transform: translate(0, 100%);
  z-index: 999999;

  p {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }

  @media screen and (max-width: 450px) {
    transform: translate(-30%, 100%);
    min-width: 200px;
  }
`;

export const AssigneeAllWatchersWrapper = styled.div`
  display: block;
  align-items: center;
  flex-direction: row;
  gap: 8px;
`;

export const DescriptionView = styled.div`
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const AttachmentWrapper = styled.div`
  height: 46px;
  border-radius: 8px;
  background: #fbfcff;
  width: 200px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const ColumnInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 25px;
`;

export const ColumnAssignee = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  position: relative;
`;

export const CommentText = styled.div`
  color: #212529;
  font-size: 14px;
  line-height: 21px;
  max-height: 200px;
  width: 100%;

  overflow-y: auto;
  mask-image: linear-gradient(#000, #000);
  -webkit-mask-image: linear-gradient(#000, #000);

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
`;

export const ParentTaskNavigationWrapper = styled.div`
  border-radius: 10px;
  background: #ecf1fb;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const LinkedTicket = styled.div`
  color: #6c757d;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;
export const BackToListBtn = styled.div`
  border-radius: 10px;
  border: 0.4px solid #d4d8dd;
  background: #fff;
  width: 100px;
  height: 40px;
  color: #1d3557;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 9px; /* 64.286% */

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export const LinkedTicketWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TabButton = styled.button`
  line-height: 9px;
  padding: 17px 25px;
  font-size: 14px;
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.secondary : theme.colors.secondaryText};
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: ${({ $isActive }) => ($isActive ? '700' : '400')};
  text-align: center;
  position: relative;

  &:hover {
    color: ${theme.colors.secondary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 37px;
    height: 3px;
    background-color: ${theme.colors.secondary};
    border-radius: 3px 3px 0px 0px;
    opacity: ${({ $isActive }) => ($isActive ? '1' : '0')};
    transition: opacity 0.3s ease;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  border-radius: 10px;
  width: 200px;
  margin-top: 10px;
  border: 0.4px solid ${theme.colors.borderColor}80;
  justify-content: space-around;
  height: 40px;
  align-items: center;
`;

export const NavigationWrapper = styled.div`
  padding: 20px 20px 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Amount = styled.p`
  color: #212529;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

export const ReturnsText = styled.p`
  color: #2d6cdf;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`;

export const StatusButton = styled.div`
  button {
    background-color: ${({ color }) => `${color}1a`};
    border: none;
    width: fit-content;
    font-size: 14px;
    height: 27px;
    border-radius: 6px;
    color: ${({ color }) => color};
    &:hover {
      background-color: ${({ color }) => `${color}1a`};
    }
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const RowBox = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const AmountInfoWrapper = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

export const StatusActivityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StatusActivityText = styled.div`
  color: #212529;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`;

export const TruncatedFileName = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  margin: 0;
`;
