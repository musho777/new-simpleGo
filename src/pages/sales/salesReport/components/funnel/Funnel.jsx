import { useSelector } from 'react-redux';

import { selectSalesFunnelAnalyticsLoading } from 'features/sales/salesSlice';

import { FunnelDiv, Lead, Status, Value } from './Funnel.styles';

const Funnel = ({ background, stageData, previousStage }) => {
  const isLoading = useSelector(selectSalesFunnelAnalyticsLoading);

  if (isLoading) {
    return (
      <FunnelDiv>
        <div>Loading...</div>
      </FunnelDiv>
    );
  }

  const stageInfo = stageData || {
    statusName: 'No data',
    totalLeads: 0,
    delta: 0,
    deltaPercentage: 0,
  };

  const lostLeadsPercentage = previousStage
    ? previousStage.totalLeads > stageData.totalLeads
      ? stageData.totalLeads === 0
        ? 100
        : (stageData.totalLeads / previousStage.totalLeads) * 100
      : 0
    : 0;
  previousStage
    ? previousStage.totalLeads > stageData.totalLeads
      ? previousStage.totalLeads - stageData.totalLeads
      : 0
    : 0;

  const lostLeads = previousStage
    ? stageData.totalLeads === 0
      ? previousStage.totalLeads
      : previousStage.totalLeads > stageData.totalLeads
        ? previousStage.totalLeads - stageData.totalLeads
        : 0
    : 0;

  return (
    <FunnelDiv>
      <Lead $background={background}>
        <Status>{stageInfo.statusName}</Status>
        <Value style={{ fontSize: '16px', fontWeight: 'bold' }}>{stageInfo.totalLeads}</Value>
      </Lead>
      {lostLeadsPercentage > 0 && (
        <Lead
          $width={lostLeadsPercentage}
          $background="linear-gradient(135deg, #E7000B 0%, #E7000B 100%)"
        >
          <Status style={{ fontSize: '12px' }}>Lost from {previousStage.statusName}</Status>
          <Value style={{ fontSize: '14px', fontWeight: 'bold' }}>{lostLeads}</Value>
        </Lead>
      )}
    </FunnelDiv>
  );
};

export default Funnel;
