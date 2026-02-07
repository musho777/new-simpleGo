import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import subprojectIcon from 'assets/Not Found illustration.png';
import Button from 'common-ui/button';
import loadIcon from 'common-ui/table/loading.svg';
import { getSalesSubproject } from 'features/sales/salesActions';
import {
  selectSalesSubproject,
  selectSalesSubprojectLoading,
} from 'features/sales/salesSlice';
import AvatarGroup from 'pages/components/avatarGroup';
import EmptyView from 'pages/components/emptyView';
import { uniqueByUuid } from 'utils';

import { HeaderText } from '../salesLead/SalesLead.styles';
import {
  BackBox,
  Container,
  Header,
  LoadContainer,
  LoadingIcon,
  ProjectBox,
  ProjectFlex,
  ProjectInfo,
  ProjectInfoName,
  ProjectName,
  ProjectType,
  ProjectsContainer,
  Span,
  SubProjectCount,
  Tooltip,
  TruncatedText,
} from './ProductSinglePage.styles.js';

const ProductSinglePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const subproject = useSelector(selectSalesSubproject);
  const isLoading = useSelector(selectSalesSubprojectLoading);

  const onClose = () => {
    navigate(-1);
  };

  const handleNavigate = (subprojectId) => {
    navigate(`/lead-single-page/${subprojectId}?projectId=${projectId}`);
  };

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  const renderTruncatedText = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    }

    return (
      <TruncatedText>
        {truncateText(text, maxLength)}
        <Tooltip className="tooltip">{text}</Tooltip>
      </TruncatedText>
    );
  };

  useEffect(() => {
    if (projectId) {
      dispatch(getSalesSubproject(projectId));
    }
  }, [dispatch, projectId]);

  if (isLoading) {
    return (
      <Container>
        <BackBox>
          <Button className="h-38 w-38" onClick={onClose}>
            {'<'} Back to projects
          </Button>
        </BackBox>
        <Header>
          <HeaderText>Loading...</HeaderText>
        </Header>
        <LoadContainer>
          <LoadingIcon src={loadIcon} alt="Loading..." />
        </LoadContainer>
      </Container>
    );
  }

  return (
    <Container>
      <BackBox>
        <Button className="h-38 w-38" onClick={onClose}>
          {'<'} Back to projects
        </Button>
      </BackBox>
      <Header>
        <HeaderText>{subproject?.projectName || 'Subproject name'}</HeaderText>
      </Header>

      {/* Subprojects */}
      {subproject?.subprojects?.length > 0 ? (
        <ProjectsContainer>
          {subproject.subprojects.map((sp, index) => {
            const {
              subprojectId,
              subprojectName,
              subprojectType,
              subprojectDescription,
              members,
            } = sp;

            return (
              <ProjectBox key={subprojectId || index}>
                <ProjectFlex>
                  <ProjectName>{subprojectName || `Subproject ${index + 1}`}</ProjectName>
                  <ProjectType>{renderTruncatedText(subprojectType || '—', 15)}</ProjectType>
                </ProjectFlex>

                <ProjectFlex>
                  <ProjectInfoName>Description</ProjectInfoName>
                  <ProjectInfo>
                    {renderTruncatedText(subprojectDescription || '—', 15)}
                  </ProjectInfo>
                </ProjectFlex>
                <ProjectFlex>
                  <ProjectInfoName>Members</ProjectInfoName>
                  {members?.length > 0 ? (
                    <div>
                      <AvatarGroup data={uniqueByUuid(members) || []} maxVisible={4} />
                    </div>
                  ) : (
                    <Span>—</Span>
                  )}
                </ProjectFlex>

                <ProjectFlex>
                  <ProjectInfoName>Lead</ProjectInfoName>
                  <SubProjectCount onClick={() => handleNavigate(subprojectId)}>
                    Go to Leads
                  </SubProjectCount>
                </ProjectFlex>
              </ProjectBox>
            );
          })}
        </ProjectsContainer>
      ) : (
        <EmptyView
          icon={subprojectIcon}
          title="No Subprojects Found"
          description="This project doesn't have any subprojects available at the moment."
        />
      )}
    </Container>
  );
};

export default ProductSinglePage;
