import type { Feedback } from '../types/feedback'
import {
  FEEDBACK_CATEGORIES,
  FEEDBACK_PRIORITIES,
  FEEDBACK_STATUSES,
} from '../types/feedback'

function mulberry32(seed: number): () => number {
  let state = seed
  return () => {
    state += 0x6d2b79f5
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(arr: readonly T[], rnd: () => number): T {
  if (arr.length === 0) {
    throw new Error('pick: empty array')
  }
  const index = Math.min(arr.length - 1, Math.floor(rnd() * arr.length))
  const value = arr[index]
  if (value === undefined) {
    throw new Error('pick: invalid index')
  }
  return value
}

const FIRST = [
  'Avery',
  'Jordan',
  'Riley',
  'Morgan',
  'Casey',
  'Taylor',
  'Jamie',
  'Quinn',
  'Skylar',
  'Reese',
  'Drew',
  'Blake',
  'Cameron',
  'Rowan',
  'Emerson',
  'Parker',
  'Hayden',
  'Finley',
  'Sydney',
  'Logan',
] as const

const LAST = [
  'Chen',
  'Rivera',
  'Santos',
  'Patel',
  'Brooks',
  'Kim',
  'Nakamura',
  'Moore',
  'Anderson',
  'Lee',
  'Wright',
  'Singh',
  'Costa',
  'Novák',
  'Vásquez',
  'Iverson',
  'O’Brien',
  'Fernández',
  'Harper',
  'Mueller',
] as const

const MESSAGE_SEEDS = [
  'Export hangs after selecting CSV on Windows 11.',
  'Need bulk tagging and keyboard shortcuts for the queue.',
  'Invoice total does not match seat add-ons for March.',
  'Question on attachment retention after plan downgrade.',
  'Mobile filter drawer overlaps the composer when the keyboard opens.',
  'Dark mode for the agent workspace would help night shift.',
  'VAT wording on receipts confuses our finance team.',
  'Webhook signature verification fails intermittently.',
  'SCIM scope question for our IdP rollout.',
  'SLA timers on the list view are a blocker for ops review.',
] as const

/**
 * Deterministic synthetic dataset for stress-testing list UI (thousands of rows).
 */
export function generateFeedbackDataset(
  count: number,
  seed = 42_001,
): Feedback[] {
  const safeCount = Math.max(0, Math.floor(count))
  const items: Feedback[] = []
  const baseTime = Date.UTC(2026, 3, 8, 12, 0, 0)

  for (let i = 0; i < safeCount; i++) {
    const rnd = mulberry32(seed + i * 1_039)
    const first = pick(FIRST, rnd)
    const last = pick(LAST, rnd)
    const customerName = `${first} ${last}`
    const slug = `${first}.${last}`.toLowerCase().replace(/\s+/g, '')
    const email = `${slug}+${i}@example.com`
    const category = pick(FEEDBACK_CATEGORIES, rnd)
    const priority = pick(FEEDBACK_PRIORITIES, rnd)
    const status = pick(FEEDBACK_STATUSES, rnd)
    const dayOffset = Math.floor(rnd() * 120)
    const msOffset = Math.floor(rnd() * 86_400_000)
    const createdAt = new Date(
      baseTime - dayOffset * 86_400_000 - msOffset,
    ).toISOString()

    let message = `${pick(MESSAGE_SEEDS, rnd)} (ticket #${i + 1})`
    if (i % 211 === 0) {
      message += `\n\nLong note: ${'Lorem ipsum dolor sit amet. '.repeat(24)}`
    }
    if (i % 777 === 0) {
      message +=
        "\n\nUser pasted: <script>alert('xss')</script> — must render as text."
    }

    items.push({
      id: `fb-gen-${String(i + 1).padStart(6, '0')}`,
      customerName,
      email,
      category,
      message,
      priority,
      status,
      createdAt,
    })
  }

  return items
}
