import { Card, CardLabel, CardValue } from './Funnel.styles';

const FunnelCard = ({ statusName, totalLeads }) => {
  const color =
    statusName === 'Starting Leads'
      ? '#155DFC'
      : statusName === 'Converted'
        ? '#00A63E'
        : statusName === 'Total Drop-off'
          ? '#E7000B'
          : statusName === 'Conversion Rate'
            ? '#9810FA'
            : '#666';

  return (
    <Card>
      <CardLabel>{statusName}</CardLabel>
      <CardValue $color={color}>{totalLeads}</CardValue>
    </Card>
  );
};

export default FunnelCard;
