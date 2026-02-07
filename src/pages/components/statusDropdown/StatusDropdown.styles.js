import { styled } from 'styled-components';

export const StatusContainer = styled.div`
  border: 1px solid ${({ $isOpen }) => ($isOpen ? '#2D6CDF' : '#D4D8DD')};
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
`;

export const StatusList = styled.ul`
  list-style-type: none;
  position: absolute;
  top: 115%;
  background-color: white;
  left: 0;
  width: 100%;
  z-index: 1;
  padding: 9px 12px;
  border-radius: 12px;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.2));
  flex-direction: column;
  gap: 3px;
`;

export const StatusItem = styled.li`
  padding: 8px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border-color 0.3s;

  &:hover {
    background-color: #2d6cdf1a;
    color: #2d6cdf;
  }

  &.active {
    background-color: #2d6cdf1a;
    color: #2d6cdf;
  }
`;

export const StatusHeader = styled.div`
  display: flex;
  height: 36px;
  min-width: 116px;
  justify-content: space-between;
  align-items: center;
  padding: 12px 7px;
  color: ${({ $isOpen }) => ($isOpen ? '#2D6CDF' : '#212529')};
  /* width: ${({ $width }) => $width && `${$width}px`}; */
`;

export const Span = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Icon = styled.img``;
