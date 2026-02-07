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

export const Icon = styled.img``;

export const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.white};
  padding: 22px 30px;

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
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 767px) {
    padding: 22px 30px;
    width: 100%;
  }

  background-color: ${theme.colors.white};
  border-radius: 8px 8px 0 0;

  div {
    min-height: 38px !important;
    max-height: 38px !important;
  }
`;
export const TypeLimitSpan = styled.div`
  max-width: 200px;
  width: 100%;
  word-break: break-word;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const MobileStatus = styled.div`
  display: flex;
  justify-content: flex-end;
`;
