import type { FeedbackPriority } from '../../types/feedback'
import styles from './PriorityBadge.module.css'

const PRIORITY_CLASS: Record<FeedbackPriority, string> = {
  High: styles.high,
  Medium: styles.medium,
  Low: styles.low,
}

interface PriorityBadgeProps {
  priority: FeedbackPriority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={`${styles.badge} ${PRIORITY_CLASS[priority]}`}>
      {priority}
    </span>
  )
}
