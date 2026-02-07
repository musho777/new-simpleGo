import styled from 'styled-components';
import theme from 'styles/theme';

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: '0 8px 0 8px',
    border: `1px solid ${state.isFocused ? `${theme.colors.success}` : state.selectProps.$error ? '#E63946' : `${theme.colors.borderColor}`}`,
    minHeight: state.selectProps.minHeight ? state.selectProps.minHeight : '44px',
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: '19px',
    outline: 'none',
    boxShadow: state.isFocused
      ? `0px 0px 2px 0px ${state.selectProps.$error ? '#E63946' : `${theme.colors.success}`}`
      : 'none',

    '&:hover': {
      borderColor: state.selectProps.$error ? '#E63946' : `${theme.colors.success}`,
      boxShadow: state.selectProps.$error
        ? '0px 0px 4px 0px #E63946'
        : `0px 0px 4px 0px ${theme.colors.success}`,
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    color: '#d4d8dd',
  }),

  input: (provided) => ({
    ...provided,
    color: 'inherit',
    width: '100%',
    minWidth: 0,
    flex: '1 1 0',
  }),

  option: (provided, state) => ({
    ...provided,
    padding: '8px 12px',
    marginBottom: '2px',
    backgroundColor: state.isSelected ? '#2D6CDF1A' : 'white',
    color: state.isSelected ? '#2D6CDF' : 'black',
    fontWeight: '500',
    borderRadius: '5px',
    whiteSpace: 'normal',
    fontSize: '16px',
    wordBreak: 'break-word',
    '&:hover': {
      backgroundColor: '#2D6CDF1A',
      color: '#2D6CDF',
    },
    '&:active': {
      backgroundColor: '#2D6CDF1A',
      color: '#2D6CDF',
    },
  }),

  menu: (provided) => ({
    ...provided,
    padding: '8px',
    borderRadius: '5px',
    zIndex: 99999999999,
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '200px',
    overflowY: 'auto',
    '::-webkit-scrollbar': {
      width: '4px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555',
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '8px',
  }),
  indicatorSeparator: () => ({ display: 'none' }),

  multiValue: (provided) => ({
    ...provided,
    display: 'none',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#2D6CDF',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#2D6CDF',
    ':hover': {
      backgroundColor: '#2D6CDF',
      color: '#2D6CDF',
    },
  }),
};

export const Container = styled.div`
  min-height: 89px;
  padding-top: ${({ $marginTop }) => $marginTop && `${$marginTop}px`};
  position: relative;
  min-width: 100px;
`;

export const SelectedCount = styled.div`
  position: absolute;
  z-index: 1;
  transform: translate(0, 61%);
  display: flex;
  align-items: center;
  left: 14px;

  color: #212529;
  font-size: 14px;
`;

export const SelectedItemsContainer = styled.div`
  max-height: 118px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  gap: 8px;
  padding-bottom: 12px;
  margin-bottom: 18px;

  mask-image: linear-gradient(#000, #000);
  -webkit-mask-image: linear-gradient(#000, #000);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    background-color: #e6f0ff;
    border-radius: 999999px;
    cursor: pointer;

    color: #2d6cdf;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    .remove {
      color: #2d6cdf;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      margin-left: 8px;
    }

    .remove:hover {
      color: #004aad;
    }
  }
`;

export const RemoveWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

export const SelectedCountWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: start;
`;
