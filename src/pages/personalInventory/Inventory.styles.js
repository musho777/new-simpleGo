import { Tooltip, tooltipClasses } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const TabWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InventoryButtonsBox = styled.div`
  gap: 10px;
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  width: 340px;
  height: 60px;
  border-radius: 10px;
`;

export const MainInventoryItemsBox = styled.div`
  display: ${({ $viewType }) => ($viewType === 'grid' ? 'grid' : 'block')};
  grid-template-columns: ${({ $viewType }) =>
    $viewType === 'grid' ? 'repeat(4, 1fr)' : 'none'};
  gap: ${({ $viewType }) => ($viewType === 'grid' ? '20px' : '0')};
  width: 100%;
  box-sizing: border-box;

  > * {
    min-width: 0;
    max-width: 100%;
  }

  @media (max-width: 1200px) {
    grid-template-columns: ${({ $viewType }) =>
      $viewType === 'grid' ? 'repeat(3, 1fr)' : 'none'};
  }

  @media (max-width: 900px) {
    grid-template-columns: ${({ $viewType }) =>
      $viewType === 'grid' ? 'repeat(2, 1fr)' : 'none'};
  }

  @media (max-width: 600px) {
    grid-template-columns: ${({ $viewType }) => ($viewType === 'grid' ? '1fr' : 'none')};
  }
`;

export const ProfileInventoryItemBox = styled.div`
  width: 100%;
  min-width: 0;
  max-width: 100%;
  min-height: 208px;
  border-radius: 10px;
  background-color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const CustomProgram = styled.h3`
  font-weight: 500;
  font-size: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(223, 223, 223, 1);
`;

export const Image = styled.img`
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
  aspect-ratio: 16 / 9;
`;

export const ImagesWrapper = styled.div`
  display: flex;
  justify-content: center;
  & > img {
    border-radius: 6px;
    object-fit: cover;
    aspect-ratio: 16 / 9;
  }

  & > img {
    width: 119px;
    height: 88px;
  }

  .profile-inventory-image {
    width: 119px !important;
    height: 88px !important;
    border-radius: 6px !important;
    object-fit: cover !important;
  }

  > div:first-child {
    height: 88px !important;
  }
`;
export const ImageMainBox = styled.div`
  height: auto;
  position: relative;
`;

export const AddRemoveNoteButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  button {
    font-size: 14px;
    font-weight: 600;
  }

  .added-button {
    color: #15c7a7;
  }

  .add-button {
    color: #2d6cdf;
  }
`;

export const DeleteButtonOfModal = styled.img`
  width: 26px;
  height: 26px;
  margin-left: 8;
  cursor: pointer;
`;

export const DetailsTableWrapper = styled.div`
  .hide-f-t {
    display: none;
  }
`;

export const ViewDetailsButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;

  button {
    font-size: 14px;
    font-weight: 600;
    height: 19px;
    width: 80px;
  }
`;

export const StatusBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 90px;
  height: 30px;
  border-radius: 20px;
  position: absolute;
  top: -6px;
  right: 5px;
`;

export const OptimizeBox = styled.div`
  text-align: center;
`;

export const PersonalBox = styled.div`
  display: flex;
  gap: 32px;
`;
export const ServiceBox = styled.div`
  display: flex;
  gap: 32px;
`;

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    color: '#000000',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontSize: 12,
  },
}));

export const DateWrapper = styled.p`
  color: #6c757d;
  font-size: 14px;
  font-weight: 400;
`;

export const ButtonTitle = styled.p`
  color: #6c757d;
  font-size: 14px;
  font-weight: 600;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
`;

export const UsageSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  @media (max-width: 769px) {
    justify-content: center;
  }
`;

export const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

export const ExpirationText = styled.p`
  color: ${({ $expired }) => ($expired ? '#E63946' : 'inherit')};
`;
export const EllipsisCell = styled.div`
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 769px) {
    max-width: 60px;
  }
`;
