import { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as EditIcon } from 'assets/edit.svg';
import { getUserInfo } from 'features/auth/authActions';
import { selectUserInfo } from 'features/auth/authSlice';
import {
  createQuestion,
  deleteQuestion,
  fetchQuestions,
  fetchQuizById,
  updateQuestion,
} from 'features/quiz';
import { useQuizAdmin } from 'hooks/useQuizAdmin';

import DeleteConfirmationModal from '../components/deleteConfirmationModal';
import {
  AddOptionButton,
  BackButton,
  Container,
  CreateButton,
  DeleteQuestionButton,
  EditQuestionButton,
  FormGroup,
  FormLabel,
  Input,
  OptionContainer,
  OptionGroup,
  OptionInput,
  OptionsSection,
  QuestionBody,
  QuestionCard,
  QuestionHeader,
  QuestionMetaInfo,
  QuestionOptionItem,
  QuestionOptionsList,
  QuestionsButtonGroup,
  QuestionsListSection,
  QuizInfo,
  QuizInfoItem,
  QuizInfoSection,
  RadioButton,
  RemoveOptionButton,
  Textarea,
} from './AddQuestion.styles';

const AddQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryUuid, subcategoryUuid, quizUuid } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingQuestions, setExistingQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const userInfo = useSelector(selectUserInfo);
  const { isQuizAdmin: isAdmin } = useQuizAdmin();

  const [formData, setFormData] = useState({
    questionText: '',
    orderIndex: 1,
    timeLimitSeconds: '',
    points: 1,
  });

  const [options, setOptions] = useState([
    { optionText: '', isCorrect: false, orderIndex: 0 },
    { optionText: '', isCorrect: false, orderIndex: 1 },
  ]);

  const [answerType, setAnswerType] = useState('single');

  const loadQuizInfo = useCallback(async () => {
    try {
      setLoading(true);
      const quizData = await fetchQuizById(quizUuid);
      setQuiz(quizData);
    } catch (error) {
      console.error('Error fetching quiz info:', error);
    } finally {
      setLoading(false);
    }
  }, [quizUuid]);

  const loadQuestions = useCallback(async () => {
    try {
      const questions = await fetchQuestions(quizUuid);
      const sortedQuestions = [...questions].sort(
        (a, b) => (a.orderIndex || 0) - (b.orderIndex || 0)
      );
      setExistingQuestions(sortedQuestions);
      return sortedQuestions; // Return the questions for immediate use
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  }, [quizUuid]);

  useEffect(() => {
    if (!userInfo?.email) {
      dispatch(getUserInfo());
    }
    if (quizUuid) {
      loadQuizInfo();
      loadQuestions();
    }
  }, [dispatch, userInfo, quizUuid, loadQuizInfo, loadQuestions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = value === '' ? '' : Number(value);
      // For orderIndex, enforce minimum value of 1 (1-based indexing)
      if (name === 'orderIndex' && numValue !== '' && numValue < 1) {
        return; // Don't update if less than 1
      }
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].optionText = value;
    setOptions(updatedOptions);
  };

  const handleCorrectChange = (index) => {
    if (answerType === 'single') {
      const updatedOptions = options.map((option, i) => ({
        ...option,
        isCorrect: i === index,
      }));
      setOptions(updatedOptions);
    } else {
      const updatedOptions = options.map((option, i) =>
        i === index ? { ...option, isCorrect: !option.isCorrect } : option
      );
      setOptions(updatedOptions);
    }
  };

  const handleAddOption = () => {
    setOptions([...options, { optionText: '', isCorrect: false, orderIndex: options.length }]);
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      const updatedOptions = options.filter((_, i) => i !== index);
      const reindexedOptions = updatedOptions.map((option, i) => ({
        ...option,
        orderIndex: i,
      }));
      setOptions(reindexedOptions);
    }
  };

  const handleBack = () => {
    navigate(`/quiz/category/${categoryUuid}/subcategory/${subcategoryUuid}`);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setFormData({
      questionText: question.questionText,
      orderIndex: question.orderIndex + 1, // Convert from 0-based to 1-based for UI
      timeLimitSeconds: question.timeLimitSeconds,
      points: question.points || 1,
    });
    setOptions(
      question.options.map((opt, index) => ({
        uuid: opt.uuid,
        optionText: opt.optionText,
        isCorrect: opt.isCorrect,
        orderIndex: index,
      }))
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setFormData({
      questionText: '',
      orderIndex: existingQuestions.length + 1, // 1-based for UI
      timeLimitSeconds: '',
      points: 1,
    });
    setOptions([
      { optionText: '', isCorrect: false, orderIndex: 0 },
      { optionText: '', isCorrect: false, orderIndex: 1 },
    ]);
  };

  const handleDeleteClick = (question) => {
    setQuestionToDelete(question);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!questionToDelete) return;

    try {
      await deleteQuestion(quizUuid, questionToDelete.uuid);
      setIsDeleteModalOpen(false);
      setQuestionToDelete(null);

      if (editingQuestion && editingQuestion.uuid === questionToDelete.uuid) {
        handleCancelEdit();
      }

      loadQuestions();
      alert('Question deleted successfully!');
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setQuestionToDelete(null);
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();

    const hasCorrectAnswer = options.some((option) => option.isCorrect);
    if (!hasCorrectAnswer) {
      alert('Please select at least one correct answer');
      return;
    }

    const allOptionsHaveText = options.every((option) => option.optionText.trim() !== '');
    if (!allOptionsHaveText) {
      alert('Please fill in all option texts');
      return;
    }

    const correctCount = options.filter((o) => o.isCorrect).length;

    if (answerType === 'single' && correctCount !== 1) {
      alert('Please select exactly ONE correct answer');
      return;
    }

    if (answerType === 'multiple' && correctCount < 1) {
      alert('Please select at least one correct answer');
      return;
    }

    try {
      setLoading(true);

      const questionData = {
        questionText: formData.questionText,
        orderIndex: formData.orderIndex - 1, // Convert from 1-based UI to 0-based backend
        timeLimitSeconds: formData.timeLimitSeconds,
        points: formData.points,
        options: options,
      };

      if (editingQuestion) {
        await updateQuestion(quizUuid, editingQuestion.uuid, questionData);
        alert('Question updated successfully!');
      } else {
        await createQuestion(quizUuid, questionData);
      }

      setEditingQuestion(null);

      const updatedQuestions = await loadQuestions(); // Reload questions first

      // Set next order index based on updated questions list (1-based UI)
      setFormData({
        questionText: '',
        orderIndex: updatedQuestions.length + 1, // Next available order in 1-based indexing
        timeLimitSeconds: '',
        points: 1,
      });
      setOptions([
        { optionText: '', isCorrect: false, orderIndex: 0 },
        { optionText: '', isCorrect: false, orderIndex: 1 },
      ]);
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Error saving question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <BackButton onClick={handleBack}>{'< Back to Quiz'}</BackButton>

      {loading && !quiz ? (
        <p>Loading...</p>
      ) : (
        <>
          <QuizInfoSection>
            <h1>
              {isAdmin ? (editingQuestion ? 'Edit Question' : 'Add Question') : 'Questions'}
            </h1>
            {quiz && (
              <QuizInfo>
                <QuizInfoItem>
                  <strong>Quiz:</strong> {quiz.title}
                </QuizInfoItem>
                {quiz.description && (
                  <QuizInfoItem>
                    <strong>Description:</strong> {quiz.description}
                  </QuizInfoItem>
                )}
                <QuizInfoItem>
                  <strong>Passing Score:</strong> {quiz.passingScore}
                </QuizInfoItem>
                <QuizInfoItem>
                  <strong>Time Limit:</strong> {Math.floor(quiz.timeLimitSeconds / 60)} minutes
                </QuizInfoItem>
              </QuizInfo>
            )}
          </QuizInfoSection>

          {isAdmin && (
            <form onSubmit={handleCreateQuestion}>
              <FormGroup>
                <FormLabel>
                  Question Text <span className="required">*</span>
                </FormLabel>
                <Textarea
                  name="questionText"
                  value={formData.questionText}
                  onChange={handleInputChange}
                  placeholder="Enter the question text"
                  rows={4}
                  required
                  autoComplete="off"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  Order <span className="required">*</span>
                </FormLabel>
                <Input
                  type="text"
                  name="orderIndex"
                  value={formData.orderIndex}
                  onChange={handleNumberChange}
                  placeholder="Enter order (e.g., 1, 2, 3...)"
                  required
                  autoComplete="off"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Time Limit (seconds)</FormLabel>
                <Input
                  type="text"
                  name="timeLimitSeconds"
                  value={formData.timeLimitSeconds}
                  onChange={handleNumberChange}
                  placeholder="Enter time limit in seconds (optional)"
                  autoComplete="off"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  Points <span className="required">*</span>
                </FormLabel>
                <Input
                  type="text"
                  name="points"
                  value={formData.points}
                  onChange={handleNumberChange}
                  placeholder="Enter points for correct answer (default: 1)"
                  required
                  autoComplete="off"
                />
              </FormGroup>

              <OptionsSection>
                <FormGroup>
                  <FormLabel>Correct Answer Type</FormLabel>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setAnswerType('single')}
                      style={{
                        padding: '8px 16px',
                        background: answerType === 'single' ? '#4f46e5' : '#e5e7eb',
                        color: answerType === 'single' ? '#fff' : '#000',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      One correct
                    </button>

                    <button
                      type="button"
                      onClick={() => setAnswerType('multiple')}
                      style={{
                        padding: '8px 16px',
                        background: answerType === 'multiple' ? '#4f46e5' : '#e5e7eb',
                        color: answerType === 'multiple' ? '#fff' : '#000',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Multiple Choice
                    </button>
                  </div>
                </FormGroup>
                {options.map((option, index) => (
                  <OptionGroup key={index}>
                    <RadioButton
                      name="correctAnswer"
                      type={answerType === 'single' ? 'radio' : 'checkbox'}
                      checked={option.isCorrect}
                      onChange={() => handleCorrectChange(index)}
                    />

                    <OptionContainer>
                      <OptionInput
                        type="text"
                        value={option.optionText}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        required
                        autoComplete="off"
                      />
                      {options.length > 2 && (
                        <RemoveOptionButton
                          type="button"
                          onClick={() => handleRemoveOption(index)}
                        >
                          Remove
                        </RemoveOptionButton>
                      )}
                    </OptionContainer>
                  </OptionGroup>
                ))}
                <AddOptionButton type="button" onClick={handleAddOption}>
                  + Add Option
                </AddOptionButton>
              </OptionsSection>

              <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                {editingQuestion && (
                  <BackButton type="button" onClick={handleCancelEdit}>
                    Cancel Edit
                  </BackButton>
                )}
                <CreateButton type="submit" disabled={loading}>
                  {loading
                    ? editingQuestion
                      ? 'Updating...'
                      : 'Creating...'
                    : editingQuestion
                      ? 'Update Question'
                      : 'Create Question'}
                </CreateButton>
              </div>
            </form>
          )}

          {existingQuestions.length > 0 && (
            <QuestionsListSection>
              <h2>Existing Questions ({existingQuestions.length})</h2>
              {existingQuestions.map((question, index) => (
                <QuestionCard key={question.uuid}>
                  <QuestionHeader>
                    <div>
                      <h3>Question {index + 1}</h3>
                      <QuestionMetaInfo>
                        <span>Order: {question.orderIndex + 1}</span>
                        {question.timeLimitSeconds && (
                          <span>Time: {question.timeLimitSeconds}s</span>
                        )}
                        {question.points && <span>Points: {question.points}</span>}
                      </QuestionMetaInfo>
                    </div>
                    {isAdmin && (
                      <QuestionsButtonGroup>
                        <EditQuestionButton
                          onClick={() => handleEditQuestion(question)}
                          title="Edit"
                        >
                          <EditIcon />
                        </EditQuestionButton>
                        <DeleteQuestionButton
                          onClick={() => handleDeleteClick(question)}
                          title="Delete"
                        >
                          <DeleteIcon />
                        </DeleteQuestionButton>
                      </QuestionsButtonGroup>
                    )}
                  </QuestionHeader>

                  <QuestionBody>
                    <p>{question.questionText}</p>
                  </QuestionBody>

                  <QuestionOptionsList>
                    {question.options &&
                      question.options.map((option, optIndex) => (
                        <QuestionOptionItem
                          key={option.uuid || optIndex}
                          $isCorrect={option.isCorrect}
                        >
                          <span>{String.fromCharCode(65 + optIndex)}.</span>
                          <span>{option.optionText}</span>
                        </QuestionOptionItem>
                      ))}
                  </QuestionOptionsList>
                </QuestionCard>
              ))}
            </QuestionsListSection>
          )}
        </>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        categoryName={
          questionToDelete
            ? `"${questionToDelete.questionText.substring(0, 50)}${questionToDelete.questionText.length > 50 ? '...' : ''}"`
            : ''
        }
      />
    </Container>
  );
};

export default AddQuestion;
