import {
  AnswerOption,
  AnswersList,
  QuestionCard,
  QuestionNumber,
  QuestionText,
} from './QuizQuestion.styles';

const QuizQuestion = ({ question, selectedAnswers, onAnswerSelect, questionNumber }) => {
  const handleAnswerClick = (answerId) => {
    if (question.type === 'single') {
      onAnswerSelect(question.id, [answerId]);
    } else {
      const currentAnswers = selectedAnswers[question.id] || [];
      const isSelected = currentAnswers.includes(answerId);

      if (isSelected) {
        onAnswerSelect(
          question.id,
          currentAnswers.filter((id) => id !== answerId)
        );
      } else {
        onAnswerSelect(question.id, [...currentAnswers, answerId]);
      }
    }
  };

  const isAnswerSelected = (answerId) => {
    const answers = selectedAnswers[question.id] || [];
    return answers.includes(answerId);
  };

  return (
    <QuestionCard>
      <QuestionNumber>
        Question {questionNumber} /{' '}
        {question.type === 'multiple' ? 'Multiple Choice' : 'Single Choice'}
      </QuestionNumber>
      <QuestionText>{question.text}</QuestionText>
      <AnswersList>
        {question.answers.map((answer) => (
          <AnswerOption
            key={answer.id}
            $selected={isAnswerSelected(answer.id)}
            $multiple={question.type === 'multiple'}
            onClick={() => handleAnswerClick(answer.id)}
          >
            <span>{answer.text}</span>
          </AnswerOption>
        ))}
      </AnswersList>
    </QuestionCard>
  );
};

export default QuizQuestion;
