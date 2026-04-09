import styles from './EmptyState.module.css'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'No feedback matches',
  description = 'Try adjusting your search or filters.',
}: EmptyStateProps) {
  return (
    <output className={styles.wrap} aria-live="polite">
      <span className={styles.title}>{title}</span>
      <span className={styles.desc}>{description}</span>
    </output>
  )
}
