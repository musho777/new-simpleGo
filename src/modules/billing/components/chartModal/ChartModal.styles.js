import styled from 'styled-components';

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #2d6cdf;
  border-radius: 20px;
  background-color: rgba(45, 108, 223, 0.1);
  padding: 11px 10px;
`;

export const TitleBar = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #212529;
  margin-bottom: ${({ $margin }) => ($margin ? '20px' : '0')};
`;

export const RegionWrapper = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-left: 15px;
  height: 350px;
`;

export const RegionTabletWrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ $mobileColumns }) =>
    $mobileColumns ? '1fr 1fr' : '1fr 1fr 1fr 1fr 1fr 1fr'};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  margin: 13px 5px 11px 5px;
  gap: 5px;
`;

export const ListItemTablet = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: #212529;
`;

export const ListItemRightTablet = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: #212529;
  border-left: 0.5px solid #ededed;
  padding-left: 13px;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  color: #212529;
  padding-bottom: 11px;
`;

export const Table = styled.div`
  display: flex;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
`;

export const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 0.5px solid #ededed;
  padding-left: 10px;
`;

export const LoadContainer = styled.div`
  width: 100%;
  min-height: 500px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingIcon = styled.img`
  animation: rotate 1s linear infinite;
  width: 100px;
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const BackAction = styled.div`
  display: flex;
  align-items: center;
  width: 117px;
  border-radius: 10px;
  border: 0.4px solid #d4d8dd;
  background: #fff;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const BackTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1d3557;
  line-height: 9px;
`;

export const ResponsiveWrapper = styled.div`
  overflow-y: ${({ $overflow }) => ($overflow ? 'scroll' : 'none')};
  width: '100%';
`;
