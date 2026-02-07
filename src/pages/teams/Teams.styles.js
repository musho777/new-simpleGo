import { Tooltip, tooltipClasses } from '@mui/material';
import styled from 'styled-components';
import theme from 'styles/theme';

export const BtnWrapper = styled.div`
  max-width: 200px;

  .h-38 {
    height: 38px;
    font-size: 14px;
    font-weight: 600;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 22px;
`;

export const Form = styled.form``;

export const ViewContainer = styled.div`
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

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${theme.colors.white};
  border-radius: 8px 8px 0 0;

  @media (max-width: 767px) {
    display: none;
  }
`;
export const FilterActions = styled.div`
  display: flex;
  width: 100%;
  padding: 22px 30px;
  justify-content: space-between;
  align-items: center;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  .action-button {
    max-height: 38px;
    max-width: 180px;
    color: ${theme.colors.primaryText};
    font-size: 12px;
    font-style: normal;
    line-height: normal;
  }
`;

export const Filters = styled.div`
  border-top: 1px solid #dfdfdf80;
  padding: 10px 10px 0 30px;
  display: ${({ $showFilters }) => ($showFilters ? 'flex' : 'none')};
  width: 100%;
  gap: 12px;
  justify-content: space-between;
  input {
    max-width: 200px;
    border-radius: 10px;
  }
  label {
    color: #6c757d;
    font-weight: 700;
  }
  .select-st {
    min-width: 200px;
  }
`;

export const FormRow = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;

  .max-count-title {
    display: none;
  }
  .btn {
    height: 29px;
    width: 29px;
    padding: 0;
  }

  .select-st {
    max-width: 200px;
  }
  @media (max-width: 1050px) {
    .m-w-123 {
      max-width: 123px;
    }
    .m-w-187 {
      max-width: 137px !important;
    }

    div {
      max-width: 137px !important;
    }
  }
`;

export const Icon = styled.img`
  cursor: pointer;
`;

export const ClearAllText = styled.span`
  cursor: pointer;
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  width: 57px;
  &:hover {
    text-decoration: underline;
  }
`;

export const RightSideContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: end;
  flex-direction: column;
`;

export const Name = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;

  .disable {
    cursor: default;
    text-decoration-line: none;
    &:hover {
      color: #6c757d;
      line-height: normal;
    }
  }
`;

export const SubName = styled.span`
  color: #6c757d;
  font-size: 14px;
  font-weight: 600;
  text-decoration-line: underline;
  cursor: pointer;

  &:hover {
    color: #212529;
    line-height: normal;
  }
`;

export const Separator = styled.span`
  color: #6c757d;
  font-size: 14px;
  font-weight: 600;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;

  .h-38 {
    height: 38px !important;
  }
`;
export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    color: '#6C757D',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontSize: 12,
  },
}));
