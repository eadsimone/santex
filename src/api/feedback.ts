import { MOCK_FEEDBACK } from '../data/feedback'
import type { Feedback } from '../types/feedback'

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function shouldSimulateError(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  return new URLSearchParams(window.location.search).get('error') === '1'
}

export async function fetchFeedback(): Promise<Feedback[]> {
  await delay(450 + Math.floor(Math.random() * 350))
  if (shouldSimulateError()) {
    throw new Error('Unable to load feedback. Please try again.')
  }
  return MOCK_FEEDBACK.map((f) => ({ ...f }))
}
