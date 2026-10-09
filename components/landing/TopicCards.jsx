import Link from 'next/link'
import { icons } from 'lucide-react'

// Text between backticks renders as <code>.
function renderText(text) {
  return text
    .split('`')
    .map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))
}

export function TopicCards({ groups }) {
  return (
    <div className="topic-groups">
      {groups.map((group) => (
        <section key={group.title} className="topic-group">
          <h3 className="topic-group-title">{group.title}</h3>
          <div className="topic-grid">
            {group.items.map((item) => {
              const Icon = icons[item.icon]
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={item.featured ? 'topic-card topic-card-featured' : 'topic-card'}
                >
                  <div className="topic-icon">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h4 className="topic-title">{item.title}</h4>
                  <p className="topic-text">{renderText(item.text)}</p>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
