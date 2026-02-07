import React, { useState } from 'react';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import DefaulyImage from 'assets/default.jpg';

import {
  CarouselContainer,
  CarouselImage,
  CarouselInner,
  CarouselNavButton,
  Dot,
  DotsWrapper,
  SlideItem,
  SlideWrapper,
  ZoomOverlayStyle,
} from './Carousel.styles';
import LeftArrowIcon from './vector-left.svg';
import RightArrowIcon from './vector-right.svg';

const ImageCarousel = ({ photos = [], className }) => {
  const [current, setCurrent] = useState(0);
  const total = photos.length;

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => setCurrent(index);

  if (total === 0) {
    return <CarouselImage className={className} src={DefaulyImage} alt="default" />;
  }

  return (
    <>
      <ZoomOverlayStyle />
      <CarouselContainer>
        <SlideWrapper>
          <CarouselInner style={{ transform: `translateX(-${current * 100}%)` }}>
            {photos.map((photo, index) => (
              <SlideItem key={index}>
                <Zoom>
                  <CarouselImage
                    className={className}
                    src={photo.photo}
                    alt={`img-${index}`}
                  />
                </Zoom>
              </SlideItem>
            ))}
          </CarouselInner>
        </SlideWrapper>

        {total > 1 && (
          <>
            <CarouselNavButton onClick={handlePrev} left>
              <img src={LeftArrowIcon} alt="Prev" />
            </CarouselNavButton>

            <CarouselNavButton onClick={handleNext}>
              <img src={RightArrowIcon} alt="Next" />
            </CarouselNavButton>

            <DotsWrapper>
              {photos.map((_, index) => (
                <Dot
                  key={index}
                  active={index === current}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </DotsWrapper>
          </>
        )}
      </CarouselContainer>
    </>
  );
};

export default ImageCarousel;
