import styles from './ErrorState.module.css'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      className={styles.wrap}
      role="alert"
      aria-live="assertive"
    >
      <h2 className={styles.title}>Something went wrong</h2>
      <p className={styles.message}>{message}</p>
      <button type="button" className={styles.retry} onClick={onRetry}>
        Retry
      </button>
      <p className={styles.hint}>
        Tip: remove <code className={styles.code}>?error=1</code> from the URL
        if you enabled the error simulation.
      </p>
    </div>
  )
}
