import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const Header = styled.div`
  border: 1px solid rgba(223, 223, 223, 1);
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .h-38 {
    height: 38px;
    font-size: 14px;
    font-weight: 600;
  }

  .w-38 {
    width: 150px;
  }
`;
export const BackBox = styled.div`
  width: 150px;
  height: 38px;

  button {
    font-size: 14px;
    font-weight: 600;
  }
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
  min-height: 160px;
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
  border: 1px solid rgba(223, 223, 223, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    border-color: rgba(45, 108, 223, 0.2);
  }
`;

export const ProjectFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: rgba(45, 108, 223, 1);
  text-decoration: underline;
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
  width: 110px;
  border-radius: 20px;
  margin-top: -10px;
  margin-right: -10px;
`;

export const MembersBox = styled.div`
  max-height: 28px;

  div {
    width: 27px;
    height: 27px;
  }
`;

export const BackTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1d3557;
  line-height: 9px;
`;

export const BackAction = styled.div`
  display: flex;
  align-items: center;
  width: 117px;
  height: 40px;
  border-radius: 10px;
  border: 0.4px solid #d4d8dd;
  background: #fff;
  cursor: pointer;
  margin-bottom: 20px;
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

export const Span = styled.div``;

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
