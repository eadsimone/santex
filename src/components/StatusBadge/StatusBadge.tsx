import type { FeedbackStatus } from '../../types/feedback'
import styles from './StatusBadge.module.css'

const STATUS_CLASS: Record<FeedbackStatus, string> = {
  Open: styles.open,
  'In Progress': styles.inProgress,
  Resolved: styles.resolved,
}

interface StatusBadgeProps {
  status: FeedbackStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${STATUS_CLASS[status]}`}>
      {status}
    </span>
  )
}
