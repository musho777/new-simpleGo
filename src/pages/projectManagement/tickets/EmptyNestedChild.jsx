import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #6c757d;
  font-size: 16px;
  font-weight: 500;
`;

const EmptyNestedChild = () => {
  return <Wrapper>No results found</Wrapper>;
};

export default EmptyNestedChild;
