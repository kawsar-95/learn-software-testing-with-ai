export function CardGrid({ cols = 2, children }) {
  return (
    <div className="card-grid" data-cols={cols}>
      {children}
    </div>
  )
}
