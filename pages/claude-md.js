import Layout from '../components/Layout';

export default function ClaudeMd() {
  return (
    <Layout title="CLAUDE.md - Software Testing with AI" description="Learn to configure CLAUDE.md for software testing projects. Teach Claude your stack, test conventions, and routing rules once — applied to every session.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="claudemd" className="section">
            <h2><i className="fas fa-file-code"></i> CLAUDE.md</h2>
            <p className="lead">The project config file Claude reads automatically at the start of every session.</p>

            <div className="row mb-4">
              <div className="col-lg-6">
                <h4 >What is CLAUDE.md?</h4>
                <p>A markdown file that Claude Code reads before doing any work. It tells Claude about your project — tech stack, conventions, agent routing rules — so you never have to repeat yourself each session.</p>
                <h5  className="mt-4">Where to place it:</h5>
                <div className="highlight-box">
                  <div className="list-item"><strong>Project-level</strong> — applies to this repo only</div>
                  <div className="code-block">your-project/CLAUDE.md</div>
                  <div className="list-item"><strong>Global</strong> — applies to all projects on this machine</div>
                  <div className="code-block">C:\Users\&lt;YourName&gt;\.claude\CLAUDE.md</div>
                </div>
              </div>
              <div className="col-lg-6">
                <h4 >Why it matters:</h4>
                <ul>
                  <li>Claude knows your project without being told every session</li>
                  <li>Enforces consistent behavior across all skills and agents</li>
                  <li>Reduces prompt repetition — write once, applied always</li>
                  <li>Survives across sessions (unlike conversation context)</li>
                </ul>
                <div className="card mt-3">
                  <div className="card-body text-center">
                    <p className="card-text mt-2">Think of CLAUDE.md as the <strong style={{color: '#333'}}>"onboarding doc"</strong> you give a new developer — Claude reads it before doing any work in your project.</p>
                  </div>
                </div>
              </div>
            </div>

            <h4  className="mt-5">Generate it with <code>/init</code></h4>
            <p>Don't write CLAUDE.md from scratch. Run this command inside your project folder:</p>
            <div className="code-block">claude /init</div>
            <div className="highlight-box">
              <strong >What <code>/init</code> does:</strong>
              <ul className="mt-2 mb-0">
                <li>Scans your project files and detects tech stack, structure, and conventions</li>
                <li>Generates a CLAUDE.md with relevant context pre-filled</li>
                <li>Places it at the root of your project automatically</li>
                <li>You then <strong>edit it</strong> to add QA conventions, agent routing, and constraints</li>
              </ul>
            </div>

            <h4  className="mt-4">Example CLAUDE.md for a QA Project:</h4>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.9rem'}}>{`# Project: Payment Service

## Tech Stack
- Backend: Node.js + Express
- Database: PostgreSQL
- Testing: Jest (unit) + Playwright (e2e)
- CI: GitHub Actions

## QA Conventions
- All test files live under /tests
- Use describe/it block pattern
- Mock external APIs only — never mock the database
- Test data is seeded in /tests/fixtures

## Agent Routing
- Use /qa-agent for bugs + test case design
- Use /sdet-agent for code explanation + root cause

## Important Notes
- Payment flow is business-critical — always verify edge cases
- Any change to /src/payment must pass /qa-agent review
- Do not generate migration files
- Do not modify .env files`}</pre></div>

            <div className="row mt-4">
              <div className="col-md-4 mb-3"><div className="card"><div className="card-body"><h5 className="card-title"><i className="fas fa-layer-group"></i> Tech Stack</h5><p className="card-text">Tell Claude which languages, frameworks, and DB you use so it matches your conventions automatically.</p></div></div></div>
              <div className="col-md-4 mb-3"><div className="card"><div className="card-body"><h5 className="card-title"><i className="fas fa-route"></i> Agent Routing</h5><p className="card-text">Define which agent handles which task so Claude picks the right one without being told each time.</p></div></div></div>
              <div className="col-md-4 mb-3"><div className="card"><div className="card-body"><h5 className="card-title"><i className="fas fa-ban"></i> Constraints</h5><p className="card-text">Set hard rules (never modify .env, never mock DB) so Claude never crosses boundaries you care about.</p></div></div></div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
