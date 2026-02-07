import theme from 'styles/theme';

import { Tags } from './TagMethod.styles';

const PAYMENT_TYPES = {
  'Тестовые платежи': {
    background: theme.colors.secondary,
    text: theme.colors.secondary,
  },
  'Вирт. платеж тест': {
    background: theme.colors.secondary,
    text: theme.colors.secondary,
  },
  'Онлайн платежи': { background: theme.colors.secondary, text: theme.colors.secondary },
  Платежи: { background: theme.colors.secondary, text: theme.colors.secondary },
  'Безналичный платеж': {
    background: theme.colors.secondary,
    text: theme.colors.secondary,
  },
  'Наличный платеж': {
    background: theme.colors.secondary,
    text: theme.colors.secondary,
  },
  Компенсация: { background: theme.colors.secondary, text: theme.colors.secondary },
  Взаимозачет: { background: theme.colors.secondary, text: theme.colors.secondary },
  'Перенос средств': { background: theme.colors.secondary, text: theme.colors.secondary },
  'Возврат обнуления': { background: theme.colors.secondary, text: theme.colors.secondary },
  EasyPay: { background: theme.colors.success, text: theme.colors.success },
  Idram: { background: theme.colors.success, text: theme.colors.success },
  Telcell: { background: theme.colors.success, text: theme.colors.success },
  MobiDram: { background: theme.colors.success, text: theme.colors.success },
  'Test 2': { background: theme.colors.success, text: theme.colors.success },
  IdramMob: { background: theme.colors.success, text: theme.colors.success },
  MePay: { background: theme.colors.success, text: theme.colors.success },
  'Ameria bank': { background: theme.colors.success, text: theme.colors.success },
  Փոխհատուցում: { background: theme.colors.orange, text: theme.colors.orange },
};

const TagMethod = ({ type }) => {
  const tagStyles = PAYMENT_TYPES[type];

  const { background, text } = tagStyles || {
    background: theme.colors.defaultTagBackground,
    text: theme.colors.defaultTagText,
  };

  return type ? (
    <Tags $bgColor={background} $textColor={text}>
      {type}
    </Tags>
  ) : null;
};

export default TagMethod;
