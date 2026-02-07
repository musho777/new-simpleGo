import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectBox = styled.div`
  width: 100%;
  min-height: 140px;
  border-radius: 10px;
  cursor: pointer;
  gap: 20px;
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const ProjectFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProjectName = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0%;
  color: rgba(33, 37, 41, 1);
`;

export const ProjectInfoName = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: rgba(108, 117, 125, 1);
`;
export const ProjectInfo = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: rgba(33, 37, 41, 1);
`;

export const SubProjectCount = styled.h3`
  font-weight: 600;
  font-size: 18px;
  color: rgba(255, 106, 0, 1);
  line-height: 100%;
  letter-spacing: 0%;
  cursor: pointer;
`;

export const ProjectType = styled.div`
  font-size: 12px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: 0%;
  color: rgba(45, 108, 223, 1);
  background-color: rgba(234, 240, 252, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 27px;
  width: 90px;
  border-radius: 20px;
  margin-top: -10px;
  margin-right: -10px;
`;

export const Header = styled.div`
  padding: 20px 0 0 40px;
  border: 1px solid rgba(223, 223, 223, 1);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 20px;
  height: 90px;
`;
export const ProjectNameBox = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  color: #1d3557;
`;

export const TruncatedText = styled.span`
  position: relative;
  cursor: pointer;

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  top: -35px;
  left: 0;
  background-color: white;
  color: #333;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 1px solid #e0e0e0;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1000;
  max-width: 250px;
  word-wrap: break-word;
  white-space: normal;
`;

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
