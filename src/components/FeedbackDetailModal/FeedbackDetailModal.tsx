import { useEffect, useRef } from 'react'
import type { Feedback, FeedbackStatus } from '../../types/feedback'
import { FEEDBACK_STATUSES } from '../../types/feedback'
import { formatFeedbackDate } from '../../utils/date'
import { PriorityBadge } from '../PriorityBadge/PriorityBadge'
import { StatusBadge } from '../StatusBadge/StatusBadge'
import styles from './FeedbackDetailModal.module.css'

interface FeedbackDetailModalProps {
  open: boolean
  feedback: Feedback | null
  onClose: () => void
  onStatusChange: (id: string, status: FeedbackStatus) => void
}

export function FeedbackDetailModal({
  open,
  feedback,
  onClose,
  onStatusChange,
}: FeedbackDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const d = dialogRef.current
    if (!d) {
      return
    }
    const handleClose = () => {
      onClose()
    }
    d.addEventListener('close', handleClose)
    return () => d.removeEventListener('close', handleClose)
  }, [onClose])

  useEffect(() => {
    const d = dialogRef.current
    if (!d) {
      return
    }
    if (open && feedback) {
      if (!d.open) {
        d.showModal()
      }
      queueMicrotask(() => closeBtnRef.current?.focus())
    } else if (d.open) {
      d.close()
    }
  }, [open, feedback])

  const handleStatusSelect = (value: string) => {
    if (!feedback) {
      return
    }
    if ((FEEDBACK_STATUSES as readonly string[]).includes(value)) {
      onStatusChange(feedback.id, value as FeedbackStatus)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={
        feedback ? 'feedback-detail-title' : undefined
      }
      aria-modal={feedback ? 'true' : undefined}
    >
      {feedback ? (
        <div className={styles.inner}>
          <header className={styles.header}>
            <h2 id="feedback-detail-title" className={styles.title}>
              Feedback detail
            </h2>
            <button
              ref={closeBtnRef}
              type="button"
              className={styles.close}
              onClick={() => dialogRef.current?.close()}
              aria-label="Close feedback detail"
            >
              Close
            </button>
          </header>

          <div className={styles.body}>
            <section className={styles.section} aria-label="Customer">
              <h3 className={styles.sectionTitle}>Customer</h3>
              <p className={styles.plain}>{feedback.customerName}</p>
              <p className={styles.plainMuted}>{feedback.email}</p>
            </section>

            <section className={styles.section} aria-label="Classification">
              <h3 className={styles.sectionTitle}>Classification</h3>
              <dl className={styles.dl}>
                <div className={styles.dlRow}>
                  <dt className={styles.dt}>Category</dt>
                  <dd className={styles.dd}>{feedback.category}</dd>
                </div>
                <div className={styles.dlRow}>
                  <dt className={styles.dt}>Priority</dt>
                  <dd className={styles.dd}>
                    <PriorityBadge priority={feedback.priority} />
                  </dd>
                </div>
                <div className={styles.dlRow}>
                  <dt className={styles.dt}>Status</dt>
                  <dd className={styles.dd}>
                    <StatusBadge status={feedback.status} />
                  </dd>
                </div>
                <div className={styles.dlRow}>
                  <dt className={styles.dt}>Created</dt>
                  <dd className={styles.dd}>
                    {formatFeedbackDate(feedback.createdAt)}
                  </dd>
                </div>
              </dl>
            </section>

            <section className={styles.section} aria-label="Update status">
              <h3 className={styles.sectionTitle}>Update status</h3>
              <label className={styles.statusLabel} htmlFor="detail-status">
                Status
              </label>
              <select
                id="detail-status"
                className={styles.select}
                value={feedback.status}
                onChange={(e) => handleStatusSelect(e.target.value)}
              >
                {FEEDBACK_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </section>

            <section className={styles.section} aria-label="Message">
              <h3 className={styles.sectionTitle}>Message</h3>
              <p className={styles.message}>{feedback.message}</p>
            </section>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
