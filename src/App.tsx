import { useCallback, useMemo, useState } from 'react'
import {
  getRequestedDatasetCount,
  MAX_FEEDBACK_GENERATED,
} from './api/feedback'
import { EmptyState } from './components/EmptyState/EmptyState'
import { ErrorState } from './components/ErrorState/ErrorState'
import { FeedbackCardList } from './components/FeedbackCardList/FeedbackCardList'
import { FeedbackDetailModal } from './components/FeedbackDetailModal/FeedbackDetailModal'
import { FeedbackFilters } from './components/FeedbackFilters/FeedbackFilters'
import { FeedbackTable } from './components/FeedbackTable/FeedbackTable'
import { LoadingState } from './components/LoadingState/LoadingState'
import { PaginationBar } from './components/PaginationBar/PaginationBar'
import { useFeedbackData } from './hooks/useFeedbackData'
import { useFeedbackList } from './hooks/useFeedbackList'
import type { FeedbackStatus } from './types/feedback'
import styles from './App.module.css'

const base = import.meta.env.BASE_URL || '/'

function App() {
  const { data, loading, error, refetch } = useFeedbackData()
  const [statusById, setStatusById] = useState<
    Record<string, FeedbackStatus>
  >({})
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const datasetHint = useMemo(() => getRequestedDatasetCount(), [])

  const merged = useMemo(
    () =>
      data?.map((f) => ({
        ...f,
        status: statusById[f.id] ?? f.status,
      })) ?? [],
    [data, statusById],
  )

  const {
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
    sort,
    setSort,
    filteredSorted,
    pagedItems,
    page,
    setPage,
    totalPages,
    totalItems,
    pageSize,
  } = useFeedbackList(merged)

  const selected = useMemo(
    () =>
      selectedId
        ? (merged.find((f) => f.id === selectedId) ?? null)
        : null,
    [merged, selectedId],
  )

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedId(null)
  }, [])

  const handleStatusChange = useCallback(
    (id: string, next: FeedbackStatus) => {
      setStatusById((prev) => ({ ...prev, [id]: next }))
    },
    [],
  )

  const loadedCount = data?.length ?? 0
  const datasetLine =
    datasetHint !== null
      ? `Loaded ${loadedCount.toLocaleString()} generated rows (max ${MAX_FEEDBACK_GENERATED.toLocaleString()} via ?n=).`
      : `Loaded ${loadedCount} curated mock rows. Use ?n=5000 for a large synthetic dataset.`

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <h1 className={styles.title}>Customer Feedback Explorer</h1>
        <p className={styles.subtitle}>
          Browse, search, and triage feedback. Filters persist in{' '}
          <code className={styles.inlineCode}>localStorage</code>. {datasetLine}
        </p>
        <div className={styles.toolbar}>
          <a className={styles.link} href={`${base}?n=5000`}>
            Load ~5k (generated)
          </a>
          <a className={styles.link} href={base}>
            Mock dataset (~22)
          </a>
          <a className={styles.link} href={`${base}?error=1`}>
            Error simulation
          </a>
        </div>
      </header>

      <main className={styles.main} id="main-content">
        {loading && <LoadingState />}

        {!loading && error && (
          <ErrorState message={error} onRetry={refetch} />
        )}

        {!loading && !error && data && (
          <>
            <div className={styles.filters}>
              <FeedbackFilters
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
                status={status}
                onStatusChange={setStatus}
                sort={sort}
                onSortChange={setSort}
              />
            </div>

            {filteredSorted.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className={styles.desktopOnly}>
                  <FeedbackTable
                    items={pagedItems}
                    selectedId={selectedId}
                    onSelect={handleSelect}
                  />
                </div>
                <div className={styles.mobileOnly}>
                  <FeedbackCardList
                    items={pagedItems}
                    selectedId={selectedId}
                    onSelect={handleSelect}
                  />
                </div>
                <PaginationBar
                  page={page}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  pageSize={pageSize}
                  onPageChange={setPage}
                />
              </>
            )}
          </>
        )}
      </main>

      <FeedbackDetailModal
        open={selected !== null}
        feedback={selected}
        onClose={handleCloseModal}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}

export default App
