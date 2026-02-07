import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import DeleteIcon from 'assets/delete.svg';
import { BadgeButton } from 'common-ui/badgeButton/BadgeButton';
import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import Modal from 'common-ui/modal';
import { Table } from 'common-ui/table';
import Pagination from 'common-ui/table/Pagination';
import { LoadContainer, LoadingIcon } from 'common-ui/table/Table.styles';
import loadIcon from 'common-ui/table/loading.svg';
import {
  deleteCategory,
  getCategories,
  getRequests,
} from 'features/inventory/inventoryActions';
import {
  selectCategories,
  selectLoading,
  selectPendingRequests,
} from 'features/inventory/inventorySlice';
import useDebounce from 'hooks/useDebounce';
import EmptyView from 'pages/components/emptyView';
import Switch from 'pages/components/switch';

import Create from './Create';
import {
  ALlCategories,
  CategoryBox,
  CategoryImage,
  CategoryName,
  Container,
  ContentWrapper,
  DeleteIconWrapper,
  DeleteText,
  EllipsisCell,
  EmptyViewWrapper,
  ItemCountWrapper,
  ItemsCount,
  PageWrapper,
  PaginationWrapper,
  ShiftControl,
  ShiftControllers,
  TableAction,
} from './Inventory.styles';
import { useCategorySearchData } from './useSearchData';

const Inventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useSelector(selectCategories) || [];
  const isLoading = useSelector(selectLoading);
  const { categories, count } = data;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [first, setFirst] = useState(false);
  const { searchData, setCategorySearchData } = useCategorySearchData();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToRemoveId, setCategoryToRemoveId] = useState(null);
  const [searchValue, setSearchValue] = useState(searchData.name || '');
  const [viewType, setViewType] = useState(searchParams.get('view') || 'table');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const requests = useSelector(selectPendingRequests);

  const currentLimit = viewType === 'table' ? 10 : 8;

  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || currentLimit)) + 1;
  }, [searchData.offset, searchData.limit, currentLimit]);
  const totalPages = Math.ceil(count / currentLimit);

  const onPaginationChange = (page) => {
    const limit = currentLimit;
    const offset = (page - 1) * limit;
    setCategorySearchData({ offset });
  };

  const openDeleteModal = (uuid) => {
    setCategoryToRemoveId(uuid);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsRefreshing(true);
    dispatch(deleteCategory(categoryToRemoveId))
      .then(() => dispatch(getCategories(searchData)))
      .finally(() => {
        setIsDeleteModalOpen(false);
        setCategoryToRemoveId(null);
        setIsRefreshing(false);
      });
  };

  const handleCancelDelete = () => {
    setCategoryToRemoveId(null);
    setIsDeleteModalOpen(false);
  };

  const handleNavigateToCategoriesItems = (category) => {
    const { uuid } = category;
    navigate(`/inventory/categories/${uuid}?view=table`, { state: { category } });
  };

  const handleViewTypeChange = (newViewType) => {
    const actualViewType = newViewType === 'list' ? 'table' : newViewType;
    setViewType(actualViewType);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('view', actualViewType);
    setSearchParams(newParams, { replace: true });

    const newLimit = actualViewType === 'table' ? 10 : 8;
    setCategorySearchData({ offset: 0, limit: newLimit, view: actualViewType });
  };

  const handelChange = (e) => {
    setFirst(true);
    setSearchValue(e.target.value);
  };

  const tableColumns = useMemo(() => [
    {
      title: 'Category Name',
      key: 'name',
      dataIndex: 'name',
      renderTooltip: (text) => text?.length > 30 && <span>{text}</span>,
      render: (name, data) => {
        return (
          <EllipsisCell onClick={() => handleNavigateToCategoriesItems(data)}>
            {name}
          </EllipsisCell>
        );
      },
    },
    {
      title: 'Items Count',
      key: 'itemTypeCount',
      dataIndex: 'itemTypeCount',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, category) => (
        <TableAction>
          <Create isEdit initialData={category} />
          <ShiftControl
            onClick={(e) => {
              e.stopPropagation();
              openDeleteModal(category.uuid);
            }}
          >
            {category.itemTypeCount === 0 && (
              <DeleteIconWrapper alt="Delete icon" src={DeleteIcon} />
            )}
          </ShiftControl>
        </TableAction>
      ),
    },
  ]);

  const handleNavigateNewRequestsPage = () => {
    navigate('/inventory/request-history/pending');
  };

  useEffect(() => {
    if (first) {
      setCategorySearchData({ name: debouncedSearchValue });
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    dispatch(getCategories(searchData));
    dispatch(
      getRequests({
        offset: 0,
        limit: 1,
      })
    );
  }, [dispatch, searchData]);

  useEffect(() => {
    const viewFromUrl = searchParams.get('view');
    if (viewFromUrl && ['grid', 'table'].includes(viewFromUrl)) {
      setViewType(viewFromUrl);
    } else if (viewFromUrl === 'list') {
      setViewType('table');
      const newParams = new URLSearchParams(searchParams);
      newParams.set('view', 'table');
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams]);
  return (
    <PageWrapper>
      <Container>
        {requests?.newRequestCount > 0 && (
          <BadgeButton
            onPress={handleNavigateNewRequestsPage}
            count={requests?.newRequestCount}
          />
        )}
        <Input
          placeholder="Search category..."
          value={searchValue}
          onChange={handelChange}
          width="250px"
        />
        <Switch
          onSwitch={handleViewTypeChange}
          page="users"
          value={viewType === 'table' ? 'list' : viewType}
        />
        <Create />
      </Container>
      {isLoading.category || isRefreshing ? (
        <LoadContainer>
          <LoadingIcon src={loadIcon} alt="Loading..." />
        </LoadContainer>
      ) : (
        <ContentWrapper>
          {viewType === 'table' ? (
            <>
              <Table
                columns={tableColumns}
                data={categories}
                totalPages={totalPages}
                currentPage={currentPage}
                onPaginationChange={onPaginationChange}
                loading={isLoading.category || isRefreshing}
              />
              <MobileList
                columns={tableColumns}
                data={categories}
                onPaginationChange={onPaginationChange}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </>
          ) : (
            <>
              {categories?.length > 0 ? (
                <ALlCategories>
                  {categories?.map((category) => (
                    <CategoryBox
                      key={category.uuid}
                      onClick={() => handleNavigateToCategoriesItems(category)}
                    >
                      <CategoryImage
                        style={{
                          backgroundImage: `url(${category.photo}?v=${Date.now()})`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                        }}
                      />
                      <ItemCountWrapper>
                        <ItemsCount>{category.itemTypeCount ?? 0}</ItemsCount>
                      </ItemCountWrapper>

                      <CategoryName>{category.name}</CategoryName>
                      <div>
                        <ShiftControllers>
                          <div onClick={(e) => e.stopPropagation()}>
                            <Create isEdit initialData={category} />
                          </div>
                          <ShiftControl
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteModal(category.uuid);
                            }}
                          >
                            {category.itemTypeCount === 0 && (
                              <img alt="Delete icon" src={DeleteIcon} />
                            )}
                          </ShiftControl>
                        </ShiftControllers>
                      </div>
                    </CategoryBox>
                  ))}
                </ALlCategories>
              ) : (
                <EmptyViewWrapper>
                  <EmptyView title={'No results found'} />
                </EmptyViewWrapper>
              )}

              <PaginationWrapper>
                {totalPages > 1 && (
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={onPaginationChange}
                  />
                )}
              </PaginationWrapper>
            </>
          )}
        </ContentWrapper>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onOk={handleConfirmDelete}
        title="Delete Category"
        footer={true}
        width="510px"
      >
        <DeleteText>
          Are you sure you want to delete this category? It will be deleted immediately.
        </DeleteText>
      </Modal>
    </PageWrapper>
  );
};

export default Inventory;
