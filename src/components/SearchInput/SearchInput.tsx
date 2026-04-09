import styles from './SearchInput.module.css'

interface SearchInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  maxLength?: number
}

export function SearchInput({
  id,
  label,
  value,
  onChange,
  maxLength = 500,
}: SearchInputProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        type="search"
        autoComplete="off"
        spellCheck={false}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or message"
      />
    </div>
  )
}
