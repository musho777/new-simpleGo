import styled from 'styled-components';
import theme from 'styles/theme';

export const Container = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  @media screen and (max-width: 500px) {
    padding: 10px 10px;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 12px;
    align-items: start;
  }
`;

export const ExpandableRowWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const Icon = styled.img``;

export const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.white};
  padding: 22px 20px;

  .h-38 {
    height: 38px !important;
  }

  label {
    display: none;
  }

  input {
    padding-left: 26px;
  }

  @media (max-width: 767px) {
    flex-direction: column-reverse;
    background-color: transparent;
    padding: 0;
    align-items: end;
    gap: 12px;

    .m-w-173 {
      max-width: 173px;
    }
  }

  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 767px) {
    padding: 22px 30px;
    width: 100%;
  }

  @media screen and (max-width: 500px) {
    padding: 22px 10px;
  }

  background-color: ${theme.colors.white};
  border-radius: 8px 8px 0 0;

  div {
    min-height: 38px !important;
    max-height: 38px !important;
  }

  .max-count-title {
    display: none;
  }
`;

export const NavWrapper = styled.div`
  width: 305px;
`;

export const NavWrapperGeneral = styled.div`
  max-width: 230px;
`;

export const ProjectLimitSpan = styled.p`
  width: 100%;
  max-width: 17vw;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const MobileStatus = styled.div`
  display: flex;
  justify-content: flex-end;
`;
