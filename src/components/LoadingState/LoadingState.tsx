import styles from './LoadingState.module.css'

export function LoadingState() {
  return (
    <output className={styles.wrap} aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.text}>Loading feedback…</span>
    </output>
  )
}
