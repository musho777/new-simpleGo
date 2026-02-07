import { createSlice } from '@reduxjs/toolkit';

import {
  assignTeamToSubproject,
  createProject,
  createProjectType,
  createSubproject,
  createSubprojectType,
  editProject,
  editProjectType,
  editSubproject,
  editSubprojectType,
  getAttachedTeams,
  getProjectSubprojects,
  getProjectTypes,
  getProjects,
  getSubprojectTypes,
  getSubprojects,
  getSubprojectsToAssign,
  getTeamsToAssign,
  getTimezone,
  projectsAssignSubproject,
  projectsUnAssignSubproject,
  unassignTeamFromSubproject,
} from './projectsActions';

const initialState = {
  loading: {
    timezone: false,
    projects: false,
    subProjects: false,
    projectTypes: false,
    subProjectTypes: false,
    createProject: false,
    createProjectType: false,
    createSubproject: false,
    createSubprojectType: false,
    editProject: false,
    editProjectType: false,
    editSubproject: false,
    editSubprojectType: false,
    projectSubprojects: false,
    subprojectsToAssign: false,
    projectsUnAssignSubproject: false,
    projectsAssignSubproject: false,
    teamSubprojects: false,
    teamToAssign: false,
    assignTeamToSubproject: false,
    unassignTeamFromSubproject: false,
  },
  success: null,
  error: null,
  projects: [],
  types: [],
  subProjects: [],
  subTypes: [],
  timezone: [],
  projectSubprojects: [],
  subprojectsToAssign: [],
  teamSubprojects: [],
  teamToAssign: [],
  searchData: {
    limit: 10,
    offset: 0,
    name: '',
    disabled: false,
  },
  currentPage: 1,
  pagesCount: 0,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectsSearchData: (state, { payload }) => {
      state.searchData = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    resetProjectsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubprojectsToAssign.pending, (state) => {
        state.loading.subprojectsToAssign = true;
        state.error = null;
      })
      .addCase(getSubprojectsToAssign.fulfilled, (state, { payload }) => {
        state.loading.subprojectsToAssign = false;
        state.subprojectsToAssign = payload.subprojects;
      })
      .addCase(getSubprojectsToAssign.rejected, (state, { payload }) => {
        state.loading.subprojectsToAssign = false;
        state.error = payload;
      })

      // Get teams to assign to subprojects
      .addCase(getTeamsToAssign.pending, (state) => {
        state.loading.teamToAssign = true;
        state.error = null;
      })
      .addCase(getTeamsToAssign.fulfilled, (state, { payload }) => {
        state.loading.teamToAssign = false;
        state.teamToAssign = payload.teams;
      })
      .addCase(getTeamsToAssign.rejected, (state, { payload }) => {
        state.loading.teamToAssign = false;
        state.error = payload;
      })

      // Get attached teams
      .addCase(getAttachedTeams.pending, (state) => {
        state.loading.teamSubprojects = true;
        state.error = null;
      })
      .addCase(getAttachedTeams.fulfilled, (state, { payload }) => {
        state.loading.teamSubprojects = false;
        state.teamSubprojects = payload.teams;
      })
      .addCase(getAttachedTeams.rejected, (state, { payload }) => {
        state.loading.teamSubprojects = false;
        state.error = payload;
      })

      // Timezone
      .addCase(getTimezone.pending, (state) => {
        state.loading.timezone = true;
        state.error = null;
      })
      .addCase(getTimezone.fulfilled, (state, { payload }) => {
        state.loading.timezone = false;
        state.timezone = payload;
      })
      .addCase(getTimezone.rejected, (state, { payload }) => {
        state.loading.timezone = false;
        state.error = payload;
      })

      // Projects
      .addCase(getProjects.pending, (state) => {
        state.loading.projects = true;
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, { payload }) => {
        if (state.currentPage > Math.ceil(payload.count / 10)) {
          state.currentPage =
            Math.ceil(payload.count / 10) <= 1 ? 1 : Math.ceil(payload.count / 10);
        }
        state.loading.projects = false;
        state.projects = payload.projects;
        state.pagesCount = Math.ceil(payload.count / 10);
      })
      .addCase(getProjects.rejected, (state, { payload }) => {
        state.loading.projects = false;
        state.error = payload;
      })

      // Subprojects of projects
      .addCase(getProjectSubprojects.pending, (state) => {
        state.loading.projectSubprojects = true;
        state.error = null;
      })
      .addCase(getProjectSubprojects.fulfilled, (state, { payload }) => {
        state.loading.projectSubprojects = false;
        state.projectSubprojects = payload;
      })
      .addCase(getProjectSubprojects.rejected, (state, { payload }) => {
        state.loading.projectSubprojects = false;
        state.error = payload;
      })

      // Subprojects
      .addCase(getSubprojects.pending, (state) => {
        state.loading.subProjects = true;
        state.error = null;
      })
      .addCase(getSubprojects.fulfilled, (state, { payload }) => {
        state.loading.subProjects = false;
        state.subProjects = payload.subprojects;
        state.pagesCount = Math.ceil(payload.count / 10);
      })
      .addCase(getSubprojects.rejected, (state, { payload }) => {
        state.loading.subProjects = false;
        state.error = payload;
      })

      // Project Types
      .addCase(getProjectTypes.pending, (state) => {
        state.loading.projectTypes = true;
        state.error = null;
      })
      .addCase(getProjectTypes.fulfilled, (state, { payload }) => {
        state.loading.projectTypes = false;
        state.types = payload.projectTypes;
        state.pagesCount = Math.ceil(payload.count / 10);
      })
      .addCase(getProjectTypes.rejected, (state, { payload }) => {
        state.loading.projectTypes = false;
        state.error = payload;
      })

      // Subproject Types
      .addCase(getSubprojectTypes.pending, (state) => {
        state.loading.subProjectTypes = true;
        state.error = null;
      })
      .addCase(getSubprojectTypes.fulfilled, (state, { payload }) => {
        state.loading.subProjectTypes = false;
        state.subTypes = payload.subprojectTypes;
        state.pagesCount = Math.ceil(payload.count / 10);
      })
      .addCase(getSubprojectTypes.rejected, (state, { payload }) => {
        state.loading.subProjectTypes = false;
        state.error = payload;
      })

      // Create Project
      .addCase(createProject.pending, (state) => {
        state.loading.createProject = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createProject.fulfilled, (state) => {
        state.loading.createProject = false;
        state.success = true;
      })
      .addCase(createProject.rejected, (state, { payload }) => {
        state.loading.createProject = false;
        state.error = payload;
      })

      // Create Project Type
      .addCase(createProjectType.pending, (state) => {
        state.loading.createProjectType = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createProjectType.fulfilled, (state) => {
        state.loading.createProjectType = false;
        state.success = true;
      })
      .addCase(createProjectType.rejected, (state, { payload }) => {
        state.loading.createProjectType = false;
        state.error = payload;
      })

      // Create Subproject
      .addCase(createSubproject.pending, (state) => {
        state.loading.createSubproject = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createSubproject.fulfilled, (state) => {
        state.loading.createSubproject = false;
        state.success = true;
      })
      .addCase(createSubproject.rejected, (state, { payload }) => {
        state.loading.createSubproject = false;
        state.error = payload;
      })

      // Create Subproject Type
      .addCase(createSubprojectType.pending, (state) => {
        state.loading.createSubprojectType = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createSubprojectType.fulfilled, (state) => {
        state.loading.createSubprojectType = false;
        state.success = true;
      })
      .addCase(createSubprojectType.rejected, (state, { payload }) => {
        state.loading.createSubprojectType = false;
        state.error = payload;
      })

      // Edit Project
      .addCase(editProject.pending, (state) => {
        state.loading.editProject = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editProject.fulfilled, (state) => {
        state.loading.editProject = false;
        state.success = true;
      })
      .addCase(editProject.rejected, (state, { payload }) => {
        state.loading.editProject = false;
        state.error = payload;
      })

      // Edit Project Type
      .addCase(editProjectType.pending, (state) => {
        state.loading.editProjectType = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editProjectType.fulfilled, (state) => {
        state.loading.editProjectType = false;
        state.success = true;
      })
      .addCase(editProjectType.rejected, (state, { payload }) => {
        state.loading.editProjectType = false;
        state.error = payload;
      })

      // Edit Subproject
      .addCase(editSubproject.pending, (state) => {
        state.loading.editSubproject = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editSubproject.fulfilled, (state) => {
        state.loading.editSubproject = false;
        state.success = true;
      })
      .addCase(editSubproject.rejected, (state, { payload }) => {
        state.loading.editSubproject = false;
        state.error = payload;
      })

      // Edit Subproject Type
      .addCase(editSubprojectType.pending, (state) => {
        state.loading.editSubprojectType = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editSubprojectType.fulfilled, (state) => {
        state.loading.editSubprojectType = false;
        state.success = true;
      })
      .addCase(editSubprojectType.rejected, (state, { payload }) => {
        state.loading.editSubprojectType = false;
        state.error = payload;
      })

      // Assign subproject to project
      .addCase(projectsAssignSubproject.pending, (state) => {
        state.loading.projectsAssignSubproject = true;
        state.error = null;
        state.success = null;
      })
      .addCase(projectsAssignSubproject.fulfilled, (state) => {
        state.loading.projectsAssignSubproject = false;
        state.success = true;
      })
      .addCase(projectsAssignSubproject.rejected, (state, { payload }) => {
        state.loading.projectsAssignSubproject = false;
        state.error = payload;
      })

      // Assign team to subproject
      .addCase(assignTeamToSubproject.pending, (state) => {
        state.loading.assignTeamToSubproject = true;
        state.error = null;
        state.success = null;
      })
      .addCase(assignTeamToSubproject.fulfilled, (state) => {
        state.loading.assignTeamToSubproject = false;
        state.success = true;
      })
      .addCase(assignTeamToSubproject.rejected, (state, { payload }) => {
        state.loading.assignTeamToSubproject = false;
        state.error = payload;
      })

      // Remove subproject from project
      .addCase(projectsUnAssignSubproject.pending, (state) => {
        state.loading.projectsUnAssignSubproject = true;
        state.error = null;
        state.success = null;
      })
      .addCase(projectsUnAssignSubproject.fulfilled, (state) => {
        state.loading.projectsUnAssignSubproject = false;
        state.success = true;
      })
      .addCase(projectsUnAssignSubproject.rejected, (state, { payload }) => {
        state.loading.projectsUnAssignSubproject = false;
        state.error = payload;
      })

      // Remove team from subproject
      .addCase(unassignTeamFromSubproject.pending, (state) => {
        state.loading.unassignTeamFromSubproject = true;
        state.error = null;
        state.success = null;
      })
      .addCase(unassignTeamFromSubproject.fulfilled, (state) => {
        state.loading.unassignTeamFromSubproject = false;
        state.success = true;
      })
      .addCase(unassignTeamFromSubproject.rejected, (state, { payload }) => {
        state.loading.unassignTeamFromSubproject = false;
        state.error = payload;
      });
  },
});

export const { setProjectsSearchData, setCurrentPage, resetProjectsState } =
  projectsSlice.actions;

export const selectLoading = (state) => state.projects.loading;
export const selectSuccess = (state) => state.projects.success;
export const selectProjects = (state) => state.projects.projects;
export const selectSubProjects = (state) => state.projects.subProjects;
export const selectProjectTypes = (state) => state.projects.types;
export const selectSubprojectTypes = (state) => state.projects.subTypes;
export const selectTimezone = (state) => state.projects.timezone;
export const selectProjectSubprojects = (state) => state.projects.projectSubprojects;
export const selectSubprojectsToAssign = (state) => state.projects.subprojectsToAssign;
export const selectTeamsToAssign = (state) => state.projects.teamToAssign;
export const selectTeamSubprojects = (state) => state.projects.teamSubprojects;
export const selectCurrentPage = (state) => state.projects.currentPage;
export const selectPagesCount = (state) => state.projects.pagesCount;
export const selectProjectsSearchData = (state) => state.projects.searchData;

export default projectsSlice.reducer;
