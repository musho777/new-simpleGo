import React, { forwardRef } from 'react';

import useInfiniteAsyncSelect from 'hooks/useInfiniteAsyncSelect';
import { generateOptions } from 'utils';

import AsyncSelect from './AsyncSelect';

const InfiniteAsyncSelect = forwardRef(
  (
    {
      loadOptionsAction,
      initialData = [],
      pageSize = 10,
      paginationType = 'offset',
      refreshTrigger,
      error,
      ...props
    },
    ref
  ) => {
    const { options, isLoading, loadMoreOptions, onMenuScrollToBottom, onMenuOpen } =
      useInfiniteAsyncSelect(
        (params) => loadOptionsAction(params),
        generateOptions(initialData),
        pageSize,
        paginationType,
        refreshTrigger
      );

    const processedOptions = generateOptions(options);

    const loadOptionsHandler = async (inputValue) => {
      if (inputValue) {
        return processedOptions;
      }
      return processedOptions;
    };

    return (
      <AsyncSelect
        ref={ref}
        {...props}
        defaultOptions={processedOptions.length > 0 ? processedOptions : []}
        loadOptions={loadOptionsHandler}
        onInputChange={loadMoreOptions}
        onMenuOpen={onMenuOpen}
        onMenuScrollToBottom={onMenuScrollToBottom}
        isLoading={isLoading}
        $error={error}
        loadingMessage={isLoading ? 'Loading more...' : 'Start typing to search...'}
      />
    );
  }
);

export default InfiniteAsyncSelect;
