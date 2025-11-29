export type PaginationLinksParams = {
  baseUrl: string; // e.g., '/api/users'
  currentPage: number;
  totalPages: number;
  queryParams?: Record<string, any>; // Original filters, limit, etc.
};

export type PaginationLinks = {
  first: string | null;
  previous: string | null;
  next: string | null;
  last: string | null;
};

/**
 * Generates the HATEOAS links object for pagination.
 */
export function generateLinks(params: PaginationLinksParams): PaginationLinks {
  const { baseUrl, currentPage, totalPages, queryParams } = params;

  // Helper to build a specific page URL
  const buildUrl = (pageNum: number | null): string | null => {
    if (pageNum === null || pageNum < 1 || pageNum > totalPages) return null;

    // Use URLSearchParams to correctly format query parameters
    const searchParams = new URLSearchParams({
      ...queryParams,
      page: pageNum.toString(),
    });

    return `${baseUrl}?${searchParams.toString()}`;
  };

  return {
    first: buildUrl(1),
    previous: buildUrl(currentPage > 1 ? currentPage - 1 : null),
    next: buildUrl(currentPage < totalPages ? currentPage + 1 : null),
    last: buildUrl(totalPages),
  };
}

export interface PaginationMetaParams {
  totalItems: number;
  limit: number; // items per page
  currentPage: number;
  itemCount: number; // actual items returned in current response
}

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Generates the standard API pagination metadata object.
 */
export function generateMeta(params: PaginationMetaParams): PaginationMeta {
  const { totalItems, limit, currentPage, itemCount } = params;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    totalItems: totalItems,
    itemCount: itemCount,
    itemsPerPage: limit,
    totalPages: totalPages,
    currentPage: currentPage,
  };
}

export type PaginationResult<T> = {
  data: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string | null;
    next: string | null;
    last: string;
  };
};
