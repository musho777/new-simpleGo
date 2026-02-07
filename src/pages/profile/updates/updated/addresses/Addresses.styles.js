import styled from 'styled-components';

export const ArrowBottom = styled.img`
  transform: rotate(90deg);
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $alignCenter }) => ($alignCenter ? 'center' : 'flex-start')};
  flex-wrap: wrap;
  gap: 8px;

  &:nth-child(n + 2) {
    margin-left: 26px;
  }
`;

export const DisabledWrapper = styled.div`
  margin-right: 26px;
`;
