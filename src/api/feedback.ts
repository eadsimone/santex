import { generateFeedbackDataset } from '../data/generateFeedback'
import { MOCK_FEEDBACK } from '../data/feedback'
import type { Feedback } from '../types/feedback'

const MAX_GENERATED = 15_000

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

function parseGeneratedCount(): number | null {
  if (typeof window === 'undefined') {
    return null
  }
  const raw = new URLSearchParams(window.location.search).get('n')
  if (raw === null || raw === '') {
    return null
  }
  const n = Number.parseInt(raw, 10)
  if (!Number.isFinite(n) || n < 1) {
    return null
  }
  return Math.min(n, MAX_GENERATED)
}

function buildDataset(): Feedback[] {
  const n = parseGeneratedCount()
  if (n === null) {
    return MOCK_FEEDBACK.map((f) => ({ ...f }))
  }
  return generateFeedbackDataset(n)
}

export async function fetchFeedback(): Promise<Feedback[]> {
  await delay(450 + Math.floor(Math.random() * 350))
  if (shouldSimulateError()) {
    throw new Error('Unable to load feedback. Please try again.')
  }
  return buildDataset()
}

/** `null` = static mock (~22); otherwise capped generated count from `?n=`. */
export function getRequestedDatasetCount(): number | null {
  return parseGeneratedCount()
}

export const MAX_FEEDBACK_GENERATED = MAX_GENERATED
