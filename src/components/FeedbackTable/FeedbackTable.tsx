import { memo } from 'react'
import type { Feedback } from '../../types/feedback'
import { formatFeedbackDate } from '../../utils/date'
import { PriorityBadge } from '../PriorityBadge/PriorityBadge'
import { StatusBadge } from '../StatusBadge/StatusBadge'
import styles from './FeedbackTable.module.css'

interface FeedbackTableProps {
  items: readonly Feedback[]
  selectedId: string | null
  onSelect: (id: string) => void
}

function FeedbackTableInner({
  items,
  selectedId,
  onSelect,
}: FeedbackTableProps) {
  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <caption className={styles.caption}>
          Customer feedback entries. Select a row for details.
        </caption>
        <thead>
          <tr>
            <th scope="col" className={styles.th}>
              Customer
            </th>
            <th scope="col" className={styles.th}>
              Category
            </th>
            <th scope="col" className={styles.th}>
              Priority
            </th>
            <th scope="col" className={styles.th}>
              Status
            </th>
            <th scope="col" className={styles.th}>
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((f) => {
            const selected = f.id === selectedId
            return (
              <tr
                key={f.id}
                className={`${styles.tr} ${selected ? styles.trSelected : ''}`}
                tabIndex={0}
                aria-selected={selected}
                onClick={() => onSelect(f.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect(f.id)
                  }
                }}
              >
                <td className={styles.td}>{f.customerName}</td>
                <td className={styles.td}>{f.category}</td>
                <td className={styles.td}>
                  <PriorityBadge priority={f.priority} />
                </td>
                <td className={styles.td}>
                  <StatusBadge status={f.status} />
                </td>
                <td className={styles.tdNowrap}>
                  {formatFeedbackDate(f.createdAt)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export const FeedbackTable = memo(FeedbackTableInner)
