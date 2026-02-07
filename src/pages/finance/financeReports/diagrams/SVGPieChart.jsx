import React from 'react';

import styled from 'styled-components';

const StyledSVG = styled.svg`
  path {
    cursor: pointer;
    transition:
      transform 0.3s ease,
      opacity 0.2s ease;
    transform-origin: 104.5px 100px;

    &:hover {
      opacity: 0.9;
    }
  }

  path:hover {
    transform: translate(var(--hover-x, 0), var(--hover-y, 0));
  }
`;

const SVGPieChart = ({ data = [], width = 209, height = 200, radius = 80, pathRefs }) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const gapAngle = 2; // Gap between slices in degrees
  const gapFromCenter = 8; // Space from center in pixels

  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const totalGaps = data.length * gapAngle;
  const availableAngle = 360 - totalGaps;

  // Calculate angles for each slice
  let currentAngle = -90; // Start from top
  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * availableAngle;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle + gapAngle; // Add gap after each slice

    // Calculate slice position and hover direction
    const midAngle = (startAngle + endAngle) / 2;
    const midAngleRad = (midAngle * Math.PI) / 180;
    const hoverX = Math.cos(midAngleRad) * 8;
    const hoverY = Math.sin(midAngleRad) * 8;

    // Calculate offset from center for this slice
    const offsetX = Math.cos(midAngleRad) * gapFromCenter;
    const offsetY = Math.sin(midAngleRad) * gapFromCenter;

    return {
      ...item,
      startAngle,
      endAngle,
      angle,
      percentage,
      hoverX,
      hoverY,
      offsetX,
      offsetY,
    };
  });

  // Create SVG path for each slice with offset from center
  const createPath = (startAngle, endAngle, outerRadius, offsetX, offsetY) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const sliceCenterX = centerX + offsetX;
    const sliceCenterY = centerY + offsetY;

    const x1 = sliceCenterX + outerRadius * Math.cos(startAngleRad);
    const y1 = sliceCenterY + outerRadius * Math.sin(startAngleRad);
    const x2 = sliceCenterX + outerRadius * Math.cos(endAngleRad);
    const y2 = sliceCenterY + outerRadius * Math.sin(endAngleRad);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      sliceCenterX,
      sliceCenterY,
      'L',
      x1,
      y1,
      'A',
      outerRadius,
      outerRadius,
      0,
      largeArcFlag,
      1,
      x2,
      y2,
      'Z',
    ].join(' ');
  };

  return (
    <StyledSVG
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {slices.map((slice, index) => (
        <path
          key={index}
          ref={(el) => {
            if (pathRefs && pathRefs.current) {
              pathRefs.current[index] = el;
            }
          }}
          d={createPath(
            slice.startAngle,
            slice.endAngle,
            radius,
            slice.offsetX,
            slice.offsetY
          )}
          fill={slice.color}
          style={{
            '--hover-x': `${slice.hoverX}px`,
            '--hover-y': `${slice.hoverY}px`,
          }}
          data-hover-x={`${slice.hoverX}px`}
          data-hover-y={`${slice.hoverY}px`}
        />
      ))}
    </StyledSVG>
  );
};

export default SVGPieChart;
