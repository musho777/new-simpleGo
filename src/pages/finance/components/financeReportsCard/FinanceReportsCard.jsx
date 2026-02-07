import React from 'react';

import { CardHeader, CardWrapper, Icon, Status, Title } from './FinanceReportsCard.styles';

const FinanceReportsCard = ({ amount, status, borderColor, icon, loading }) => {
  return (
    <CardWrapper $borderColor={borderColor}>
      <CardHeader>
        <Title $textColor={borderColor}>{loading ? '---' : amount}</Title>
        <Status className="amount">{status}</Status>
      </CardHeader>
      {icon && <Icon src={icon} alt={status} />}
    </CardWrapper>
  );
};

export default FinanceReportsCard;
