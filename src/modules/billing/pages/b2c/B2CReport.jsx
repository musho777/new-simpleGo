import { useSelector } from 'react-redux';

import { selectIsSecurityModalOpen } from 'modules/billing/features/main/mainSlice';

import { FilterContainer, PageTitle, Row, ViewContainer } from './B2CReport.styles';
import FilterActions from './filterActions';

const B2CReport = () => {
  const securityModalOpen = useSelector(selectIsSecurityModalOpen);

  return (
    !securityModalOpen && (
      <>
        <ViewContainer>
          <Row>
            <PageTitle>B2C հաշվետվություններ</PageTitle>
          </Row>
          <FilterContainer>
            <FilterActions />
          </FilterContainer>
        </ViewContainer>
      </>
    )
  );
};

export default B2CReport;
