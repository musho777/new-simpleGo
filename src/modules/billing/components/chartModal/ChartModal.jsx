import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';
import { useMobileView } from 'modules/billing/hooks/useMobileView';
import { useTabletView } from 'modules/billing/hooks/useTabletView';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import arrow from '../../assets/arrowLeft.svg';
import loadingIcon from '../../assets/loading.svg';
import {
  BackAction,
  BackTitle,
  ChartContainer,
  Column,
  ColumnRight,
  Header,
  ListItem,
  ListItemRightTablet,
  ListItemTablet,
  LoadContainer,
  LoadingIcon,
  RegionTabletWrapper,
  RegionWrapper,
  ResponsiveWrapper,
  Table,
  Title,
  TitleBar,
} from './ChartModal.styles';

const getModalStyle = (isTablet, isMobile) => ({
  position: 'absolute',
  top: isMobile ? '55%' : '50%',
  left: isTablet || isMobile ? '50%' : '55%',
  transform: 'translate(-50%, -50%)',
  width: isTablet || isMobile ? '95%' : '70%',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  overflowY: 'auto',
});

const ChartModal = ({
  isOpen,
  onClose,
  barData,
  barCategoryData,
  maxCount,
  YAxisWith = 38,
  loading,
  headerTitle,
  titleFirst,
  titleNext,
  isSum,
}) => {
  const formattedData = barData.map((item) => ({
    name: item.name,
    count: item.count,
    remaining: maxCount - item.count,
  }));
  const isTablet = useTabletView();
  const isMobile = useMobileView();

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={getModalStyle(isTablet, isMobile)}>
        {loading ? (
          <LoadContainer>
            <LoadingIcon alt="loading" src={loadingIcon} />
          </LoadContainer>
        ) : (
          <>
            {(isTablet || isMobile) && (
              <BackAction onClick={onClose}>
                <img src={arrow} alt="arrow" />
                <BackTitle>Back to list</BackTitle>
              </BackAction>
            )}
            <Header>
              <Title>{headerTitle}</Title>
              {!isTablet && !isMobile && (
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              )}
            </Header>
            <ChartContainer>
              <TitleBar $margin={isTablet || isMobile}>{titleFirst}</TitleBar>
              <ResponsiveWrapper $overflow={isMobile}>
                <ResponsiveContainer
                  width={isMobile ? 850 : '100%'}
                  height={isTablet || isMobile ? 300 : 400}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <BarChart data={formattedData} barCategoryGap={isTablet ? 10 : 20}>
                    <CartesianGrid vertical={false} horizontal={false} />
                    <XAxis dataKey="name" fontSize={isTablet ? 10 : 12} interval={0} />
                    <YAxis
                      allowDecimals={false}
                      axisLine={false}
                      tickLine={false}
                      fontSize={isTablet ? 10 : 12}
                      width={YAxisWith}
                      tickFormatter={(value) => {
                        if (!isSum) return value;
                        if (value >= 1_000_000_000) return `${value / 1_000_000_000}մլրդ`;
                        if (value >= 1_000_000) return `${value / 1_000_000}մլն`;
                        return value;
                      }}
                    />
                    <Bar dataKey="count" fill="#2D6CDF" stackId="a" />
                    <Bar dataKey="remaining" fill="rgba(66, 133, 244, 0.2)" stackId="a" />
                  </BarChart>
                  {!isTablet && !isMobile && (
                    <RegionWrapper>
                      <Table>
                        <Column>
                          {barData.map((item, index) => (
                            <ListItem key={index}>
                              <span>{item.name}</span>
                            </ListItem>
                          ))}
                        </Column>
                        <ColumnRight>
                          {barData.map((item, index) => (
                            <ListItem key={index}>
                              <span>{item.count}</span>
                            </ListItem>
                          ))}
                        </ColumnRight>
                      </Table>
                    </RegionWrapper>
                  )}
                </ResponsiveContainer>
              </ResponsiveWrapper>

              {(isTablet || isMobile) && (
                <RegionTabletWrapper $mobileColumns={isMobile}>
                  {barData.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItemTablet>
                        <span>{item.name}</span>
                      </ListItemTablet>

                      <ListItemRightTablet>
                        <span>{item.count}</span>
                      </ListItemRightTablet>
                    </React.Fragment>
                  ))}
                </RegionTabletWrapper>
              )}

              <ResponsiveContainer width="100%" height={470}>
                <TitleBar>{titleNext}</TitleBar>
                <BarChart
                  layout="vertical"
                  data={barCategoryData}
                  margin={{ right: 50, top: 21 }}
                >
                  <defs>
                    <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="8.17%" stopColor="#1D3557" />
                      <stop offset="99.21%" stopColor="#899EC8" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} horizontal={false} />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={false}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={80}
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <Bar dataKey="count" fill="url(#barGradient)" radius={[7, 7, 7, 7]}>
                    <LabelList dataKey="count" position="right" fill="#000" fontSize={14} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ChartModal;
