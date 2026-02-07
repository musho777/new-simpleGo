import styled from 'styled-components';

export const Icon = styled.img``;

export const SwitchContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 4px;
  gap: 8px;
  height: 33px;
`;

export const SwitchButton = styled.button`
  background-color: ${(props) => (props.$active ? '#fff' : 'transparent')};
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;

  svg {
    fill: ${(props) => (props.$active ? '#333' : '#ccc')}; /* Icon color */
  }

  &:hover {
    background-color: ${(props) => (props.$active ? '#fff' : '#e0e0e0')};
  }
`;
