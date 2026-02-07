import styled from 'styled-components';

export const RadioWrapper = styled.div`
  display: flex;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-self: start;
  color: ${({ customColor }) => customColor || 'black'};
  span {
    color: red;
    margin-left: 2px;
  }
`;
