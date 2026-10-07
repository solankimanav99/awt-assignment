export default function Alert({ type = 'info', children, onClose }) {
  if (!children) return null
  return (
    <div className={`alert alert--${type}`} role="status">
      <span className="alert__text">{children}</span>
      {onClose && (
        <button
          type="button"
          className="alert__close"
          onClick={onClose}
          aria-label="Dismiss"
        >
          &times;
        </button>
      )}
    </div>
  )
}
