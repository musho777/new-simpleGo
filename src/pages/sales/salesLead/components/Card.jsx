import { useState } from 'react';

import { CustomTooltip } from 'common-ui/table/CustomTooltip';

import {
  CardBody,
  CardContent,
  CardGroupWrapper,
  CardHeader,
  CardItem,
  CardLabel,
  CardWrapper,
  CompetitorCardItem,
  EmptyData,
  InfoCard,
  Key,
  NavigationArrow,
  Span,
  Value,
} from './Components.styles';

export const Card = ({ action, data, title, additional, setShowCompetitorInfo }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  let visibleIndex = 0;

  const truncateText = (text, maxLength = 40) => {
    if (text.length > 40) {
      return (
        <CustomTooltip title={text}>
          <Span>{text.slice(0, maxLength) + '...'}</Span>
        </CustomTooltip>
      );
    }
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      if (data[newPage]?.onClick) {
        data[newPage].onClick();
      }
    }
  };

  const handleNext = () => {
    if (currentPage < data.length - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      if (data[newPage]?.onClick) {
        data[newPage].onClick();
      }
    }
  };
  const hasMultiplePages = Array.isArray(data) && data.length > 1;

  return (
    <CardWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <InfoCard>
        <CardHeader>
          <CardLabel>{title}</CardLabel>
          {action}
        </CardHeader>
        <CardContent>
          <CardBody>
            {Array.isArray(data) && data.length > 0 ? (
              <CardGroupWrapper>
                {data[currentPage].group.map((elm, i) => {
                  if (!elm?.value) return null;
                  const isBlueText =
                    elm.label === 'Company' ||
                    elm.label === 'Full name' ||
                    elm.label === 'Offer name' ||
                    elm.label === 'Name';
                  const bgColor = visibleIndex % 2 === 0 ? '#ECF1FB' : undefined;
                  visibleIndex++;

                  const isDualField = elm.label === 'DualField';
                  const isCenterField = elm.label === 'CenterField';
                  const isStackField = elm.label === 'StackField';

                  return (
                    <CardItem
                      key={i}
                      $color={bgColor}
                      $isDualField={isDualField}
                      $isCenterField={isCenterField}
                      $isStackField={isStackField}
                    >
                      {isDualField ? (
                        <>
                          {elm.value && typeof elm.value === 'string'
                            ? elm.value.includes(' Price: ')
                              ? elm.value.split(' Price: ').map((part, index) => (
                                  <Key key={index} $isDualField={true}>
                                    {index === 0 ? part : `Price: ${part}`}
                                  </Key>
                                ))
                              : elm.value.split(' End Date: ').map((part, index) => (
                                  <Key key={index} $isDualField={true}>
                                    {index === 0 ? part : `End Date: ${part}`}
                                  </Key>
                                ))
                            : null}
                        </>
                      ) : isCenterField ? (
                        <Key $isCenterField={true}>{elm.value}</Key>
                      ) : isStackField ? (
                        <>
                          <Key $isStackField={true}>{elm.stackLabel}</Key>
                          <Value $isStackField={true}>{elm.value}</Value>
                        </>
                      ) : (
                        <>
                          <Key>{elm.label}</Key>
                          <Value $textColor={isBlueText ? '#2D6CDF' : undefined}>
                            {typeof elm.value === 'string' && elm.value.includes('<') ? (
                              <Span dangerouslySetInnerHTML={{ __html: elm.value }} />
                            ) : (
                              truncateText(elm.value)
                            )}
                          </Value>
                        </>
                      )}
                    </CardItem>
                  );
                })}
              </CardGroupWrapper>
            ) : (
              <EmptyData>
                <Key>No data available</Key>
              </EmptyData>
            )}
          </CardBody>

          {additional && (
            <CompetitorCardItem>
              <Key>Competitor info</Key>
              <Value $underline={true} onClick={() => setShowCompetitorInfo()}>
                View
              </Value>
            </CompetitorCardItem>
          )}
        </CardContent>
      </InfoCard>

      {hasMultiplePages && isHovered && (
        <>
          {currentPage > 0 && (
            <NavigationArrow $direction="left" onClick={handlePrevious}>
              ‹
            </NavigationArrow>
          )}
          {currentPage < data.length - 1 && (
            <NavigationArrow $direction="right" onClick={handleNext}>
              ›
            </NavigationArrow>
          )}
        </>
      )}
    </CardWrapper>
  );
};
