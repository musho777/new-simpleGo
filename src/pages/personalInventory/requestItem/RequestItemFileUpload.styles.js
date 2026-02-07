import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  color: #212529;
  font-family: Nunito;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const Description = styled.p`
  color: #6c757d;
  text-align: center;
  font-family: Nunito;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  white-space: pre-line;
`;

export const InfoText = styled.div`
  font-size: 14px;
  color: #374151;
  background-color: #f3f4f6;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
`;

export const TemplateLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const FileUploadWrapper = styled.div`
  min-height: 200px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-top: 20px;
  > div {
    width: 50%;
  }
`;

export const ValidationResult = styled.div`
  margin: 20px 0;
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 8px;
  border-left: 4px solid #2d6cdf;
`;

export const ValidationTitle = styled.h4`
  margin: 0 0 10px 0;
  color: #2d6cdf;
  font-size: 16px;
  font-weight: 600;
`;

export const ValidationText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

export const ErrorText = styled.span`
  color: #e74c3c;
  font-weight: 500;
`;

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 40px 0;
`;

export const LoadingTitle = styled.h3`
  color: #2d6cdf;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
`;

export const LoadingText = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`;

const loading = keyframes`
  0% {
    transform: scale(0.75);
  }
  100% {
    transform: scale(1.75);
  }
`;

export const LoadingDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
`;

export const LoadingDot = styled.div`
  border-radius: 50%;
  height: 10px;
  width: 10px;
  background-color: #2d6cdf;
  animation: ${loading} 1s ease-in-out alternate infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export const UploadFile = styled.div`
  width: 43px;
  height: 43px;
  border-radius: 25px;
  background-color: #d5e2f9;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2d6cdf;
  font-family: Nunito;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c1d4f1;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const UploadFileWrapper = styled.div`
  width: 50%;
  > button {
    background-color: #15c7a7;
    border: none;
    color: #fff;
    &:hover {
      background-color: #13b396;
    }
  }
`;
