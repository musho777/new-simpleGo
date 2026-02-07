import styled from 'styled-components';

export const Tags = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.5rem;
  font-size: 12px;
  font-weight: bold;
  max-width: 200px;
  border-radius: 20px;
  gap: 5px;
  cursor: pointer;
  background-color: ${({ $bgColor, $type }) =>
    $type === 'ticketStatuses' || $type === 'tableStatuses' ? $bgColor : `${$bgColor}1A`};
  color: ${({ $textColor }) => $textColor};

  @media (max-width: 580px) {
    max-width: 100px;
  }
`;

export const Icon = styled.img``;
