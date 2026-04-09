import { memo } from 'react'
import type { Feedback } from '../../types/feedback'
import { formatFeedbackDate } from '../../utils/date'
import { PriorityBadge } from '../PriorityBadge/PriorityBadge'
import { StatusBadge } from '../StatusBadge/StatusBadge'
import styles from './FeedbackCard.module.css'

interface FeedbackCardProps {
  item: Feedback
  selected: boolean
  onSelect: (id: string) => void
}

function FeedbackCardInner({ item, selected, onSelect }: FeedbackCardProps) {
  const titleId = `feedback-card-title-${item.id}`

  return (
    <li className={styles.listItem}>
      <button
        type="button"
        aria-pressed={selected}
        aria-labelledby={titleId}
        className={`${styles.card} ${selected ? styles.cardSelected : ''}`}
        onClick={() => onSelect(item.id)}
      >
        <span id={titleId} className={styles.name}>
          {item.customerName}
        </span>
        <span className={styles.meta}>
          <span className={styles.row}>
            <span className={styles.dt}>Category</span>
            <span className={styles.dd}>{item.category}</span>
          </span>
          <span className={styles.row}>
            <span className={styles.dt}>Priority</span>
            <span className={styles.dd}>
              <PriorityBadge priority={item.priority} />
            </span>
          </span>
          <span className={styles.row}>
            <span className={styles.dt}>Status</span>
            <span className={styles.dd}>
              <StatusBadge status={item.status} />
            </span>
          </span>
          <span className={styles.row}>
            <span className={styles.dt}>Created</span>
            <span className={styles.dd}>{formatFeedbackDate(item.createdAt)}</span>
          </span>
        </span>
        <span className={styles.hint}>Open for full message and actions</span>
      </button>
    </li>
  )
}

export const FeedbackCard = memo(FeedbackCardInner)
