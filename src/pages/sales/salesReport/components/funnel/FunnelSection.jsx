import {
  FunnelBox,
  FunnelCardContainer,
  FunnelCardGrid,
  FunnelWrapper,
  GradientText,
} from '../../SalesReport.styles';
import Funnel from './Funnel';
import FunnelCard from './FunnelCard';

const FunnelSection = ({ salesFunnelAnalytics, overviewLeadMetrics }) => {
  if (!salesFunnelAnalytics?.funnel?.length) return null;
  const { funnel } = salesFunnelAnalytics;
  return (
    <FunnelBox>
      <GradientText>Lead Status Funnel</GradientText>
      <FunnelWrapper>
        <div>
          {funnel.map((stage, index) => {
            return (
              <Funnel
                key={stage.statusId}
                stageData={stage}
                previousStage={index > 0 ? funnel[index - 1] : null}
              />
            );
          })}
        </div>
      </FunnelWrapper>
      <FunnelCardContainer>
        <FunnelCardGrid>
          <FunnelCard
            statusName="Starting Leads"
            totalLeads={salesFunnelAnalytics?.startingLeads || 0}
          />
          <FunnelCard
            statusName="Converted"
            totalLeads={salesFunnelAnalytics?.convertedLeads}
          />
          <FunnelCard
            statusName="Total Drop-off"
            totalLeads={
              salesFunnelAnalytics?.startingLeads - salesFunnelAnalytics?.convertedLeads
            }
          />
          <FunnelCard
            statusName="Conversion Rate"
            totalLeads={`${salesFunnelAnalytics?.overallConversionRate || 0}%`}
          />
        </FunnelCardGrid>
      </FunnelCardContainer>
    </FunnelBox>
  );
};

export default FunnelSection;
