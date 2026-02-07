import styled from 'styled-components';

export const NotesWrapper = styled.div`
  border-radius: 10px;
  border: 0.917px solid #bedbff;
  background: #eef3ff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #9ab9e6;
    background: #dfe9ff;
    transform: translateY(-1px);
  }
`;

export const Nots = styled.div`
  color: #212529;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  > span {
    font-weight: 700;
  }
`;

export const TooltipIcon = styled.img`
  cursor: pointer;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
`;

export const Tag = styled.div`
  background-color: #dcfce7;
  color: #016630;
  padding: 2px 10px;
  border-radius: 10px;
`;
