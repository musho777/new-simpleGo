import { Fragment, useCallback, useEffect, useState } from 'react';

import EmptyView from 'pages/components/emptyView';

import { CustomTooltip } from './CustomTooltip';
import Pagination from './Pagination';
import plus from './Plus.svg';
import {
  AdditionalHeader,
  Arrow,
  EmptyWrapper,
  ExpandedContentWrapper,
  HeaderTitleWrapper,
  LoadContainer,
  LoadingIcon,
  Minus,
  Plus,
  ResizableTableHeader,
  ResizeHandle,
  ResizeIconContainer,
  ResizeIconImg,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TablePageWrapper,
  TableRow,
  TableWrapper,
} from './Table.styles';
import downActive from './down-active.svg';
import down from './down.svg';
import loadIcon from './loading.svg';
import { CustomMenu } from './menu';
import minus from './minus.svg';
import resizeIcon from './resize.svg';
import upActive from './up-active.svg';
import up from './up.svg';

const CustomTable = ({
  data = [],
  columns,
  width,
  scrollable,
  hover = true,
  loading,
  currentPage = 1,
  totalPages = 1,
  onPaginationChange,
  handleRowCountChange,
  count,
  editableRowCount,
  dataCount,
  emptyText,
  isExpandable = false,
  expandedContentRenderer,
  getRowColor,
  oddRowColor,
  evenRowColor,
  additionalColumns = [],
  pageOptions = [10, 25, 50],
  onAdd,
  removeRow,
  pagination = true,
  onRowClick,
  shouldExpandRow,
  externalComponent,
  followCursor = true,
  arrow = true,
  resizable = false,
  onSort,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [expandedRows, setExpandedRows] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [columnWidths, setColumnWidths] = useState(() => {
    const initialWidths = {};
    columns?.forEach((col) => {
      if (col.resize) {
        initialWidths[col.key] = col.width || 150;
      }
    });
    return initialWidths;
  });
  const [resizing, setResizing] = useState(null);
  const handlePageChange = (page) => {
    if (onPaginationChange) onPaginationChange(page);
  };

  const handleResizeStart = (columnKey, startX) => {
    const column = columns?.find((col) => col.key === columnKey);
    if (column?.resize) {
      setResizing({ columnKey, startX, startWidth: columnWidths[columnKey] });
    }
  };

  const handleResizeMove = useCallback(
    (e) => {
      if (!resizing) return;

      const deltaX = e.clientX - resizing.startX;
      const newWidth = Math.max(50, resizing.startWidth + deltaX);

      setColumnWidths((prev) => ({
        ...prev,
        [resizing.columnKey]: newWidth,
      }));
    },
    [resizing]
  );

  const handleResizeEnd = useCallback(() => {
    setResizing(null);
  }, []);

  useEffect(() => {
    if (resizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizing, handleResizeMove, handleResizeEnd]);

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key) {
      direction =
        sortConfig.direction === 'asc'
          ? 'desc'
          : sortConfig.direction === 'desc'
            ? null
            : 'asc';
    }
    setSortConfig({ key, direction });

    if (onSort) {
      onSort(key, direction);
    }
  };

  const sortedData = () => {
    if (onSort) {
      return data;
    }
    if (!sortConfig.key || !sortConfig.direction) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const toggleRowExpansion = (rowId) => {
    if (expandedRows[rowId]) {
      const newExpanded = { ...expandedRows };
      delete newExpanded[rowId];
      setExpandedRows(newExpanded);
    } else {
      setExpandedRows((prev) => ({
        ...prev,
        [rowId]: { loading: true, data: [], currentPage: 1, totalPages: 1 },
      }));
    }
  };

  const renderRows = (rows) =>
    rows?.map((row, rowIndex) => {
      const rowId = row.id || row.key || rowIndex;
      const expanded = expandedRows[rowId];

      return (
        <Fragment key={rowId}>
          <TableRow
            onClick={() => {
              const canExpand =
                isExpandable &&
                (row.subtasks > 0 ||
                  row.subItems?.length > 0 ||
                  (shouldExpandRow && shouldExpandRow(row)));

              if (canExpand) {
                toggleRowExpansion(rowId);
              }
              if (onRowClick) {
                onRowClick(row);
              }
            }}
            $hover={hover}
            $inActive={row.isVerified === false || row.deletedAt != null || row.disabled}
            $isExpandable={
              row.subItems?.length > 0 ||
              row.subtasks > 0 ||
              (shouldExpandRow && shouldExpandRow(row))
            }
            $hasRowClick={!!onRowClick}
            $rowColor={
              getRowColor?.(row, rowIndex) ??
              (rowIndex % 2 === 0 ? evenRowColor : oddRowColor) ??
              undefined
            }
          >
            {columns?.map((col) => {
              return (
                <TableCell
                  key={col.key}
                  $additional={col.additional}
                  $align={col.align}
                  $width={resizable && col.resize ? columnWidths[col.key] : col.width}
                  $resizable={col.resize}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* {colIndex === 0 && isExpandable && row.subItems > 0 && (
                    <div
                      style={{
                        width: 16,
                        marginRight: 8,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {
                        <img
                          src={expanded ? checkUp : checkDown}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRowExpansion(rowId);
                          }}
                          alt="toggle"
                          style={{ cursor: 'pointer' }}
                        />
                      }
                    </div>
                  )} */}
                    {col.renderTooltip ? (
                      <CustomTooltip
                        followCursor={followCursor}
                        arrow={arrow}
                        title={col.renderTooltip(row[col.dataIndex], row)}
                        placement={col.tooltipPlacement ?? 'top'}
                      >
                        <div>
                          {col.render
                            ? col.render(row[col.dataIndex], row, rowIndex)
                            : row[col.dataIndex]}
                        </div>
                      </CustomTooltip>
                    ) : (
                      <div>
                        {col.render
                          ? col.render(row[col.dataIndex], row, rowIndex)
                          : row[col.dataIndex]}
                      </div>
                    )}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>

          {expanded && isExpandable && (
            <tr>
              <td colSpan={columns.length}>
                <ExpandedContentWrapper>
                  {expandedContentRenderer ? (
                    expandedContentRenderer(row, expanded)
                  ) : (
                    <EmptyView title={emptyText || 'No results found'} />
                  )}
                </ExpandedContentWrapper>
              </td>
            </tr>
          )}
        </Fragment>
      );
    });

  const handleClickOutside = useCallback((event) => {
    if (!event.target.closest('#dropdown-container')) {
      setIsDropdownOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen, handleClickOutside, handleKeyDown]);

  useEffect(() => {
    if (resizable && columns) {
      const initialWidths = {};
      columns.forEach((col) => {
        if (col.resize) {
          initialWidths[col.key] = columnWidths[col.key] || col.width || 150;
        }
      });
      setColumnWidths(initialWidths);
    }
  }, [columns, resizable]);

  const renderDropdown = () => (
    <CustomMenu
      onClick={(elm) => onAdd(elm)}
      anchorEl={anchorEl}
      open={isDropdownOpen}
      items={additionalColumns}
    />
  );

  return (
    <TablePageWrapper className="table-main-container table-wrapper-page">
      <TableContainer className="table-main-container">
        <TableWrapper className="table-wrapper" $width={width} $scrollable={scrollable}>
          {loading ? (
            <LoadContainer>
              <LoadingIcon src={loadIcon} alt="Loading..." />
            </LoadContainer>
          ) : sortedData()?.length === 0 ? (
            <EmptyWrapper>
              <EmptyView title={emptyText || 'No results found'} />
            </EmptyWrapper>
          ) : (
            <Table>
              <TableRow>
                {columns?.map((col, index) => {
                  const HeaderComponent = resizable ? ResizableTableHeader : TableHeader;
                  return (
                    <HeaderComponent
                      className="table-header"
                      key={col.key}
                      $additional={col.additional}
                      $align={col.align}
                      $width={resizable && col.resize ? columnWidths[col.key] : col.width}
                      onClick={() => col.sortable && sortData(col.dataIndex)}
                      style={{
                        cursor: col.sortable ? 'pointer' : 'default',
                        userSelect: 'none',
                      }}
                    >
                      <HeaderTitleWrapper>
                        {col.title}

                        {col.resize && (
                          <ResizeIconContainer>
                            <ResizeIconImg src={resizeIcon} alt="resizable" />
                          </ResizeIconContainer>
                        )}
                      </HeaderTitleWrapper>

                      {col.additional && (
                        <Minus onClick={() => removeRow({ key: col.key })} src={minus} />
                      )}
                      {col.sortable && (
                        <Arrow
                          src={
                            sortConfig.key === col.dataIndex
                              ? sortConfig.direction === 'asc'
                                ? upActive
                                : sortConfig.direction === 'desc'
                                  ? downActive
                                  : null
                              : sortConfig.direction === 'asc'
                                ? up
                                : down
                          }
                          alt={
                            sortConfig.direction === 'asc'
                              ? 'ascending'
                              : sortConfig.direction === 'desc'
                                ? 'descending'
                                : ''
                          }
                        />
                      )}
                      {resizable && col.resize && index < columns.length - 1 && (
                        <ResizeHandle
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleResizeStart(col.key, e.clientX);
                          }}
                        />
                      )}
                    </HeaderComponent>
                  );
                })}
                {additionalColumns.length > 0 && (
                  <AdditionalHeader>
                    <Plus
                      onClick={(e) => {
                        !isDropdownOpen && e.stopPropagation();
                        setIsDropdownOpen(true);
                        setAnchorEl(e.currentTarget);
                      }}
                      src={plus}
                    />
                    {isDropdownOpen && renderDropdown()}
                  </AdditionalHeader>
                )}
              </TableRow>

              {renderRows(sortedData())}
            </Table>
          )}
        </TableWrapper>
      </TableContainer>
      {externalComponent}
      {!loading && sortedData()?.length > 0 && pagination && (
        <Pagination
          count={count}
          currentPage={currentPage}
          dataCount={dataCount}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          editableRowCount={editableRowCount}
          handleRowCountChange={handleRowCountChange}
          pageOptions={pageOptions}
        />
      )}
    </TablePageWrapper>
  );
};

export default CustomTable;
