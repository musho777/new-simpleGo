import { useCallback, useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import ApiClient from 'api/axiosClient';
import { startQuestion, startQuizAttempt, submitQuizAttempt } from 'features/quiz';

import {
  BackButton,
  ButtonGroup,
  Container,
  ErrorMessage,
  FinishButton,
  Header,
  MultipleCorrectBadge,
  NavigationButtons,
  NextButton,
  OptionItem,
  OptionsList,
  PreviousButton,
  ProgressBar,
  ProgressFill,
  ProgressText,
  QuestionBox,
  QuestionHeader,
  QuestionText,
  QuizInfo,
  QuizInfoItem,
  QuizInfoSection,
  QuizTimerContainer,
  QuizTimerDisplay,
  StartQuizButton,
  StartQuizSection,
  TimerDisplay,
  Title,
} from './QuizQuestions.styles';

const QuizQuestions = () => {
  const navigate = useNavigate();
  const { categoryUuid, subcategoryUuid, quizUuid } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [quizAttemptUuid, setQuizAttemptUuid] = useState(null);
  const [startingQuiz, setStartingQuiz] = useState(false);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);
  const [startedQuestions, setStartedQuestions] = useState(new Set());
  const [timedOutQuestions, setTimedOutQuestions] = useState(new Set());
  const [error, setError] = useState(null);
  const [quizTimeRemaining, setQuizTimeRemaining] = useState(null);
  const quizTimerRef = useRef(null);
  const hasAutoSubmitted = useRef(false);

  useEffect(() => {
    if (quizUuid) {
      fetchQuizInfo();
    }
  }, [quizUuid]);

  // Timer effect - runs when quiz is started and question changes
  useEffect(() => {
    if (!quizStarted || !questions.length) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion || !currentQuestion.timeLimitSeconds) return;

    // Reset time for new question
    setTimeRemaining(currentQuestion.timeLimitSeconds);

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === null || prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quizStarted, currentQuestionIndex, questions]);

  // Timer effect - track when question time expires
  useEffect(() => {
    if (timeRemaining === 0 && quizStarted && questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion && !timedOutQuestions.has(currentQuestion.uuid)) {
        setTimedOutQuestions((prev) => new Set([...prev, currentQuestion.uuid]));
      }
    }
  }, [timeRemaining, quizStarted, currentQuestionIndex, questions, timedOutQuestions]);

  // Quiz-level timer effect - runs when quiz has a time limit
  useEffect(() => {
    if (!quizStarted || !quiz?.timeLimitSeconds) return;

    // Initialize quiz timer when quiz starts
    setQuizTimeRemaining(quiz.timeLimitSeconds);
    hasAutoSubmitted.current = false;

    quizTimerRef.current = setInterval(() => {
      setQuizTimeRemaining((prevTime) => {
        if (prevTime === null || prevTime <= 0) {
          clearInterval(quizTimerRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (quizTimerRef.current) {
        clearInterval(quizTimerRef.current);
      }
    };
  }, [quizStarted, quiz?.timeLimitSeconds]);

  // Auto-submit handler for quiz timer
  const handleAutoSubmit = useCallback(async () => {
    if (hasAutoSubmitted.current || !quizAttemptUuid || submittingQuiz) return;

    hasAutoSubmitted.current = true;

    try {
      setSubmittingQuiz(true);
      setError(null);

      const response = await submitQuizAttempt(
        quizAttemptUuid,
        userAnswers,
        questions,
        timedOutQuestions,
        true
      );

      navigate(
        `/quiz/category/${categoryUuid}/subcategory/${subcategoryUuid}/quiz/${quizUuid}/complete`,
        {
          state: {
            userAnswers,
            questions,
            quiz,
            quizAttemptUuid,
            submissionResult: response,
            timedOut: true,
          },
        }
      );
    } catch (err) {
      console.error('Error auto-submitting quiz:', err);
      hasAutoSubmitted.current = false;
      setError('Quiz time expired. Failed to auto-submit. Please try manually.');
    } finally {
      setSubmittingQuiz(false);
    }
  }, [
    quizAttemptUuid,
    submittingQuiz,
    userAnswers,
    questions,
    timedOutQuestions,
    quiz,
    categoryUuid,
    subcategoryUuid,
    quizUuid,
    navigate,
  ]);

  // Auto-submit when quiz timer expires
  useEffect(() => {
    if (quizTimeRemaining === 0 && quizStarted && !hasAutoSubmitted.current) {
      handleAutoSubmit();
    }
  }, [quizTimeRemaining, quizStarted, handleAutoSubmit]);

  // Track when user starts viewing a question
  useEffect(() => {
    const trackQuestionStart = async () => {
      if (!quizStarted || !questions.length || !quizAttemptUuid) return;

      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) return;

      // Check if we've already started this question
      if (startedQuestions.has(currentQuestion.uuid)) return;

      try {
        // Call API to track question start
        await startQuestion(quizAttemptUuid, currentQuestion.uuid);

        // Mark this question as started
        setStartedQuestions((prev) => new Set([...prev, currentQuestion.uuid]));
      } catch (error) {
        console.error('Error tracking question start:', error);
        // Don't block the user if tracking fails
      }
    };

    trackQuestionStart();
  }, [quizStarted, currentQuestionIndex, questions, quizAttemptUuid, startedQuestions]);

  const fetchQuizInfo = async () => {
    try {
      const response = await ApiClient.get(`/quizzes/${quizUuid}`);
      setQuiz(response.quiz || null);
    } catch (error) {
      console.error('Error fetching quiz info:', error);
    }
  };

  const handleBack = () => {
    navigate(`/quiz/category/${categoryUuid}/subcategory/${subcategoryUuid}`);
  };

  const handleStartQuiz = async () => {
    try {
      setStartingQuiz(true);
      setLoading(true);
      setError(null);
      const response = await startQuizAttempt(quizUuid);

      // Store the quiz attempt UUID for later use when submitting
      if (response.attempt && response.attempt.uuid) {
        setQuizAttemptUuid(response.attempt.uuid);
      }

      // Set questions from the response and sort by orderIndex
      if (response.questions && response.questions.length > 0) {
        const sortedQuestions = [...response.questions].sort(
          (a, b) => (a.orderIndex || 0) - (b.orderIndex || 0)
        );
        setQuestions(sortedQuestions);
      }

      // Start the quiz
      setQuizStarted(true);
    } catch (err) {
      console.error('Error starting quiz:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to start quiz. Please try again.';
      setError(errorMessage);
    } finally {
      setStartingQuiz(false);
      setLoading(false);
    }
  };

  const handleSelectAnswer = (questionUuid, optionUuid, isMultipleChoice) => {
    // Prevent answer selection when question or quiz time has expired
    if (timeRemaining === 0 || quizTimeRemaining === 0) {
      return;
    }

    setUserAnswers((prev) => {
      if (isMultipleChoice) {
        // Multiple choice: toggle selection in array
        const currentAnswers = prev[questionUuid] || [];
        const isAlreadySelected = currentAnswers.includes(optionUuid);

        return {
          ...prev,
          [questionUuid]: isAlreadySelected
            ? currentAnswers.filter((id) => id !== optionUuid)
            : [...currentAnswers, optionUuid],
        };
      } else {
        // Single choice: store as array with single element
        return {
          ...prev,
          [questionUuid]: [optionUuid],
        };
      }
    });
  };

  const isOptionSelected = (questionUuid, optionUuid) => {
    const answers = userAnswers[questionUuid];
    if (!answers) return false;
    return Array.isArray(answers) ? answers.includes(optionUuid) : answers === optionUuid;
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = async () => {
    if (!quizAttemptUuid) {
      setError('Quiz attempt not found. Please try again.');
      return;
    }

    if (!questions || questions.length === 0) {
      setError('No questions found. Please restart the quiz.');
      return;
    }

    try {
      setSubmittingQuiz(true);
      setError(null);

      // Submit quiz answers to the API
      const response = await submitQuizAttempt(
        quizAttemptUuid,
        userAnswers,
        questions,
        timedOutQuestions,
        false
      );

      // Navigate to completion page with the response data
      navigate(
        `/quiz/category/${categoryUuid}/subcategory/${subcategoryUuid}/quiz/${quizUuid}/complete`,
        {
          state: {
            userAnswers,
            questions,
            quiz,
            quizAttemptUuid,
            submissionResult: response,
          },
        }
      );
    } catch (err) {
      console.error('Error submitting quiz:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to submit quiz. Please try again.';
      setError(errorMessage);
    } finally {
      setSubmittingQuiz(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
      <BackButton onClick={handleBack}> {'< Back to Quizzes'}</BackButton>

      {quiz && (
        <QuizInfoSection>
          <Header>
            <Title>{quiz.title}</Title>
          </Header>
          <QuizInfo>
            {quiz.description && (
              <QuizInfoItem>
                <strong>Description:</strong> {quiz.description}
              </QuizInfoItem>
            )}
            <QuizInfoItem>
              <strong>Passing Score:</strong> {quiz.passingScore}
            </QuizInfoItem>
          </QuizInfo>
        </QuizInfoSection>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length === -1 ? (
        <p>No questions found for this quiz.</p>
      ) : !quizStarted ? (
        <StartQuizSection>
          <h2>Ready to Start?</h2>
          {quiz?.questions?.length > 0 && (
            <p>
              This quiz contains <span>{quiz.questions.length}</span>{' '}
              {quiz.questions.length === 1 ? 'question' : 'questions'}
            </p>
          )}
          <p>Click the button below when you&apos;re ready to begin.</p>
          <StartQuizButton onClick={handleStartQuiz} disabled={startingQuiz}>
            {startingQuiz ? 'Starting Quiz...' : 'Start Quiz'}
          </StartQuizButton>
        </StartQuizSection>
      ) : (
        <>
          {quiz?.timeLimitSeconds > 0 && quizTimeRemaining !== null && (
            <QuizTimerContainer>
              <QuizTimerDisplay
                $timeExpired={quizTimeRemaining === 0}
                $timeWarning={quizTimeRemaining > 0 && quizTimeRemaining <= 60}
              >
                {quizTimeRemaining === 0
                  ? 'Time Expired! Submitting...'
                  : `Quiz Time: ${formatTime(quizTimeRemaining)}`}
              </QuizTimerDisplay>
            </QuizTimerContainer>
          )}

          <ProgressBar>
            <ProgressFill style={{ width: `${progress}%` }} />
            <ProgressText>
              Question {currentQuestionIndex + 1} of {questions.length}
            </ProgressText>
          </ProgressBar>

          {currentQuestion && (
            <QuestionBox>
              {currentQuestion.timeLimitSeconds && timeRemaining !== null && (
                <TimerDisplay
                  $timeExpired={timeRemaining === 0}
                  $timeWarning={timeRemaining > 0 && timeRemaining <= 10}
                >
                  {timeRemaining === 0 ? 'Time Expired!' : formatTime(timeRemaining)}
                </TimerDisplay>
              )}

              <QuestionHeader>
                <h3>Question {currentQuestionIndex + 1}</h3>
              </QuestionHeader>

              {currentQuestion.isMultipleChoice && (
                <MultipleCorrectBadge>Multiple Answers</MultipleCorrectBadge>
              )}

              <QuestionText>{currentQuestion.questionText}</QuestionText>

              <OptionsList>
                {currentQuestion.options &&
                  currentQuestion.options.map((option, optIndex) => (
                    <OptionItem
                      key={option.uuid || optIndex}
                      $isSelected={isOptionSelected(currentQuestion.uuid, option.uuid)}
                      $timeExpired={timeRemaining === 0 || quizTimeRemaining === 0}
                      $isMultiple={currentQuestion.isMultipleChoice}
                      onClick={() =>
                        handleSelectAnswer(
                          currentQuestion.uuid,
                          option.uuid,
                          currentQuestion.isMultipleChoice
                        )
                      }
                    >
                      <span>{String.fromCharCode(65 + optIndex)}.</span>
                      <span>{option.optionText}</span>
                    </OptionItem>
                  ))}
              </OptionsList>
            </QuestionBox>
          )}

          <NavigationButtons>
            <ButtonGroup>
              {/* <PreviousButton onClick={handlePrevious} disabled={true}>
                Previous
              </PreviousButton> */}

              {isLastQuestion ? (
                <FinishButton onClick={handleFinish} disabled={submittingQuiz}>
                  {submittingQuiz ? 'Submitting...' : 'Finish Quiz'}
                </FinishButton>
              ) : (
                <NextButton onClick={handleNext}>Next</NextButton>
              )}
            </ButtonGroup>
          </NavigationButtons>
        </>
      )}
    </Container>
  );
};

export default QuizQuestions;
