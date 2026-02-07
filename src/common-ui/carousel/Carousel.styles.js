import styled, { createGlobalStyle } from 'styled-components';

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 10px;
`;

export const SlideWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const CarouselInner = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
`;

export const CarouselImage = styled.img`
  flex-shrink: 0;
  width: 100%;
  height: 180px;
  object-fit: contain;

  border-radius: 10px;
  background-color: transparent;
`;

export const CarouselNavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ left }) => (left ? 'left: 10px' : 'right: 10px')};
  transform: translateY(-50%);
  background-color: transparent;
  border: none;

  cursor: pointer;
  z-index: 10;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const DotsWrapper = styled.div`
  position: absolute;
  bottom: 8px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ active }) => (active ? '#2d6cdfcc' : 'rgba(108, 117, 125, 1)')};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export const SlideItem = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ZoomOverlayStyle = createGlobalStyle`
  [data-rmiz-modal-overlay="visible"] {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
`;
