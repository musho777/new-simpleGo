import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import DeleteIcon from 'assets/delete.svg';
import EditIcon from 'assets/edit.svg';
import Carousel from 'common-ui/carousel/Carousel';
import Modal from 'common-ui/modal';
import { Table } from 'common-ui/table';
import Pagination from 'common-ui/table/Pagination';
import { LoadContainer, LoadingIcon } from 'common-ui/table/Table.styles';
import loadIcon from 'common-ui/table/loading.svg';
import { deleteCategoryItem, getCategoryItems } from 'features/inventory/inventoryActions';
import { selectCategoryItems, selectLoading } from 'features/inventory/inventorySlice';
import EmptyView from 'pages/components/emptyView';
import Switch from 'pages/components/switch';
import Tag from 'pages/components/tag';
import Filter from 'pages/inventory/categorySinglePage/filter/Filter';

import { formatDateTime } from '../../../utils/dateUtils';
import { PaginationWrapper } from '../Inventory.styles';
import {
  ActionIcon,
  CategoryName,
  ClickableItemInfo,
  Container,
  CustomLoyaltyProgram,
  DelateItemMessage,
  EllipsisCell,
  Header,
  HeaderActions,
  ImagesBoxMain,
  ItemBox,
  ItemImages,
  ItemInfo,
  ItemsMainBox,
  LifespanBox,
  LightTooltip,
  NoResultsBox,
  QuantityBox,
  ShiftControl,
  ShiftControllers,
  TableActions,
} from './CategorySinglePage.styles';
import Create from './Create';
import ItemDetails from './PersonalItemDetails';
import { useCategoryItemSearchData } from './filter/useSearchData';

const InventorySinglePage = () => {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = location?.state?.category;

  const data = useSelector(selectCategoryItems) || [];
  const isLoading = useSelector(selectLoading);

  const { itemTypes, count } = data;
  const { searchData, setCategorySingleSearchData } = useCategoryItemSearchData();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryUuid, setSelectedCategoryUuid] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [items, setItems] = useState([]);
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
  const [viewType, setViewType] = useState(searchParams.get('view') || 'grid');
  const navigate = useNavigate();

  const openDeleteModal = (uuid) => {
    setSelectedCategoryUuid(uuid);
    setIsDeleteModalOpen(true);
  };

  const handleClickItemDetailsModalOpen = (item) => {
    if (!item?.items?.length) return;
    setItems(item);
    setIsItemDetailsOpen(true);
  };

  const handleClickItemDetailsModalClose = () => {
    setItems([]);
    setIsItemDetailsOpen(false);
  };

  const [savedCategory, setSavedCategory] = useState(category);

  useEffect(() => {
    if (category) {
      setSavedCategory(category);
    }
  }, [category]);

  const catName = savedCategory?.name || 'Category Name';

  const handleConfirmDelete = () => {
    setIsRefreshing(true);
    dispatch(deleteCategoryItem(selectedCategoryUuid))
      .then(() => dispatch(getCategoryItems({ uuid, params: searchData })))
      .finally(() => {
        setSelectedCategoryUuid(null);
        setIsDeleteModalOpen(false);
        setIsRefreshing(false);
      });
  };

  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 8)) + 1;
  }, [searchData.offset, searchData.limit]);
  const totalPages = Math.ceil(count / 8);

  const onPaginationChange = (page) => {
    const limit = searchData.limit;
    const offset = (page - 1) * limit;
    setCategorySingleSearchData({ offset });
  };

  const handleCancelDelete = () => {
    setSelectedCategoryUuid(null);
    setIsDeleteModalOpen(false);
  };

  const handleStartEdit = (item) => {
    setEditingCategory(item);
  };

  const handleCloseEdit = () => {
    setEditingCategory(null);
  };

  const handleViewTypeChange = (newViewType) => {
    const actualViewType = newViewType === 'list' ? 'table' : newViewType;
    setViewType(actualViewType);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('view', actualViewType);
    setSearchParams(newParams, { replace: true });
  };
  const handleNavigateToLocationTracking = (category) => {
    const { uuid, name } = category;
    navigate(`/inventory/items/${uuid}/location-tracking`, {
      state: { itemTypeName: name },
    });
  };
  const tableColumns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'AVALABLE Count',
      key: 'availableCount',
      dataIndex: 'availableCount',
      render: (lifespan, data) => (
        <p>
          {lifespan} {data.unitOfMeasurement}
        </p>
      ),
    },
    {
      title: 'Total count',
      key: 'totalCount',
      dataIndex: 'totalCount',
      render: (count, data) => (
        <span
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={() => {
            handleNavigateToLocationTracking(data);
          }}
        >
          <p>
            {count} {data.unitOfMeasurement}
          </p>
        </span>
      ),
    },
    {
      title: 'Lifespan',
      key: 'lifespan',
      dataIndex: 'lifespan',
      render: (lifespan) => <Tag type="lifespan" variant={lifespan} />,
    },
    {
      title: 'Usage',
      key: 'usage',
      dataIndex: 'usage',
      render: (lifespan) => <Tag type="usage" variant={lifespan} />,
    },
    {
      title: 'Provider info',
      key: 'providerData',
      dataIndex: 'providerData',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Cost',
      key: 'cost',
      dataIndex: 'cost',
      render: (cost, data) => (
        <p>
          {cost} {data.costCurrency}
        </p>
      ),
    },
    {
      title: 'Inserted Date',
      key: 'insertedDate',
      dataIndex: 'items',
      render: (items) => formatDateTime(items?.[0]?.createdAt),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '150px',
      render: (_, item) => (
        <TableActions>
          <ActionIcon
            alt="Edit icon"
            src={EditIcon}
            onClick={(e) => {
              e.stopPropagation();
              handleStartEdit(item);
            }}
          />
          <ActionIcon
            alt="Delete icon"
            src={DeleteIcon}
            onClick={(e) => {
              e.stopPropagation();
              openDeleteModal(item.uuid);
            }}
          />
        </TableActions>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getCategoryItems({ uuid, params: searchData }));
  }, [uuid, dispatch, JSON.stringify(searchData)]);

  const hasActiveFilters = useMemo(() => {
    const keysToIgnore = ['offset', 'limit'];
    return Object.entries(searchData).some(
      ([key, value]) =>
        !keysToIgnore.includes(key) && value !== undefined && value !== null && value !== ''
    );
  }, [searchData]);

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
    <>
      <Container>
        <Create
          isEdit={!!editingCategory}
          editItem={editingCategory}
          onCloseEdit={handleCloseEdit}
        />

        <Header>
          <CategoryName>{catName}</CategoryName>
          <HeaderActions>
            <Switch
              onSwitch={handleViewTypeChange}
              value={viewType === 'table' ? 'list' : viewType}
              page="users"
            />
            {(itemTypes?.length > 0 || hasActiveFilters) && <Filter />}
          </HeaderActions>
        </Header>
        <>
          {isLoading.createCategoryItem || isLoading.categoryItems || isRefreshing ? (
            <LoadContainer>
              <LoadingIcon src={loadIcon} alt="Loading..." />
            </LoadContainer>
          ) : viewType === 'table' ? (
            <Table
              columns={tableColumns}
              data={itemTypes}
              totalPages={totalPages}
              currentPage={currentPage}
              onPaginationChange={onPaginationChange}
              loading={isLoading.createCategoryItem || isLoading.categoryItems || isRefreshing}
              emptyText="There are no items yet"
            />
          ) : (
            <>
              {itemTypes?.length > 0 ? (
                <>
                  <ItemsMainBox>
                    {itemTypes.map((item, index) => (
                      <ItemBox key={index}>
                        <LifespanBox>
                          <Tag type="lifespan" variant={item.lifespan} />
                        </LifespanBox>
                        <ImagesBoxMain>
                          <ItemImages>
                            <Carousel photos={item.photos} />
                          </ItemImages>
                        </ImagesBoxMain>
                        <div>
                          <LightTooltip
                            title={item?.name?.length > 15 ? item.name : ''}
                            placement="top-start"
                          >
                            <CustomLoyaltyProgram>
                              {item?.name?.length > 15
                                ? `${item.name.slice(0, 15)}...`
                                : item?.name}
                            </CustomLoyaltyProgram>
                          </LightTooltip>
                          <ItemInfo>
                            Inserted date:
                            <QuantityBox>
                              {formatDateTime(item?.items[0]?.createdAt)}
                            </QuantityBox>
                          </ItemInfo>
                          <ClickableItemInfo
                            onClick={() => handleClickItemDetailsModalOpen(item)}
                          >
                            <div>Available Quantity:</div>
                            <QuantityBox>
                              {item?.availableCount}{' '}
                              {item?.availableCount && item.unitOfMeasurement}
                            </QuantityBox>
                          </ClickableItemInfo>
                          <ClickableItemInfo
                            onClick={() => handleClickItemDetailsModalOpen(item)}
                          >
                            <div>Total Quantity:</div>
                            <QuantityBox>
                              {item?.totalCount} {item?.totalCount && item.unitOfMeasurement}
                            </QuantityBox>
                          </ClickableItemInfo>
                        </div>
                        <div>
                          <ShiftControllers>
                            <ShiftControl onClick={() => handleStartEdit(item)}>
                              <img alt="Edit icon" src={EditIcon} />
                            </ShiftControl>
                            <ShiftControl onClick={() => openDeleteModal(item.uuid)}>
                              <img alt="Delete icon" src={DeleteIcon} />
                            </ShiftControl>
                          </ShiftControllers>
                        </div>
                      </ItemBox>
                    ))}
                  </ItemsMainBox>
                  {totalPages > 1 && (
                    <PaginationWrapper>
                      <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={onPaginationChange}
                      />
                    </PaginationWrapper>
                  )}
                </>
              ) : (
                <NoResultsBox>
                  <EmptyView title={'There are no items yet'} />
                </NoResultsBox>
              )}
            </>
          )}
        </>
      </Container>

      <ItemDetails
        isOpen={isItemDetailsOpen}
        onClose={handleClickItemDetailsModalClose}
        data={items}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onOk={handleConfirmDelete}
        title="Delete Item"
        footer={true}
        width="510px"
      >
        <DelateItemMessage>
          Are you sure you want to delete this item? It will be deleted immediately.
        </DelateItemMessage>
      </Modal>
    </>
  );
};

export default InventorySinglePage;
