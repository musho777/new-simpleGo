import styled from 'styled-components';

export const CustomerInfoWrapper = styled.div`
  border-radius: 14px;
  padding: 24px;

  background: rgba(255, 255, 255, 0.9);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.15),
      0 8px 10px -6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 24px 0;

  @media (max-width: 768px) {
    padding: 16px 0;
    gap: 8px;
  }

  @media (max-width: 480px) {
    padding: 12px 0;
    gap: 6px;
  }
`;

export const HeaderText = styled.div`
  p:first-child {
    color: #212529;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
  }

  p:nth-child(2) {
    color: #4a5565;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }
  p:last-child {
    color: #4a5565;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }
  span {
    color: #212529;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  @media (max-width: 768px) {
    p:first-child {
      font-size: 20px;
    }

    p:last-child {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    p:first-child {
      font-size: 18px;
    }

    p:last-child {
      font-size: 12px;
    }
  }
`;

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

  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    border-radius: 12px;
  }
`;

export const Icon = styled.img`
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
  }

  @media (max-width: 768px) {
    max-width: 18px;
    max-height: 18px;

    &:hover {
      transform: scale(1.08);
    }
  }
`;

export const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 20px 0;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  > p {
    color: #212529;
    font-family: Nunito;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    flex: 1;
  }

  @media (max-width: 768px) {
    margin: 16px 0;
    gap: 4px;

    > p {
      font-size: 11px;
      line-height: 14px;
      letter-spacing: 0.2px;
    }
  }

  @media (max-width: 480px) {
    margin: 12px 0;
    gap: 3px;

    > p {
      font-size: 10px;
      line-height: 13px;
      letter-spacing: 0.15px;
    }
  }
`;

export const InfoSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f1f5f9;
  flex-wrap: wrap;
  gap: 0 16px;

  @media (max-width: 1024px) {
    gap: 0 12px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const HeaderPackage = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const PackageTitle = styled.div`
  p {
    color: #212529;
    font-family: Nunito;
    font-size: 18px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    p {
      font-size: 16px;
    }
  }
`;

export const PackagePrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  p:first-child {
    color: #0f172b;
    text-align: right;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }

  p:last-child {
    color: #62748e;
    text-align: right;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    align-items: flex-start;

    p:first-child {
      text-align: left;
      font-size: 20px;
      line-height: 28px;
    }

    p:last-child {
      text-align: left;
      font-size: 11px;
    }
  }
`;

export const AddressWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 6px;
  > p {
    color: #6c757d;
    font-family: Nunito;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    gap: 4px;

    > p {
      font-size: 12px;
      line-height: 18px;
      word-break: break-word;
    }
  }
`;

export const DatesContainer = styled.div`
  display: flex;
  gap: 52px;
  margin-top: 20px;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    gap: 24px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;
  }
`;

export const DateSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const DateLabel = styled.div`
  color: #212529;
  font-family: Nunito;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;

  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 18px;
  }
`;

export const DateList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DateItem = styled.li`
  color: #6c757d;
  font-family: Nunito;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 18px;
  }
`;

export const PromotionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  border-radius: 10px;
  padding: 13px;
  border: 1px solid #f3e8ff;
  background: linear-gradient(
    135deg,
    rgba(250, 245, 255, 0.5) 0%,
    rgba(250, 245, 255, 0.3) 100%
  );

  @media (max-width: 768px) {
    padding: 10px;
    gap: 6px;
    border-radius: 8px;
  }
`;

export const PromotionsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  p {
    color: #8200db;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    gap: 4px;

    p {
      font-size: 11px;
      letter-spacing: 0.2px;
    }
  }
`;

export const PromotionText = styled.p`
  color: #314158;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 18px;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    gap: 8px;

    p {
      color: #2d6cdf;
    }
  }

  @media (max-width: 768px) {
    gap: 4px;

    &:hover {
      gap: 6px;
    }
  }
`;

export const TimelineWrapper = styled.div`
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  padding: 24px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    box-shadow:
      0 12px 20px -4px rgba(0, 0, 0, 0.12),
      0 6px 10px -4px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const TimelineItem = styled.div`
  display: flex;
  gap: 16px;
  position: relative;
  min-height: ${(props) => (props.$isLast ? 'auto' : '100px')};

  @media (max-width: 768px) {
    gap: 12px;
    min-height: ${(props) => (props.$isLast ? 'auto' : '80px')};
  }
`;

export const TimelineDot = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  z-index: 1;
`;

export const TimelineConnector = styled.div`
  position: absolute;
  left: 20px;
  top: 42px;
  bottom: -25px;
  width: 2px;
  background: linear-gradient(180deg, #e2e8f0 0%, #e2e8f0 50%, rgba(0, 0, 0, 0) 100%);

  @media (max-width: 768px) {
    left: 15px;
    top: 36px;
    bottom: -20px;
  }
`;

export const HorizontalTimelineConnector = styled.div`
  height: 0.792px;
  width: 120px;
  background: linear-gradient(to bottom, #e2e8f0 0%, #e2e8f0 50%, rgba(0, 0, 0, 0) 100%);

  @media (max-width: 768px) {
    width: 80px;
  }
`;

// export const TimelineContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   padding: 12px;
//   border-radius: 14px;
//   border: 1px solid #e2e8f0;
//   flex: 1;
//   cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};
//   transition: all 0.2s ease-in-out;

//   background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);

//   .title {
//     color: #0f172b;
//     font-size: 16px;
//     font-style: normal;
//     font-weight: 500;
//     transition: color 0.2s ease-in-out;
//   }

//   .user {
//     color: #62748e;
//     font-size: 12px;
//     font-style: normal;
//     font-weight: 400;
//   }

//   .date {
//     color: #62748e;
//     font-size: 12px;
//     font-style: normal;
//     font-weight: 400;
//   }

//   ${(props) =>
//     props.$clickable &&
//     `
//     &:hover {
//       border-color: #2d6cdf;
//       background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
//       box-shadow: 0 4px 12px -2px rgba(45, 108, 223, 0.15);
//       transform: translateY(-2px);

//       .title {
//         color: #2d6cdf;
//       }
//     }

//     &:active {
//       transform: translateY(0);
//       box-shadow: 0 2px 8px -2px rgba(45, 108, 223, 0.2);
//     }
//   `}

//   @media (max-width: 768px) {
//     gap: 8px;
//     padding: 10px;
//     border-radius: 12px;

//     .title {
//       font-size: 14px;
//     }

//     .user {
//       font-size: 11px;
//     }

//     .date {
//       font-size: 11px;
//     }

//     ${(props) =>
//       props.$clickable &&
//       `
//       &:hover {
//         transform: translateY(-1px);
//       }
//     `}
//   }
// `;

export const StatusIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 24px;
  background: linear-gradient(135deg, #2d6cdf 0%, #1d3557 100%);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow:
      0 8px 12px -2px rgba(45, 108, 223, 0.3),
      0 4px 8px -2px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    border-radius: 16px;

    &:hover {
      transform: scale(1.08);
    }
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  transition: gap 0.2s ease-in-out;

  &:hover {
    gap: 8px;
  }

  @media (max-width: 768px) {
    gap: 4px;

    &:hover {
      gap: 6px;
    }
  }
`;

export const TimelineContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const HistoryRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-left: -36px;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    gap: 8px;
    margin-left: -28px;
  }
`;

export const HistoryIconContainer = styled.div`
  display: flex;
  width: 120px;
  align-items: center;
  height: 40px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 32px;

    &:hover {
      transform: translateX(3px);
    }
  }
`;

export const MonthBadge = styled.div`
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

  @media (max-width: 1024px) {
    font-size: 15px;
    line-height: 22px;
    padding: 7px 14px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
    padding: 6px 12px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    line-height: 18px;
    padding: 5px;
    border-radius: 6px;
    margin-right: 5px;
  }
`;
export const TablePriceColum = styled.div`
  color: ${({ $color }) => $color || '#15c7a7'};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

export const SectionContent = styled.div`
  animation: slideDown 0.3s ease-in-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 0 16px 16px 40px;
  }

  @media (max-width: 480px) {
    padding: 0 12px 12px 30px;
  }
`;

export const DataList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 14px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const DataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #f1f5f9;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #e2e8f0;
    box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    padding: 10px;
    gap: 3px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

export const DataKey = styled.p`
  color: var(--Text-color, #212529);
  font-family: Nunito, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 18px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`;

export const DataValue = styled.p`
  color: var(--secondary-text, #6c757d);
  font-family: Nunito, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin: 0;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 18px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 16px;
  }
`;

export const NestedTable = styled.div`
  position: relative;
  margin: 0px 50px 0px 50px;
  padding: 20px;

  border: 1px solid #f3f4f6;
  box-shadow: 0px 4px 6px -4px #0000001a;
  background-color: white;
  box-shadow: 0px 10px 15px -3px #0000001a;
  border-radius: 16px;
  @media (max-width: 768px) {
    margin: 0px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 16px;
  background: #f3f4f6;
  color: #6c757d;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #e63946;
    color: white;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const PackageStatusWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
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

export const HistoryIcon = styled.img`
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.15);
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    max-width: 18px;
    max-height: 18px;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
