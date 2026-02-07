import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const Header = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  height: 90px;
  border-bottom: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.8);
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
`;

export const HeaderTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  color: #1d3557;
`;

export const LoadContainer = styled.div`
  width: 100%;
  min-height: 500px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const MetricIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

export const Icon = styled.img``;

export const MetricValue = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 100%;
  color: rgba(255, 106, 0, 1);
  margin-bottom: 8px;
`;

export const MetricLabel = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  color: rgba(108, 117, 125, 1);
`;

export const ChartContainer = styled.div`
  grid-column: span 2;
  background-color: white;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    grid-column: span 1;
  }
`;

export const ChartTitle = styled.h3`
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
  color: rgba(33, 37, 41, 1);
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(234, 240, 252, 1);
  padding-bottom: 12px;
`;

export const RecentActivities = styled.div`
  grid-column: span 2;
  background-color: white;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    grid-column: span 1;
  }
`;

export const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid rgba(240, 240, 240, 1);

  &:last-child {
    border-bottom: none;
  }
`;

export const ActivityText = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(33, 37, 41, 1);

  strong {
    font-weight: 600;
    color: rgba(33, 37, 41, 1);
  }

  small {
    color: rgba(108, 117, 125, 1);
    font-size: 12px;
  }
`;

export const ActivityTime = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: rgba(45, 108, 223, 1);
  background-color: rgba(234, 240, 252, 1);
  padding: 4px 8px;
  border-radius: 12px;
  min-width: fit-content;
  text-align: center;
`;

export const QuickActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ActionButton = styled.button`
  background-color: rgba(45, 108, 223, 1);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  &:hover {
    background-color: rgba(37, 89, 184, 1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SalesSection = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  gap: 24px;
  border-radius: 16px;
  border: 1px solid #f3f4f6;
  background: linear-gradient(135deg, #fff 0%, #faf5ff 100%);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);

  @media (max-width: 880px) {
    .table-main-container {
      display: none !important;
    }
    .mobile-list-main-container {
      display: block !important;
    }
  }
`;

export const MostSoledOffersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > button {
    max-width: max-content;
    border-radius: 10px;
    background: linear-gradient(90deg, #2b7fff 0%, #ad46ff 100%);
    color: white;
    transition: 0.25s ease;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -2px rgba(0, 0, 0, 0.1);
    &:hover {
      transform: translateY(-2px);
      box-shadow:
        0 6px 10px -1px rgba(0, 0, 0, 0.12),
        0 3px 6px -2px rgba(0, 0, 0, 0.12);
      opacity: 0.9;
    }
  }
  > div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

export const GradientText = styled.p`
  background: linear-gradient(90deg, #155dfc 0%, #9810fa 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const IconWrapper = styled.div`
  display: flex;
  padding: 10px;
  width: max-content;
  justify-content: center;
  align-content: center;
  border-radius: ${(props) => (props.$variant === 'header' ? '16px' : '10px')};
  background: ${(props) =>
    props.$variant === 'header'
      ? 'linear-gradient(135deg, #2b7fff 0%, #9810fa 100%)'
      : '#f3e8ff'};
  box-shadow: ${(props) =>
    props.$variant === 'header'
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
      : 'none'};
`;

export const FunnelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  max-height: 600px;
  overflow: auto;
  padding-top: 20px;
  gap: 10px;
  > div {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const FunnelBox = styled.div`
  border-radius: 16px;
  border: 1px solid #f3f4f6;
  background: linear-gradient(135deg, #fff 0%, #eff6ff 100%);
  padding: 24px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
`;

export const FunnelCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding: 10px 0;
  gap: 15px;
  margin-top: 20px;
  margin: auto;
  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const TableRankIndex = styled.div`
  border-radius: 10px;
  background: ${(props) => {
    switch (props.$index) {
      case 0:
        return 'linear-gradient(135deg, #FDC700 0%, #F0B100 100%)';
      case 1:
        return 'linear-gradient(135deg, #D1D5DC 0%, #99A1AF 100%)';
      case 2:
        return 'linear-gradient(135deg, #FF8904 0%, #FF6900 100%)';
      default:
        return 'linear-gradient(135deg, #DBEAFE 0%, #BEDBFF 100%)';
    }
  }};
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
`;

export const TabWrapper = styled.div`
  display: flex;
  padding: 20px;
  border-radius: 16px;
  gap: 10px;
  background: linear-gradient(135deg, #fff 0%, #faf5ff 100%);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 16px;
    overflow-x: auto;
    gap: 8px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 6px;
  }
`;

export const Tabs = styled.div`
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  padding: 12px 25.21px 12px 25.2px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  background: ${({ $active, $disabled }) =>
    $disabled
      ? '#f5f5f5'
      : $active
        ? 'linear-gradient(90deg, #2b7fff 0%, #ad46ff 100%)'
        : 'transparent'};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  white-space: nowrap;
  flex-shrink: 0;

  box-shadow: ${({ $active, $disabled }) =>
    $active && !$disabled
      ? `0 10px 15px -3px rgba(0,0,0,0.1),
         0 4px 6px -4px rgba(0,0,0,0.1)`
      : 'none'};

  > p {
    color: ${({ $active, $disabled }) => ($disabled ? '#999' : $active ? '#fff' : '#000')};
    text-align: center;
    font-size: 16.8px;
    font-style: normal;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
    > p {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    padding: 8px 14px;
    > p {
      font-size: 12px;
    }
  }
`;

export const chartStyles = {
  tooltip: {
    background: 'white',
    padding: '12px',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontSize: '12px',
  },
  tooltipTitle: {
    margin: 0,
    color: '#333',
    fontSize: '14px',
    fontWeight: '600',
  },
  tooltipValue: {
    margin: '4px 0 0 0',
    color: '#666',
    fontSize: '13px',
  },
  yAxisTick: {
    fontSize: 14,
    fill: '#6B7280',
    fontWeight: '400',
  },
  xAxisTick: {
    fontSize: 12,
    fill: '#666',
  },
};

export const HeaderWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const FilterContainer = styled.div`
  border-radius: 16px;
  display: flex;
  padding: 22px;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid #f3f4f6;
  background: linear-gradient(135deg, #fff 0%, #f9fafb 100%);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
`;

export const ExportButton = styled.div`
  > button {
    display: flex;
    padding: 12px 24px;
    align-items: center;
    gap: 8px;
    border-radius: 14px;
    border: none;
    color: #fff;
    font-size: 16px;
    background: linear-gradient(90deg, #00c950 0%, #096 100%);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
    &:hover {
      background: linear-gradient(90deg, #00e65c 0%, #00b36b 100%);
      box-shadow:
        0 14px 20px -3px rgba(0, 0, 0, 0.2),
        0 6px 8px -4px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 6px 10px -3px rgba(0, 0, 0, 0.15);
    }
  }
`;

export const DashboardTitle = styled.p`
  color: #101828;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
`;

export const DashboardSubtitle = styled.p`
  color: #4a5565;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

export const OffersContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

export const TotalLeads = styled.div`
  background-color: ${({ $bg }) => $bg || '#dcfce7'};
  padding: 5px 10px;
  color: ${({ $color }) => $color || '#008236'};
  font-size: 12px;
  font-weight: 500;
  border-radius: 40px;
`;

export const ExpandableContainer = styled.div`
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

export const ExpandableRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ $isLast }) => ($isLast ? '0' : '8px')};
`;

export const ExpandableLabel = styled.span`
  font-weight: bold;
  color: #666;
`;

export const FunnelCardContainer = styled.div`
  width: 70%;
  margin: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
