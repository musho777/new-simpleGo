import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 31px 13px 24px;
`;

export const Icon = styled.img`
  cursor: pointer;
`;

export const UserIcon = styled.img`
  cursor: pointer;
  position: relative;
  border-radius: 9999px;
  width: 45px;
  height: 45px;
`;

export const MenuIcon = styled.img`
  cursor: pointer;

  @media (min-width: 1301px) {
    display: none;
  }
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 19px;
`;

export const Div = styled.div``;

export const Dropdown = styled.ul`
  width: 152px;
  border-radius: 10px;
  padding: 5px;
  background: #fff;
  box-shadow: 0px 4px 35px 9px rgba(0, 0, 0, 0.12);
  position: absolute;
  top: 67px;
  right: 19px;
  list-style-type: none;

  color: #1d3557;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
`;

export const DropdownItem = styled.li`
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  .menu-icon {
    width: 16px;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const NotificationContent = styled.div`
  width: 400px;
  max-height: 577px;
  border: 0.8px solid #d4d8dd;
  min-height: 200px;
  background: #fff;
  border-radius: 10px;
  padding: 14px 10px;

  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-95px, 61px);

  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 500px) {
    margin-right: -80px;
    width: 325px;
  }
  @media (max-width: 350px) {
    width: calc(100% - 20px);
    right: 10px;
    left: 10px;
    padding: 14px;
    top: 70px;
    transform: none;
  }
`;

export const NotificationTitle = styled.h1`
  color: #212529;
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
`;

export const NotificationHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const MenuDropdown = styled.div`
  position: absolute;
  top: 35px;
  right: 0;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 5px;
  transform: translate(-110px, 70px);
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

export const NotificationButtonWrapper = styled.div`
  position: relative;

  button {
    width: 36px;
    height: 36px;
    border-radius: 5px;
  }
`;

export const NotificationCountWrapper = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  background: #e63946;
  border-radius: 999999px;
  top: 0;
  right: 0;
  transform: translate(40%, -40%);
  color: white;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
