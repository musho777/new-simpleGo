import styled from 'styled-components';

export const Container = styled.div`
  width: 320px;
  min-width: 320px;

  border-radius: 8px;
  border: 0.4px solid rgba(212, 216, 221, 0.5);
  background: #fff;
  padding: 20px 30px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: start;

  @media screen and (max-width: 1200px) {
    min-width: 200px;
    padding: 20px 15px;
  }

  @media screen and (max-width: 1000px) {
    min-width: 230px;
    padding: 20px 15px;
  }
  @media screen and (max-width: 850px) {
    min-width: 170px;
    padding: 20px 10px;
  }

  @media screen and (max-width: 767px) {
    min-width: 100%;
    padding: 20px 30px;
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

export const TitleWrapper = styled.div`
  border-bottom: ${({ $hideBorder }) => ($hideBorder ? 'none ' : '0.5px solid #dfdfdf')};
  padding-bottom: ${({ $hideBorder }) => ($hideBorder ? 'none ' : '12px')};
  width: 100%;

  color: #212529;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  gap: 7px;
`;

export const Title = styled.p`
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
`;

export const Value = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 500;
  max-width: 100%;

  word-break: break-word;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Icon = styled.img``;

export const LoadContainer = styled.div`
  width: 100%;
  min-height: 500px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const PrivilegeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const EditIconWrapper = styled.div`
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CurrentPrivilegeInfo = styled.div`
  margin: 40px 0 20px 0;
  padding: 10px;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const PrivilegeName = styled.strong``;

export const PrivilegeDescription = styled.small`
  word-break: break-word;
  line-height: 22px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
