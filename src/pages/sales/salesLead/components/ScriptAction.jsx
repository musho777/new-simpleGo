import React from 'react';

import FullScreen from 'assets/fullScreen.svg';

import { Acton, Icon, IconWrapper } from './Components.styles';

export const ScriptAction = ({ onFullScreenClick }) => (
  <Acton>
    <IconWrapper>
      <Icon onClick={onFullScreenClick} src={FullScreen} alt="FullScreen" />
    </IconWrapper>
  </Acton>
);
