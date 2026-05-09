import './FloatingShapes.css'

export function FloatingShapes() {
  return (
    <div className="auth-floating-shapes" aria-hidden="true">
      <span className="auth-floating-shapes-blob auth-floating-shapes-blob-1 floating-element" />
      <span className="auth-floating-shapes-blob auth-floating-shapes-blob-2 floating-element" />
      <span className="auth-floating-shapes-blob auth-floating-shapes-blob-3 floating-element" />
      <span className="auth-floating-shapes-ring" />
    </div>
  )
}
