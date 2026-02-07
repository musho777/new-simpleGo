import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as EditIcon } from 'assets/edit.svg';
import Pagination from 'common-ui/table/Pagination';
import { getUserInfo } from 'features/auth/authActions';
import { selectUserInfo } from 'features/auth/authSlice';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from 'features/quiz';
import { useQuizAdmin } from 'hooks/useQuizAdmin';
import EmptyView from 'pages/components/emptyView';
import Tag from 'pages/components/tag';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import CategoryModal from '../components/categoryModal';
import DeleteConfirmationModal from '../components/deleteConfirmationModal';
import {
  BackButton,
  ButtonGroup,
  CategoryBox,
  CategoryDescription,
  CategoryGrid,
  CategoryHeader,
  CategoryName,
  Container,
  CreateButton,
  DeleteButton,
  EditButton,
  Header, // SearchContainer,
  SubTeamBox,
  SubTeamGrid,
  SubTeamName,
  Title,
} from './Categories.styles';

const ITEMS_PER_PAGE = 12;

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Get current page from URL params, default to 1
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const userInfo = useSelector(selectUserInfo);
  const { isQuizAdmin: isAdmin, userType } = useQuizAdmin();

  const isDepartmentHead = userType === 'Department Head';

  const filteredCategories = useMemo(() => {
    // Non-admin users can only see active categories
    if (!isAdmin) {
      return categories.filter((category) => category.status === 'active');
    }
    return categories;
  }, [categories, isAdmin]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const loadCategories = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const data = await fetchCategories(ITEMS_PER_PAGE, offset);
      setCategories(data.categories);
      setTotalCount(data.count);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userInfo?.email) {
      dispatch(getUserInfo());
    }
    loadCategories(currentPage);
  }, [dispatch, userInfo, loadCategories, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSaveCategory = async (formData) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.uuid, formData);
        setIsModalOpen(false);
        loadCategories(currentPage);
      } else {
        await createCategory(formData);
        setIsModalOpen(false);
        setSearchParams({ page: '1' });
        loadCategories(1);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      throw error; // Pass error to modal for handling
    }
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.uuid);
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
      // If deleting the last item on a page, go to previous page
      if (filteredCategories.length === 1 && currentPage > 1) {
        const newPage = currentPage - 1;
        setSearchParams({ page: newPage.toString() });
        loadCategories(newPage);
      } else {
        loadCategories(currentPage);
      }
      notifySuccess('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      const errorMessage = error.message || 'Error deleting category';
      notifyError(errorMessage);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const handleCategoryClick = (category) => {
    navigate(`/quiz/category/${category.uuid}`);
  };

  const handleSubTeamClick = (teamId, subTeamId) => {
    navigate(`/quiz/${teamId}/${subTeamId}`);
  };

  const handleBack = () => {
    setSelectedTeam(null);
  };

  if (selectedTeam) {
    return (
      <Container>
        <BackButton onClick={handleBack}>← Back</BackButton>
        <Title>{selectedTeam.name}</Title>
        <SubTeamGrid>
          {selectedTeam.subTeams.map((subTeam) => (
            <SubTeamBox
              key={subTeam.id}
              onClick={() => handleSubTeamClick(selectedTeam.id, subTeam.id)}
            >
              <SubTeamName>{subTeam.name}</SubTeamName>
            </SubTeamBox>
          ))}
        </SubTeamGrid>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Categories</Title>
        {isAdmin && (
          <CreateButton onClick={handleCreateCategory}>+ Create Category</CreateButton>
        )}
      </Header>

      {/* <SearchContainer>
        <Input
          leftIcon={SearchIcon}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          clearable
          onClear={() => setSearchTerm('')}
          className="search-input"
          placeholder="Search by name..."
          maxLength={50}
        />
      </SearchContainer> */}

      {loading ? (
        <p>Loading...</p>
      ) : filteredCategories.length === 0 ? (
        <EmptyView
          title="No categories available"
          description="Create your first category to get started"
        />
      ) : (
        <>
          <CategoryGrid>
            {filteredCategories.map((category) => (
              <CategoryBox key={category.uuid} onClick={() => handleCategoryClick(category)}>
                <CategoryHeader>
                  <CategoryName>{category.name}</CategoryName>
                  <Tag
                    type="statuses"
                    variant={category.status === 'active' ? 'Active' : 'Disabled'}
                  />
                </CategoryHeader>
                {category.description && (
                  <CategoryDescription>{category.description}</CategoryDescription>
                )}
                {isAdmin && (
                  <ButtonGroup style={{ gap: 0 }}>
                    <EditButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCategory(category);
                      }}
                      title="Edit"
                    >
                      <EditIcon />
                    </EditButton>
                    <DeleteButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(category);
                      }}
                      title="Delete"
                    >
                      <DeleteIcon />
                    </DeleteButton>
                  </ButtonGroup>
                )}
              </CategoryBox>
            ))}
          </CategoryGrid>
          {totalCount > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              dataCount={totalCount}
              count={ITEMS_PER_PAGE}
            />
          )}
        </>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
        isDepartmentHead={isDepartmentHead}
        userInfo={userInfo}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        categoryName={categoryToDelete?.name || ''}
      />
    </Container>
  );
};

export default Categories;
