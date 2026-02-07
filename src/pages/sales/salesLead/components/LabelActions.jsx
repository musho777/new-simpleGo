import React from 'react';

import addOrderSvg from 'assets/addOrder.svg';
import HistoryIcon from 'assets/history.svg';
import OrderView from 'assets/orderView.svg';
import EditIcon from 'assets/salesEdit.svg';
import { TooltipText } from 'common-ui/tooltip/Tooltip.styles';

import { Acton, Icon, IconWrapper } from './Components.styles';

export const LabelActions = ({
  lead,
  showTooltipHistory,
  onShowTooltipHistory,
  onHideTooltipHistory,
  onOpenHistory,
  onEditClick,
}) => (
  <Acton>
    <IconWrapper onMouseEnter={onShowTooltipHistory} onMouseLeave={onHideTooltipHistory}>
      <TooltipText $isVisible={showTooltipHistory}>View Lead History</TooltipText>
      {lead?.statusHistory.length > 0 && (
        <Icon onClick={onOpenHistory} src={HistoryIcon} alt="History" />
      )}
    </IconWrapper>
    <IconWrapper>
      <Icon onClick={onEditClick} src={EditIcon} alt="Edit" />
    </IconWrapper>
  </Acton>
);

export const ProductActions = ({
  lead,
  showTooltipOrder,
  onShowTooltipOrder,
  onHideTooltipOrder,
  onOpenOrder,
  onOpenAddOrder,
}) => (
  <Acton>
    {lead?.orders.length > 0 && (
      <IconWrapper onMouseEnter={onShowTooltipOrder} onMouseLeave={onHideTooltipOrder}>
        <TooltipText $isVisible={showTooltipOrder}>Order View</TooltipText>
        <Icon onClick={onOpenOrder} src={OrderView} alt="OrderView" />
      </IconWrapper>
    )}
    <IconWrapper style={{ marginLeft: 10 }}>
      <Icon onClick={onOpenAddOrder} src={addOrderSvg} alt="Add Order" />
    </IconWrapper>
  </Acton>
);
