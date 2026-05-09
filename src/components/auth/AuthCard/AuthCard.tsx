import type { ReactNode } from 'react'
import './AuthCard.css'

type AuthCardProps = {
  children: ReactNode
}

export function AuthCard({ children }: AuthCardProps) {
  return <div className="auth-card">{children}</div>
}
