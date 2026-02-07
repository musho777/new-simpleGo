import ApiClient from 'api/axiosClient';

// ============ CATEGORIES API ============

export const fetchCategories = async (limit = 12, offset = 0) => {
  const response = await ApiClient.get(`/quiz-categories?limit=${limit}&offset=${offset}`);
  const categories = response.categories || [];
  // Support various count field names that backend might return
  const count = response.count ?? response.total ?? response.totalCount ?? categories.length;
  return {
    categories,
    count,
  };
};

export const fetchCategoryById = async (categoryUuid) => {
  const response = await ApiClient.get(`/quiz-categories/${categoryUuid}`);
  return response.category || null;
};

export const createCategory = async (data) => {
  const response = await ApiClient.post('/quiz-categories/create', {
    name: data.name,
    description: data.description,
    departmentUuids: data.departmentUuids,
    branchUuids: data.branchUuids,
    teamUuids: data.teamUuids,
    status: data.status,
  });
  return response;
};

export const updateCategory = async (categoryUuid, data) => {
  const response = await ApiClient.patch(`/quiz-categories/update/${categoryUuid}`, {
    name: data.name,
    description: data.description,
    departmentUuids: data.departmentUuids,
    branchUuids: data.branchUuids,
    teamUuids: data.teamUuids,
    status: data.status,
  });
  return response;
};

export const deleteCategory = async (categoryUuid) => {
  const response = await ApiClient.del(`/quiz-categories/${categoryUuid}`);
  return response;
};

// ============ SUBCATEGORIES API ============

export const fetchSubcategoriesByCategory = async (categoryUuid, limit = 12, offset = 0) => {
  const response = await ApiClient.get(
    `/quiz-subcategories/by-category/${categoryUuid}?limit=${limit}&offset=${offset}`
  );
  const subcategories = response.subcategories || [];
  const count =
    response.count ?? response.total ?? response.totalCount ?? subcategories.length;
  return {
    subcategories,
    count,
  };
};

export const createSubcategory = async (data) => {
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
};

export const updateSubcategory = async (subcategoryUuid, data) => {
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
};

export const deleteSubcategory = async (subcategoryUuid) => {
  const response = await ApiClient.del(`/quiz-subcategories/${subcategoryUuid}`);
  return response;
};

// ============ QUIZZES API ============

export const fetchQuizzes = async (subcategoryUuid, limit = 12, offset = 0) => {
  const response = await ApiClient.get(
    `/quizzes?subcategoryUuid=${subcategoryUuid}&limit=${limit}&offset=${offset}`
  );
  const quizzes = response.quizzes || [];
  const count = response.count ?? response.total ?? response.totalCount ?? quizzes.length;
  return {
    quizzes,
    count,
    subcategoryName: response.quizzes?.[0]?.subcategory?.name || '',
  };
};

export const fetchQuizById = async (quizUuid) => {
  const response = await ApiClient.get(`/quizzes/${quizUuid}`);
  return response.quiz || null;
};

export const createQuiz = async (data) => {
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
};

export const updateQuiz = async (quizUuid, data) => {
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
};

export const deleteQuiz = async (quizUuid) => {
  const response = await ApiClient.del(`/quizzes/${quizUuid}`);
  return response;
};

// ============ QUIZ ATTEMPTS API ============

export const startQuizAttempt = async (quizUuid) => {
  const response = await ApiClient.post('/quiz-attempts/start', { quizUuid });
  return response;
};

export const submitQuizAttempt = async (
  attemptUuid,
  userAnswers,
  questions = [],
  timedOutQuestions = new Set(),
  isQuizTimedOut = false
) => {
  // Transform userAnswers object into the required API format
  // userAnswers stores arrays for both single and multiple answer questions
  // timedOutQuestions is a Set of question UUIDs that timed out individually
  // isQuizTimedOut is true when the entire quiz timer expired
  const answers = questions.map((question) => {
    const selectedOptions = userAnswers[question.uuid] || [];
    const questionTimedOut = timedOutQuestions.has(question.uuid) || isQuizTimedOut;
    return {
      questionUuid: question.uuid,
      selectedOptionUuids: Array.isArray(selectedOptions)
        ? selectedOptions
        : [selectedOptions],
      isTimedOut: questionTimedOut,
    };
  });

  const response = await ApiClient.post(`/quiz-attempts/${attemptUuid}/submit`, { answers });
  return response;
};

export const startQuestion = async (attemptUuid, questionUuid) => {
  const response = await ApiClient.post(
    `/quiz-attempts/${attemptUuid}/questions/${questionUuid}/start`
  );
  return response;
};

export const getMyQuizAttempts = async (quizUuid, limit = 12, offset = 0) => {
  const response = await ApiClient.get(
    `/quiz-attempts/my-attempts?quizUuid=${quizUuid}&limit=${limit}&offset=${offset}`
  );
  const attempts = response.attempts || [];
  const count = response.count ?? response.total ?? response.totalCount ?? attempts.length;
  return {
    attempts,
    count,
  };
};

export const getAllUsersQuizAttempts = async (quizUuid, limit = 12, offset = 0) => {
  const response = await ApiClient.get(
    `/quiz-attempts/by-quiz/${quizUuid}?limit=${limit}&offset=${offset}`
  );
  const attempts = response.attempts || [];
  const count = response.count ?? response.total ?? response.totalCount ?? attempts.length;
  return {
    attempts,
    count,
  };
};

// ============ QUESTIONS API ============

export const fetchQuestions = async (quizUuid) => {
  const response = await ApiClient.get(`/quizzes/${quizUuid}/questions`);
  return response.questions || [];
};

export const createQuestion = async (quizUuid, data) => {
  const response = await ApiClient.post(`/quizzes/${quizUuid}/questions/create`, {
    questionText: data.questionText,
    orderIndex: data.orderIndex,
    timeLimitSeconds: data.timeLimitSeconds,
    points: data.points,
    options: data.options,
    allowMultipleAnswers: data.allowMultipleAnswers,
  });
  return response;
};

export const updateQuestion = async (quizUuid, questionUuid, data) => {
  const response = await ApiClient.patch(`/quizzes/${quizUuid}/questions/${questionUuid}`, {
    questionText: data.questionText,
    orderIndex: data.orderIndex,
    timeLimitSeconds: data.timeLimitSeconds,
    points: data.points,
    options: data.options,
    allowMultipleAnswers: data.allowMultipleAnswers,
  });
  return response;
};

export const deleteQuestion = async (quizUuid, questionUuid) => {
  const response = await ApiClient.del(`/quizzes/${quizUuid}/questions/${questionUuid}`);
  return response;
};

// ============ DEPARTMENTS/BRANCHES/TEAMS API ============

export const fetchDepartments = async () => {
  const response = await ApiClient.get('/departments');
  return response.departments || [];
};

export const fetchDepartmentById = async (departmentUuid) => {
  const response = await ApiClient.get(`/departments/${departmentUuid}`);
  return response.department || null;
};

export const fetchBranchesByDepartment = async (departmentUuid) => {
  const response = await ApiClient.get(
    `/branches?departmentId=${departmentUuid}&limit=100&offset=0`
  );
  return response.branches || [];
};

export const fetchBranchesForDepartments = async (departmentUuids) => {
  const allBranches = [];
  await Promise.all(
    departmentUuids.map(async (deptUuid) => {
      const branches = await fetchBranchesByDepartment(deptUuid);
      allBranches.push(...branches);
    })
  );
  return allBranches;
};

/**
 * Fetch branches for quiz category by department UUID
 * Uses the quiz-specific endpoint that returns branches relevant for quiz categories
 */
export const fetchQuizBranchesByDepartment = async (departmentUuid) => {
  const response = await ApiClient.get(
    `/quiz-categories/branches-by-department?departmentUuid=${departmentUuid}`
  );
  return response.branches || response || [];
};

/**
 * Fetch branches for multiple departments using the quiz-specific endpoint
 */
export const fetchQuizBranchesForDepartments = async (departmentUuids) => {
  const allBranches = [];
  const seenUuids = new Set();

  await Promise.all(
    departmentUuids.map(async (deptUuid) => {
      const branches = await fetchQuizBranchesByDepartment(deptUuid);
      branches.forEach((branch) => {
        if (!seenUuids.has(branch.uuid)) {
          seenUuids.add(branch.uuid);
          allBranches.push(branch);
        }
      });
    })
  );

  return allBranches;
};

export const fetchBranchById = async (branchUuid) => {
  const response = await ApiClient.get(`/branches/${branchUuid}`);
  return response.branch || null;
};

export const fetchTeamsByBranch = async (branchUuid) => {
  const response = await ApiClient.get(`/teams?branchId=${branchUuid}&limit=100&offset=0`);
  return response.teams || [];
};

export const fetchTeamsForBranches = async (branchUuids) => {
  const allTeams = [];
  await Promise.all(
    branchUuids.map(async (branchUuid) => {
      const teams = await fetchTeamsByBranch(branchUuid);
      allTeams.push(...teams);
    })
  );
  return allTeams;
};

export const fetchTeamById = async (teamUuid) => {
  const response = await ApiClient.get(`/teams/${teamUuid}`);
  return response.team || null;
};

// ============ ATTEMPT DETAILS API ============

export const getAttemptDetails = async (attemptUuid) => {
  const response = await ApiClient.get(`/quiz-attempts/${attemptUuid}/details`);
  return response;
};
