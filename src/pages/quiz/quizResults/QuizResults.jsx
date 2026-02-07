import { useNavigate } from 'react-router-dom';

import {
  ActionButtons,
  BackButton,
  DetailItem,
  DetailLabel,
  DetailValue,
  ResultsBox,
  ResultsDetails,
  ResultsIcon,
  ResultsMessage,
  ResultsScore,
  ResultsTitle,
  RetakeButton,
} from './QuizResults.styles';

const QuizResults = ({ result, onRetake, canRetake, teamName, subTeamName }) => {
  const navigate = useNavigate();

  const isPassed = result.score >= result.passingScore;

  return (
    <ResultsBox>
      <ResultsIcon $passed={isPassed}>{isPassed ? '✓' : '✗'}</ResultsIcon>

      <ResultsTitle $passed={isPassed}>
        {isPassed ? 'Congratulations!' : 'Better luck next time'}
      </ResultsTitle>

      <ResultsMessage>
        {isPassed
          ? 'You have successfully passed the quiz'
          : 'You did not pass the quiz, please try again'}
      </ResultsMessage>

      <ResultsScore>
        <span className="score">{result.score}%</span>
        <span className="divider">/</span>
        <span className="passing">{result.passingScore}%</span>
      </ResultsScore>

      <ResultsDetails>
        <DetailItem>
          <DetailLabel>Team</DetailLabel>
          <DetailValue>{teamName}</DetailValue>
        </DetailItem>

        <DetailItem>
          <DetailLabel>Subteam</DetailLabel>
          <DetailValue>{subTeamName}</DetailValue>
        </DetailItem>

        <DetailItem>
          <DetailLabel>Correct Answers</DetailLabel>
          <DetailValue>
            {result.correctAnswers} / {result.totalQuestions}
          </DetailValue>
        </DetailItem>

        <DetailItem>
          <DetailLabel>Time Spent</DetailLabel>
          <DetailValue>{result.timeSpent}</DetailValue>
        </DetailItem>

        <DetailItem>
          <DetailLabel>Attempt Number</DetailLabel>
          <DetailValue>{result.attemptNumber}</DetailValue>
        </DetailItem>
      </ResultsDetails>

      <ActionButtons>
        <BackButton onClick={() => navigate('/quiz')}>Back to Home</BackButton>
        {canRetake && !isPassed && <RetakeButton onClick={onRetake}>Retake Quiz</RetakeButton>}
      </ActionButtons>
    </ResultsBox>
  );
};

export default QuizResults;
