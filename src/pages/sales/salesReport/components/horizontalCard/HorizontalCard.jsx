import PropTypes from 'prop-types';

import {
  CardContainer,
  Index,
  InfoBadge,
  InfoBadgeWrapper,
  LeftSide,
  RightSide,
  RightSideLabel,
  RightSidePrice,
  Title,
  TitleWrapper,
} from './Card.styles';

const HorizontalCard = ({ onClick, className, index, data }) => {
  return (
    <CardContainer onClick={onClick} className={className}>
      <LeftSide>
        <Index $index={index}>#{index + 1}</Index>
        <TitleWrapper>
          <Title>{data.offerName}</Title>
          <InfoBadgeWrapper>
            <InfoBadge>
              <p>{data.orderCount} orders</p>
            </InfoBadge>
            <InfoBadge $color="#1447E6" $bg="#DBEAFE">
              <p>
                {' '}
                Avg:{' '}
                {(data.totalRevenue / data.orderCount)?.toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}{' '}
                AMD
              </p>
            </InfoBadge>
          </InfoBadgeWrapper>
        </TitleWrapper>
      </LeftSide>
      <RightSide>
        <RightSidePrice>
          {data.totalRevenue?.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}{' '}
          AMD
        </RightSidePrice>
        <RightSideLabel>Total Revenue</RightSideLabel>
      </RightSide>
    </CardContainer>
  );
};

HorizontalCard.propTypes = {
  title: PropTypes.string,
  footer: PropTypes.node,
  headerActions: PropTypes.node,
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
};

export default HorizontalCard;
