import { MenuItem, Select } from '@mui/material';
import styled from 'styled-components';

import back from './back.svg';
import first from './first.svg';
import last from './last.svg';
import next from './next.svg';

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 20px;
  width: 100%;
  justify-content: end;

  color: #212529;
  font-size: 12px;

  color: #313131;
  font-size: 12px;

  .btn {
    width: 65px;
    height: 30px;
    padding: 8px 12px;
    gap: 4px;
  }
`;

const menuItemStyles = {
  borderRadius: '8px',
  margin: '4px',
  '&.Mui-selected': {
    backgroundColor: '#007bff',
    color: 'white',
    '&:hover': {
      backgroundColor: '#007bff',
    },
  },
  '&:hover': {
    backgroundColor: '#007bff',
    color: 'white',
  },
};

const PageButton = styled.button`
  background: ${({ $active }) => ($active ? '#007bff' : '#fff')};
  color: ${({ $active }) => ($active ? 'white' : 'black')};
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #e9e9e9;

  display: flex;
  min-width: 30px;
  height: 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#0056b3' : '#f1f1f1')};
    color: ${({ $active }) => ($active ? 'white' : 'black')};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const SelectCountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CountTitle = styled.p`
  font-size: 12px;
  color: #6c757d;
`;

const Icon = styled.img``;

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  handleRowCountChange,
  dataCount,
  count,
  editableRowCount,
  maxVisiblePages = 5,
  pageOptions = [10, 25, 50],
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <PaginationWrapper className="hide-f-t">
      {editableRowCount && (
        <SelectCountWrapper>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={count}
            onChange={(e) => {
              handleRowCountChange(e.target.value);
            }}
            sx={{
              height: '30px',
              marginRight: '5px',
              backgroundColor: '#FFFFFF',
              color: '#313131',
              fontFamily: 'Nunito',
              fontSize: '14px',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover': {
                border: 'none',
                backgroundColor: '#f1f1f1',
                color: 'black',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          >
            {pageOptions.map((option) => (
              <MenuItem key={option} value={option} sx={menuItemStyles}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <CountTitle>
            {currentPage === 1 ? 1 : (currentPage - 1) * count}-
            {`${dataCount < currentPage * count ? dataCount : currentPage * count}`} of{' '}
            {`${dataCount}`}
          </CountTitle>
        </SelectCountWrapper>
      )}

      {currentPage > 1 && (
        <PageButton onClick={() => onPageChange(1)} className="btn">
          <Icon src={first} alt="i" />
          First
        </PageButton>
      )}
      <PageButton
        className="btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon src={back} alt="i" />
        Back
      </PageButton>

      {generatePageNumbers().map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          $active={page === currentPage}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn"
      >
        <Icon src={next} alt="i" />
        Next
      </PageButton>
      {currentPage < totalPages && (
        <PageButton onClick={() => onPageChange(totalPages)} className="btn">
          <Icon src={last} alt="i" />
          Last
        </PageButton>
      )}
    </PaginationWrapper>
  );
};

export default Pagination;
