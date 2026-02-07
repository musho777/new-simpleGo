import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  border: 1px solid rgba(224, 230, 243, 0.5);
  background: #fff;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
  padding: 12px;

  @media screen and (min-width: 768px) {
    min-height: 217px;
  }
`;

export const Gradient = styled.div`
  width: 100%;
  height: 86px;

  border-radius: 8px;
  background: linear-gradient(
    82deg,
    #1d3557 8.8%,
    rgba(80, 111, 163, 0.82) 46.78%,
    rgba(169, 184, 210, 0.91) 82.41%,
    #fff 109.08%
  );

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const AvatarWrapper = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  padding: 3px 3px 4px 3px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 999px;
  margin-left: 28px;
  padding: 4px;
  cursor: ${({ $changeCursor }) => ($changeCursor ? 'pointer' : 'default')};
  @media screen and (min-width: 768px) {
    margin-top: -50px;
  }
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Avatar = styled.img`
  width: 92px;
  border-radius: 999px;
  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const FullName = styled.h2`
  display: flex;
  color: #212529;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;

export const NickName = styled.p`
  display: flex;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  word-break: break-all;
  color: #607197;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0.21px;
`;

export const Info = styled.div`
  display: flex;
  gap: 10px;

  button {
    color: #212529;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;

    display: flex;
    width: 72px;
    height: 32px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }
`;

export const InfoContainer = styled.div`
  padding-top: 9px;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  gap: 7px;
`;

export const Status = styled.img`
  width: 20px;
  margin-left: 5px;
`;

export const OnlineOffline = styled.img`
  height: 26px;
`;

export const FullRow = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: end;
  padding-right: 12px;

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const FullRowEdit = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 12px;

  @media screen and (min-width: 768px) {
    button {
      display: none;
    }
    .editViewMobile {
      display: none;
    }
  }
`;

export const LoadingIcon = styled.img`
  animation: rotate 1s linear infinite;
  width: 100px;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Icon = styled.img`
  object-fit: contain;
  width: 20px;
`;
export const CameraWrapper = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 90px;
  height: 90px;
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const EditView = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const DisabledWrapper = styled.div`
  position: relative;
  &:hover .tag-tooltip {
    display: block;
  }
`;

export const TagWrapper = styled.div`
  position: absolute;
  top: -30px;
  display: none;
  z-index: 99999;
`;

export const LoadAdditionalContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const LoadingAdditionalIcon = styled.img`
  animation: rotate 1s linear infinite;
  width: 50px;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
