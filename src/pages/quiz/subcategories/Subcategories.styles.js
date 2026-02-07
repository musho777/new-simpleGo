import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const BackButton = styled.button`
  border-radius: 10px;
  border: 0.4px solid #d4d8dd;
  background: #fff;
  padding: 0 12px;
  height: 40px;
  color: #1d3557;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const Header = styled.div`
  border: 1px solid rgba(223, 223, 223, 1);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 20px;
  height: 90px;
  margin-bottom: 20px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .search-input {
    min-width: 280px;
    max-width: 350px;
  }
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  color: #1d3557;
`;

export const CreateButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SubCategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

export const SubCategoryBox = styled.div`
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  min-height: 180px;
  cursor: pointer;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 4px 8px rgba(21, 199, 167, 0.15);
  }
`;

export const SubCategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 12px;
  margin-bottom: 8px;
`;

export const SubCategoryName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: default;
  max-width: 200px;
`;

export const SubCategoryDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: default;
  max-width: 300px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 24px;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const EditButton = styled(IconButton)``;

export const DeleteButton = styled(IconButton)`
  svg {
    width: 30px;
    height: 30px;
  }
`;
