import { createAsyncThunk } from '@reduxjs/toolkit';

import ApiClient from 'api/axiosClient';

// ============ CATEGORIES ============

export const fetchCategories = createAsyncThunk(
  'quiz/categories/fetch',
  async ({ limit = 100, offset = 0 } = {}, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(
        `/quiz-categories?&limit=${limit}&offset=${offset}`
      );
      return response.categories || [];
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'quiz/categories/fetchById',
  async (categoryUuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/quiz-categories/${categoryUuid}`);
      return response.category || null;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  'quiz/categories/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/quiz-categories/create', {
        name: data.name,
        description: data.description,
        teamUuids: data.teamUuids,
        status: data.status,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'quiz/categories/update',
  async ({ categoryUuid, data }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.patch(`/quiz-categories/update/${categoryUuid}`, {
        name: data.name,
        description: data.description,
        teamUuids: data.teamUuids,
        status: data.status,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'quiz/categories/delete',
  async (categoryUuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/quiz-categories/${categoryUuid}`);
      return { ...response, categoryUuid };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// ============ SUBCATEGORIES ============

export const fetchSubcategoriesByCategory = createAsyncThunk(
  'quiz/subcategories/fetchByCategory',
  async (categoryUuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/quiz-subcategories/by-category/${categoryUuid}`);
      return response.subcategories || [];
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const createSubcategory = createAsyncThunk(
  'quiz/subcategories/create',
  async (data, { rejectWithValue }) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        categoryUuid: data.categoryUuid,
        status: data.status,
      };
      if (data.teamUuid) {
        payload.teamUuid = data.teamUuid;
      }
      const response = await ApiClient.post('/quiz-subcategories/create', payload);
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateSubcategory = createAsyncThunk(
  'quiz/subcategories/update',
  async ({ subcategoryUuid, data }, { rejectWithValue }) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        status: data.status,
      };
      if (data.teamUuid) {
        payload.teamUuid = data.teamUuid;
      }
      const response = await ApiClient.patch(
        `/quiz-subcategories/update/${subcategoryUuid}`,
        payload
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSubcategory = createAsyncThunk(
  'quiz/subcategories/delete',
  async (subcategoryUuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/quiz-subcategories/${subcategoryUuid}`);
      return { ...response, subcategoryUuid };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// ============ QUIZZES ============

export const fetchQuizzes = createAsyncThunk(
  'quiz/quizzes/fetch',
  async ({ subcategoryUuid, limit = 100, offset = 0 }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(
        `/quizzes?subcategoryUuid=${subcategoryUuid}&limit=${limit}&offset=${offset}`
      );
      return {
        quizzes: response.quizzes || [],
        subcategoryName: response.quizzes?.[0]?.subcategory?.name || '',
      };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchQuizById = createAsyncThunk(
  'quiz/quizzes/fetchById',
  async (quizUuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/quizzes/${quizUuid}`);
      return response.quiz || null;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const createQuiz = createAsyncThunk(
  'quiz/quizzes/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/quizzes/create', {
        title: data.title,
        description: data.description,
        categoryUuid: data.categoryUuid,
        subcategoryUuid: data.subcategoryUuid,
        passingScore: data.passingScore,
        passingScoreType: data.passingScoreType,
        status: data.status,
        timeLimitSeconds: data.timeLimitSeconds,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuiz = createAsyncThunk(
  'quiz/quizzes/update',
  async ({ quizUuid, data }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.patch(`/quizzes/update/${quizUuid}`, {
        title: data.title,
        description: data.description,
        categoryUuid: data.categoryUuid,
        subcategoryUuid: data.subcategoryUuid,
        passingScore: data.passingScore,
        passingScoreType: data.passingScoreType,
        status: data.status,
        timeLimitSeconds: data.timeLimitSeconds,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  'quiz/quizzes/delete',
  async (quizUuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.del(`/quizzes/${quizUuid}`);
      return { ...response, quizUuid };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// ============ QUIZ ATTEMPTS ============

export const startQuizAttempt = createAsyncThunk(
  'quiz/attempts/start',
  async (quizUuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post('/quiz-attempts/start', { quizUuid });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const submitQuizAttempt = createAsyncThunk(
  'quiz/attempts/submit',
  async ({ attemptUuid, answers }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/quiz-attempts/${attemptUuid}/submit`, {
        answers,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const startQuestion = createAsyncThunk(
  'quiz/attempts/startQuestion',
  async ({ attemptUuid, questionUuid }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(
        `/quiz-attempts/${attemptUuid}/questions/${questionUuid}/start`
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getMyQuizAttempts = createAsyncThunk(
  'quiz/attempts/getMy',
  async ({ quizUuid, limit = 10, offset = 0 }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(
        `/quiz-attempts/my-attempts?quizUuid=${quizUuid}&limit=${limit}&offset=${offset}`
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getAllUsersQuizAttempts = createAsyncThunk(
  'quiz/attempts/getAllUsers',
  async ({ quizUuid, limit = 10, offset = 0 }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(
        `/quiz-attempts/by-quiz/${quizUuid}?quizUuid=${quizUuid}&limit=${limit}&offset=${offset}`
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// ============ QUESTIONS ============

export const fetchQuestions = createAsyncThunk(
  'quiz/questions/fetch',
  async (quizUuid, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/quizzes/${quizUuid}/questions`);
      return response.questions || [];
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const createQuestion = createAsyncThunk(
  'quiz/questions/create',
  async ({ quizUuid, data }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/quizzes/${quizUuid}/questions/create`, {
        questionText: data.questionText,
        orderIndex: data.orderIndex,
        timeLimitSeconds: data.timeLimitSeconds,
        points: data.points,
        options: data.options,
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuestion = createAsyncThunk(
  'quiz/questions/update',
  async ({ quizUuid, questionUuid, data }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.patch(
        `/quizzes/${quizUuid}/questions/${questionUuid}`,
        {
          questionText: data.questionText,
          orderIndex: data.orderIndex,
          timeLimitSeconds: data.timeLimitSeconds,
          points: data.points,
          options: data.options,
        }
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  'quiz/questions/delete',
  async ({ quizUuid, questionUuid }, { rejectWithValue }) => {
    try {
      const response = await ApiClient.delete(
        `/quizzes/${quizUuid}/questions/${questionUuid}`
      );
      return { ...response, questionUuid };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);
