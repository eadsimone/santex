import styles from './PaginationBar.module.css'

interface PaginationBarProps {
  page: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

export function PaginationBar({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationBarProps) {
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)
  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <nav
      className={styles.nav}
      aria-label="Pagination"
    >
      <p className={styles.range} aria-live="polite">
        Showing <strong>{from}</strong>–<strong>{to}</strong> of{' '}
        <strong>{totalItems}</strong>
      </p>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          disabled={!canPrev}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <span className={styles.status}>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          className={styles.btn}
          disabled={!canNext}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </nav>
  )
}
