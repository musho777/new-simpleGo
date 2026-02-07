import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { getAttemptDetails } from 'features/quiz';

import {
  AttemptSummary,
  BackButton,
  Container,
  ErrorMessage,
  Header,
  LoadingMessage,
  NotAnsweredBadge,
  OptionIndicator,
  OptionItem,
  OptionLetter,
  OptionText,
  OptionsContainer,
  PartialBadge,
  QuestionCard,
  QuestionHeader,
  QuestionMeta,
  QuestionNumber,
  QuestionStatus,
  QuestionText,
  QuestionsSection,
  SectionTitle,
  StatusBadge,
  SummaryCard,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  TimedOutBadge,
  Title,
  UserInfo,
  UserName,
} from './AttemptDetails.styles';

const AttemptDetails = () => {
  const navigate = useNavigate();
  const { attemptUuid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAttemptDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAttemptDetails(attemptUuid);
      setData(response);
    } catch (err) {
      console.error('Error fetching attempt details:', err);
      setError('Failed to load attempt details');
    } finally {
      setLoading(false);
    }
  }, [attemptUuid]);

  useEffect(() => {
    if (attemptUuid) {
      loadAttemptDetails();
    }
  }, [attemptUuid, loadAttemptDetails]);

  const handleBack = () => {
    navigate(-1);
  };

  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getQuestionStatus = (question) => {
    if (!question.userAnswer) {
      return { status: 'not_answered', label: 'Not Answered', color: '#6c757d' };
    }
    if (question.userAnswer.isTimedOut) {
      return { status: 'timed_out', label: 'Timed Out', color: '#fd7e14' };
    }

    const earnedPoints = parseFloat(question.userAnswer.earnedPoints || 0);
    const totalPoints = parseFloat(question.points || 1);

    if (earnedPoints === totalPoints) {
      return { status: 'correct', label: 'Correct', color: '#15C7A7' };
    }
    if (earnedPoints > 0) {
      return { status: 'partial', label: 'Partial', color: '#fd7e14' };
    }
    return { status: 'incorrect', label: 'Incorrect', color: '#E63946' };
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Loading attempt details...</LoadingMessage>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <BackButton onClick={handleBack}>Back</BackButton>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  if (!data || !data.attempt) {
    return (
      <Container>
        <BackButton onClick={handleBack}>Back</BackButton>
        <ErrorMessage>No attempt data found</ErrorMessage>
      </Container>
    );
  }

  const { attempt, questions } = data;
  const sortedQuestions = [...(questions || [])].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <Container>
      <BackButton onClick={handleBack}>{'< Back'}</BackButton>

      <Header>
        <Title>Attempt Details</Title>
        <p>{attempt.quizTitle}</p>
      </Header>

      <SummaryCard $passed={attempt.isPassed}>
        <UserInfo>
          <UserName>
            {attempt.user?.name} {attempt.user?.surname}
          </UserName>
          <div>{attempt.user?.email}</div>
        </UserInfo>

        <AttemptSummary>
          <SummaryItem>
            <SummaryLabel>Score</SummaryLabel>
            <SummaryValue $color={attempt.isPassed ? '#15C7A7' : '#E63946'}>
              {parseFloat(attempt.score).toFixed(1)}/
              {parseFloat(attempt.totalPoints).toFixed(1)}
            </SummaryValue>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Percentage</SummaryLabel>
            <SummaryValue $color={attempt.isPassed ? '#15C7A7' : '#E63946'}>
              {Math.round(parseFloat(attempt.percentage))}%
            </SummaryValue>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Questions</SummaryLabel>
            <SummaryValue>
              {attempt.correctCount}/{attempt.totalQuestions}
            </SummaryValue>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Status</SummaryLabel>
            <StatusBadge $passed={attempt.isPassed}>
              {attempt.isPassed ? 'Passed' : 'Failed'}
            </StatusBadge>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Time Taken</SummaryLabel>
            <SummaryValue>{formatTime(attempt.timeTakenSeconds)}</SummaryValue>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>Completed At</SummaryLabel>
            <SummaryValue style={{ fontSize: '14px' }}>
              {formatDate(attempt.completedAt)}
            </SummaryValue>
          </SummaryItem>
        </AttemptSummary>
      </SummaryCard>

      <QuestionsSection>
        <SectionTitle>Questions ({sortedQuestions.length})</SectionTitle>

        {sortedQuestions.map((question, index) => {
          const questionStatus = getQuestionStatus(question);
          const sortedOptions = [...(question.options || [])].sort(
            (a, b) => (a.orderIndex || 0) - (b.orderIndex || 0)
          );
          const earnedPoints = question.userAnswer
            ? parseFloat(question.userAnswer.earnedPoints || 0)
            : 0;

          return (
            <QuestionCard key={question.uuid} $status={questionStatus.status}>
              <QuestionHeader>
                <QuestionNumber>Question {index + 1}</QuestionNumber>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {!question.userAnswer && <NotAnsweredBadge>Not Answered</NotAnsweredBadge>}
                  {questionStatus.status === 'partial' && (
                    <PartialBadge>Partial ({earnedPoints.toFixed(1)} pts)</PartialBadge>
                  )}
                  <QuestionStatus $status={questionStatus.status}>
                    {questionStatus.label}
                  </QuestionStatus>
                </div>
              </QuestionHeader>

              <QuestionText>{question.questionText}</QuestionText>

              <OptionsContainer>
                {sortedOptions.map((option, optIndex) => {
                  const isUserSelection = option.isSelected;
                  const isCorrectAnswer = option.isCorrect;

                  return (
                    <OptionItem
                      key={option.uuid}
                      $isUserSelection={isUserSelection}
                      $isCorrectAnswer={isCorrectAnswer}
                    >
                      <OptionLetter
                        $isUserSelection={isUserSelection}
                        $isCorrectAnswer={isCorrectAnswer}
                      >
                        {String.fromCharCode(65 + optIndex)}
                      </OptionLetter>
                      <OptionText>{option.optionText}</OptionText>
                      {isCorrectAnswer && !isUserSelection && (
                        <OptionIndicator $type="correct">Correct Answer</OptionIndicator>
                      )}
                      {isUserSelection && isCorrectAnswer && (
                        <OptionIndicator $type="correct">
                          Your Answer (Correct)
                        </OptionIndicator>
                      )}
                      {isUserSelection && !isCorrectAnswer && (
                        <OptionIndicator $type="wrong">Your Answer (Wrong)</OptionIndicator>
                      )}
                    </OptionItem>
                  );
                })}
              </OptionsContainer>

              <QuestionMeta>
                <span>
                  Points: {earnedPoints.toFixed(1)}/{question.points}
                </span>
                {question.timeLimitSeconds && (
                  <span>Time Limit: {question.timeLimitSeconds}s</span>
                )}
                {question.userAnswer?.answeredAt && (
                  <span>Answered: {formatDate(question.userAnswer.answeredAt)}</span>
                )}
              </QuestionMeta>
            </QuestionCard>
          );
        })}
      </QuestionsSection>
    </Container>
  );
};

export default AttemptDetails;
