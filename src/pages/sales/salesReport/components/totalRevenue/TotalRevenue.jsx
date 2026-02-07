import addedLeadIcon from 'assets/salesReports/addedLead.svg';
import PropTypes from 'prop-types';

import {
  Icon,
  IconWrapper,
  Label,
  RevenueContainer,
  Text,
  Value,
} from './TotalRevenue.styles';

const TotalRevenue = ({ onClick, color = '#10B981', total, convertedCount }) => {
  return (
    <RevenueContainer onClick={onClick}>
      <Label>AMD Total Revenue</Label>
      <Value $color={color}>{total?.toLocaleString('en-US')} AMD</Value>
      <IconWrapper>
        <Icon src={addedLeadIcon} alt={'leadIcon'} />
        <Text $color={color}>From {convertedCount || 0} converted leads</Text>
      </IconWrapper>
    </RevenueContainer>
  );
};

TotalRevenue.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default TotalRevenue;
