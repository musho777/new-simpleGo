import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.div`
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

export const AllTicketCount = styled.button`
  display: flex;
  width: 266px;
  height: 44px;
  justify-content: space-between;
  border: none;
  border-left: 3px solid #2d6cdf;
  border-radius: 10px;
  align-items: center;
  background: #fff;
  padding: 13px 20px;
  cursor: pointer;

  color: #212529;
  font-size: 14px;
  font-weight: 600;

  &:focus {
    background: rgba(45, 108, 223, 0.05);
  }
`;

export const ProjectCard = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-around;
  padding: 16px 20px 0 16px;
  width: 100%;
  border-radius: 10px;
  height: 147px;
  background: #fff;
  border-left: ${({ $color }) => `3px solid ${$color ?? '#ff6a00'}`};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const TicketCount = styled.span`
  width: 100%;
  padding: 16px 0;
  border-top: 0.5px solid #dfdfdf;
`;

export const ProjectTitle = styled.h2`
  color: #212529;
  font-size: 16px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  margin: 0;
  line-height: 1.2;
`;

export const Label = styled.label`
  color: #6c757d;
  font-size: 14px;
`;

export const Value = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
`;

export const Row = styled.div`
  display: flex;
  gap: 5px;
`;
