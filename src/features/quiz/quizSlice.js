import { createSlice } from '@reduxjs/toolkit';

import {
  createCategory,
  createQuestion,
  createQuiz,
  createSubcategory,
  deleteCategory,
  deleteQuestion,
  deleteQuiz,
  deleteSubcategory,
  fetchCategories,
  fetchCategoryById,
  fetchQuestions,
  fetchQuizById,
  fetchQuizzes,
  fetchSubcategoriesByCategory,
  getAllUsersQuizAttempts,
  getMyQuizAttempts,
  startQuestion,
  startQuizAttempt,
  submitQuizAttempt,
  updateCategory,
  updateQuestion,
  updateQuiz,
  updateSubcategory,
} from './quizActions';

const initialState = {
  // Categories
  categories: [],
  currentCategory: null,
  categoriesLoading: false,
  categoriesError: null,

  // Subcategories
  subcategories: [],
  subcategoriesLoading: false,
  subcategoriesError: null,

  // Quizzes
  quizzes: [],
  currentQuiz: null,
  subcategoryName: '',
  quizzesLoading: false,
  quizzesError: null,

  // Questions
  questions: [],
  questionsLoading: false,
  questionsError: null,

  // Quiz Attempts
  currentAttempt: null,
  myAttempts: [],
  allUsersAttempts: [],
  attemptsLoading: false,
  attemptsError: null,

  // Quiz Results
  quizResult: null,

  // General
  saveLoading: false,
  saveError: null,
  saveSuccess: false,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    resetSaveStatus: (state) => {
      state.saveLoading = false;
      state.saveError = null;
      state.saveSuccess = false;
    },
    resetDeleteStatus: (state) => {
      state.deleteLoading = false;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    resetCurrentCategory: (state) => {
      state.currentCategory = null;
    },
    resetCurrentQuiz: (state) => {
      state.currentQuiz = null;
    },
    resetCurrentAttempt: (state) => {
      state.currentAttempt = null;
    },
    resetQuizResult: (state) => {
      state.quizResult = null;
    },
    clearQuizErrors: (state) => {
      state.categoriesError = null;
      state.subcategoriesError = null;
      state.quizzesError = null;
      state.questionsError = null;
      state.attemptsError = null;
      state.saveError = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    // ============ CATEGORIES ============
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categoriesLoading = false;
        state.categories = payload;
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.categoriesLoading = false;
        state.categoriesError = payload;
      })

      .addCase(fetchCategoryById.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, { payload }) => {
        state.categoriesLoading = false;
        state.currentCategory = payload;
      })
      .addCase(fetchCategoryById.rejected, (state, { payload }) => {
        state.categoriesLoading = false;
        state.categoriesError = payload;
      })

      .addCase(createCategory.pending, (state) => {
        state.saveLoading = true;
        state.saveError = null;
        state.saveSuccess = false;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.saveLoading = false;
        state.saveSuccess = true;
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.saveLoading = false;
        state.saveError = payload;
      })

      .addCase(updateCategory.pending, (state) => {
        state.saveLoading = true;
        state.saveError = null;
        state.saveSuccess = false;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.saveLoading = false;
        state.saveSuccess = true;
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.saveLoading = false;
        state.saveError = payload;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.categories = state.categories.filter((c) => c.uuid !== payload.categoryUuid);
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.deleteLoading = false;
        state.deleteError = payload;
      })

      // ============ SUBCATEGORIES ============
      .addCase(fetchSubcategoriesByCategory.pending, (state) => {
        state.subcategoriesLoading = true;
        state.subcategoriesError = null;
      })
      .addCase(fetchSubcategoriesByCategory.fulfilled, (state, { payload }) => {
        state.subcategoriesLoading = false;
        state.subcategories = payload;
      })
      .addCase(fetchSubcategoriesByCategory.rejected, (state, { payload }) => {
        state.subcategoriesLoading = false;
        state.subcategoriesError = payload;
      })

      .addCase(createSubcategory.pending, (state) => {
        state.saveLoading = true;
        state.saveError = null;
        state.saveSuccess = false;
      })
      .addCase(createSubcategory.fulfilled, (state) => {
        state.saveLoading = false;
        state.saveSuccess = true;
      })
      .addCase(createSubcategory.rejected, (state, { payload }) => {
        state.saveLoading = false;
        state.saveError = payload;
      })

      .addCase(updateSubcategory.pending, (state) => {
        state.saveLoading = true;
        state.saveError = null;
        state.saveSuccess = false;
      })
      .addCase(updateSubcategory.fulfilled, (state) => {
        state.saveLoading = false;
        state.saveSuccess = true;
      })
      .addCase(updateSubcategory.rejected, (state, { payload }) => {
        state.saveLoading = false;
        state.saveError = payload;
      })

      .addCase(deleteSubcategory.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteSubcategory.fulfilled, (state, { payload }) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.subcategories = state.subcategories.filter(
          (s) => s.uuid !== payload.subcategoryUuid
        );
      })
      .addCase(deleteSubcategory.rejected, (state, { payload }) => {
        state.deleteLoading = false;
        state.deleteError = payload;
      })

      // ============ QUIZZES ============
      .addCase(fetchQuizzes.pending, (state) => {
        state.quizzesLoading = true;
        state.quizzesError = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, { payload }) => {
        state.quizzesLoading = false;
        state.quizzes = payload.quizzes;
        state.subcategoryName = payload.subcategoryName;
      })
      .addCase(fetchQuizzes.rejected, (state, { payload }) => {
        state.quizzesLoading = false;
        state.quizzesError = payload;
      })

      .addCase(fetchQuizById.pending, (state) => {
        state.quizzesLoading = true;
        state.quizzesError = null;
      })
      .addCase(fetchQuizById.fulfilled, (state, { payload }) => {
        state.quizzesLoading = false;
        state.currentQuiz = payload;
      })
      .addCase(fetchQuizById.rejected, (state, { payload }) => {
        state.quizzesLoading = false;
        state.quizzesError = payload;
      })

      .addCase(createQuiz.pending, (state) => {
        state.saveLoading = true;
        state.saveError = null;
        state.saveSuccess = false;
      })
      .addCase(createQuiz.fulfilled, (state) => {
        state.saveLoading = false;
        state.saveSuccess = true;
      })
      .addCase(createQuiz.rejected, (state, { payload }) => {
        state.saveLoading = false;
        state.saveError = payload;
      })

      .addCase(updateQuiz.pending, (state) => {
        state.saveLoading = true;
        state.saveError = null;
        state.saveSuccess = false;
      })
      .addCase(updateQuiz.fulfilled, (state) => {
        state.saveLoading = false;
        state.saveSuccess = true;
      })
      .addCase(updateQuiz.rejected, (state, { payload }) => {
        state.saveLoading = false;
        state.saveError = payload;
      })

      .addCase(deleteQuiz.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteQuiz.fulfilled, (state, { payload }) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.quizzes = state.quizzes.filter((q) => q.uuid !== payload.quizUuid);
      })
      .addCase(deleteQuiz.rejected, (state, { payload }) => {
        state.deleteLoading = false;
        state.deleteError = payload;
      })

      // ============ QUESTIONS ============
      .addCase(fetchQuestions.pending, (state) => {
        state.questionsLoading = true;
        state.questionsError = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, { payload }) => {
        state.questionsLoading = false;
        state.questions = payload;
      })
      .addCase(fetchQuestions.rejected, (state, { payload }) => {
        state.questionsLoading = false;
        state.questionsError = payload;
      })

      .addCase(createQuestion.pending, (state) => {
        state.saveLoading = true;
        state.saveError = null;
        state.saveSuccess = false;
      })
      .addCase(createQuestion.fulfilled, (state) => {
        state.saveLoading = false;
        state.saveSuccess = true;
      })
      .addCase(createQuestion.rejected, (state, { payload }) => {
        state.saveLoading = false;
        state.saveError = payload;
      })

      .addCase(updateQuestion.pending, (state) => {
        state.saveLoading = true;
        state.saveError = null;
        state.saveSuccess = false;
      })
      .addCase(updateQuestion.fulfilled, (state) => {
        state.saveLoading = false;
        state.saveSuccess = true;
      })
      .addCase(updateQuestion.rejected, (state, { payload }) => {
        state.saveLoading = false;
        state.saveError = payload;
      })

      .addCase(deleteQuestion.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteQuestion.fulfilled, (state, { payload }) => {
        state.deleteLoading = false;
        state.deleteSuccess = true;
        state.questions = state.questions.filter((q) => q.uuid !== payload.questionUuid);
      })
      .addCase(deleteQuestion.rejected, (state, { payload }) => {
        state.deleteLoading = false;
        state.deleteError = payload;
      })

      // ============ QUIZ ATTEMPTS ============
      .addCase(startQuizAttempt.pending, (state) => {
        state.attemptsLoading = true;
        state.attemptsError = null;
      })
      .addCase(startQuizAttempt.fulfilled, (state, { payload }) => {
        state.attemptsLoading = false;
        state.currentAttempt = payload;
      })
      .addCase(startQuizAttempt.rejected, (state, { payload }) => {
        state.attemptsLoading = false;
        state.attemptsError = payload;
      })

      .addCase(submitQuizAttempt.pending, (state) => {
        state.attemptsLoading = true;
        state.attemptsError = null;
      })
      .addCase(submitQuizAttempt.fulfilled, (state, { payload }) => {
        state.attemptsLoading = false;
        state.quizResult = payload;
        state.currentAttempt = null;
      })
      .addCase(submitQuizAttempt.rejected, (state, { payload }) => {
        state.attemptsLoading = false;
        state.attemptsError = payload;
      })

      .addCase(startQuestion.pending, (state) => {
        state.attemptsLoading = true;
        state.attemptsError = null;
      })
      .addCase(startQuestion.fulfilled, (state) => {
        state.attemptsLoading = false;
      })
      .addCase(startQuestion.rejected, (state, { payload }) => {
        state.attemptsLoading = false;
        state.attemptsError = payload;
      })

      .addCase(getMyQuizAttempts.pending, (state) => {
        state.attemptsLoading = true;
        state.attemptsError = null;
      })
      .addCase(getMyQuizAttempts.fulfilled, (state, { payload }) => {
        state.attemptsLoading = false;
        state.myAttempts = payload.attempts || [];
      })
      .addCase(getMyQuizAttempts.rejected, (state, { payload }) => {
        state.attemptsLoading = false;
        state.attemptsError = payload;
      })

      .addCase(getAllUsersQuizAttempts.pending, (state) => {
        state.attemptsLoading = true;
        state.attemptsError = null;
      })
      .addCase(getAllUsersQuizAttempts.fulfilled, (state, { payload }) => {
        state.attemptsLoading = false;
        state.allUsersAttempts = payload.attempts || [];
      })
      .addCase(getAllUsersQuizAttempts.rejected, (state, { payload }) => {
        state.attemptsLoading = false;
        state.attemptsError = payload;
      });
  },
});

export const {
  resetSaveStatus,
  resetDeleteStatus,
  resetCurrentCategory,
  resetCurrentQuiz,
  resetCurrentAttempt,
  resetQuizResult,
  clearQuizErrors,
} = quizSlice.actions;

// Selectors
export const selectCategories = (state) => state.quiz.categories;
export const selectCurrentCategory = (state) => state.quiz.currentCategory;
export const selectCategoriesLoading = (state) => state.quiz.categoriesLoading;
export const selectCategoriesError = (state) => state.quiz.categoriesError;

export const selectSubcategories = (state) => state.quiz.subcategories;
export const selectSubcategoriesLoading = (state) => state.quiz.subcategoriesLoading;
export const selectSubcategoriesError = (state) => state.quiz.subcategoriesError;

export const selectQuizzes = (state) => state.quiz.quizzes;
export const selectCurrentQuiz = (state) => state.quiz.currentQuiz;
export const selectSubcategoryName = (state) => state.quiz.subcategoryName;
export const selectQuizzesLoading = (state) => state.quiz.quizzesLoading;
export const selectQuizzesError = (state) => state.quiz.quizzesError;

export const selectQuestions = (state) => state.quiz.questions;
export const selectQuestionsLoading = (state) => state.quiz.questionsLoading;
export const selectQuestionsError = (state) => state.quiz.questionsError;

export const selectCurrentAttempt = (state) => state.quiz.currentAttempt;
export const selectMyAttempts = (state) => state.quiz.myAttempts;
export const selectAllUsersAttempts = (state) => state.quiz.allUsersAttempts;
export const selectAttemptsLoading = (state) => state.quiz.attemptsLoading;
export const selectAttemptsError = (state) => state.quiz.attemptsError;

export const selectQuizResult = (state) => state.quiz.quizResult;

export const selectSaveLoading = (state) => state.quiz.saveLoading;
export const selectSaveError = (state) => state.quiz.saveError;
export const selectSaveSuccess = (state) => state.quiz.saveSuccess;

export const selectDeleteLoading = (state) => state.quiz.deleteLoading;
export const selectDeleteError = (state) => state.quiz.deleteError;
export const selectDeleteSuccess = (state) => state.quiz.deleteSuccess;

export default quizSlice.reducer;
