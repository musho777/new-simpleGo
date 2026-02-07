import styled from 'styled-components';
import theme from 'styles/theme';

export const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 30px 30px 0 0;
  padding: 15px 30px 35px 30px;
  box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease-out;
  z-index: 99999;
  display: flex;
  flex-direction: column;

  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }

  label {
    color: #6c757d;
    font-weight: 700;
  }
`;

export const Icon = styled.img``;

export const LineWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 0.5px solid #dfdfdf;
  margin-bottom: 16px;
`;

export const DescLabel = styled.p`
  color: #212529;
  font-size: 16px;
  font-weight: 700;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-height: 350px;
  div {
    width: 100%;
  }
`;

export const FirstWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export const ResultButton = styled.button`
  border: none;
  height: 48px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  margin-top: 10px;
  background-color: #2d6cdf;
  color: #ffffff;
`;

export const ClearAllText = styled.span`
  cursor: pointer;
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  width: 90px;
  text-decoration: underline;
  white-space: nowrap;
`;
