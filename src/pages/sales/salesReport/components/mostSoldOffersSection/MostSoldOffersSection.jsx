import { useMemo, useState } from 'react';

import box from 'assets/salesReports/box.svg';
import Button from 'common-ui/button';

import {
  GradientText,
  Icon,
  IconWrapper,
  MostSoledOffersHeader,
  OffersContainer,
  SalesSection,
} from '../../SalesReport.styles';
import HorizontalCard from '../horizontalCard';

const MostSoldOffersSection = ({ mostSoldOffers }) => {
  const [showAllMostSoldOffers, setShowAllMostSoldOffers] = useState(false);

  const processArrayData = (array, showMore = false, limit = 5) => {
    if (!array) return [];

    const sortedArray = [...array].sort(
      (a, b) => (b.totalRevenue || 0) - (a.totalRevenue || 0)
    );
    const slicedArray = showMore ? sortedArray : sortedArray.slice(0, limit);
    return slicedArray.map((item, index) => ({
      ...item,
      id: item.id || item.uuid || `${item.entityname}-${index}`,
    }));
  };

  const processedOffers = useMemo(
    () => processArrayData(mostSoldOffers, showAllMostSoldOffers),
    [mostSoldOffers, showAllMostSoldOffers]
  );

  if (!mostSoldOffers?.length) return null;

  return (
    <SalesSection>
      <MostSoledOffersHeader>
        <div>
          <IconWrapper>
            <Icon src={box} alt={'box'} />
          </IconWrapper>
          <GradientText>Most Sold Offers</GradientText>
        </div>
        {mostSoldOffers?.length > 5 && (
          <Button onClick={() => setShowAllMostSoldOffers(!showAllMostSoldOffers)}>
            {showAllMostSoldOffers ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </MostSoledOffersHeader>
      <OffersContainer>
        {processedOffers?.map((offer, index) => (
          <HorizontalCard index={index} key={offer.id || index} data={offer} />
        ))}
      </OffersContainer>
    </SalesSection>
  );
};

export default MostSoldOffersSection;
