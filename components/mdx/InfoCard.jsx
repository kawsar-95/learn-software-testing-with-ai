export function InfoCard({ title, subtitle, children }) {
  return (
    <div className="info-card">
      <h4 className="info-card-title">{title}</h4>
      {subtitle ? <p className="info-card-subtitle">{subtitle}</p> : null}
      <div className="info-card-body">{children}</div>
    </div>
  )
}
