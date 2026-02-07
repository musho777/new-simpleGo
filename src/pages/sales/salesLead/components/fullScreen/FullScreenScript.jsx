import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Portal } from '@mui/material';
import SuccessIcon from 'assets/authAssets/success.svg';
import message from 'assets/message.svg';
import lamp from 'assets/salesReports/lamp.svg';
import reset from 'assets/salesReports/reset.svg';
import windowed from 'assets/windowed.svg';
import Button from 'common-ui/button';
import { getSalesScriptAgent, navigateSalesScript } from 'features/sales/salesActions';
import { selectSalesScriptAgent, setSalesScriptAgent } from 'features/sales/salesSlice';
import { Icon } from 'pages/auth/Auth.styles';

import {
  Body,
  Box,
  BoxTitle,
  ButtonWrapper,
  Card,
  CloseButton,
  ColumnContainer,
  Container,
  Content,
  Description,
  FlexContainer,
  Header,
  HeaderTitle,
  Line,
  MessageSvg,
  OptionWrapper,
  Overlay,
  PrevueWrapper,
  Step,
  SuccessCard,
  SuccessDescription,
  SuccessIconWrapper,
  SuccessText,
  SuccessWrapper,
  Tab,
  TabContainer,
} from './FullScreenScript.styles';
import History from './history';

export const FullScreenScript = ({ isOpen, onFullScreenClick, script }) => {
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState('details');
  const [currentStep, setCurrentStep] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [salesScriptHistory, setSalesScriptHistory] = useState([]);
  const salesScriptAgent = useSelector(selectSalesScriptAgent);

  const handleOptionClick = async (selectedOption, uuid) => {
    try {
      const conversationEntry = {
        id: Date.now(),
        step: currentStep + 1,
        question: salesScriptAgent?.currentStep?.question || '',
        agentNotes: salesScriptAgent?.currentStep?.agentNotes || '',
        answer: selectedOption?.optionText || '',
        timestamp: new Date().toISOString(),
      };

      const updatedHistory = [...conversationHistory, conversationEntry];
      setConversationHistory(updatedHistory);
      localStorage.setItem('salesHistory', JSON.stringify(updatedHistory));

      if (salesScriptAgent) {
        const updatedScriptHistory = [...salesScriptHistory, salesScriptAgent];
        setSalesScriptHistory(updatedScriptHistory);
        localStorage.setItem('salesScriptHistory', JSON.stringify(updatedScriptHistory));
      }

      await dispatch(
        navigateSalesScript({
          uuid: uuid,
          selectedOptionId: selectedOption.uuid,
        })
      ).unwrap();

      setCurrentStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentStep > 0 && salesScriptHistory.length > 0) {
      try {
        const previousSalesScript = salesScriptHistory[salesScriptHistory.length - 1];
        const updatedScriptHistory = salesScriptHistory.slice(0, -1);

        setSalesScriptHistory(updatedScriptHistory);
        localStorage.setItem('salesScriptHistory', JSON.stringify(updatedScriptHistory));

        const updatedConversationHistory = conversationHistory.slice(0, -1);
        setConversationHistory(updatedConversationHistory);
        localStorage.setItem('salesHistory', JSON.stringify(updatedConversationHistory));

        dispatch(setSalesScriptAgent(previousSalesScript));

        setCurrentStep((prevStep) => prevStep - 1);
      } catch (error) {
        console.error('Previous navigation failed:', error);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setConversationHistory([]);
    setSalesScriptHistory([]);
    localStorage.removeItem('salesHistory');
    localStorage.removeItem('salesScriptHistory');
    if (script?.uuid) {
      dispatch(getSalesScriptAgent(script?.uuid));
    }
  };

  const handleFullSize = () => {
    handleReset();
    onFullScreenClick();
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (script?.uuid) {
      dispatch(getSalesScriptAgent(script?.uuid));

      const savedScriptHistory = localStorage.getItem('salesScriptHistory');
      if (savedScriptHistory) {
        try {
          const parsedHistory = JSON.parse(savedScriptHistory);
          setSalesScriptHistory(parsedHistory);
        } catch (error) {
          localStorage.removeItem('salesScriptHistory');
        }
      }
    }
  }, [dispatch, script?.uuid]);

  if (salesScriptAgent?.isCompleted) {
    return (
      <Portal>
        <Overlay $isOpen={isOpen}>
          <CloseButton onClick={handleFullSize}>×</CloseButton>
          <SuccessWrapper>
            <SuccessCard $noHover>
              <SuccessIconWrapper>
                <Icon alt="success icon" src={SuccessIcon} />
                <SuccessText>Script Completed</SuccessText>
                <SuccessDescription>You have completed the Script</SuccessDescription>
              </SuccessIconWrapper>
              <PrevueWrapper>
                <Button className="previous" onClick={handlePreviousQuestion}>
                  Previous Question
                </Button>
                <Button onClick={handleReset}>Reset</Button>
              </PrevueWrapper>
            </SuccessCard>
          </SuccessWrapper>
        </Overlay>
      </Portal>
    );
  }
  return (
    <Portal>
      <Overlay $isOpen={isOpen}>
        <Container $isOpen={isOpen}>
          <ButtonWrapper>
            <Step>{`Step ${currentStep + 1} `}</Step>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button onClick={handleReset}>
                <Icon src={reset} />
                Reset
              </Button>
              <Button onClick={handleFullSize}>
                <Icon src={windowed} />
              </Button>
            </div>
          </ButtonWrapper>
          {windowWidth <= 1400 && (
            <TabContainer>
              <Tab $active={activeTab === 'details'} onClick={() => setActiveTab('details')}>
                Details
              </Tab>
              <Tab $active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
                History
              </Tab>
            </TabContainer>
          )}
          <FlexContainer>
            {(windowWidth > 1400 || (windowWidth <= 1400 && activeTab === 'details')) && (
              <ColumnContainer>
                <Content>
                  <Card>
                    <Header>
                      <HeaderTitle>{salesScriptAgent?.name}</HeaderTitle>
                    </Header>
                    <Body>
                      {salesScriptAgent?.Description && (
                        <Box>
                          <BoxTitle>Description</BoxTitle>
                          <Description>{salesScriptAgent?.description}</Description>
                        </Box>
                      )}
                      <Line />
                      {script?.script && (
                        <Box>
                          <BoxTitle>Script</BoxTitle>
                          <Description dangerouslySetInnerHTML={{ __html: script?.script }} />
                        </Box>
                      )}
                    </Body>
                  </Card>
                  <Card>
                    <Header $background="linear-gradient(90deg, #2B7FFF 0%, #6B9EFB 100%)">
                      <MessageSvg>
                        <Icon src={lamp} />
                      </MessageSvg>
                      <HeaderTitle>
                        {salesScriptAgent?.currentStep?.stepTitle || ''}
                      </HeaderTitle>
                    </Header>
                    <Body>
                      <Box>
                        <Description>{salesScriptAgent?.currentStep.question}</Description>
                      </Box>
                    </Body>
                  </Card>
                  <Card $noHover>
                    <Header $background="linear-gradient(89deg, #15C7A7 25.24%, #9EFFEE 114.09%)">
                      <MessageSvg>
                        <Icon src={message} />
                      </MessageSvg>
                      <HeaderTitle>Customer Response</HeaderTitle>
                    </Header>
                    <Body>
                      <OptionWrapper>
                        {salesScriptAgent?.currentStep?.responseOptions?.map((elm) => {
                          return (
                            <Button
                              key={elm.uuid}
                              onClick={() => handleOptionClick(elm, salesScriptAgent.uuid)}
                            >
                              {elm.optionText}
                            </Button>
                          );
                        }) || []}
                      </OptionWrapper>
                      {salesScriptAgent?.canGoBack && (
                        <PrevueWrapper style={{ marginTop: '10px' }}>
                          <Button onClick={handlePreviousQuestion}> Previous Step</Button>
                        </PrevueWrapper>
                      )}
                    </Body>
                  </Card>
                </Content>
              </ColumnContainer>
            )}

            {(windowWidth > 1400 || (windowWidth <= 1400 && activeTab === 'history')) && (
              <History leadData={script?.uuid} conversationHistory={conversationHistory} />
            )}
          </FlexContainer>
        </Container>
      </Overlay>
    </Portal>
  );
};
