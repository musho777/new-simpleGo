import styled from 'styled-components';

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

export const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  flex: 1;
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};
  transition: all 0.2s ease-in-out;

  background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);

  .title {
    color: #0f172b;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    transition: color 0.2s ease-in-out;
  }

  .user {
    color: #62748e;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }

  .date {
    color: #62748e;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }

  ${(props) =>
    props.$clickable &&
    `
    &:hover {
      border-color: #2d6cdf;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      box-shadow: 0 4px 12px -2px rgba(45, 108, 223, 0.15);
      transform: translateY(-2px);

      .title {
        color: #2d6cdf;
      }
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px -2px rgba(45, 108, 223, 0.2);
    }
  `}

  @media (max-width: 768px) {
    gap: 8px;
    padding: 10px;
    border-radius: 12px;

    .title {
      font-size: 14px;
    }

    .user {
      font-size: 11px;
    }

    .date {
      font-size: 11px;
    }

    ${(props) =>
      props.$clickable &&
      `
      &:hover {
        transform: translateY(-1px);
      }
    `}
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 24px;
  background: ${(props) =>
    props.$background || 'linear-gradient(135deg, #2d6cdf 0%, #1d3557 100%)'};
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
