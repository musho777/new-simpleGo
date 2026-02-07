import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from 'common-ui/button';
import Carousel from 'common-ui/carousel/Carousel';
import { Row } from 'common-ui/dragDropUploadFile/DragDropUploadFile.styles';
import MobileList from 'common-ui/mobileList';
import { Table } from 'common-ui/table';
import Pagination from 'common-ui/table/Pagination';
import { LoadContainer, LoadingIcon } from 'common-ui/table/Table.styles';
import loadIcon from 'common-ui/table/loading.svg';
import {
  getEmployeeReturnedItems,
  getPersonalInventoryItems,
  getTemplates,
} from 'features/inventory/inventoryActions';
import {
  selectLoading,
  selectPersonalItems,
  selectPersonalTotalCount,
  selectSuccess,
} from 'features/inventory/inventorySlice';
import EmptyView from 'pages/components/emptyView';
import Tag from 'pages/components/tag';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
} from 'pages/userManagement/UserManagement.styles';
import { formatDateTime } from 'utils/dateUtils';

import {
  ButtonTitle,
  Container,
  CustomProgram,
  DateWrapper,
  EllipsisCell,
  EmptyWrapper,
  ImageMainBox,
  ImagesWrapper,
  LightTooltip,
  MainInventoryItemsBox,
  OptimizeBox,
  ProfileInventoryItemBox,
  StatusBox,
  ViewDetailsButtonWrapper,
} from './Inventory.styles';
import PersonalItemDetails from './PersonalItemDetails';
import Filter from './filter';
import InventoryFilter from './filter/InventoryFilter';
import { usePersonalInventorySearch } from './filter/useSearchData';
import ReturnItemModal from './returnedItems/returnedByMe/ReturnItemModal';

const Inventory = () => {
  const dispatch = useDispatch();
  const { searchData, setSearchData } = usePersonalInventorySearch();
  const { uuid } = useParams();

  const success = useSelector(selectSuccess);
  const loading = useSelector(selectLoading);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const totalCount = useSelector(selectPersonalTotalCount);
  const data = useSelector(selectPersonalItems) || [];
  const viewType = searchData?.view || 'list';
  const [templates, setTemplates] = useState([]);
  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);

  const totalPages = Math.ceil(totalCount / (searchData.limit || 10));

  const handleOpenPersonalItemDetails = (item) => {
    setDetails(item);
    setIsDetailsModalOpen(true);
  };

  const listColumns = useMemo(
    () => [
      {
        title: 'Item',
        dataIndex: 'itemType',
        key: 'item',
        renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
        render: (_, record) => <EllipsisCell>{record.itemType?.name}</EllipsisCell>,
      },
      {
        title: 'Quantity',
        dataIndex: 'itemType',
        key: 'quantity',
        render: (data, record) => (
          <p>
            {record.itemType?.items?.length || 0}
            {` ${data.unitOfMeasurement}`}
          </p>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'itemType',
        key: 'status',
        render: (_, record) => (
          <Tag
            type="profileStatus"
            variant={record.itemType?.available ? 'Available' : 'Unavailable'}
          />
        ),
      },
      {
        title: 'Lifespan',
        dataIndex: 'itemType',
        key: 'lifespan',
        render: (_, record) =>
          record.itemType?.lifespan ? (
            <Tag type="lifespan" variant={record.itemType.lifespan} />
          ) : (
            '-'
          ),
      },
      {
        title: 'Usage',
        dataIndex: 'itemType',
        key: 'usage',
        render: (_, record) =>
          record.itemType?.usage ? <Tag type="usage" variant={record.itemType.usage} /> : '-',
      },
      {
        title: 'Date',
        dataIndex: 'itemType',
        key: 'date',
        render: (_, record) =>
          formatDateTime(record.itemType?.items?.[0]?.providedDate) ?? '-',
      },
    ],
    []
  );

  const mobileColum = useMemo(() => [
    {
      title: 'Item',
      dataIndex: 'itemType',
      key: 'item',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (_, record) => <EllipsisCell>{record?.name}</EllipsisCell>,
    },
    {
      title: 'Quantity',
      dataIndex: 'itemType',
      key: 'quantity',
      render: (_, record) => {
        return (
          <p>
            {record?.items?.length || 0}
            {` ${record?.unitOfMeasurement}`}
          </p>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'itemType',
      key: 'status',
      render: (_, record) => (
        <Tag type="profileStatus" variant={record?.available ? 'Available' : 'Unavailable'} />
      ),
    },
  ]);

  const renderExpandableContent = (row) => (
    <>
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Lifespan</ExpandedLabel>
          <ExpandedValue>
            {row?.lifespan ? <Tag type="lifespan" variant={row.lifespan} /> : '-'}
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Usage</ExpandedLabel>

          <ExpandedValue>
            {row?.usage ? <Tag type="usage" variant={row.usage} /> : '-'}
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Date</ExpandedLabel>
          <ExpandedValue>{formatDateTime(row?.items?.[0]?.providedDate) ?? '-'}</ExpandedValue>
        </Row>
      </ExpandableWrapper>
    </>
  );

  const onPaginationChange = (page) => {
    const limit = searchData.limit || 10;
    const offset = (page - 1) * limit;
    setSearchData({ offset });
  };

  const handleReturnModalClose = () => {
    setIsReturnModalOpen(false);
  };

  const handleReturnSuccess = () => {
    dispatch(getPersonalInventoryItems({ ...searchData, uuid }));
    dispatch(getEmployeeReturnedItems({ limit: 10, offset: 0 }));
  };

  const fetchTemplates = async () => {
    try {
      const response = await dispatch(getTemplates()).unwrap();
      setTemplates(response || []);
    } catch (err) {
      setTemplates([]);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    dispatch(getPersonalInventoryItems({ ...searchData, uuid }));

    if (success.assignNoteToItem) {
      setIsDetailsModalOpen(false);
    }
  }, [dispatch, success.assignNoteToItem, searchData, uuid]);
  return (
    <Container>
      <Filter templates={templates} />
      <InventoryFilter />
      {loading.personalItems ? (
        <LoadContainer>
          <LoadingIcon src={loadIcon} alt="Loading..." />
        </LoadContainer>
      ) : data.length > 0 ? (
        <>
          <MainInventoryItemsBox $viewType={viewType}>
            {viewType === 'grid' ? (
              data?.map((item, index) => {
                const { itemType } = item;
                return (
                  <ProfileInventoryItemBox key={`personal-item-${index}`}>
                    <ImageMainBox>
                      <ImagesWrapper count={itemType?.photos?.length || 1}>
                        <Carousel
                          className="profile-inventory-image"
                          photos={
                            itemType?.photos?.map((photo) => ({ photo: photo.fullPath })) || []
                          }
                        />
                      </ImagesWrapper>
                      <StatusBox>
                        <Tag
                          type="profileStatus"
                          variant={itemType?.available ? 'Available' : 'Unavailable'}
                        />
                      </StatusBox>
                    </ImageMainBox>
                    <OptimizeBox>
                      <LightTooltip
                        title={itemType.name.length > 15 ? `${itemType.name}` : ''}
                        placement="top-start"
                      >
                        <CustomProgram>
                          {itemType.name.length > 15
                            ? `${itemType.name.slice(0, 15)}...`
                            : itemType.name}
                        </CustomProgram>
                      </LightTooltip>
                    </OptimizeBox>
                    <ViewDetailsButtonWrapper>
                      <DateWrapper>
                        {formatDateTime(itemType.items[0].providedDate) ?? '-'}
                      </DateWrapper>
                      <Button
                        type="link"
                        onClick={() => handleOpenPersonalItemDetails(itemType.items)}
                      >
                        <ButtonTitle>View details</ButtonTitle>
                      </Button>
                    </ViewDetailsButtonWrapper>
                  </ProfileInventoryItemBox>
                );
              })
            ) : (
              <>
                <Table
                  data={data}
                  columns={listColumns}
                  emptyText="No inventory items found."
                  totalPages={totalPages}
                  onPaginationChange={onPaginationChange}
                  currentPage={currentPage}
                  onRowClick={(record) =>
                    handleOpenPersonalItemDetails(record.itemType?.items)
                  }
                />
                <MobileList
                  data={data.map(({ itemType }) => itemType)}
                  columns={mobileColum}
                  expandable={renderExpandableContent}
                  emptyText="No inventory items found."
                  totalPages={totalPages}
                  onPaginationChange={onPaginationChange}
                  currentPage={currentPage}
                  onRowClick={(record) =>
                    handleOpenPersonalItemDetails(record.itemType?.items)
                  }
                />
              </>
            )}
          </MainInventoryItemsBox>

          {viewType === 'grid' && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPaginationChange}
            />
          )}
        </>
      ) : (
        <EmptyWrapper>
          <EmptyView title={'No inventory items found.'} />
        </EmptyWrapper>
      )}
      <PersonalItemDetails
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        data={details}
      />

      <ReturnItemModal
        isOpen={isReturnModalOpen}
        onClose={handleReturnModalClose}
        onSuccess={handleReturnSuccess}
      />
    </Container>
  );
};

export default Inventory;
