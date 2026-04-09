import type { Feedback } from '../../types/feedback'
import { FeedbackCard } from '../FeedbackCard/FeedbackCard'
import styles from './FeedbackCardList.module.css'

interface FeedbackCardListProps {
  items: readonly Feedback[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function FeedbackCardList({
  items,
  selectedId,
  onSelect,
}: FeedbackCardListProps) {
  return (
    <ul
      className={styles.list}
      aria-label="Customer feedback entries"
    >
      {items.map((item) => (
        <FeedbackCard
          key={item.id}
          item={item}
          selected={item.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  )
}
