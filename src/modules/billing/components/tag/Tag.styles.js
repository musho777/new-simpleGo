import styled from 'styled-components';

export const Tags = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 12px;
  font-weight: bold;
  border-radius: 20px;
  background-color: ${({ $bgColor }) => `${$bgColor}1A`};
  color: ${({ $textColor }) => $textColor};
  cursor: pointer;
  white-space: nowrap;
`;
