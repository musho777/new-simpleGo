import { useCallback, useEffect, useRef, useState } from 'react';

import useDebounce from './useDebounce';

// Helper function to extract data and count from various response formats
const extractResponseData = (response) => {
  // Pattern A: Standard paginated response { users: [...], count: number }
  const dataKeys = [
    'users',
    'departments',
    'teams',
    'projects',
    'subprojects',
    'branches',
    'categories',
    'items',
    'requests',
    'schedules',
    'tickets',
    'projectTypes',
    'subprojectTypes',
    'invoices',
    'payments',
    'processes',
    'workflowStatuses',
  ];

  for (const key of dataKeys) {
    if (response[key]) {
      return {
        data: response[key],
        count: response.count || response.total || null,
      };
    }
  }

  // Pattern B: Direct arrays (roles, heads, regions, districts, timezone, etc.)
  const directArrayKeys = [
    'roles',
    'heads',
    'regions',
    'districts',
    'methods',
    'types',
    'statuses',
    'tariffs',
    'cities',
  ];

  for (const key of directArrayKeys) {
    if (response[key]) {
      return {
        data: response[key],
        count: null, // These typically don't have pagination
      };
    }
  }

  // Pattern C: Redux Toolkit payload wrapper
  if (response.payload) {
    return extractResponseData(response.payload);
  }

  // Pattern D: Direct response (array or object)
  if (Array.isArray(response)) {
    return {
      data: response,
      count: null,
    };
  }

  // Fallback: assume response.data or direct response
  return {
    data: response.data || response,
    count: response.count || response.total || null,
  };
};

const useInfiniteAsyncSelect = (
  loadOptionsFunc,
  initialOptions = [],
  pageSize = 10,
  paginationType = 'offset'
) => {
  const [options, setOptions] = useState(initialOptions);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const pageRef = useRef(1);
  const offsetRef = useRef(0);
  const searchTermRef = useRef('');
  const hasInitialLoadRef = useRef(false);
  const hasSearchedRef = useRef(false);
  const loadingSearchTermRef = useRef('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const loadMoreOptionsInternal = useCallback(
    async (inputValue = '') => {
      const isNewSearch = inputValue !== searchTermRef.current;

      if (isLoading || (!hasMore && !isNewSearch)) return;

      if (isNewSearch && loadingSearchTermRef.current === inputValue) return;

      if (isNewSearch) {
        pageRef.current = 1;
        offsetRef.current = 0;
        searchTermRef.current = inputValue;
        loadingSearchTermRef.current = inputValue;
        setHasMore(true);
        setTotalCount(null);
      }

      if (totalCount !== null) {
        const currentPosition =
          paginationType === 'page' ? (pageRef.current - 1) * pageSize : offsetRef.current;
        if (currentPosition >= totalCount) {
          setHasMore(false);
          return;
        }
      }

      setIsLoading(true);

      try {
        const paginationParams =
          paginationType === 'page'
            ? { page: pageRef.current }
            : { offset: offsetRef.current };

        const response = await loadOptionsFunc({
          limit: pageSize,
          ...paginationParams,
          ...(inputValue && { search: inputValue }),
        });

        const { data: newOptionsData, count } = extractResponseData(response);
        const newOptions = Array.isArray(newOptionsData) ? newOptionsData : [];

        if (count !== null && (isNewSearch || totalCount === null)) {
          setTotalCount(count);
        }

        if (isNewSearch) {
          setOptions(newOptions);
        } else {
          setOptions((prev) => [...prev, ...newOptions]);
        }

        const hasMoreItems =
          newOptions.length === pageSize &&
          (count === null ||
            (paginationType === 'page'
              ? pageRef.current * pageSize < count
              : offsetRef.current + pageSize < count));

        setHasMore(hasMoreItems);

        if (!isNewSearch) {
          if (paginationType === 'page') {
            pageRef.current += 1;
          } else {
            offsetRef.current += pageSize;
          }
        }
      } catch (error) {
        console.error('Error loading options:', error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [loadOptionsFunc, pageSize, isLoading, hasMore, totalCount, paginationType]
  );

  useEffect(() => {
    const isInitialMount =
      searchTermRef.current === '' && debouncedSearchTerm === '' && !hasSearchedRef.current;

    if (!isInitialMount) {
      if (debouncedSearchTerm === '' && searchTermRef.current !== '') {
        pageRef.current = 1;
        offsetRef.current = 0;
        setHasMore(true);
        setTotalCount(null);
      }
      loadMoreOptionsInternal(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleMenuScrollToBottom = useCallback(() => {
    if (hasMore && !isLoading) {
      loadMoreOptionsInternal(searchTermRef.current);
    }
  }, [hasMore, isLoading]);

  const handleInputChange = useCallback((inputValue) => {
    const isNewSearch = inputValue !== searchTermRef.current;
    if (isNewSearch) {
      const isAddingChars = inputValue.length > searchTermRef.current.length;
      if (isAddingChars) {
        setOptions([]);
      }
      pageRef.current = 1;
      offsetRef.current = 0;
      setHasMore(true);
      setTotalCount(null);
    }
    setSearchTerm(inputValue);
  }, []);

  const handleMenuOpen = useCallback(() => {
    if (options.length === 0 && !hasInitialLoadRef.current) {
      hasInitialLoadRef.current = true;
      loadMoreOptionsInternal('');
    }
  }, [loadMoreOptionsInternal, options.length]);

  const reset = useCallback(() => {
    setOptions(initialOptions);
    setHasMore(true);
    setTotalCount(null);
    setSearchTerm('');
    pageRef.current = 1;
    offsetRef.current = 0;
    searchTermRef.current = '';
  }, [initialOptions]);

  return {
    options,
    isLoading,
    hasMore,
    totalCount,
    loadMoreOptions: handleInputChange,
    onMenuScrollToBottom: handleMenuScrollToBottom,
    onMenuOpen: handleMenuOpen,
    reset,
  };
};

export default useInfiniteAsyncSelect;
