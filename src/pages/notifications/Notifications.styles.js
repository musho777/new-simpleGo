import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
    margin-top: 30px !important;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(107, 107, 107, 0.514);
    border-radius: 10px;
  }

  mask-image: linear-gradient(#000, #000);
  -webkit-mask-image: linear-gradient(#000, #000);
`;

export const ItemWrapper = styled.div`
  width: 100%;
  height: 124px;
  border-bottom: 0.5px solid #dfdfdf80;
`;
