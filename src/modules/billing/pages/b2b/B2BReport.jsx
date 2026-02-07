import { useSelector } from 'react-redux';

import { selectIsSecurityModalOpen } from 'modules/billing/features/main/mainSlice';

import { FilterContainer, PageTitle, Row, ViewContainer } from './B2BReport.styles';
import FilterActions from './filterActions';

const B2BReport = () => {
  const securityModalOpen = useSelector(selectIsSecurityModalOpen);

  return (
    !securityModalOpen && (
      <>
        <ViewContainer>
          <Row>
            <PageTitle>B2B հաշվետվություններ</PageTitle>
          </Row>
          <FilterContainer>
            <FilterActions />
          </FilterContainer>
        </ViewContainer>
      </>
    )
  );
};

export default B2BReport;
