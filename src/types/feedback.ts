export type FeedbackCategory =
  | 'Bug'
  | 'Feature Request'
  | 'Billing'
  | 'Other'

export type FeedbackPriority = 'Low' | 'Medium' | 'High'

export type FeedbackStatus = 'Open' | 'In Progress' | 'Resolved'

export type SortOption = 'newest' | 'oldest' | 'priority'

export interface Feedback {
  id: string
  customerName: string
  email: string
  category: FeedbackCategory
  message: string
  priority: FeedbackPriority
  createdAt: string
  status: FeedbackStatus
}

export const FEEDBACK_CATEGORIES: readonly FeedbackCategory[] = [
  'Bug',
  'Feature Request',
  'Billing',
  'Other',
] as const

export const FEEDBACK_PRIORITIES: readonly FeedbackPriority[] = [
  'Low',
  'Medium',
  'High',
] as const

export const FEEDBACK_STATUSES: readonly FeedbackStatus[] = [
  'Open',
  'In Progress',
  'Resolved',
] as const

export type CategoryFilter = 'all' | FeedbackCategory

export type StatusFilter = 'all' | FeedbackStatus
