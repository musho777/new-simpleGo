import styled from 'styled-components';

export const CardWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const InfoCard = styled.div`
  height: 400px;
  border-radius: 10px;
  border: ${({ isSelected }) => (isSelected ? '1px solid #15C7A7' : '0.4px solid #d4d8dd80')};
`;

export const NavigationArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $direction }) => ($direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(45, 108, 223, 0.9);
  color: white;
  font-size: 28px;
  font-weight: 300;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(45, 108, 223, 1);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 4px 12px rgba(45, 108, 223, 0.4);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

export const CardHeader = styled.div`
  background-color: white;
  height: 65px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  align-items: center;
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
`;

export const CardLabel = styled.p`
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-style: 'SemiBold';
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #212529;
`;
export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 332px; // 400 - 65px (CardHeader)
  justify-content: space-between;
`;

export const CardItem = styled.div`
  background-color: ${({ $color }) => $color || 'white'};
  min-height: 45px;
  align-items: center;
  display: flex;
  justify-content: ${({ $isDualField, $isCenterField, $isStackField }) =>
    $isDualField
      ? 'space-around'
      : $isCenterField
        ? 'center'
        : $isStackField
          ? 'flex-start'
          : 'space-between'};
  padding: 5px 15px;
  flex-direction: ${({ $isStackField }) => ($isStackField ? 'column' : 'row')};
  align-items: ${({ $isStackField }) => ($isStackField ? 'flex-start' : 'center')};
`;

export const CompetitorCardItem = styled(CardItem)`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const Key = styled.div`
  font-family: 'Nunito', sans-serif;
  font-weight: 500;
  font-style: Medium;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0px;
  vertical-align: middle;
  color: ${({ $isCenterField }) => ($isCenterField ? '#2D6CDF' : '#6c757d')};
  margin: ${({ $isDualField, $isCenterField, $isStackField }) =>
    $isDualField ? '2px 10px' : $isCenterField ? '0' : '0'};
`;

export const Value = styled.div`
  font-family: 'Nunito', sans-serif;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0px;
  vertical-align: middle;
  color: ${({ $textColor }) => $textColor || '#212529'};
  max-width: ${({ $isDatesField, $isStackField }) =>
    $isDatesField ? '100%' : $isStackField ? '100%' : '65%'};
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  text-decoration: ${({ $underline }) => ($underline ? 'underline' : 'none')};
  display: ${({ $isDatesField }) => ($isDatesField ? 'flex' : 'block')};
  justify-content: ${({ $isDatesField }) => ($isDatesField ? 'center' : 'flex-start')};
  gap: ${({ $isDatesField }) => ($isDatesField ? '20px' : '0')};
  margin-top: ${({ $isDatesField }) => ($isDatesField ? '5px' : '0')};
  text-align: ${({ $isStackField }) => ($isStackField ? 'left' : 'left')};
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    transition: background-color 0.3s;
    border-radius: 12px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #6c757d;
  }

  &:hover::-webkit-scrollbar-track {
    background: transparent;
  }

  &:hover::-webkit-scrollbar {
    width: 4px;
  }
  @media (max-width: 768px) {
    height: auto; // թողեք բնական բարձրությունը
    max-height: 70vh; // չափը screen-ի 70%-ը
  }
`;

export const NoteWrapper = styled.div`
  width: 354px;
  padding: 25px 20px 22px 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff3ea;
  border-radius: 10px;
`;

export const NoteTitle = styled.p`
  color: #212529;
  font-family: 'Nunito', sans-serif;

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const NoteText = styled.p`
  color: #212529;
  font-family: 'Nunito', sans-serif;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
  width: auto;
  max-width: 100%;
`;

export const TableHead = styled.thead`
  background-color: #ecf1fb;
`;

export const TableHeader = styled.th`
  border: 1px solid #dfdfdf80;
  padding: 10px 20px;
  text-align: center;
  @media (max-width: 390px) {
    height: auto;
    padding: 10px 6px;
    white-space: normal;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #ffffff;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #dfdfdf80;
  padding: 10px 20px;
  text-align: center;
  font-family: 'Nunito', sans-serif;

  font-weight: 500;
  font-style: Medium;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0px;
  color: #6c757d;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  @media (max-width: 390px) {
    flex-wrap: wrap;
    align-content: center;
    flex-direction: column;
    span {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      margin-bottom: 2px;
    }
  }
`;

export const HeaderTitle = styled.span`
  font-family: 'Nunito', sans-serif;

  font-weight: 400;
  font-style: Regular;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #212529;
  @media (max-width: 390px) {
    font-size: 12px;
    line-height: 16px;
    white-space: normal;
    display: flex;
    align-items: center;
    justify-content: center !important;
  }
`;

export const CardGroupWrapper = styled.div``;

export const Span = styled.div``;

export const Icon = styled.img`
  cursor: pointer;
`;
export const FollowUpIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const Acton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const IconWrapper = styled.div`
  position: relative;
`;

export const EmptyData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const Reminder = styled.div`
  border-radius: 8px;
  background: #ecf1fb;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  > span {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &:hover {
    background: #dce6ff;
    transform: scale(1.01);
    transition: 0.2s;
  }
`;

export const TimePickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 10px;
`;

export const TimeSelectorWrapper = styled.div`
  width: 100%;
  > div {
    width: 100%;
    > div:nth-child(1) {
      width: 100%;
      input {
        width: 100%;
      }
    }
    > div:nth-child(2) {
      display: none;
    }
  }
`;

export const DatePickerWrapper = styled.div`
  width: 100%;
  > div {
    height: 44px;
  }
`;

export const UpdateStatusForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  > div {
    min-height: 0;
  }
`;

export const FollowUpsContainer = styled.div`
  padding: 20px;
`;

export const CustomerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CustomerInfoText = styled.div`
  color: #212529;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  strong {
    color: #6c757d;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const CustomerInfoRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

export const CustomerInfoLabel = styled.span`
  color: #212529;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const CustomerInfoValue = styled.span`
  color: #6c757d;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const PhoneNumbersWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`;

export const FollowUpsTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  color: #212529;
`;

export const FollowUpsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FollowUpItem = styled.div`
  border: 1px solid #e0e0e0;
  padding: 12px;
  border-radius: 10px;
  border-left: 3px solid var(--Action-button, #2d6cdf);
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  background: rgba(45, 108, 223, 0.1);
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: rgba(45, 108, 223, 0.15);
    box-shadow: 0 4px 12px rgba(45, 108, 223, 0.2);
    transform: translateY(-2px);
  }
`;

export const FollowUpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const FollowUpType = styled.div`
  color: #212529;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
`;

export const FollowUpDate = styled.div`
  color: #2d6cdf;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
`;

export const FollowUpDetails = styled.div`
  margin-top: 12px;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  font-size: 12px;
  font-family: 'Nunito', sans-serif;

  div {
    margin-bottom: 4px;
    color: #333;

    &:last-child {
      margin-bottom: 0;
    }
  }

  strong {
    color: #212529;
    font-weight: 600;
  }
`;

export const HistoryButton = styled.button`
  border-radius: 8px;
  border-left: 3px solid var(--Action-button, #2d6cdf);
  background: #fff;
  border: 1px solid #e0e0e0;
  border-left: 3px solid #2d6cdf;
  padding: 8px 12px;
  margin-top: 12px;
  font-family: 'Nunito', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #2d6cdf;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9ff;
    box-shadow: 0 2px 4px rgba(45, 108, 223, 0.2);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const NextContactInfo = styled.div`
  border-radius: 8px;
  border-left: 3px solid #2d6cdf;
  background: #fff;
  display: flex;
  padding: 12px;
  justify-content: space-between;
`;

export const UpdatedHistoryInfo = styled.div`
  border-radius: 8px;
  border-left: 3px solid #ff6a00;
  background: #fff;
  padding: 12px;
  display: flex;
  justify-content: space-between;
`;
export const UpdatedHistoryInfoColumn = styled.div`
  display: flex;
  gap: 100px;
  width: 100%;
`;

export const FollowUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FollowUpDescription = styled.p`
  color: #6c757d;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
`;

export const FollowUpTypeWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  width: 50%;
`;

export const LoadingWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

export const LoadingIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ClickableIcon = styled.div`
  cursor: pointer;
  height: 24px;
`;

export const ActionColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const FollowUpsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 5px 0;
  padding: 5px 0;
  max-height: 340px; //320 for 4 items
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    transition: background-color 0.3s;
    border-radius: 12px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #6c757d;
  }

  &:hover::-webkit-scrollbar-track {
    background: transparent;
  }

  &:hover::-webkit-scrollbar {
    width: 4px;
  }
  @media (max-width: 768px) {
    max-height: 50vh; // screen-ի կեսը
  }
`;

export const FollowUpContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PaginationWrapper = styled.div`
  padding: 0 12px 12px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const ChangedValue = styled.span`
  color: #ff6a00;
  font-weight: 600;
`;

export const HistorySeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
`;

export const HistoryContainer = styled.div`
  width: 100%;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

export const EmptyHistoryMessage = styled.div`
  padding: 20px;
  font-size: 14px;
  text-align: center;
  width: 100%;
  color: #6c757d;
`;

export const ClickableTicketId = styled.div`
  cursor: pointer;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  border-radius: 10px;
  background: #2d6cdf;
  padding: 0 10px;
  width: max-content;
  &:hover {
    text-decoration: underline;
  }
`;

export const CreatedDateBadge = styled.div`
  color: #8200db;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  border-radius: 16777200px;
  background: #f3e8ff;
  padding: 4px 12px;
  display: inline-block;
`;

export const UpdatedDateBadge = styled.div`
  color: #f4b701;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  border-radius: 16777200px;
  background: rgba(245, 186, 1, 0.1);
  padding: 4px 12px;
  display: inline-block;
`;
