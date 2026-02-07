const { default: styled } = require('styled-components');

export const TooltipContainer = styled.div`
  background-color: white;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const TooltipText = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
`;

export const ChartLabel = styled.text`
  fill: white;
  text-anchor: middle;
  dominant-baseline: central;
  font-size: 12px;
  font-weight: 600;
`;

export const ConversionTooltipContainer = styled.div`
  background: white;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-size: 12px;
`;

export const ConversionTooltipLabel = styled.p`
  margin: 0;
  color: #333;
  font-weight: bold;
  font-size: 12px;
`;

export const ConversionTooltipItem = styled.p`
  margin: 2px 0;
  color: ${(props) => props.color};
  font-size: 11px;
`;
