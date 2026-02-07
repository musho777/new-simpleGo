import {
  Container,
  Description,
  QuizBox,
  QuizGrid,
  QuizTime,
  QuizTitle,
  TimeLabel,
  Title,
} from './QuizList.styles';

// Mock quiz data - will be replaced with API
const MOCK_QUIZZES = [
  {
    id: 1,
    title: 'Customer Service Basics',
    description: 'Test on the basic principles and skills of customer service',
    timeLimit: 15,
    category: 'service',
    subCategory: 'call-center',
  },
  {
    id: 2,
    title: 'Phone Etiquette',
    description: 'Evaluate phone communication skills and professionalism',
    timeLimit: 10,
    category: 'service',
    subCategory: 'call-center',
  },
  {
    id: 3,
    title: 'Conflict Resolution',
    description: 'Test on working with customers in difficult situations',
    timeLimit: 20,
    category: 'service',
    subCategory: 'call-center',
  },
];

const QuizList = ({ teamId, subTeamId, onQuizSelect, teamName, subTeamName }) => {
  // Filter quizzes by sub-team (in real app, this will come from API)
  const quizzes = MOCK_QUIZZES.filter((quiz) => quiz.subCategory === subTeamId);

  const handleQuizClick = (quiz) => {
    onQuizSelect(quiz);
  };

  return (
    <Container>
      <Title>{subTeamName} - Quizzes</Title>
      {quizzes.length === 0 ? (
        <Description style={{ textAlign: 'center', marginTop: '40px' }}>
          No quizzes have been added for this section yet
        </Description>
      ) : (
        <QuizGrid>
          {quizzes.map((quiz) => (
            <QuizBox key={quiz.id} onClick={() => handleQuizClick(quiz)}>
              <QuizTitle>{quiz.title}</QuizTitle>
              <Description>{quiz.description}</Description>
              <QuizTime>
                <TimeLabel>Time:</TimeLabel> {quiz.timeLimit} minutes
              </QuizTime>
            </QuizBox>
          ))}
        </QuizGrid>
      )}
    </Container>
  );
};

export default QuizList;
