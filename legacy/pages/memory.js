import Layout from '../components/Layout';

export default function Memory() {
  return (
    <Layout title="Memory - Software Testing with AI" description="Implement persistent AI memory for software testing across sessions using Claude Code. Manage token costs and update methods for long-running test projects.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="memory" className="section">
            <h2><i className="fas fa-memory"></i> Memory</h2>
            <p className="lead">Teach Claude once — it remembers across every session.</p>
            <p>By default, Claude has <strong>no memory between sessions</strong>. Memory solves this — it gives Claude a place to store and retrieve facts permanently.</p>

            <div className="row mt-4 mb-4">
              <div className="col-lg-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-triangle-exclamation" style={{color: '#ff6b6b'}}></i> Without Memory</h5>
                    <hr style={{borderColor: '#ff6b6b'}} />
                    <ul style={{fontSize: '0.9rem', color: '#c0c0c0'}}>
                      <li>Claude forgets project context after every session</li>
                      <li>You repeat yourself every new conversation</li>
                      <li>Team-specific conventions re-stated manually</li>
                    </ul>
                    <div className="code-block" style={{fontSize: '0.85rem', marginTop: '10px', borderColor: '#ff6b6b'}}>&#10060; "I don't have context about previous sessions"</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-circle-check" style={{color: '#333'}}></i> With Memory</h5>
                    <hr style={{borderColor: '#ddd'}} />
                    <ul style={{fontSize: '0.9rem', color: '#c0c0c0'}}>
                      <li>Claude retains key project facts across all sessions</li>
                      <li>Agents load memory automatically before executing skills</li>
                      <li>Decisions and discoveries persist</li>
                    </ul>
                    <div className="code-block" style={{fontSize: '0.85rem', marginTop: '10px', borderColor: '#ddd'}}>&#10003; Context loaded from memory/MEMORY.md</div>
                  </div>
                </div>
              </div>
            </div>

            <h4  className="mt-4">How Memory Works</h4>
            <p>Memory lives in <code>.claude/memory/MEMORY.md</code> — a simple markdown file Claude reads when you reference it.</p>

            <h4  className="mt-5">Example MEMORY.md</h4>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`# Project Memory — Payment Service

## Architecture Decisions
- All payment records use soft-delete: set \`deleted_at\`, never DELETE rows
- Payment state machine: pending → processing → completed | failed | refunded

## Known Constraints
- Do NOT add indexes to the \`transactions\` table — already at capacity
- The \`payment_gateway\` field accepts: "stripe", "paypal", "manual" only

## QA Patterns (discovered in previous sessions)
- The \`applyDiscount()\` function does NOT validate discount code expiry — always test this
- DB test data: use user_id=1001 for valid, user_id=9999 for deleted user

## Do NOT Repeat These Mistakes
- DO NOT suggest adding \`ON DELETE CASCADE\` to payment_items — orphans audit logs
- DO NOT test /admin/refund without role=superadmin — silently fails with 200`}</pre></div>

            <h4  className="mt-5">Memory vs CLAUDE.md</h4>
            <div className="table-responsive mt-3">
              <table className="table table-striped">
                <thead><tr><th>Aspect</th><th>CLAUDE.md</th><th>MEMORY.md</th></tr></thead>
                <tbody>
                  <tr><td>Purpose</td><td>Project setup, conventions, routing</td><td>Persistent decisions &amp; discoveries</td></tr>
                  <tr><td>Written by</td><td>You (manually)</td><td>You or Claude</td></tr>
                  <tr><td>When loaded</td><td>Automatically at session start</td><td>When referenced by agent or you</td></tr>
                  <tr><td>Changes</td><td>Rarely (project setup)</td><td>Grows over time as you work</td></tr>
                </tbody>
              </table>
            </div>

            <h4  className="mt-5"><i className="fas fa-fire" style={{color: '#ff6b6b'}}></i> Memory &amp; Token Cost</h4>
            <p>Yes — reading MEMORY.md <strong>does consume tokens</strong>. Every file Claude reads loads into its context window.</p>
            <div className="highlight-box" style={{borderColor: '#ff9500'}}>
              <strong style={{color: '#ff9500'}}><i className="fas fa-scale-balanced"></i> Token Cost Rule of Thumb:</strong>
              <ul className="mt-2 mb-0" style={{fontSize: '0.9rem'}}>
                <li>~20 concise entries ≈ <strong>~500–800 tokens</strong> — negligible cost per task</li>
                <li>100+ verbose entries ≈ <strong>3,000–10,000+ tokens</strong> — significant at scale</li>
                <li><strong>Rule:</strong> Keep each entry to 1 line. Memory should stay under 1,000 tokens total.</li>
              </ul>
            </div>

            <h4  className="mt-5">How to Use Memory with Agents</h4>
            <div className="highlight-box">
              <p className="mb-2">Tell your agent to load memory before starting a task:</p>
              <div className="code-block" style={{marginBottom: 0}}><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.9rem'}}>{`/qa-agent Read ~/.claude/memory/MEMORY.md first, then find bugs in payment.js`}</pre></div>
            </div>

            <h4  className="mt-5">Keeping Memory Updated</h4>
            <div className="highlight-box" style={{borderColor: '#ff9500'}}>
              <strong style={{color: '#ff9500'}}><i className="fas fa-triangle-exclamation"></i> Why Hooks Cannot Update Memory Directly</strong>
              <p className="mt-2 mb-0" style={{fontSize: '0.9rem'}}>PostToolUse hooks run <strong>shell commands</strong> — they cannot issue instructions to Claude. Memory updates must come from inside Claude's instruction flow — via agent definitions or commands.</p>
            </div>

            <h5  className="mt-4">Method 1 — Agent Definition (Recommended)</h5>
            <p>Add this to your agent files to update memory automatically after each task:</p>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`## Memory Update (MANDATORY — run after every task)

After completing your analysis, update \`~/.claude/memory/MEMORY.md\`:
1. Read the current MEMORY.md file
2. Add any NEW findings (architecture patterns, recurring bugs, DB facts)
3. Do NOT duplicate existing entries
4. Keep entries concise — one line per finding`}</pre></div>

            <h5  className="mt-4">Method 2 — <code>/save-memory</code> Command</h5>
            <p>Create <code>.claude/commands/save-memory.md</code>:</p>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`Review everything discovered in this session.
Read ~/.claude/memory/MEMORY.md.
Update it with new findings: patterns, constraints, DB facts, anti-patterns.
Keep each entry concise — one line. Confirm what was added.`}</pre></div>
            <p className="mt-2" style={{fontSize: '0.9rem', color: '#555'}}>Run at end of any productive session: <span className="badge-custom">/save-memory</span></p>

            <h5  className="mt-4">Method 3 — Inline Prompt</h5>
            <div className="code-block">Update ~/.claude/memory/MEMORY.md with any new patterns from what we just did.</div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
