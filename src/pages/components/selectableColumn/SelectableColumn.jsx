import { useEffect, useState } from 'react';

import SearchIcon from 'assets/filters/searchIcon.svg';
import Input from 'common-ui/input';
import MyCheckbox from 'common-ui/myCheckbox';
import { LoadContainer, LoadingIcon } from 'common-ui/table/Table.styles';
import loadIcon from 'common-ui/table/loading.svg';

import { Container, Row, SearchWrapper, Text } from './SelectableColumn.styles';

const SelectableColumn = ({
  data,
  handleCheckboxClick,
  selectedItems,
  headerData,
  searchable,
  showHeader,
  onSearch,
  loading,
}) => {
  const [selectedAll, setSelectedAll] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleSelectAll = () => {
    const allUuids = data.map((item) => item.uuid);

    if (selectedAll) {
      handleCheckboxClick(allUuids, false);
    } else {
      handleCheckboxClick(allUuids, true);
    }

    setSelectedAll(!selectedAll);
  };

  const handleSearchInputChange = (e) => {
    onSearch(e.target.value);
    setSearchInputValue(e.target.value);
  };

  useEffect(() => {
    if (selectedItems.length === 0) {
      setSelectedAll(false);
    }
  }, [selectedItems]);

  return (
    <Container>
      {(data?.length > 0 || showHeader) && (
        <SearchWrapper>
          <Row>
            <MyCheckbox selected={selectedAll} onClick={handleSelectAll} />
            <Text>Select All</Text>
          </Row>
          {searchable && (
            <Input
              placeholder="search..."
              className="max-h"
              onChange={handleSearchInputChange}
              value={searchInputValue}
              leftIcon={SearchIcon}
              onClear={() => {
                setSearchInputValue('');
                onSearch('');
              }}
              clearable
            />
          )}
        </SearchWrapper>
      )}
      {loading ? (
        <LoadContainer>
          <LoadingIcon src={loadIcon} alt="Loading..." />
        </LoadContainer>
      ) : (
        <>
          {headerData && <Row>{headerData}</Row>}
          {data?.map((item, index) => (
            <Row key={`row-index-${index}`}>
              <MyCheckbox
                uuid={item.uuid}
                selected={selectedItems?.includes(item.uuid)}
                onClick={() => handleCheckboxClick(item.uuid)}
              />
              {item?.avatar}
              <Text>{item.name}</Text>
            </Row>
          ))}
        </>
      )}
    </Container>
  );
};

export default SelectableColumn;
