import map from 'lodash/map'
import { FEATURE_HIGHLIGHTS } from '../promoContent'
import './FeatureHighlights.css'

export function FeatureHighlights() {
  return (
    <ul className="auth-feature-highlights">
      {map(FEATURE_HIGHLIGHTS, (item) => {
        const Icon = item.icon
        return (
          <li key={item.id} className="auth-feature-highlights-item fade-in-up">
            <span className="auth-feature-highlights-icon">
              <Icon fontSize="small" />
            </span>
            <div>
              <p className="auth-feature-highlights-title">{item.title}</p>
              <p className="auth-feature-highlights-desc">{item.description}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
