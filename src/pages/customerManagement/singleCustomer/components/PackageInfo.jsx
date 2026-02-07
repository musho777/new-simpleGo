import address from 'assets/customerManagement/address.svg';
import calendar from 'assets/customerManagement/calendar.svg';
import promotions from 'assets/customerManagement/promotions.svg';
import Tag from 'pages/components/tag';

import {
  AddressWrapper,
  CustomerInfoWrapper,
  DateItem,
  DateLabel,
  DateList,
  DateSection,
  DatesContainer,
  HeaderPackage,
  Icon,
  PackagePrice,
  PackageStatusWrapper,
  PackageTitle,
  PromotionText,
  PromotionsHeader,
  PromotionsSection,
  Row,
} from './Components.styles';

export const PackageInfo = ({ tariffs }) => {
  return (
    <CustomerInfoWrapper>
      <HeaderPackage>
        <PackageTitle>
          <PackageStatusWrapper>
            <p>{tariffs.tariffName}</p>
            <Tag type={'statuses'} variant={tariffs.status} />
          </PackageStatusWrapper>
          <AddressWrapper>
            <Icon src={address} alt="address" />
            <p>{tariffs.address}</p>
          </AddressWrapper>
        </PackageTitle>
        <PackagePrice>
          <p>{new Intl.NumberFormat('en-US').format(tariffs.price)} AMD</p>
          <p>per month</p>
        </PackagePrice>
      </HeaderPackage>
      <DatesContainer>
        <DateSection>
          <Row>
            <Icon src={calendar} alt="calendar" />
            <DateLabel>Activation Date:</DateLabel>
          </Row>
          <DateList>
            <DateItem>{tariffs.activationDate}</DateItem>
          </DateList>
        </DateSection>
        {tariffs.validUntil && (
          <DateSection>
            <Row>
              <Icon src={calendar} alt="calendar" />
              <DateLabel>Valid Until:</DateLabel>
            </Row>
            <DateList>
              <DateItem>{tariffs.validUntil}</DateItem>
            </DateList>
          </DateSection>
        )}
        {tariffs.discounts && (
          <PromotionsSection>
            <PromotionsHeader>
              <Icon src={promotions} alt="promotions" />
              <p>discount</p>
            </PromotionsHeader>
            <PromotionText>{tariffs.discounts}</PromotionText>
          </PromotionsSection>
        )}
      </DatesContainer>
    </CustomerInfoWrapper>
  );
};
