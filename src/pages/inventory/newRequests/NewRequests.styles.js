import { Tooltip, tooltipClasses } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const RequestCheckBox = styled.div`
  div {
    display: flex;
    justify-content: start;
  }
`;

export const ApproveOrReject = styled.div`
  display: flex;
  gap: 15px;
  justify-content: end;
  margin-top: 20px;
`;

export const ModalText = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  color: #6c757d;
  text-align: center;
  font-family: Nunito;
  font-style: normal;
`;

export const ModalInput = styled.div`
  margin-top: 20px;

  div {
    min-height: 30px;
  }
`;

export const RejectsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 5px;
  border: 0.4px solid #d4d8dd;
  border-radius: 10px;
  padding: 16px;
`;
export const RejectModalItem = styled.div`
  border-radius: 10px;
  margin-top: 10px;
  padding: 17px 0;
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    min-height: 0;
  }

  label {
    display: none;
  }
`;

export const ApproveModalItem = styled.div`
  border-radius: 10px;
  margin-top: 10px;
  padding: 17px 0;
  gap: 16px;
  border-radius: 15px;
  border: 0.4px solid #dfdfdf80;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    min-height: 0;
  }

  label {
    display: none;
  }
  .quantity-input {
    padding: 0 5px;
    height: 33px;
  }
`;

export const ApproveModalInfo = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: left;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50%;

  div {
    min-height: 0;
  }
`;

export const DescriptionLimitSpan = styled.div`
  max-width: 200px;
  width: 100%;
  word-break: break-word;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const MobileItemRowBox = styled.div`
  display: flex;
  align-items: center;
  margin: 15px auto;
  gap: 10px;
`;

export const SelectAndRequesterName = styled.div`
  display: flex;
  align-items: center;
  margin: 5px auto;
  gap: 7px;
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

export const ExportWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${(props) => (props.disabled ? 0.6 : 0.8)};
  }
`;

export const Icon = styled.img``;

export const ExportText = styled.p`
  color: #2d6cdf;
  font-family: Nunito;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

export const EllipsisCell = styled.div`
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
