import type { Feedback } from '../types/feedback'

export const MOCK_FEEDBACK: readonly Feedback[] = [
  {
    id: 'fb-001',
    customerName: 'Avery Chen',
    email: 'avery.chen@example.com',
    category: 'Bug',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-04-01T09:12:00.000Z',
    message:
      'The export button spins forever after I pick CSV. This happens on Chrome 134 & Safari 17. Steps: open dashboard → Reports → click Export → choose CSV. Network tab shows pending request with no response body.',
  },
  {
    id: 'fb-002',
    customerName: 'Jordan O’Neill',
    email: 'jordan.oneill@example.net',
    category: 'Feature Request',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-04-01T11:45:00.000Z',
    message:
      'Would love bulk tagging for conversations. We handle ~400 tickets/week and tagging one-by-one is rough. Bonus: keyboard shortcuts for “next unread”.',
  },
  {
    id: 'fb-003',
    customerName: 'Riley Santos',
    email: 'riley.santos+support@example.org',
    category: 'Billing',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-04-02T08:03:00.000Z',
    message:
      'Invoice #INV-2026-0312 shows double charge for seat add-ons. We only added 3 seats on Mar 28. Please reconcile and send corrected PDF. Urgent for quarter close.',
  },
  {
    id: 'fb-004',
    customerName: 'Morgan Đặng',
    email: 'morgan.dang@example.co',
    category: 'Other',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-03-28T16:22:00.000Z',
    message:
      'Question about data retention: if we downgrade, how long are attachments kept? Docs say 90 days but sales said “it depends”. Need a clear answer for our DPA.',
  },
  {
    id: 'fb-005',
    customerName: 'Casey Brooks',
    email: 'casey@example.com',
    category: 'Bug',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-04-02T13:10:00.000Z',
    message:
      'Mobile layout: the filter drawer overlaps the composer when the keyboard is open (iOS). Screenshot attached in previous email — happy to repro on a call.',
  },
  {
    id: 'fb-006',
    customerName: 'Taylor Kim',
    email: 't.kim@example.io',
    category: 'Feature Request',
    priority: 'Low',
    status: 'Open',
    createdAt: '2026-04-03T07:55:00.000Z',
    message:
      'Dark mode for the agent workspace would help our night shift. Prefer system preference with manual override. Thanks for considering!',
  },
  {
    id: 'fb-007',
    customerName: 'Jamie Rivera',
    email: 'jamie.rivera@example.com',
    category: 'Billing',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-04-03T10:18:00.000Z',
    message:
      'Tax line on receipt shows 0% for EU VAT ID verified accounts — is that expected post Jan update? Our finance team is confused by the wording “exempt” vs “reverse charge”.',
  },
  {
    id: 'fb-008',
    customerName: 'Quinn Patel',
    email: 'quinn.patel@example.dev',
    category: 'Bug',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-04-04T09:00:00.000Z',
    message:
      'Webhook signatures intermittently fail validation. Same secret, same payload — roughly 1 in 40 deliveries. Clocks are NTP-synced. HMAC sha256 per docs.',
  },
  {
    id: 'fb-009',
    customerName: 'Skylar Moore',
    email: 'skylar@example.net',
    category: 'Other',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-04-04T12:40:00.000Z',
    message:
      'Security questionnaire: do you support SCIM for groups only or users+groups? We need SAML + SCIM for our IdP rollout in Q3.',
  },
  {
    id: 'fb-010',
    customerName: 'Reese Nakamura',
    email: 'reese.nakamura@example.jp',
    category: 'Feature Request',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-04-05T06:30:00.000Z',
    message:
      'Need SLA timers visible on the ticket list (first response + resolution). Color thresholds configurable per queue. This is blocking our ops review.',
  },
  {
    id: 'fb-011',
    customerName: 'Drew Müller',
    email: 'drew.mueller@example.de',
    category: 'Bug',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-03-25T14:05:00.000Z',
    message:
      'Typo in empty state: “You doesn’t have any macros yet.” Should be “You don’t…”. Small but customers notice.',
  },
  {
    id: 'fb-012',
    customerName: 'Blake Anderson',
    email: 'blake.anderson@example.com',
    category: 'Billing',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-03-26T09:50:00.000Z',
    message:
      'Can we get annual invoice in one PDF instead of 12 monthly? Not a blocker — nice to have.',
  },
  {
    id: 'fb-013',
    customerName: 'Cameron Lee',
    email: 'cameron.lee@example.com',
    category: 'Bug',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-04-05T15:22:00.000Z',
    message:
      'Paste from Word strips numbered lists. Plain text paste works. Example doc had mixed bullets — happy to share.',
  },
  {
    id: 'fb-014',
    customerName: 'Rowan Iverson',
    email: 'rowan@example.org',
    category: 'Feature Request',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-04-06T08:11:00.000Z',
    message:
      'API: expose read-only audit log endpoint with cursor pagination. We need to ship evidence to auditors without CSV exports.',
  },
  {
    id: 'fb-015',
    customerName: 'Emerson Vásquez',
    email: 'emerson.vasquez@example.es',
    category: 'Other',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-04-06T11:33:00.000Z',
    message:
      'Someone pasted this in our internal notes field during testing — it must display as plain text only:\n\n<script>alert(\'xss\')</script>\n\n<img src=x onerror=alert(1)>\n\nThanks for confirming safe rendering.',
  },
  {
    id: 'fb-016',
    customerName: 'Parker Singh',
    email: 'parker.singh@example.in',
    category: 'Bug',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-04-07T07:44:00.000Z',
    message:
      'Session timeout modal cannot be dismissed with keyboard — Tab order skips the primary button. WCAG issue for us.',
  },
  {
    id: 'fb-017',
    customerName: 'Hayden O’Brien',
    email: 'hayden.obrien@example.ie',
    category: 'Billing',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-04-07T09:05:00.000Z',
    message:
      'Card ending 4242 declined but we see success in your UI for ~2s then error toast. Very confusing for agents on the phone with customers.',
  },
  {
    id: 'fb-018',
    customerName: 'Finley Costa',
    email: 'finley.costa@example.br',
    category: 'Feature Request',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-03-29T18:40:00.000Z',
    message:
      'Custom fields: regex validation on text fields would prevent bad SKUs from agents. Pattern per field in admin UI.',
  },
  {
    id: 'fb-019',
    customerName: 'Sydney Novák',
    email: 'sydney.novak@example.cz',
    category: 'Bug',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-04-07T13:17:00.000Z',
    message:
      'Search ignores diacritics inconsistently: “Příbor” vs “Pribor” returns different counts. Expected fuzzy match.',
  },
  {
    id: 'fb-020',
    customerName: 'Logan Wright',
    email: 'logan.wright@example.com',
    category: 'Other',
    priority: 'Low',
    status: 'Open',
    createdAt: '2026-04-08T08:00:00.000Z',
    message:
      'Love the product. Any plans for a read-only “observer” role? We want execs to see dashboards without edit rights.',
  },
  {
    id: 'fb-021',
    customerName: 'María José Fernández',
    email: 'mariajose.f@example.mx',
    category: 'Feature Request',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-04-08T09:30:00.000Z',
    message:
      'Long message test: ' + 'Lorem ipsum dolor sit amet, '.repeat(40) +
      'Please wrap text in the detail view so horizontal scroll is not required on narrow laptops (1366px).',
  },
  {
    id: 'fb-022',
    customerName: 'Alex "Lex" Harper',
    email: 'lex.harper@example.com',
    category: 'Bug',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-04-08T10:15:00.000Z',
    message:
      'Special chars in subject broke our Zapier filter: [URGENT] #ticket-99 — "quotes" & <angles> & ampersands. Works now after your hotfix — confirming resolved.',
  },
]
