import addedLeadIcon from 'assets/salesReports/addedLead.svg';
import conversionRateIcon from 'assets/salesReports/conversionRate.svg';
import convertedIcon from 'assets/salesReports/converted.svg';
import leadIcon from 'assets/salesReports/lead.svg';
import lostLeads from 'assets/salesReports/lostLeads.svg';
import PropTypes from 'prop-types';

import { DashboardGrid } from '../../SalesReport.styles';
import { CardContainer, Icon, IconWrapper, Label, Value } from './MetricCard.styles';

const MetricCard = ({
  icon,
  iconAlt,
  value,
  label,
  onClick,
  backgroundColor = 'white',
  color,
}) => {
  return (
    <CardContainer onClick={onClick} $backgroundColor={backgroundColor}>
      <IconWrapper $color={color}>
        <Icon src={icon} alt={iconAlt} />
      </IconWrapper>
      <Label>{label}</Label>
      <Value $color={color}>{value}</Value>
    </CardContainer>
  );
};

MetricCard.propTypes = {
  icon: PropTypes.string.isRequired,
  iconAlt: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
};

const MetricsCards = ({ overviewLeadMetrics }) => {
  return (
    <DashboardGrid>
      <MetricCard
        backgroundColor="linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)"
        icon={leadIcon}
        iconAlt="Projects"
        value={overviewLeadMetrics?.totalLeads || 0}
        label="Total Leads"
        color="#2B7FFF"
      />

      <MetricCard
        backgroundColor="linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)"
        icon={addedLeadIcon}
        iconAlt="Leads"
        value={overviewLeadMetrics?.leadsAddedInPeriod || 0}
        label="Added Leads"
        color="#00C950"
      />

      <MetricCard
        backgroundColor="linear-gradient(135deg, #ECFDF5 0%, #D0FAE5 100%)"
        icon={convertedIcon}
        iconAlt="Subprojects"
        value={overviewLeadMetrics?.convertedLeads || 0}
        label="Converted Leads"
        color={'#009966'}
      />

      <MetricCard
        backgroundColor="linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)"
        icon={conversionRateIcon}
        iconAlt="Conversion"
        value={`${
          overviewLeadMetrics?.leadsAddedInPeriod
            ? parseFloat(
                (
                  (overviewLeadMetrics.convertedLeads /
                    overviewLeadMetrics.leadsAddedInPeriod) *
                  100
                ).toFixed(1)
              )
            : 0
        }%`}
        label="Conversion Rate"
        color={'#9810FA'}
      />
      <MetricCard
        backgroundColor="linear-gradient(135deg, #FEF2F2 0%, #FFE2E2 100%)"
        icon={lostLeads}
        iconAlt="Converted"
        value={overviewLeadMetrics?.lostLeads || 0}
        label="Lost Leads"
        color={'#E7000B'}
      />
    </DashboardGrid>
  );
};

export { MetricCard };
export default MetricsCards;
