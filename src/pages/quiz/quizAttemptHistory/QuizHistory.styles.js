import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
  background-color: transparent;
  min-height: 100vh;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #667eea;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 16px;
  margin-bottom: 24px;
  transition: color 0.2s ease;

  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const FilterSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const FilterInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #999;
  }
`;

export const HistoryTable = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

export const TableHead = styled.thead`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;

export const TableHeader = styled.th`
  padding: 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TableData = styled.td`
  padding: 16px;
  font-size: 15px;
  color: #333;
  vertical-align: middle;
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background: ${(props) => {
    if (props.$status === 'completed') return '#d4edda';
    if (props.$status === 'passed') return '#15C7A7';
    if (props.$status === 'failed') return '#E63946';
    return '#ffc107';
  }};
  color: ${(props) => {
    if (props.$status === 'passed') return '#ffffff';
    if (props.$status === 'failed') return '#ffffff';
    return '#333';
  }};
`;

export const ScoreBadge = styled.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  background: ${(props) => {
    const score = parseFloat(props.$score);
    if (score >= 80) return '#d4edda';
    if (score >= 60) return '#fff3cd';
    return '#f8d7da';
  }};
  color: ${(props) => {
    const score = parseFloat(props.$score);
    if (score >= 80) return '#155724';
    if (score >= 60) return '#856404';
    return '#721c24';
  }};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 18px;
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #667eea;
  font-size: 18px;
  font-weight: 500;
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  margin-right: 12px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const UserName = styled.span`
  font-weight: 500;
  color: #333;
`;
