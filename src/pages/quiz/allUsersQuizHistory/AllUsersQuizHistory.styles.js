import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 40px;
  background-color: transparent;
  min-height: 100vh;
`;

export const BackButton = styled.button`
  border-radius: 10px;
  border: 0.4px solid #d4d8dd;
  background: #fff;
  padding: 0 12px;
  height: 40px;
  color: #1d3557;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const Header = styled.div`
  margin-bottom: 32px;

  p {
    color: #666;
    font-size: 16px;
    margin-top: 8px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 80px 40px;
  font-size: 18px;
  color: #666;
`;

export const AttemptGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

export const AttemptCard = styled.div`
  background: #ffffff;
  border: 2px solid
    ${(props) => {
      if (props.$inProgress) return '#FAA11C';
      return props.$passed ? '#15C7A7' : '#E63946';
    }};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

export const UserInfo = styled.div`
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;

  div {
    font-size: 13px;
    color: #666;
    margin-top: 4px;
  }
`;

export const UserName = styled.div`
  font-size: 16px !important;
  font-weight: 600;
  color: #333 !important;
  margin-bottom: 4px !important;
`;

export const AttemptStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
  background: ${(props) => {
    if (props.$inProgress) return '#FAA11C';
    return props.$passed ? '#15C7A7' : '#E63946';
  }};
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const AttemptScore = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => (props.$passed ? '#15C7A7' : '#E63946')};
`;

export const AttemptInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: #333;

  div {
    display: flex;
    justify-content: space-between;
  }

  strong {
    color: #666;
    font-weight: 600;
  }
`;

export const AttemptDate = styled.div`
  font-size: 13px;
  color: #888;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

export const LoadMoreButton = styled.button`
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
