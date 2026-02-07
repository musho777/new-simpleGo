import { TAG_PRIORITY_TYPES, TAG_STATUS_TYPES } from 'constants/constants';
import theme from 'styles/theme';

import { Icon, Tags } from './Tag.styles';
import elips from './assets/Ellipse.svg';
import task from './assets/Task.svg';
import bug from './assets/bug.svg';
import close from './assets/close.svg';
import feature from './assets/feature.svg';
import high from './assets/high.svg';
import inProgres from './assets/inProgress.svg';
import low from './assets/low.svg';
import menu from './assets/menu.svg';
import rejected from './assets/rejected.svg';
import reopen from './assets/reopen.svg';
import resolved from './assets/resolved.svg';
import suggestion from './assets/suggestion.svg';
import support from './assets/support.svg';
import urgent from './assets/urgent.svg';
import waiting from './assets/waiting.svg';

const defaultTags = {
  roles: {
    'Super Admin': {
      background: theme.colors.tagGeneralColor,
      text: theme.colors.tagGeneralColor,
    },
    'Hr Manager': {
      background: theme.colors.tagHrColor,
      text: theme.colors.tagHrColor,
    },
    'Department Head': {
      background: theme.colors.warningColor,
      text: theme.colors.warningColor,
      width: '125px',
    },
    'Legal Staff': {
      background: theme.colors.tagLegalColor,
      text: theme.colors.tagLegalColor,
    },
    'Team Member': {
      background: theme.colors.tagLegalColor,
      text: theme.colors.tagLegalColor,
    },
    'Team Lead': {
      background: theme.colors.tagLegalColor,
      text: theme.colors.tagLegalColor,
    },
    'Branch Head': {
      background: theme.colors.tagLegalColor,
      text: theme.colors.tagLegalColor,
    },
    'General Manager': {
      background: theme.colors.tagGeneralColor,
      text: theme.colors.tagGeneralColor,
      width: '121px',
    },
    'Accounting Staff': {
      background: theme.colors.tagPendingColor,
      text: theme.colors.tagPendingColor,
    },
  },
  statuses: {
    Pending: {
      background: theme.colors.tagPendingColor,
      text: theme.colors.tagPendingColor,
    },
    Active: {
      background: theme.colors.success,
      text: theme.colors.success,
    },
    Disabled: {
      background: theme.colors.secondaryText,
      text: theme.colors.secondaryText,
    },
    'Remove all x': {
      background: theme.colors.tagPendingColor,
      text: theme.colors.tagPendingColor,
    },
    Enabled: {
      background: theme.colors.ApprovedColor,
      text: theme.colors.ApprovedColor,
    },
    0: {
      background: theme.colors.success,
      text: theme.colors.success,
    },
    1: {
      background: theme.colors.orange,
      text: theme.colors.orange,
    },
    2: {
      background: theme.colors.secondaryText,
      text: theme.colors.secondaryText,
    },
    3: {
      background: theme.colors.closedBackground,
      text: theme.colors.closedColorForStatus,
    },
    4: {
      background: theme.colors.tagPendingColor,
      text: theme.colors.tagPendingColor,
    },
    5: {
      background: theme.colors.inProgressBackground,
      text: theme.colors.inProgressColor,
    },
    6: {
      background: theme.colors.secondaryText,
      text: theme.colors.secondaryText,
    },
    7: {
      background: theme.colors.danger,
      text: theme.colors.danger,
    },
    8: {
      background: theme.colors.success,
      text: theme.colors.success,
    },
  },
  occupation: {
    occupation: {
      background: theme.colors.tagPendingColor,
      text: theme.colors.tagPendingColor,
    },
  },
  ticketStatuses: {
    'To Do': {
      background: theme.colors.inDisableTextColor,
      text: theme.colors.todoColor,
    },
    'In Progress': {
      background: theme.colors.inProgressBackground,
      text: theme.colors.inProgressColor,
    },
    Waiting: {
      background: theme.colors.orange,
      text: theme.colors.waitingColor,
    },
    Resolved: {
      background: theme.colors.resolvedBackground,
      text: theme.colors.resolvedColor,
    },
    Closed: {
      background: theme.colors.closedBackground,
      text: theme.colors.closedColor,
    },
    Rejected: {
      background: theme.colors.RejectedBackground,
      text: theme.colors.inProgressColor,
    },
    Reopen: {
      background: theme.colors.ReopenBackground,
      text: theme.colors.inProgressColor,
    },
    //TODO: Move this to separate object
    'Fixed Salary': {
      background: theme.colors.inProgressBackground,
      text: theme.colors.inProgressColor,
    },
    'Hourly Rate': {
      background: theme.colors.inProgressBackground,
      text: theme.colors.inProgressColor,
    },
  },
  tableStatuses: {
    'To Do': {
      background: theme.colors.inDisableTextColor,
      text: theme.colors.todoColor,
      icon: elips,
    },
    'In Progress': {
      background: theme.colors.inProgressBackground,
      text: theme.colors.inProgressColor,
      icon: inProgres,
    },
    Waiting: {
      background: theme.colors.orange,
      text: theme.colors.waitingColor,
      icon: waiting,
    },
    Resolved: {
      background: theme.colors.resolvedBackground,
      text: theme.colors.resolvedColor,
      icon: resolved,
    },
    Closed: {
      background: theme.colors.closedBackground,
      text: theme.colors.closedColor,
      icon: close,
    },
    Rejected: {
      background: theme.colors.RejectedBackground,
      text: theme.colors.inProgressColor,
      icon: rejected,
    },
    Reopen: {
      background: theme.colors.ReopenBackground,
      text: theme.colors.inProgressColor,
      icon: reopen,
    },
    //TODO: Move this to separate object
    'Fixed Salary': {
      background: theme.colors.inProgressBackground,
      text: theme.colors.inProgressColor,
    },
    'Hourly Rate': {
      background: theme.colors.inProgressBackground,
      text: theme.colors.inProgressColor,
    },
  },
  ticketPriority: {
    1: {
      background: theme.colors.orange,
      text: theme.colors.orange,
      icon: low,
    },
    2: {
      background: theme.colors.normal,
      text: theme.colors.normal,
      icon: menu,
    },
    3: {
      background: theme.colors.high,
      text: theme.colors.high,
      icon: high,
    },
    4: {
      background: theme.colors.urgent,
      text: theme.colors.urgent,
      icon: urgent,
    },
  },
  tracker: {
    Task: {
      background: theme.colors.normal,
      text: theme.colors.normal,
      icon: task,
    },
    Suggestion: {
      background: theme.colors.SuggestionColor,
      text: theme.colors.SuggestionColor,
      icon: suggestion,
    },
    Support: {
      background: theme.colors.FeatureColor,
      text: theme.colors.FeatureColor,
      icon: support,
    },
    Bug: {
      background: theme.colors.urgent,
      text: theme.colors.urgent,
      icon: bug,
    },
    Feature: {
      background: theme.colors.featureTicketCard,
      text: theme.colors.featureTicketCard,
      icon: feature,
    },
  },
  usage: {
    'Service use': {
      background: theme.colors.usageServiceBackground,
      text: theme.colors.usageServiceUse,
    },
    'Personal use': {
      background: theme.colors.SuggestionColor,
      text: theme.colors.tagHrColor,
    },
  },
  financeStatus: {
    Pending: {
      background: theme.colors.tagPendingColor,
      text: theme.colors.tagPendingColor,
    },
    Approved: {
      background: theme.colors.success,
      text: theme.colors.success,
    },
    Rejected: {
      background: theme.colors.danger,
      text: theme.colors.danger,
    },
    Completed: {
      background: theme.colors.inProgressBackground,
      text: theme.colors.inProgressBackground,
    },
    Seen: {
      background: theme.colors.inProgressBackground,
      text: theme.colors.inProgressBackground,
    },
  },
  status: {
    Pending: {
      background: theme.colors.tagPendingColor,
      text: theme.colors.tagPendingColor,
    },
    Approved: {
      background: theme.colors.ApprovedColor,
      text: theme.colors.ApprovedColor,
    },
    Rejected: {
      background: theme.colors.RejectedBackground,
      text: theme.colors.RejectedBackground,
    },
    Declined: {
      background: theme.colors.RejectedBackground,
      text: theme.colors.RejectedBackground,
    },
    'Awaiting receipt confirmation': {
      background: theme.colors.usageServiceUse,
      text: theme.colors.usageServiceUse,
    },
    'Receipt declined': {
      background: theme.colors.SupportColor,
      text: theme.colors.SupportColor,
    },
  },

  profileStatus: {
    Available: {
      background: theme.colors.AvailableBackgroundColor,
      text: theme.colors.AvailableColor,
    },
    Unavailable: {
      background: theme.colors.UnavailableBackgroundColor,
      text: theme.colors.UnavailableColor,
    },
  },
  lifespan: {
    'Single use': {
      background: theme.colors.lifespanSingle,
      text: theme.colors.lifespanSingle,
    },
    Reusable: {
      background: theme.colors.lifespanReusable,
      text: theme.colors.lifespanReusable,
    },
  },
};

const Tag = ({ widthParent, type, variant, tags = defaultTags }) => {
  const tagStyles = type === 'occupation' ? tags.occupation.occupation : tags[type]?.[variant];
  const { background, text, width } = tagStyles || {
    background: theme.colors.defaultTagBackground,
    text: theme.colors.defaultTagText,
  };

  const getDisplayText = () => {
    if (type === 'ticketPriority') {
      return TAG_PRIORITY_TYPES[variant];
    }
    if (type === 'statuses' && typeof variant === 'number') {
      return TAG_STATUS_TYPES[variant] || variant;
    }
    return variant;
  };

  return variant !== undefined && variant !== null ? (
    <Tags $width={width || widthParent} $bgColor={background} $textColor={text} $type={type}>
      {tagStyles?.icon && <Icon src={tagStyles?.icon} />}
      {getDisplayText()}
    </Tags>
  ) : null;
};

export default Tag;
