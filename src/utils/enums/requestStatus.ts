export const RequestStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Succeeded: 'succeeded',
  Failed: 'failed',
} as const

export type RequestStatusValue = (typeof RequestStatus)[keyof typeof RequestStatus]
