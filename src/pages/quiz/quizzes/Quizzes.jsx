import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as EditIcon } from 'assets/edit.svg';
import Pagination from 'common-ui/table/Pagination';
import { getUserInfo } from 'features/auth/authActions';
import { selectUserInfo } from 'features/auth/authSlice';
import { createQuiz, deleteQuiz, fetchQuizzes, updateQuiz } from 'features/quiz';
import { useQuizAdmin } from 'hooks/useQuizAdmin';
import EmptyView from 'pages/components/emptyView';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import DeleteConfirmationModal from '../components/deleteConfirmationModal';
import QuizModal from '../components/quizModal';
import {
  AddQuestionsButton,
  BackButton,
  ButtonGroup,
  ButtonRow,
  Container,
  CreateButton,
  DeleteButton,
  EditButton,
  Header,
  HistoryButton,
  QuizBox,
  QuizDescription,
  QuizGrid,
  QuizInfo,
  QuizTitle,
  TakeQuizButton,
  Title,
} from './Quizzes.styles';

const ITEMS_PER_PAGE = 12;

const Quizzes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryUuid, subcategoryUuid } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [quizzes, setQuizzes] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [subcategoryName, setSubcategoryName] = useState('');

  // Get current page from URL params, default to 1
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const userInfo = useSelector(selectUserInfo);
  const { isQuizAdmin: isAdmin } = useQuizAdmin();

  const visibleQuizzes = useMemo(() => {
    // Non-admin users can only see active quizzes
    if (!isAdmin) {
      return quizzes.filter((quiz) => quiz.status === 'active');
    }
    return quizzes;
  }, [quizzes, isAdmin]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const loadQuizzes = useCallback(
    async (page = 1) => {
      if (!subcategoryUuid) return;
      try {
        setLoading(true);
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const result = await fetchQuizzes(subcategoryUuid, ITEMS_PER_PAGE, offset);
        setQuizzes(result.quizzes);
        setTotalCount(result.count);
        setSubcategoryName(result.subcategoryName);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    },
    [subcategoryUuid]
  );

  useEffect(() => {
    if (!userInfo?.email) {
      dispatch(getUserInfo());
    }
    loadQuizzes(currentPage);
  }, [dispatch, userInfo, loadQuizzes, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
  };

  const handleBack = () => {
    navigate(`/quiz/category/${categoryUuid}`);
  };

  const handleCreateQuiz = () => {
    setEditingQuiz(null);
    setIsModalOpen(true);
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (quiz) => {
    setQuizToDelete(quiz);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!quizToDelete) return;

    try {
      await deleteQuiz(quizToDelete.uuid);
      setIsDeleteModalOpen(false);
      setQuizToDelete(null);
      // If deleting the last item on a page, go to previous page
      if (visibleQuizzes.length === 1 && currentPage > 1) {
        const newPage = currentPage - 1;
        setSearchParams({ page: newPage.toString() });
        loadQuizzes(newPage);
      } else {
        loadQuizzes(currentPage);
      }
      notifySuccess('Quiz deleted successfully');
    } catch (error) {
      console.error('Error deleting quiz:', error);
      const errorMessage = error.message || 'Error deleting quiz';
      notifyError(errorMessage);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setQuizToDelete(null);
  };

  const handleAddQuestions = (quiz) => {
    navigate(
      `/quiz/category/${categoryUuid}/subcategory/${subcategoryUuid}/quiz/${quiz.uuid}/add-question`
    );
  };

  const handleViewHistory = (quiz) => {
    navigate(
      `/quiz/category/${categoryUuid}/subcategory/${subcategoryUuid}/quiz/${quiz.uuid}/history`
    );
  };

  const handleViewAllUsersHistory = (quiz) => {
    navigate(
      `/quiz/category/${categoryUuid}/subcategory/${subcategoryUuid}/quiz/${quiz.uuid}/all-users-history`
    );
  };

  const handleSaveQuiz = async (formData) => {
    try {
      const quizData = {
        ...formData,
        categoryUuid,
        subcategoryUuid,
      };

      if (editingQuiz) {
        await updateQuiz(editingQuiz.uuid, quizData);
        setIsModalOpen(false);
        loadQuizzes(currentPage);
      } else {
        await createQuiz(quizData);
        setIsModalOpen(false);
        setSearchParams({ page: '1' });
        loadQuizzes(1);
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  return (
    <Container>
      <BackButton onClick={handleBack}> {'< Back to Subcategories'}</BackButton>

      <Header>
        <Title>{subcategoryName || 'Quizzes'}</Title>
        {isAdmin && <CreateButton onClick={handleCreateQuiz}>+ Create Quiz</CreateButton>}
      </Header>

      {loading ? (
        <p>Loading...</p>
      ) : visibleQuizzes.length === 0 ? (
        <EmptyView
          title="No quizzes available"
          description={
            isAdmin
              ? 'Create your first quiz to get started'
              : 'No quizzes have been created yet'
          }
        />
      ) : (
        <>
          <QuizGrid>
            {visibleQuizzes.map((quiz) => (
              <QuizBox key={quiz.uuid}>
                <div>
                  <QuizTitle>{quiz.title}</QuizTitle>
                  {quiz.description && <QuizDescription>{quiz.description}</QuizDescription>}
                  <QuizInfo>
                    <span>Passing Score: {quiz.passingScore}</span>
                    <span>
                      Status: {quiz.status?.charAt(0).toUpperCase() + quiz.status?.slice(1)}
                    </span>
                    {quiz.timeLimitSeconds && (
                      <span>
                        Time Limit: {Math.floor(quiz.timeLimitSeconds / 60)} min{' '}
                        {quiz.timeLimitSeconds % 60 > 0 && `${quiz.timeLimitSeconds % 60} sec`}
                      </span>
                    )}
                  </QuizInfo>
                </div>

                <TakeQuizButton
                  onClick={() =>
                    navigate(
                      `/quiz/category/${categoryUuid}/subcategory/${subcategoryUuid}/quiz/${quiz.uuid}`
                    )
                  }
                >
                  Take the Quiz
                </TakeQuizButton>

                <ButtonGroup>
                  {isAdmin ? (
                    <>
                      <ButtonRow>
                        <HistoryButton onClick={() => handleViewAllUsersHistory(quiz)}>
                          All Users History
                        </HistoryButton>
                        <AddQuestionsButton onClick={() => handleAddQuestions(quiz)}>
                          View / Add Questions
                        </AddQuestionsButton>
                      </ButtonRow>
                      <ButtonRow style={{ gap: 0 }}>
                        <EditButton onClick={() => handleEditQuiz(quiz)} title="Edit">
                          <EditIcon />
                        </EditButton>
                        <DeleteButton onClick={() => handleDeleteClick(quiz)} title="Delete">
                          <DeleteIcon />
                        </DeleteButton>
                      </ButtonRow>
                    </>
                  ) : (
                    <HistoryButton onClick={() => handleViewHistory(quiz)}>
                      My History
                    </HistoryButton>
                  )}
                </ButtonGroup>
              </QuizBox>
            ))}
          </QuizGrid>
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

      <QuizModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveQuiz}
        quiz={editingQuiz}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        categoryName={quizToDelete?.title || ''}
      />
    </Container>
  );
};

export default Quizzes;
