import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

// import ApiClient from 'api/axiosClient';
import {
  BackButton,
  Container,
  EmptyState,
  FilterInput,
  FilterSection,
  Header,
  HistoryTable,
  LoadingState,
  ScoreBadge,
  StatusBadge,
  Table,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  Title,
  UserAvatar,
  UserInfo,
  UserName,
} from './QuizHistory.styles';

const UsersQuizHistory = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsersHistory();
  }, []);

  useEffect(() => {
    // Filter data based on search query
    if (searchQuery.trim() === '') {
      setFilteredData(historyData);
    } else {
      const filtered = historyData.filter(
        (item) =>
          item.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.quizTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.categoryName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, historyData]);

  const fetchUsersHistory = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual endpoint when available
      // const response = await ApiClient.get('/quiz-history/all');
      // setHistoryData(response.history || []);

      // Mock data for demonstration
      const mockData = [
        {
          uuid: '1',
          userName: 'John Doe',
          userEmail: 'john@example.com',
          quizTitle: 'JavaScript Basics',
          categoryName: 'Programming',
          score: 85,
          passingScore: 70,
          status: 'passed',
          completedAt: '2024-01-15T10:30:00Z',
          timeTaken: 1200, // seconds
        },
        {
          uuid: '2',
          userName: 'Jane Smith',
          userEmail: 'jane@example.com',
          quizTitle: 'React Fundamentals',
          categoryName: 'Programming',
          score: 65,
          passingScore: 70,
          status: 'failed',
          completedAt: '2024-01-14T14:20:00Z',
          timeTaken: 1800,
        },
      ];
      setHistoryData(mockData);
      setFilteredData(mockData);
    } catch (error) {
      console.error('Error fetching users history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/quiz');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Container>
      <BackButton onClick={handleBack}>← Back to Categories</BackButton>

      <Header>
        <Title>Users Quiz History</Title>
      </Header>

      <FilterSection>
        <FilterInput
          type="text"
          placeholder="Search by user name, quiz title, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </FilterSection>

      {loading ? (
        <LoadingState>Loading quiz history...</LoadingState>
      ) : filteredData.length === 0 ? (
        <EmptyState>
          {searchQuery ? 'No results found for your search.' : 'No quiz history available.'}
        </EmptyState>
      ) : (
        <HistoryTable>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>User</TableHeader>
                <TableHeader>Quiz</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Score</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Time Taken</TableHeader>
                <TableHeader>Completed At</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {filteredData.map((item) => (
                <TableRow key={item.uuid}>
                  <TableData>
                    <UserInfo>
                      <UserAvatar>{getInitials(item.userName)}</UserAvatar>
                      <div>
                        <UserName>{item.userName}</UserName>
                        <div style={{ fontSize: '13px', color: '#666' }}>{item.userEmail}</div>
                      </div>
                    </UserInfo>
                  </TableData>
                  <TableData>{item.quizTitle}</TableData>
                  <TableData>{item.categoryName}</TableData>
                  <TableData>
                    <ScoreBadge $score={item.score}>
                      {item.score}% / {item.passingScore}%
                    </ScoreBadge>
                  </TableData>
                  <TableData>
                    <StatusBadge $status={item.status}>
                      {item.status === 'passed' ? 'Passed' : 'Failed'}
                    </StatusBadge>
                  </TableData>
                  <TableData>{formatTime(item.timeTaken)}</TableData>
                  <TableData>{formatDate(item.completedAt)}</TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </HistoryTable>
      )}
    </Container>
  );
};

export default UsersQuizHistory;
