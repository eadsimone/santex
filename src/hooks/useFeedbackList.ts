import { useCallback, useEffect, useMemo, useState } from 'react'
import type {
  CategoryFilter,
  Feedback,
  SortOption,
  StatusFilter,
} from '../types/feedback'
import {
  filterFeedback,
  isFeedbackCategory,
  isFeedbackStatus,
  isSortOption,
  sortFeedback,
} from '../utils/feedback'
import { useDebounce } from './useDebounce'

const STORAGE_KEY = 'feedback-explorer-filters-v1'
const MAX_SEARCH_LENGTH = 500

/** Rows per page after filter/sort (v2). */
export const FEEDBACK_PAGE_SIZE = 25

export interface PersistedFilters {
  search: string
  category: CategoryFilter
  status: StatusFilter
  sort: SortOption
}

const DEFAULT_FILTERS: PersistedFilters = {
  search: '',
  category: 'all',
  status: 'all',
  sort: 'newest',
}

function clampSearch(s: string): string {
  if (s.length <= MAX_SEARCH_LENGTH) {
    return s
  }
  return s.slice(0, MAX_SEARCH_LENGTH)
}

function parseCategory(v: unknown): CategoryFilter {
  if (v === 'all') {
    return 'all'
  }
  if (isFeedbackCategory(v)) {
    return v
  }
  return 'all'
}

function parseStatus(v: unknown): StatusFilter {
  if (v === 'all') {
    return 'all'
  }
  if (isFeedbackStatus(v)) {
    return v
  }
  return 'all'
}

function loadFilters(): PersistedFilters {
  if (typeof window === 'undefined') {
    return DEFAULT_FILTERS
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return DEFAULT_FILTERS
    }
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') {
      return DEFAULT_FILTERS
    }
    const o = parsed as Record<string, unknown>
    const search =
      typeof o.search === 'string' ? clampSearch(o.search) : DEFAULT_FILTERS.search
    return {
      search,
      category: parseCategory(o.category),
      status: parseStatus(o.status),
      sort: isSortOption(o.sort) ? o.sort : DEFAULT_FILTERS.sort,
    }
  } catch {
    return DEFAULT_FILTERS
  }
}

function persistFilters(f: PersistedFilters): void {
  if (typeof window === 'undefined') {
    return
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(f))
  } catch {
    /* quota / private mode */
  }
}

export interface UseFeedbackListResult {
  search: string
  setSearch: (v: string) => void
  category: CategoryFilter
  setCategory: (v: CategoryFilter) => void
  status: StatusFilter
  setStatus: (v: StatusFilter) => void
  sort: SortOption
  setSort: (v: SortOption) => void
  filteredSorted: Feedback[]
  pagedItems: Feedback[]
  page: number
  setPage: (p: number) => void
  totalPages: number
  totalItems: number
  pageSize: number
}

export function useFeedbackList(items: readonly Feedback[]): UseFeedbackListResult {
  const [filters, setFilters] = useState<PersistedFilters>(() => loadFilters())
  const [page, setPage] = useState(1)

  const update = useCallback((patch: Partial<PersistedFilters>) => {
    setFilters((prev) => {
      const next = { ...prev, ...patch }
      if (patch.search !== undefined) {
        next.search = clampSearch(patch.search)
      }
      persistFilters(next)
      return next
    })
  }, [])

  const debouncedSearch = useDebounce(filters.search, 300)

  const filteredSorted = useMemo(() => {
    const filtered = filterFeedback(items, {
      search: debouncedSearch,
      category: filters.category,
      status: filters.status,
    })
    return sortFeedback(filtered, filters.sort)
  }, [
    items,
    debouncedSearch,
    filters.category,
    filters.status,
    filters.sort,
  ])

  const totalItems = filteredSorted.length
  const totalPages = Math.max(1, Math.ceil(totalItems / FEEDBACK_PAGE_SIZE))

  useEffect(() => {
    const t = window.setTimeout(() => {
      setPage(1)
    }, 0)
    return () => window.clearTimeout(t)
  }, [debouncedSearch, filters.category, filters.status, filters.sort])

  useEffect(() => {
    const t = window.setTimeout(() => {
      setPage((p) => Math.min(Math.max(1, p), totalPages))
    }, 0)
    return () => window.clearTimeout(t)
  }, [totalPages])

  const pagedItems = useMemo(() => {
    const start = (page - 1) * FEEDBACK_PAGE_SIZE
    return filteredSorted.slice(start, start + FEEDBACK_PAGE_SIZE)
  }, [filteredSorted, page])

  const setSearch = useCallback(
    (v: string) => update({ search: v }),
    [update],
  )
  const setCategory = useCallback(
    (v: CategoryFilter) => update({ category: v }),
    [update],
  )
  const setStatus = useCallback(
    (v: StatusFilter) => update({ status: v }),
    [update],
  )
  const setSort = useCallback(
    (v: SortOption) => update({ sort: v }),
    [update],
  )

  const goToPage = useCallback((p: number) => {
    setPage(Math.min(Math.max(1, p), totalPages))
  }, [totalPages])

  return {
    search: filters.search,
    setSearch,
    category: filters.category,
    setCategory,
    status: filters.status,
    setStatus,
    sort: filters.sort,
    setSort,
    filteredSorted,
    pagedItems,
    page,
    setPage: goToPage,
    totalPages,
    totalItems,
    pageSize: FEEDBACK_PAGE_SIZE,
  }
}
