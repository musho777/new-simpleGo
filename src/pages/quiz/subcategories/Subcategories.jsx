import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as EditIcon } from 'assets/edit.svg';
import Pagination from 'common-ui/table/Pagination';
import { getUserInfo } from 'features/auth/authActions';
import { selectUserInfo } from 'features/auth/authSlice';
import {
  createSubcategory,
  deleteSubcategory,
  fetchCategoryById,
  fetchSubcategoriesByCategory,
  updateSubcategory,
} from 'features/quiz';
import { useQuizAdmin } from 'hooks/useQuizAdmin';
import EmptyView from 'pages/components/emptyView';
import Tag from 'pages/components/tag';
import { notifyError, notifySuccess } from 'utils/notifyConfig';

import DeleteConfirmationModal from '../components/deleteConfirmationModal';
import SubCategoryModal from '../components/subCategoryModal';
import {
  BackButton,
  ButtonGroup,
  Container,
  CreateButton,
  DeleteButton,
  EditButton,
  Header,
  SubCategoryBox,
  SubCategoryDescription,
  SubCategoryGrid,
  SubCategoryHeader,
  SubCategoryName,
  Title,
} from './Subcategories.styles';

const ITEMS_PER_PAGE = 12;

const Subcategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryUuid } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [subCategories, setSubCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [categoryName, setCategoryName] = useState('');

  // Get current page from URL params, default to 1
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [teamUuid, setTeamUuid] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);

  const userInfo = useSelector(selectUserInfo);
  const { isQuizAdmin: isAdmin } = useQuizAdmin();

  const filteredSubCategories = useMemo(() => {
    // Non-admin users can only see active subcategories
    if (!isAdmin) {
      return subCategories.filter((subCategory) => subCategory.status === 'active');
    }
    return subCategories;
  }, [subCategories, isAdmin]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const loadCategory = useCallback(async () => {
    try {
      const category = await fetchCategoryById(categoryUuid);
      if (category) {
        setCategoryName(category.name || '');
        setTeamUuid(category.teamUuid || '');
      }
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  }, [categoryUuid]);

  const loadSubCategories = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const data = await fetchSubcategoriesByCategory(categoryUuid, ITEMS_PER_PAGE, offset);
        setSubCategories(data.subcategories);
        setTotalCount(data.count);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      } finally {
        setLoading(false);
      }
    },
    [categoryUuid]
  );

  useEffect(() => {
    if (!userInfo?.email) {
      dispatch(getUserInfo());
    }
    if (categoryUuid) {
      loadCategory();
      loadSubCategories(currentPage);
    }
  }, [dispatch, userInfo, categoryUuid, loadCategory, loadSubCategories, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
  };

  const handleBack = () => {
    navigate('/quiz');
  };

  const handleCreateSubCategory = () => {
    setEditingSubCategory(null);
    setIsModalOpen(true);
  };

  const handleEditSubCategory = (subCategory) => {
    setEditingSubCategory(subCategory);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (subCategory) => {
    setSubCategoryToDelete(subCategory);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!subCategoryToDelete) return;

    try {
      await deleteSubcategory(subCategoryToDelete.uuid);
      setIsDeleteModalOpen(false);
      setSubCategoryToDelete(null);
      // If deleting the last item on a page, go to previous page
      if (filteredSubCategories.length === 1 && currentPage > 1) {
        const newPage = currentPage - 1;
        setSearchParams({ page: newPage.toString() });
        loadSubCategories(newPage);
      } else {
        loadSubCategories(currentPage);
      }
      notifySuccess('Subcategory deleted successfully');
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      const errorMessage = error.message || 'Error deleting subcategory';
      notifyError(errorMessage);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSubCategoryToDelete(null);
  };

  const handleSaveSubCategory = async (formData) => {
    try {
      const subcategoryData = {
        ...formData,
        categoryUuid,
        teamUuid,
      };

      if (editingSubCategory) {
        await updateSubcategory(editingSubCategory.uuid, subcategoryData);
        setIsModalOpen(false);
        loadSubCategories(currentPage);
      } else {
        await createSubcategory(subcategoryData);
        setIsModalOpen(false);
        setSearchParams({ page: '1' });
        loadSubCategories(1);
      }
    } catch (error) {
      console.error('Error saving subcategory:', error);
    }
  };

  const handleSubCategoryClick = (subCategory) => {
    navigate(`/quiz/category/${categoryUuid}/subcategory/${subCategory.uuid}`);
  };

  return (
    <Container>
      <BackButton onClick={handleBack}> {'< Back to Categories'}</BackButton>

      <Header>
        <Title>{categoryName || 'Subcategories'}</Title>
        {isAdmin && (
          <CreateButton onClick={handleCreateSubCategory}>+ Create Subcategory</CreateButton>
        )}
      </Header>

      {loading ? (
        <p>Loading...</p>
      ) : filteredSubCategories.length === 0 ? (
        <EmptyView
          title="No subcategories available"
          description="Create your first subcategory to get started"
        />
      ) : (
        <>
          <SubCategoryGrid>
            {filteredSubCategories.map((subCategory) => (
              <SubCategoryBox
                key={subCategory.uuid}
                onClick={() => handleSubCategoryClick(subCategory)}
              >
                <SubCategoryHeader>
                  <SubCategoryName>{subCategory.name}</SubCategoryName>
                  <Tag
                    type="statuses"
                    variant={subCategory.status === 'active' ? 'Active' : 'Disabled'}
                  />
                </SubCategoryHeader>
                {subCategory.description && (
                  <SubCategoryDescription>{subCategory.description}</SubCategoryDescription>
                )}
                {isAdmin && (
                  <ButtonGroup style={{ gap: 0 }}>
                    <EditButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditSubCategory(subCategory);
                      }}
                      title="Edit"
                    >
                      <EditIcon />
                    </EditButton>
                    <DeleteButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(subCategory);
                      }}
                      title="Delete"
                    >
                      <DeleteIcon />
                    </DeleteButton>
                  </ButtonGroup>
                )}
              </SubCategoryBox>
            ))}
          </SubCategoryGrid>
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

      <SubCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSubCategory}
        subCategory={editingSubCategory}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        categoryName={subCategoryToDelete?.name || ''}
      />
    </Container>
  );
};

export default Subcategories;
