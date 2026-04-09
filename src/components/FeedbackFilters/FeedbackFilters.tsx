import type {
  CategoryFilter,
  SortOption,
  StatusFilter,
} from '../../types/feedback'
import {
  FEEDBACK_CATEGORIES,
  FEEDBACK_STATUSES,
} from '../../types/feedback'
import { SearchInput } from '../SearchInput/SearchInput'
import styles from './FeedbackFilters.module.css'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'priority', label: 'Priority (High → Low)' },
]

interface FeedbackFiltersProps {
  search: string
  onSearchChange: (v: string) => void
  category: CategoryFilter
  onCategoryChange: (v: CategoryFilter) => void
  status: StatusFilter
  onStatusChange: (v: StatusFilter) => void
  sort: SortOption
  onSortChange: (v: SortOption) => void
}

export function FeedbackFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
}: FeedbackFiltersProps) {
  return (
    <div className={styles.wrap}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Find feedback</legend>
        <div className={styles.row}>
          <SearchInput
            id="feedback-search"
            label="Search"
            value={search}
            onChange={onSearchChange}
          />
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Refine</legend>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="filter-category">
              Category
            </label>
            <select
              id="filter-category"
              className={styles.select}
              value={category}
              onChange={(e) =>
                onCategoryChange(e.target.value as CategoryFilter)
              }
            >
              <option value="all">All categories</option>
              {FEEDBACK_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="filter-status">
              Status
            </label>
            <select
              id="filter-status"
              className={styles.select}
              value={status}
              onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
            >
              <option value="all">All statuses</option>
              {FEEDBACK_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="filter-sort">
              Sort by
            </label>
            <select
              id="filter-sort"
              className={styles.select}
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>
    </div>
  )
}
