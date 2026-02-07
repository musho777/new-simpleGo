import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import Pagination from 'common-ui/table/Pagination';
import { getAllUsersQuizAttempts } from 'features/quiz';

import {
  AttemptCard,
  AttemptDate,
  AttemptGrid,
  AttemptInfo,
  AttemptScore,
  AttemptStatus,
  BackButton,
  Container,
  EmptyMessage,
  Header,
  StatusBadge,
  Title,
  UserInfo,
  UserName,
} from './AllUsersQuizHistory.styles';

const ITEMS_PER_PAGE = 12;

const AllUsersQuizHistory = () => {
  const navigate = useNavigate();
  const { categoryUuid, subcategoryUuid, quizUuid } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [attempts, setAttempts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Get current page from URL params, default to 1
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const fetchAttempts = useCallback(
    async (page = 1) => {
      if (!quizUuid) return;
      try {
        setLoading(true);
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const response = await getAllUsersQuizAttempts(quizUuid, ITEMS_PER_PAGE, offset);
        setAttempts(response.attempts || []);
        setTotalCount(response.count || 0);
      } catch (error) {
        console.error('Error fetching all users quiz attempts:', error);
      } finally {
        setLoading(false);
      }
    },
    [quizUuid]
  );

  useEffect(() => {
    fetchAttempts(currentPage);
  }, [fetchAttempts, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
  };

  const handleBack = () => {
    navigate(`/quiz/category/${categoryUuid}/subcategory/${subcategoryUuid}`);
  };

  const handleAttemptClick = (attemptUuid) => {
    navigate(`/quiz/attempt/${attemptUuid}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isCompleted = (attempt) => {
    return attempt.completedAt !== null && attempt.completedAt !== undefined;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <Container>
      <BackButton onClick={handleBack}> {'< Back to Quizzes'}</BackButton>

      <Header>
        <Title>All Users Quiz History</Title>
        <p>Total Attempts: {totalCount}</p>
      </Header>

      {loading && attempts.length === 0 ? (
        <p>Loading...</p>
      ) : attempts.length === 0 ? (
        <EmptyMessage>No attempts found for this quiz.</EmptyMessage>
      ) : (
        <>
          <AttemptGrid>
            {attempts.map((attempt, index) => {
              const completed = isCompleted(attempt);
              return (
                <AttemptCard
                  key={attempt.uuid || index}
                  $passed={completed ? attempt.isPassed : null}
                  $inProgress={!completed}
                  onClick={completed ? () => handleAttemptClick(attempt.uuid) : undefined}
                  style={{ cursor: completed ? 'pointer' : 'default' }}
                >
                  <UserInfo>
                    <UserName>
                      {attempt.user?.name} {attempt.user?.surname}
                    </UserName>
                    <div>{attempt.user?.email}</div>
                    <div>{attempt.user?.userType}</div>
                  </UserInfo>

                  <AttemptStatus>
                    <StatusBadge
                      $passed={completed ? attempt.isPassed : null}
                      $inProgress={!completed}
                    >
                      {!completed ? 'IN PROGRESS' : attempt.isPassed ? 'PASSED' : 'FAILED'}
                    </StatusBadge>
                    {completed && (
                      <AttemptScore $passed={attempt.isPassed}>
                        {Math.round(parseFloat(attempt.percentage || 0))}%
                      </AttemptScore>
                    )}
                  </AttemptStatus>

                  <AttemptInfo>
                    {completed ? (
                      <>
                        <div>
                          <strong>Score:</strong> {attempt.score} / {attempt.totalPoints}
                        </div>
                        <div>
                          <strong>Time Taken:</strong>{' '}
                          {formatTime(attempt.timeTakenSeconds || 0)}
                        </div>
                        <AttemptDate>
                          <strong>Completed:</strong> {formatDate(attempt.completedAt)}
                        </AttemptDate>
                      </>
                    ) : (
                      <AttemptDate>
                        <strong>Started:</strong> {formatDate(attempt.startedAt)}
                      </AttemptDate>
                    )}
                  </AttemptInfo>
                </AttemptCard>
              );
            })}
          </AttemptGrid>

          {totalCount > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              dataCount={totalCount}
              count={ITEMS_PER_PAGE}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default AllUsersQuizHistory;
