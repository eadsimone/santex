import { useCallback, useEffect, useState } from 'react'
import { fetchFeedback } from '../api/feedback'
import type { Feedback } from '../types/feedback'

export interface UseFeedbackDataResult {
  data: Feedback[] | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useFeedbackData(): UseFeedbackDataResult {
  const [data, setData] = useState<Feedback[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState(0)

  const refetch = useCallback(() => {
    setToken((t) => t + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const items = await fetchFeedback()
        if (!cancelled) {
          setData(items)
          setLoading(false)
        }
      } catch (e: unknown) {
        if (!cancelled) {
          const msg =
            e instanceof Error ? e.message : 'Something went wrong while loading.'
          setError(msg)
          setData(null)
          setLoading(false)
        }
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [token])

  return { data, loading, error, refetch }
}
