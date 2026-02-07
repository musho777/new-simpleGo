import styled from 'styled-components';
import theme from 'styles/theme';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;

  @media (max-width: 1555px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 990px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 670px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const WrapperContainer = styled.div`
  min-width: 300px;
  max-width: 500px;
  max-height: 330px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  box-sizing: border-box;
  opacity: ${({ $inActive }) => ($inActive ? 0.5 : 1)};
  .trigger-icon {
    -webkit-transform: rotate(90deg);
  }
`;

export const CardContainer = styled.div`
  padding-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  word-wrap: break-word;
  width: 100%;
  max-width: 100%;
`;

export const StatusBadge = styled.div`
  position: absolute;
  font-weight: 700;
  top: 10px;
  right: 10px;
  background-color: ${({ $status }) =>
    $status === 'Active'
      ? `${theme.colors.activeBackground}`
      : $status === 'Pending'
        ? `${theme.colors.inPendingBackgroundColor}`
        : `${theme.colors.inDisableBackgroundColor}`};
  color: ${({ $status }) =>
    $status === 'Active'
      ? `${theme.colors.activeTextColor}`
      : $status === 'Pending'
        ? `${theme.colors.inPendingTextColor}`
        : `${theme.colors.inDisableTextColor}`};
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
`;

export const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${theme.colors.avatarBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 11px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  padding-bottom: 23px;
`;

export const Name = styled.h3`
  font-size: 16px;
  margin: 5px 0;
  width: 100%;
  text-align: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const Email = styled.p`
  font-size: 12px;
  color: ${theme.colors.secondaryText};
  margin-bottom: 8px;
  width: 100%;
  text-align: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
  padding: 0 10px;
`;

export const PhoneNumber = styled.p`
  font-size: 12px;
  color: ${theme.colors.secondaryText};
  margin-bottom: 11px;
  width: 100%;
  text-align: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const TeamLeadTag = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: ${theme.colors.teamLeadTextColor};
  width: 100%;
  text-align: center;
  border-top: 0.3px solid ${theme.colors.borderColor};
  padding: 15px;
  min-height: 50px;
`;

export const Ellipsis = styled.div`
  position: absolute;
  left: 5px;
  cursor: pointer;
  background-color: ${({ isOpen }) => (isOpen ? `${theme.colors.white}` : 'transparent')};
  box-shadow: ${({ isOpen }) => (isOpen ? '0px 0px 35px rgba(0, 0, 0, 0.12)' : 'none')};
  display: flex;
  transition: background-color 0.2s ease;
  justify-content: center;
  align-items: center;
  width: 23px;
  height: 30px;
  border-radius: 4px 4px 0px 0px;
  top: 8px;
  z-index: 2;
`;

export const Menu = styled.div`
  position: absolute;
  top: 38px;
  left: 5px;
  width: 117px;
  height: 98px;
  display: flex;
  background-color: ${theme.colors.white};
  box-shadow: 0px 0px 35px rgba(0, 0, 0, 0.12);
  border-radius: 0px 9px 9px 9px;
  z-index: 1;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};

  ul {
    list-style: none;
    padding: 18px 10px 13px 14px;
    li {
      display: flex;
      align-items: center;
      padding: 8px 0;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: ${theme.colors.white};
      }

      img {
        margin-right: 10px;
        width: 13px;
        height: 13px;
      }

      span {
        font-size: 12px;
        color: ${theme.colors.emptyTitleColor};
        font-weight: 700;
      }
    }
  }
`;

export const ActionWrapper = styled.div`
  width: 100%;
  justify-content: start;
  display: flex;
  padding: 5px;
  padding-top: 10px;
  height: 40px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;
