import styled from 'styled-components';
import theme from 'styles/theme';

const priorityStyles = {
  Highest: {
    backgroundColor: `${theme.colors.secondary}1A`,
    textColor: `${theme.colors.secondary}`,
  },
  High: {
    backgroundColor: `${theme.colors.success}1A`,
    textColor: `${theme.colors.success}`,
  },
  Medium: {
    backgroundColor: `${theme.colors.warningColor}1A`,
    textColor: `${theme.colors.warningColor}`,
  },
  Low: {
    backgroundColor: '#F2D1171A',
    textColor: '#F2D117',
  },
};

export const TitleWrapper = styled.div`
  display: flex;
  height: 21px;
  padding: 5px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 22px;
  background-color: ${({ title }) => priorityStyles[title]?.backgroundColor || '#6c6b7d0d'};
  color: ${({ title }) => priorityStyles[title]?.textColor || '#6C757D'};
  border: ${({ title }) => (priorityStyles[title] ? 'none' : '0.5px solid #D4D8DD')};
`;

export const Title = styled.span`
  font-size: 12px;
  font-weight: 700;
`;
