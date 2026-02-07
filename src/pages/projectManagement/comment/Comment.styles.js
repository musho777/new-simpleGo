import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  border: 0.4px solid rgba(212, 216, 221, 0.5);
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;

  label {
    color: #6c757d;
    font-size: 13px;
    font-weight: 600;
  }
`;

export const CommentWrapper = styled.div`
  border-radius: 10px;
  border: 1px solid #d4d8dd;
  background: #fff;
  padding: 10px 20px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RowSpace = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TimeText = styled.p`
  color: #6c757d;
  font-size: 12px;
  font-weight: 600;
  line-height: 100%;
`;

export const CommentCountTitle = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 600;
`;

export const CommentColumn = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 8px;
  padding: 5px;
  word-break: break-word;
`;
