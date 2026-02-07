import { createSlice } from '@reduxjs/toolkit';

import {
  addLeadNote,
  assignCustomerToLead,
  assignProjectOffers,
  assignSubprojectSources,
  checkCustomerExists,
  createFollowUp,
  createImportLead,
  createLeadB2B,
  createLeadB2C,
  createLeadOrder,
  editLeadVisibility,
  getLeadById,
  getLeadFollowUps,
  getLeadSources,
  getLeadVisibility,
  getLeadsMetrics,
  getMostSoldOffers,
  getNextContactRules,
  getOffers,
  getPreviousSalesScriptStep,
  getProducts,
  getProjectOffers,
  getSalesFunnel,
  getSalesFunnelAnalytics,
  getSalesLeads,
  getSalesOverview,
  getSalesProjects,
  getSalesScriptAgent,
  getSalesScriptEnhanced,
  getSalesScripts,
  getSalesSubproject,
  getSubprojectSources,
  getTopPerformingEmployees,
  getUserPrivileges,
  getWorkflowStatuses,
  getWorkflowStatusesByPrivilege,
  navigateSalesScript,
  nextLeadStep,
  removeProjectOffers,
  removeSubprojectSources,
  searchLeadByPhone,
  updateFollowUp,
  updateLeadB2BDetails,
  updateLeadB2CDetails,
  updateLeadStatus,
} from './salesActions';

const initialState = {
  success: {
    assign: false,
    remove: false,
    createLeadB2BSuccess: false,
    createLeadB2CSuccess: false,
    addNoteSuccess: false,
    addOrderSucccess: false,
    nextLeadStepSuccess: false,
    updateLeadStatusSuccess: false,
    updateLeadB2BSuccess: false,
    updateLeadB2CSuccess: false,
    createFollowUpSuccess: false,
    updateFollowUpSuccess: false,
    checkCustomerExistsSuccess: false,
    validateCustomerSuccess: false,
    assignCustomerSuccess: false,
  },
  leadSources: {
    items: [],
    count: 0,
  },
  salesScripts: {
    items: [],
    count: 0,
  },
  salesScriptEnhanced: null,
  salesScriptAgent: null,
  products: {
    items: [],
    count: 0,
  },
  offers: {
    items: [],
    count: 0,
  },
  workflowStatuses: {
    items: [],
    count: 0,
  },
  workflowStatusesByPrivilege: {
    items: [],
    count: 0,
  },
  userPrivilege: {
    items: [],
    count: 0,
  },
  leadVisibility: {
    data: null,
  },
  leadFollowUps: [],
  salesFunnel: [],
  salesOverview: {
    leadMetrics: {
      totalLeads: 0,
      leadsAddedInPeriod: 0,
      convertedLeads: 0,
      lostLeads: 0,
      conversionRate: 0,
    },
    revenueMetrics: {
      totalRevenueFromLeads: 0,
      totalRevenueFromOffers: 0,
      revenueByDepartment: {},
      revenueByBranch: {},
    },
    salesFunnel: {
      funnel: [],
      totalLeadsInFunnel: 0,
      overallConversionRate: 0,
    },
    topEmployees: [],
    leastEmployees: [],
    topDepartments: [],
    leastDepartments: [],
    topBranches: [],
    leastBranches: [],
    topTeams: [],
    leastTeams: [],
    topLeadAddersByEmployee: [],
    topLeadAddersByDepartment: [],
    topStatusChangesByEmployee: [],
    topStatusChangesByDepartment: [],
    mostSoldOffers: [],
  },
  leadsMetrics: {
    totalLeads: 0,
    addedLeads: 0,
    convertedLeads: 0,
    lostLeads: 0,
    conversionRate: 0,
  },
  salesFunnelAnalytics: [],
  mostSoldOffers: [],
  topPerformingEmployees: [],
  nextContactRules: [],
  subprojectSources: {
    attachedSources: [],
    unattachedSources: [],
  },
  projectOffers: {
    attachedOffers: [],
    unattachedOffers: [],
  },
  projects: {
    items: [],
  },
  leads: {
    items: [],
    count: 0,
  },
  subproject: null,
  nextLeadId: null,
  newLeadUuid: null,
  leadById: null,
  customerExists: null,
  customerValidation: null,
  assignedCustomer: null,
  isLoading: {
    leadSources: false,
    salesScripts: false,
    salesScriptEnhanced: false,
    salesScriptAgent: false,
    products: false,
    updateLeadB2C: false,
    offers: false,
    createLeadB2B: false,
    createLeadB2C: false,
    workflowStatuses: false,
    workflowStatusesByPrivilege: false,
    nextLeadStep: false,
    userPrivilege: false,
    subprojectSources: false,
    projectOffers: false,
    importing: false,
    salesProjects: false,
    salesSubproject: false,
    leads: false,
    getLeadById: false,
    addLeadNote: false,
    addOrder: false,
    updateLeadStatus: false,
    checkCustomerExists: false,
    assignCustomer: false,
    updateLeadB2B: false,
    searchPhone: false,
    leadVisibility: false,
    createFollowUp: false,
    updateFollowUp: false,
    leadFollowUps: false,
    salesFunnel: false,
    salesOverview: false,
    leadsMetrics: false,
    salesFunnelAnalytics: false,
    mostSoldOffers: false,
    topPerformingEmployees: false,
    nextContactRules: false,
  },
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setResetAssignSuccess: (state) => {
      state.success.assign = false;
      state.success.remove = false;
    },
    setResetCustomerExistsSuccess: (state) => {
      state.success.checkCustomerExistsSuccess = false;
    },
    setResetSubprojectSources: (state) => {
      state.subprojectSources = {
        attachedSources: [],
        unattachedSources: [],
      };
    },
    setResetProjectOffer: (state) => {
      state.projectOffers = {
        attachedOffers: [],
        unattachedOffers: [],
      };
    },
    setResetLeadById: (state) => {
      state.leadById = null;
    },
    setSalesScriptAgent: (state, action) => {
      state.salesScriptAgent = action.payload;
    },
    setResetAll: () => initialState,
    moveSourcesToAttached: (state, action) => {
      const sourceIds = action.payload;
      const sourcesToMove = state.subprojectSources.unattachedSources.filter((src) =>
        sourceIds.includes(src.uuid)
      );
      state.subprojectSources.attachedSources.push(...sourcesToMove);
      state.subprojectSources.unattachedSources =
        state.subprojectSources.unattachedSources.filter(
          (src) => !sourceIds.includes(src.uuid)
        );
    },
    moveSourcesToUnattached: (state, action) => {
      const sourceIds = action.payload;
      const sourcesToMove = state.subprojectSources.attachedSources.filter((src) =>
        sourceIds.includes(src.uuid)
      );
      state.subprojectSources.unattachedSources.push(...sourcesToMove);
      state.subprojectSources.attachedSources = state.subprojectSources.attachedSources.filter(
        (src) => !sourceIds.includes(src.uuid)
      );
    },
    moveOffersToAttached: (state, action) => {
      const offerIds = action.payload;
      const offersToMove = state.projectOffers.unattachedOffers.filter((offer) =>
        offerIds.includes(offer.uuid)
      );
      state.projectOffers.attachedOffers.push(...offersToMove);
      state.projectOffers.unattachedOffers = state.projectOffers.unattachedOffers.filter(
        (offer) => !offerIds.includes(offer.uuid)
      );
    },
    moveOffersToUnattached: (state, action) => {
      const offerIds = action.payload;
      const offersToMove = state.projectOffers.attachedOffers.filter((offer) =>
        offerIds.includes(offer.uuid)
      );
      state.projectOffers.unattachedOffers.push(...offersToMove);
      state.projectOffers.attachedOffers = state.projectOffers.attachedOffers.filter(
        (offer) => !offerIds.includes(offer.uuid)
      );
    },
  },
  extraReducers: (builder) => {
    // Lead Sources
    builder
      .addCase(getLeadSources.pending, (state) => {
        state.isLoading.leadSources = true;
      })
      .addCase(getLeadSources.fulfilled, (state, action) => {
        state.leadSources = action.payload;
        state.isLoading.leadSources = false;
      })
      .addCase(getLeadSources.rejected, (state) => {
        state.isLoading.leadSources = false;
      });

    // Sales Scripts
    builder
      .addCase(getSalesScripts.pending, (state) => {
        state.isLoading.salesScripts = true;
      })
      .addCase(getSalesScripts.fulfilled, (state, action) => {
        state.salesScripts = action.payload;
        state.isLoading.salesScripts = false;
      })
      .addCase(getSalesScripts.rejected, (state) => {
        state.isLoading.salesScripts = false;
      });

    // Sales Script Enhanced
    builder
      .addCase(getSalesScriptEnhanced.pending, (state) => {
        state.isLoading.salesScriptEnhanced = true;
      })
      .addCase(getSalesScriptEnhanced.fulfilled, (state, action) => {
        state.salesScriptEnhanced = action.payload;
        state.isLoading.salesScriptEnhanced = false;
      })
      .addCase(getSalesScriptEnhanced.rejected, (state) => {
        state.isLoading.salesScriptEnhanced = false;
      });

    // Sales Script Agent
    builder
      .addCase(getSalesScriptAgent.pending, (state) => {
        state.isLoading.salesScriptAgent = true;
      })
      .addCase(getSalesScriptAgent.fulfilled, (state, action) => {
        state.salesScriptAgent = action.payload;
        state.isLoading.salesScriptAgent = false;
      })
      .addCase(getSalesScriptAgent.rejected, (state) => {
        state.isLoading.salesScriptAgent = false;
      });

    // Products
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading.products = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading.products = false;
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading.products = false;
      });

    // Offers
    builder
      .addCase(getOffers.pending, (state) => {
        state.isLoading.offers = true;
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading.offers = false;
      })
      .addCase(getOffers.rejected, (state) => {
        state.isLoading.offers = false;
      });

    // Workflow Statuses
    builder
      .addCase(getWorkflowStatuses.pending, (state) => {
        state.isLoading.workflowStatuses = true;
      })
      .addCase(getWorkflowStatuses.fulfilled, (state, action) => {
        state.workflowStatuses = action.payload;
        state.isLoading.workflowStatuses = false;
      })
      .addCase(getWorkflowStatuses.rejected, (state) => {
        state.isLoading.workflowStatuses = false;
      });

    // Workflow Statuses By Privilege
    builder
      .addCase(getWorkflowStatusesByPrivilege.pending, (state) => {
        state.isLoading.workflowStatusesByPrivilege = true;
      })
      .addCase(getWorkflowStatusesByPrivilege.fulfilled, (state, action) => {
        state.workflowStatusesByPrivilege.items = action.payload;
        state.isLoading.workflowStatusesByPrivilege = false;
      })
      .addCase(getWorkflowStatusesByPrivilege.rejected, (state) => {
        state.isLoading.workflowStatusesByPrivilege = false;
      });

    // User Privileges
    builder
      .addCase(getUserPrivileges.pending, (state) => {
        state.isLoading.userPrivilege = true;
      })
      .addCase(getUserPrivileges.fulfilled, (state, action) => {
        state.userPrivilege = action.payload;
        state.isLoading.userPrivilege = false;
      })
      .addCase(getUserPrivileges.rejected, (state) => {
        state.isLoading.userPrivilege = false;
      });

    // Subproject Sources
    builder
      .addCase(getSubprojectSources.pending, (state) => {
        state.isLoading.subprojectSources = true;
      })
      .addCase(getSubprojectSources.fulfilled, (state, { payload }) => {
        state.subprojectSources.attachedSources = payload.attachedSources;
        state.subprojectSources.unattachedSources = payload.unattachedSources;
        state.isLoading.subprojectSources = false;
      })
      .addCase(getSubprojectSources.rejected, (state) => {
        state.isLoading.subprojectSources = false;
      });

    // Assign Subproject Sources
    builder
      .addCase(assignSubprojectSources.pending, (state) => {
        state.success.assign = false;
      })
      .addCase(assignSubprojectSources.fulfilled, (state) => {
        state.success.assign = true;
      })
      .addCase(assignSubprojectSources.rejected, (state) => {
        state.success.assign = false;
      });

    // Remove Subproject Sources
    builder
      .addCase(removeSubprojectSources.pending, (state) => {
        state.success.remove = false;
      })
      .addCase(removeSubprojectSources.fulfilled, (state) => {
        state.success.remove = true;
      })
      .addCase(removeSubprojectSources.rejected, (state) => {
        state.success.remove = false;
      });

    // Project Offers
    builder
      .addCase(getProjectOffers.pending, (state) => {
        state.isLoading.projectOffers = true;
      })
      .addCase(getProjectOffers.fulfilled, (state, { payload }) => {
        state.projectOffers.attachedOffers = payload.attachedOffers;
        state.projectOffers.unattachedOffers = payload.unattachedOffers;
        state.isLoading.projectOffers = false;
      })
      .addCase(getProjectOffers.rejected, (state) => {
        state.isLoading.projectOffers = false;
      });

    builder
      .addCase(assignProjectOffers.pending, (state) => {
        state.success.assign = false;
      })
      .addCase(assignProjectOffers.fulfilled, (state) => {
        state.success.assign = true;
      })
      .addCase(assignProjectOffers.rejected, (state) => {
        state.success.assign = false;
      });

    builder
      .addCase(removeProjectOffers.pending, (state) => {
        state.success.remove = false;
      })
      .addCase(removeProjectOffers.fulfilled, (state) => {
        state.success.remove = true;
      })
      .addCase(removeProjectOffers.rejected, (state) => {
        state.success.remove = false;
      });

    //  Import Leads
    builder
      .addCase(createImportLead.pending, (state) => {
        state.isLoading.importing = true;
      })
      .addCase(createImportLead.fulfilled, (state) => {
        state.isLoading.importing = false;
      })
      .addCase(createImportLead.rejected, (state) => {
        state.isLoading.importing = false;
      });
    // Sales Dashboard
    builder
      .addCase(getSalesProjects.pending, (state) => {
        state.isLoading.salesProjects = true;
      })
      .addCase(getSalesProjects.fulfilled, (state, action) => {
        state.projects.items = action.payload;
        state.isLoading.salesProjects = false;
      })
      .addCase(getSalesProjects.rejected, (state) => {
        state.isLoading.salesProjects = false;
      });
    // Sales Subprojects
    builder
      .addCase(getSalesSubproject.pending, (state) => {
        state.isLoading.salesSubproject = true;
        state.subproject = null; // optional: clear previous data while loading
      })
      .addCase(getSalesSubproject.fulfilled, (state, action) => {
        state.isLoading.salesSubproject = false;
        state.subproject = action.payload;
      })
      .addCase(getSalesSubproject.rejected, (state) => {
        state.isLoading.salesSubproject = false;
        state.subproject = null;
      });

    // Sales Leads
    builder
      .addCase(getSalesLeads.pending, (state) => {
        state.isLoading.leads = true;
      })
      .addCase(getSalesLeads.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.isLoading.leads = false;
      })
      .addCase(getSalesLeads.rejected, (state) => {
        state.isLoading.leads = false;
      });

    // Create Lead B2B
    builder
      .addCase(createLeadB2B.pending, (state) => {
        state.isLoading.createLeadB2B = true;
        state.success.createLeadB2BSuccess = false;
      })
      .addCase(createLeadB2B.fulfilled, (state, { payload }) => {
        state.isLoading.createLeadB2B = false;
        state.success.createLeadB2BSuccess = true;
        state.newLeadUuid = payload.leadId;
      })
      .addCase(createLeadB2B.rejected, (state) => {
        state.isLoading.createLeadB2B = false;
        state.success.createLeadB2BSuccess = false;
      });

    builder
      .addCase(createLeadB2C.pending, (state) => {
        state.isLoading.createLeadB2C = true;
        state.success.createLeadB2CSuccess = false;
      })
      .addCase(createLeadB2C.fulfilled, (state, { payload }) => {
        state.isLoading.createLeadB2C = false;
        state.success.createLeadB2CSuccess = true;
        state.newLeadUuid = payload.leadId;
      })
      .addCase(createLeadB2C.rejected, (state) => {
        state.isLoading.createLeadB2C = false;
        state.success.createLeadB2CSuccess = false;
      });

    //get lead by uuid
    builder
      .addCase(getLeadById.pending, (state) => {
        state.isLoading.getLeadById = true;
      })
      .addCase(getLeadById.fulfilled, (state, action) => {
        state.leadById = action.payload;
        state.isLoading.getLeadById = false;
      })
      .addCase(getLeadById.rejected, (state) => {
        state.isLoading.getLeadById = false;
      });

    //add note
    builder
      .addCase(addLeadNote.pending, (state) => {
        state.isLoading.addLeadNote = true;
        state.success.addNoteSuccess = false;
      })
      .addCase(addLeadNote.fulfilled, (state) => {
        state.isLoading.addLeadNote = false;
        state.success.addNoteSuccess = true;
      })
      .addCase(addLeadNote.rejected, (state) => {
        state.isLoading.addLeadNote = false;
        state.success.addNoteSuccess = false;
      });
    builder
      .addCase(createLeadOrder.pending, (state) => {
        state.isLoading.addOrder = true;
        state.success.addOrderSucccess = false;
      })
      .addCase(createLeadOrder.fulfilled, (state) => {
        state.isLoading.addOrder = false;
        state.success.addOrderSucccess = true;
      })
      .addCase(createLeadOrder.rejected, (state) => {
        state.isLoading.addOrder = false;
        state.success.addOrderSucccess = false;
      });
    //next Lead
    builder
      .addCase(nextLeadStep.pending, (state) => {
        state.isLoading.nextLeadStep = true;
        state.success.nextLeadStepSuccess = false;
      })
      .addCase(nextLeadStep.fulfilled, (state, { payload }) => {
        state.isLoading.nextLeadStep = false;
        state.success.nextLeadStepSuccess = true;
        state.nextLeadId = payload;
      })
      .addCase(nextLeadStep.rejected, (state, action) => {
        state.isLoading.nextLeadStep = false;
        state.success.nextLeadStepSuccess = false;
        state.error = action.payload;
      });
    //check Customer Exists
    builder
      .addCase(checkCustomerExists.pending, (state) => {
        state.isLoading.checkCustomerExists = true;
        state.success.checkCustomerExistsSuccess = false;
        state.customerExists = null;
      })
      .addCase(checkCustomerExists.fulfilled, (state, action) => {
        state.isLoading.checkCustomerExists = false;
        state.success.checkCustomerExistsSuccess = true;
        state.customerExists = action.payload;
      })
      .addCase(checkCustomerExists.rejected, (state, action) => {
        state.isLoading.checkCustomerExists = false;
        state.success.checkCustomerExistsSuccess = false;
        state.customerExists = null;
      });

    //assign Customer
    builder
      .addCase(assignCustomerToLead.pending, (state) => {
        state.isLoading.assignCustomer = true;
        state.success.assignCustomerSuccess = false;
        state.assignedCustomer = null;
      })
      .addCase(assignCustomerToLead.fulfilled, (state, action) => {
        state.isLoading.assignCustomer = false;
        state.success.assignCustomerSuccess = true;
        state.assignedCustomer = action.payload;
      })
      .addCase(assignCustomerToLead.rejected, (state, action) => {
        state.isLoading.assignCustomer = false;
        state.success.assignCustomerSuccess = false;
        state.assignedCustomer = null;
      });

    //update Status
    builder
      .addCase(updateLeadStatus.pending, (state) => {
        state.isLoading.updateLeadStatus = true;
        state.success.updateLeadStatusSuccess = false;
      })
      .addCase(updateLeadStatus.fulfilled, (state) => {
        state.isLoading.updateLeadStatus = false;
        state.success.updateLeadStatusSuccess = true;
      })
      .addCase(updateLeadStatus.rejected, (state, action) => {
        state.isLoading.updateLeadStatus = false;
        state.success.updateLeadStatusSuccess = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateLeadB2BDetails.pending, (state) => {
        state.isLoading.updateLeadB2B = true;
        state.success.updateLeadB2BSuccess = false;
      })
      .addCase(updateLeadB2BDetails.fulfilled, (state) => {
        state.isLoading.updateLeadB2B = false;
        state.success.updateLeadB2BSuccess = true;
      })
      .addCase(updateLeadB2BDetails.rejected, (state, action) => {
        state.isLoading.updateLeadB2B = false;
        state.success.updateLeadB2BSuccess = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateLeadB2CDetails.pending, (state) => {
        state.isLoading.updateLeadB2C = true;
        state.success.updateLeadB2CSuccess = false;
      })
      .addCase(updateLeadB2CDetails.fulfilled, (state) => {
        state.isLoading.updateLeadB2C = false;
        state.success.updateLeadB2CSuccess = true;
      })
      .addCase(updateLeadB2CDetails.rejected, (state, action) => {
        state.isLoading.updateLeadB2C = false;
        state.success.updateLeadB2CSuccess = false;
        state.error = action.payload;
      });

    builder
      .addCase(searchLeadByPhone.pending, (state) => {
        state.isLoading.searchPhone = true;
        state.result = null;
        state.error = null;
      })
      .addCase(searchLeadByPhone.fulfilled, (state, action) => {
        state.isLoading.searchPhone = false;
        state.result = action.payload;
      })
      .addCase(searchLeadByPhone.rejected, (state, action) => {
        state.isLoading.searchPhone = false;
        state.result = null;
        state.error = action.payload;
      });

    builder
      .addCase(navigateSalesScript.pending, (state) => {})
      .addCase(navigateSalesScript.fulfilled, (state, action) => {
        state.salesScriptAgent = action.payload;
      })
      .addCase(navigateSalesScript.rejected, (state, action) => {});

    builder
      .addCase(getPreviousSalesScriptStep.pending, (state) => {})
      .addCase(getPreviousSalesScriptStep.fulfilled, (state, action) => {
        state.salesScriptAgent = action.payload;
      })
      .addCase(getPreviousSalesScriptStep.rejected, (state, action) => {});

    // Lead Visibility
    builder
      .addCase(getLeadVisibility.pending, (state) => {
        state.isLoading.leadVisibility = true;
      })
      .addCase(getLeadVisibility.fulfilled, (state, action) => {
        state.leadVisibility.data = action.payload;
        state.isLoading.leadVisibility = false;
      })
      .addCase(getLeadVisibility.rejected, (state) => {
        state.isLoading.leadVisibility = false;
      });

    // Edit Lead Visibility
    builder
      .addCase(editLeadVisibility.pending, (state) => {
        state.isLoading.leadVisibility = true;
      })
      .addCase(editLeadVisibility.fulfilled, (state, action) => {
        state.leadVisibility.data = action.payload;
        state.isLoading.leadVisibility = false;
      })
      .addCase(editLeadVisibility.rejected, (state) => {
        state.isLoading.leadVisibility = false;
      });

    // Create Follow Up
    builder
      .addCase(createFollowUp.pending, (state) => {
        state.isLoading.createFollowUp = true;
        state.success.createFollowUpSuccess = false;
      })
      .addCase(createFollowUp.fulfilled, (state) => {
        state.isLoading.createFollowUp = false;
        state.success.createFollowUpSuccess = true;
      })
      .addCase(createFollowUp.rejected, (state) => {
        state.isLoading.createFollowUp = false;
        state.success.createFollowUpSuccess = false;
      });

    // Update Follow Up
    builder
      .addCase(updateFollowUp.pending, (state) => {
        state.isLoading.updateFollowUp = true;
        state.success.updateFollowUpSuccess = false;
      })
      .addCase(updateFollowUp.fulfilled, (state) => {
        state.isLoading.updateFollowUp = false;
        state.success.updateFollowUpSuccess = true;
      })
      .addCase(updateFollowUp.rejected, (state) => {
        state.isLoading.updateFollowUp = false;
        state.success.updateFollowUpSuccess = false;
      });

    // Get Lead Follow Ups
    builder
      .addCase(getLeadFollowUps.pending, (state) => {
        state.isLoading.leadFollowUps = true;
      })
      .addCase(getLeadFollowUps.fulfilled, (state, action) => {
        state.leadFollowUps = action.payload;
        state.isLoading.leadFollowUps = false;
      })
      .addCase(getLeadFollowUps.rejected, (state) => {
        state.isLoading.leadFollowUps = false;
      });

    // Sales Funnel
    builder
      .addCase(getSalesFunnel.pending, (state) => {
        state.isLoading.salesFunnel = true;
      })
      .addCase(getSalesFunnel.fulfilled, (state, action) => {
        state.salesFunnel = action.payload;
        state.isLoading.salesFunnel = false;
      })
      .addCase(getSalesFunnel.rejected, (state) => {
        state.isLoading.salesFunnel = false;
      });

    // Sales Overview
    builder
      .addCase(getSalesOverview.pending, (state) => {
        state.isLoading.salesOverview = true;
      })
      .addCase(getSalesOverview.fulfilled, (state, action) => {
        state.salesOverview = action.payload;
        state.isLoading.salesOverview = false;
      })
      .addCase(getSalesOverview.rejected, (state) => {
        state.isLoading.salesOverview = false;
      });

    // Next Contact Rules
    builder
      .addCase(getNextContactRules.pending, (state) => {
        state.isLoading.nextContactRules = true;
      })
      .addCase(getNextContactRules.fulfilled, (state, action) => {
        state.nextContactRules = action.payload;
        state.isLoading.nextContactRules = false;
      })
      .addCase(getNextContactRules.rejected, (state) => {
        state.isLoading.nextContactRules = false;
      });

    // Leads Metrics
    builder
      .addCase(getLeadsMetrics.pending, (state) => {
        state.isLoading.leadsMetrics = true;
      })
      .addCase(getLeadsMetrics.fulfilled, (state, action) => {
        state.leadsMetrics = action.payload;
        state.isLoading.leadsMetrics = false;
      })
      .addCase(getLeadsMetrics.rejected, (state) => {
        state.isLoading.leadsMetrics = false;
      });

    // Sales Funnel Analytics
    builder
      .addCase(getSalesFunnelAnalytics.pending, (state) => {
        state.isLoading.salesFunnelAnalytics = true;
      })
      .addCase(getSalesFunnelAnalytics.fulfilled, (state, action) => {
        state.salesFunnelAnalytics = action.payload;
        state.isLoading.salesFunnelAnalytics = false;
      })
      .addCase(getSalesFunnelAnalytics.rejected, (state) => {
        state.isLoading.salesFunnelAnalytics = false;
      });

    // Most Sold Offers
    builder
      .addCase(getMostSoldOffers.pending, (state) => {
        state.isLoading.mostSoldOffers = true;
      })
      .addCase(getMostSoldOffers.fulfilled, (state, action) => {
        state.mostSoldOffers = action.payload;
        state.isLoading.mostSoldOffers = false;
      })
      .addCase(getMostSoldOffers.rejected, (state) => {
        state.isLoading.mostSoldOffers = false;
      });

    // Top Performing Employees
    builder
      .addCase(getTopPerformingEmployees.pending, (state) => {
        state.isLoading.topPerformingEmployees = true;
      })
      .addCase(getTopPerformingEmployees.fulfilled, (state, action) => {
        state.topPerformingEmployees = action.payload;
        state.isLoading.topPerformingEmployees = false;
      })
      .addCase(getTopPerformingEmployees.rejected, (state) => {
        state.isLoading.topPerformingEmployees = false;
      });
  },
});

// Actions
export const {
  setResetAssignSuccess,
  moveSourcesToAttached,
  moveSourcesToUnattached,
  moveOffersToAttached,
  moveOffersToUnattached,
  setResetAll,
  setResetSubprojectSources,
  setResetProjectOffer,
  setResetLeadById,
  setSalesScriptAgent,
  setResetCustomerExistsSuccess,
} = salesSlice.actions;

// Selectors
export const selectAssignSuccess = (state) => state.sales.success.assign;
export const selectRemoveSuccess = (state) => state.sales.success.remove;

export const selectLeadSources = (state) => state.sales.leadSources;
export const selectLeadSourcesLoading = (state) => state.sales.isLoading.leadSources;

export const selectSalesScripts = (state) => state.sales.salesScripts;
export const selectSalesScriptsLoading = (state) => state.sales.isLoading.salesScripts;

export const selectSalesScriptEnhanced = (state) => state.sales.salesScriptEnhanced;
export const selectSalesScriptEnhancedLoading = (state) =>
  state.sales.isLoading.salesScriptEnhanced;

export const selectSalesScriptAgent = (state) => state.sales.salesScriptAgent;
export const selectSalesScriptAgentLoading = (state) => state.sales.isLoading.salesScriptAgent;

export const selectProducts = (state) => state.sales.products;
export const selectProductsLoading = (state) => state.sales.isLoading.products;

export const selectOffers = (state) => state.sales.offers;
export const selectOffersLoading = (state) => state.sales.isLoading.offers;

export const selectWorkflowStatuses = (state) => state.sales.workflowStatuses;
export const selectWorkflowStatusesLoading = (state) => state.sales.isLoading.workflowStatuses;

export const selectWorkflowStatusesByPrivilege = (state) =>
  state.sales.workflowStatusesByPrivilege;
export const selectWorkflowStatusesByPrivilegeLoading = (state) =>
  state.sales.isLoading.workflowStatusesByPrivilege;

export const selectUserPrivileges = (state) => state.sales.userPrivilege;
export const selectUserPrivilegesLoading = (state) => state.sales.isLoading.userPrivilege;

export const selectSubprojectSources = (state) => state.sales.subprojectSources;
export const selectSubprojectSourcesLoading = (state) =>
  state.sales.isLoading.subprojectSources;

export const selectProjectOffers = (state) => state.sales.projectOffers;
export const selectProjectOffersLoading = (state) => state.sales.isLoading.projectOffers;

export const selectSalesProjects = (state) => state.sales.projects.items;
export const selectSalesProjectsLoading = (state) => state.sales.isLoading.salesProjects;

export const selectImportLeadsLoading = (state) => state.sales.isLoading.importing;

export const selectSalesSubproject = (state) => state.sales.subproject;
export const selectSalesSubprojectLoading = (state) => state.sales.isLoading.salesSubproject;

export const selectSalesLeads = (state) => state.sales.leads;
export const selectSalesLeadsLoading = (state) => state.sales.isLoading.leads;
//Create Lead B2B
export const selectCreateLeadB2BSuccess = (state) => state.sales.success.createLeadB2BSuccess;
export const selectCreateLeadB2BLoading = (state) => state.sales.isLoading.createLeadB2B;

//Create Lead B2C
export const selectCreateLeadB2CSuccess = (state) => state.sales.success.createLeadB2CSuccess;
export const selectCreateLeadB2CLoading = (state) => state.sales.isLoading.createLeadB2C;

//get lead by uuid
export const selectLeadById = (state) => state.sales.leadById;
export const selectLeadByIdLoading = (state) => state.sales.isLoading.leadById;

export const selectAddNoteSuccess = (state) => state.sales.success.addNoteSuccess;
export const selectAddNoteLoading = (state) => state.sales.isLoading.addLeadNote;

export const selectAddOrderSuccess = (state) => state.sales.success.addOrderSucccess;
export const selectAddOrderLoading = (state) => state.sales.isLoading.addOrder;

export const selectNextLeadStepSuccess = (state) => state.sales.success.nextLeadStepSuccess;

export const selectNextLeadStepLoading = (state) => state.sales.isLoading.nextLeadStep;
export const selectNextLead = (state) => state.sales.nextLeadId;

export const selectUpdateLeadStatusSuccess = (state) =>
  state.sales.success.updateLeadStatusSuccess;

export const selectUpdateLeadStatusLoading = (state) => state.sales.isLoading.updateLeadStatus;

export const selectUpdateLeadB2BSuccess = (state) => state.sales.success.updateLeadB2BSuccess;

export const selectUpdateLeadB2BLoading = (state) => state.sales.isLoading.updateLeadB2B;

export const selectUpdateLeadB2CSuccess = (state) => state.sales.success.updateLeadB2CSuccess;

export const selectUpdateLeadB2CLoading = (state) => state.sales.isLoading.updateLeadB2C;

export const selectPhoneSearchResult = (state) => state.sales.result;
export const selectPhoneSearchLoading = (state) => state.sales.isLoading.searchPhone;

export const selectNewLeadUuid = (state) => state.sales.newLeadUuid;

export const selectGetLeadLoading = (state) => state.sales.isLoading.getLeadById;

export const selectLeadVisibility = (state) => state.sales.leadVisibility;
export const selectLeadVisibilityLoading = (state) => state.sales.isLoading.leadVisibility;

export const selectCreateFollowUpSuccess = (state) =>
  state.sales.success.createFollowUpSuccess;
export const selectCreateFollowUpLoading = (state) => state.sales.isLoading.createFollowUp;

export const selectUpdateFollowUpSuccess = (state) =>
  state.sales.success.updateFollowUpSuccess;
export const selectUpdateFollowUpLoading = (state) => state.sales.isLoading.updateFollowUp;

export const selectLeadFollowUps = (state) => state.sales.leadFollowUps;
export const selectLeadFollowUpsLoading = (state) => state.sales.isLoading.leadFollowUps;

export const selectSalesFunnel = (state) => state.sales.salesFunnel;
export const selectSalesFunnelLoading = (state) => state.sales.isLoading.salesFunnel;

export const selectSalesOverview = (state) => state.sales.salesOverview;
export const selectSalesOverviewLoading = (state) => state.sales.isLoading.salesOverview;

export const selectOverviewLeadMetrics = (state) => state.sales.salesOverview.leadMetrics;
export const selectOverviewRevenueMetrics = (state) =>
  state.sales.salesOverview.revenueMetrics;
export const selectOverviewSalesFunnel = (state) => state.sales.salesOverview.salesFunnel;
export const selectOverviewTopEmployees = (state) => state.sales.salesOverview.topEmployees;
export const selectOverviewLeastEmployees = (state) =>
  state.sales.salesOverview.leastEmployees;
export const selectOverviewTopDepartments = (state) =>
  state.sales.salesOverview.topDepartments;
export const selectOverviewLeastDepartments = (state) =>
  state.sales.salesOverview.leastDepartments;
export const selectOverviewTopBranches = (state) => state.sales.salesOverview.topBranches;
export const selectOverviewLeastBranches = (state) => state.sales.salesOverview.leastBranches;
export const selectOverviewTopTeams = (state) => state.sales.salesOverview.topTeams;
export const selectOverviewLeastTeams = (state) => state.sales.salesOverview.leastTeams;
export const selectOverviewTopLeadAddersByEmployee = (state) =>
  state.sales.salesOverview.topLeadAddersByEmployee;
export const selectOverviewTopLeadAddersByDepartment = (state) =>
  state.sales.salesOverview.topLeadAddersByDepartment;
export const selectOverviewTopStatusChangesByEmployee = (state) =>
  state.sales.salesOverview.topStatusChangesByEmployee;
export const selectOverviewTopStatusChangesByDepartment = (state) =>
  state.sales.salesOverview.topStatusChangesByDepartment;
export const selectOverviewMostSoldOffers = (state) =>
  state.sales.salesOverview.mostSoldOffers;

export const selectNextContactRules = (state) => state.sales.nextContactRules;
export const selectNextContactRulesLoading = (state) => state.sales.isLoading.nextContactRules;

export const selectLeadsMetrics = (state) => state.sales.leadsMetrics;
export const selectLeadsMetricsLoading = (state) => state.sales.isLoading.leadsMetrics;

export const selectSalesFunnelAnalytics = (state) => state.sales.salesOverview.salesFunnel;
export const selectSalesFunnelAnalyticsLoading = (state) =>
  state.sales.isLoading.salesFunnelAnalytics;

export const selectMostSoldOffers = (state) => state.sales.salesOverview.mostSoldOffers;
export const selectMostSoldOffersLoading = (state) => state.sales.isLoading.mostSoldOffers;

export const selectTopPerformingEmployees = (state) => state.sales.topPerformingEmployees;
export const selectTopPerformingEmployeesLoading = (state) =>
  state.sales.isLoading.topPerformingEmployees;

export const selectExistCostumer = (state) => state.sales.customerExists;
export const selectExistCostumerLoading = (state) => state.sales.isLoading.checkCustomerExists;
export const selectExistCostumerSuccess = (state) =>
  state.sales.success.checkCustomerExistsSuccess;

export default salesSlice.reducer;
