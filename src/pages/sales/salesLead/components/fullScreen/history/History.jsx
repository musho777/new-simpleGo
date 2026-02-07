import { useEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';

import questionIcon from 'assets/questionIcon.svg';

import {
  Content,
  GroupWrapper,
  Header,
  HeaderTitle,
  HeaderWrapper,
  HistoryWrapper,
  Icon,
  IconWrapper,
  Main,
  Sentence,
  StatusInfo,
  Title,
  TitleWrapper,
} from './History.styles';

const History = ({ conversationHistory = [] }) => {
  const bottomRef = useRef(null);

  const location = useLocation();

  const conversationHistoryFormatted = conversationHistory.map((entry) => ({
    id: entry.id,
    type: 'Conversation',
    oldValue: entry.question,
    newValue: entry.answer,
    createdAt: entry.timestamp,
    cratedBy: 'Sales Agent',
  }));

  useEffect(() => {
    if (location.state?.scrollToLastUpdate && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location, conversationHistoryFormatted]);

  return (
    <Content>
      <HeaderWrapper>
        <Header>
          <HeaderTitle>Conversation History</HeaderTitle>
        </Header>
      </HeaderWrapper>

      <HistoryWrapper>
        {conversationHistoryFormatted.map((entry, index) => (
          <Main key={entry.id}>
            <GroupWrapper>
              <Sentence>
                <TitleWrapper>
                  <IconWrapper index={index}>
                    <Icon src={questionIcon} index={index} />
                  </IconWrapper>
                  <Title>{entry.oldValue}</Title>
                </TitleWrapper>
                <StatusInfo as="span" index={index}>
                  {entry.newValue}
                </StatusInfo>
              </Sentence>
            </GroupWrapper>
          </Main>
        ))}
      </HistoryWrapper>

      <div ref={bottomRef} />
    </Content>
  );
};

export default History;
