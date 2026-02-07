import styled from 'styled-components';

export const Icon = styled.img``;

export const MenuDropdown = styled.div`
  position: absolute;
  top: 35px;
  right: 0;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 5px;
  width: 140px;
`;

export const MenuItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;

  &:hover {
    background: #1d3557;
    color: white;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NotificationCard = styled.div`
  background: ${({ $unread }) => ($unread ? '#ECF1FB' : 'transparent')};
  border-radius: 10px;
  padding: 13px 16px;
  display: flex;
  justify-content: space-between;
  word-break: break-word;
  cursor: pointer;
`;

export const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const NotificationIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 8px;
`;

export const NewIcon = styled.img`
  width: 4px;
  height: 4px;
`;

export const Title = styled.h4`
  color: #212529;
  font-size: 15px;
  font-weight: 700;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Description = styled.p`
  color: #6b7280;
  font-size: 12px;
  gap: 3px;

  span {
    color: #2d6cdf;
    font-weight: 600;
    text-decoration-line: underline;
    text-decoration-style: solid;
  }

  i {
    font-style: italic;
  }
`;

export const ChangeText = styled.p`
  font-size: 14px;
  color: #6b7280;
`;

export const TimeText = styled.p`
  font-size: 12px;
  color: #9ca3af;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;

  button {
    height: 32px;
    border-radius: 5px;
    padding: 12px;

    color: #fff;
    font-size: 11px;
    font-weight: 500;
  }

  .ticket {
    max-width: 82px;
  }

  .appointment {
    max-width: 118px;
  }
`;

export const StyledValue = styled.p`
  font-style: italic;
`;
