import theme from 'styles/theme';

import { Tags } from './Tag.styles';

const BILLING_TYPES = {
  0: 'Ակտիվ',
  1: 'Անջատում',
  2: 'Անջատված',
  3: 'Փակված',
  4: 'Կասեցված',
  5: 'Միացման մեջ',
  6: 'Միացված չէ',
  7: 'Վճարված չէ',
  8: 'Վերականգնված',
};

const tags = {
  0: {
    background: theme.colors.success,
    text: theme.colors.success,
  },
  1: {
    background: theme.colors.secondaryText,
    text: theme.colors.secondaryText,
  },
  2: {
    background: theme.colors.secondaryText,
    text: theme.colors.secondaryText,
  },
  3: {
    background: theme.colors.secondaryText,
    text: theme.colors.secondaryText,
  },
  4: {
    background: theme.colors.secondaryText,
    text: theme.colors.secondaryText,
  },
  5: {
    background: theme.colors.secondaryText,
    text: theme.colors.secondaryText,
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
};

const Tag = ({ type, ...props }) => {
  const tagStyles = tags[type];

  const { background, text } = tagStyles || {
    background: theme.colors.defaultTagBackground,
    text: theme.colors.defaultTagText,
  };

  return type !== undefined ? (
    <Tags $bgColor={background} $textColor={text} {...props}>
      {BILLING_TYPES[type] ?? '-'}
    </Tags>
  ) : null;
};

export default Tag;
