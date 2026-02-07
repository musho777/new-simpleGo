import { useEffect } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  BackButton,
  ButtonGroup,
  Container,
  PercentageCircle,
  PercentageText,
  QuizTitle,
  ResultsCard,
  StatCard,
  StatLabel,
  StatValue,
  StatsGrid,
  StatusIcon,
  Subtitle,
  TimedOutBanner,
  Title,
} from './QuizComplete.styles';

const QuizComplete = () => {
  const navigate = useNavigate();
  const { categoryUuid, subcategoryUuid } = useParams();
  const location = useLocation();
  const { submissionResult, quiz, timedOut } = location.state || {};

  const attempt = submissionResult?.attempt;

  useEffect(() => {
    // If no submission result, redirect back
    if (!submissionResult || !attempt) {
      console.error('No submission result found, redirecting...');
      navigate(`/quiz/category/${categoryUuid}/subcategory/${subcategoryUuid}`);
    }
  }, [submissionResult, attempt, navigate, categoryUuid, subcategoryUuid]);

  const handleBackToQuizzes = () => {
    navigate(`/quiz/category/${categoryUuid}/subcategory/${subcategoryUuid}`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!attempt) {
    return null;
  }

  const isPassed = attempt.isPassed;
  const percentage = Math.round(attempt.percentage);

  return (
    <Container>
      <ResultsCard>
        {timedOut && <TimedOutBanner>Quiz auto-submitted - Time limit reached</TimedOutBanner>}
        <StatusIcon>{isPassed ? '🎉' : '📝'}</StatusIcon>
        <Title $passed={isPassed}>{isPassed ? 'Congratulations!' : 'Quiz Completed'}</Title>
        <Subtitle>
          {isPassed ? 'You passed the quiz!' : 'Keep practicing, you can do better!'}
        </Subtitle>

        {quiz?.title && <QuizTitle>{quiz.title}</QuizTitle>}

        <PercentageCircle $passed={isPassed} $percentage={percentage}>
          <PercentageText $passed={isPassed}>{percentage}%</PercentageText>
        </PercentageCircle>

        <StatsGrid>
          <StatCard>
            <StatLabel>Score</StatLabel>
            <StatValue $color={isPassed ? '#15C7A7' : '#E63946'}>
              {attempt.score} / {attempt.totalPoints}
            </StatValue>
          </StatCard>

          <StatCard>
            <StatLabel>Status</StatLabel>
            <StatValue $color={isPassed ? '#15C7A7' : '#E63946'}>
              {isPassed ? 'PASSED' : 'FAILED'}
            </StatValue>
          </StatCard>

          <StatCard>
            <StatLabel>Time Taken</StatLabel>
            <StatValue>{formatTime(attempt.timeTakenSeconds)}</StatValue>
          </StatCard>

          <StatCard>
            <StatLabel>Completed At</StatLabel>
            <StatValue style={{ fontSize: '16px' }}>
              {formatDate(attempt.completedAt)}
            </StatValue>
          </StatCard>
        </StatsGrid>

        <ButtonGroup>
          <BackButton onClick={handleBackToQuizzes}> {'< Back to Quizzes'}</BackButton>
        </ButtonGroup>
      </ResultsCard>
    </Container>
  );
};

export default QuizComplete;
