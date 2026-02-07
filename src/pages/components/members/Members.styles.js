import styled from 'styled-components';
import theme from 'styles/theme';

export const MembersWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const RemainingMembers = styled.div`
  background-color: ${theme.colors.white};
  color: ${theme.colors.memberColor};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin-left: -12px;
  font-size: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarWrapper = styled.div`
  width: ${({ size }) => size || '24px'};
  height: ${({ size }) => size || '24px'};
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  margin-left: -12px;
  border: 2px solid ${theme.colors.white};

  &:first-child {
    margin-left: 0;
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
