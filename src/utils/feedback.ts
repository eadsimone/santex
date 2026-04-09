import type {
  CategoryFilter,
  Feedback,
  FeedbackPriority,
  FeedbackStatus,
  SortOption,
  StatusFilter,
} from '../types/feedback'
import {
  FEEDBACK_CATEGORIES,
  FEEDBACK_STATUSES,
} from '../types/feedback'

export function priorityRank(p: FeedbackPriority): number {
  switch (p) {
    case 'High':
      return 3
    case 'Medium':
      return 2
    case 'Low':
      return 1
    default: {
      const _exhaustive: never = p
      return _exhaustive
    }
  }
}

export function compareFeedbackByPriority(a: Feedback, b: Feedback): number {
  return priorityRank(b.priority) - priorityRank(a.priority)
}

export interface FilterOptions {
  search: string
  category: CategoryFilter
  status: StatusFilter
}

export function filterFeedback(
  items: readonly Feedback[],
  opts: FilterOptions,
): Feedback[] {
  const q = opts.search.trim().toLowerCase()
  return items.filter((item) => {
    if (opts.category !== 'all' && item.category !== opts.category) {
      return false
    }
    if (opts.status !== 'all' && item.status !== opts.status) {
      return false
    }
    if (!q) {
      return true
    }
    const name = item.customerName.toLowerCase()
    const msg = item.message.toLowerCase()
    return name.includes(q) || msg.includes(q)
  })
}

export function sortFeedback(
  items: readonly Feedback[],
  sort: SortOption,
): Feedback[] {
  const copy = [...items]
  switch (sort) {
    case 'newest':
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    case 'oldest':
      return copy.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
    case 'priority':
      return copy.sort((a, b) => {
        const pr = compareFeedbackByPriority(a, b)
        if (pr !== 0) {
          return pr
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    default: {
      const _exhaustive: never = sort
      return _exhaustive
    }
  }
}

export function isFeedbackCategory(
  v: unknown,
): v is Feedback['category'] {
  return (
    typeof v === 'string' &&
    (FEEDBACK_CATEGORIES as readonly string[]).includes(v)
  )
}

export function isFeedbackStatus(v: unknown): v is FeedbackStatus {
  return (
    typeof v === 'string' &&
    (FEEDBACK_STATUSES as readonly string[]).includes(v)
  )
}

export function isSortOption(v: unknown): v is SortOption {
  return v === 'newest' || v === 'oldest' || v === 'priority'
}
