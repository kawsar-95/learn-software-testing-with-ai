export function InfoCard({ title, subtitle, children }) {
  return (
    <div className="info-card">
      <p className="info-card-title">{title}</p>
      {subtitle ? <p className="info-card-subtitle">{subtitle}</p> : null}
      <div className="info-card-body">{children}</div>
    </div>
  )
}
