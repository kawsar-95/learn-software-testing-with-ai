import Layout from '../components/Layout';

export default function Principles() {
  return (
    <Layout title="Key Principles - Software Testing with AI" description="8 core principles for building reliable, autonomous AI testing systems with Claude Code. Essential guidelines every QA engineer and SDET should follow.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="principles" className="section">
            <h2><i className="fas fa-star"></i> Key Principles</h2>
            <p className="lead mb-4">12 foundational principles that define the entire AI Testing system architecture:</p>

            <div className="row">
              {/* Principle 1 */}
              <div className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-layer-group" ></i> Three-Layer Architecture</h5>
                    <p className="card-text text-sm">Core Layer (Prompt + Skill + Agent) → Context Layer (Codebase, Logs, DB, Jira) → Interface Layer (Skills, Agents, MCP)</p>
                  </div>
                </div>
              </div>

              {/* Principle 2 */}
              <div className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-pen-fancy" ></i> Role + Context + Scope</h5>
                    <p className="card-text text-sm">Every prompt must define WHO (role), WHAT (context), WHERE (scope), and CONSTRAINTS (boundaries)</p>
                  </div>
                </div>
              </div>

              {/* Principle 3 */}
              <div className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-brain" ></i> Real Data First</h5>
                    <p className="card-text text-sm">Context Engineering fetches ACTUAL code, logs, DB state via MCP. Never work from assumptions</p>
                  </div>
                </div>
              </div>

              {/* Principle 4 */}
              <div className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-wand-magic-sparkles" ></i> Skills-Based Reusability</h5>
                    <p className="card-text text-sm">6 core QA skills (analyze-requirement, explain-code, find-bug, test-design, analyze-security, analyze-rootcause) are reusable, composable, and mandatory</p>
                  </div>
                </div>
              </div>

              {/* Principle 5 */}
              <div className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-robot" ></i> Agents + Full Tools</h5>
                    <p className="card-text text-sm">Agents (sdet-agent, qa-agent, Superpowers) have full tool access. No permission prompts for trusted agents with guardrails</p>
                  </div>
                </div>
              </div>

              {/* Principle 6 */}
              <div className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-chart-line" ></i> Evidence-Based Output</h5>
                    <p className="card-text text-sm">Every finding must cite code line, log message, or DB query. No generic guessing — RAG always</p>
                  </div>
                </div>
              </div>

              {/* Principle 7 */}
              <div className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-memory" ></i> Memory Persistence</h5>
                    <p className="card-text text-sm">Store patterns, lessons, and domain knowledge in MEMORY.md. Reuse across sessions and projects</p>
                  </div>
                </div>
              </div>

              {/* Principle 8 */}
              <div className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-anchor" ></i> Hooks = Automatic Guardrails</h5>
                    <p className="card-text text-sm">PreToolUse + PostToolUse hooks block dangerous ops and auto-enforce standards (linting, formatting, file locks)</p>
                  </div>
                </div>
              </div>

              {/* Principle 9 */}
              <div className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-file-code" ></i> CLAUDE.md Foundation</h5>
                    <p className="card-text text-sm">Define tech stack, file conventions, MCP servers, agent routing ONCE. Reuse for all tasks in that project</p>
                  </div>
                </div>
              </div>

              {/* Principle 10 */}
              <div className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-crosshairs" ></i> Sanity Scope (Not Exhaustive)</h5>
                    <p className="card-text text-sm">Test critical paths, key workflows, obvious edge cases. Avoid combinatorial explosions</p>
                  </div>
                </div>
              </div>

              {/* Principle 11 */}
              <div className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-bolt" style={{color: '#ffd700'}}></i> Superpowers = Autonomous Agent</h5>
                    <p className="card-text text-sm">14 mandatory skills + full tool access. Use /brainstorming first, then /executing-plans for uninterrupted workflows</p>
                  </div>
                </div>
              </div>

              {/* Principle 12 */}
              <div className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-sliders" ></i> Plan Mode First</h5>
                    <p className="card-text text-sm">Always Plan Mode for new agents/complex tasks. Review strategy, approve scope. Then switch to Act Mode or invoke Superpowers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="highlight-box mt-5" style={{border: '2px solid #7B2FF7', background: '#f9f5ff'}}>
              <h4 style={{color: '#7B2FF7', marginBottom: '15px'}}><i className="fas fa-lightbulb"></i> The Complete Workflow (7 Steps)</h4>
              <ol style={{fontSize: '0.95rem', lineHeight: '1.8'}}>
                <li><strong>Define CLAUDE.md</strong> — Document stack, conventions, MCP servers, agent routing upfront</li>
                <li><strong>Configure Hooks</strong> — Set PreToolUse (block .env, migrations) and PostToolUse (auto-format, lint)</li>
                <li><strong>Write Skill Prompts</strong> — Use Role + Context + Scope + Constraints in each skill definition</li>
                <li><strong>Assign Agents</strong> — Choose sdet-agent (code/root-cause/security) or qa-agent (requirements/bugs/tests)</li>
                <li><strong>Plan First</strong> — Start in Plan Mode. Have Claude draft the strategy, review it, approve scope</li>
                <li><strong>Execute with Data</strong> — Switch to Act Mode or invoke Superpowers. Agents fetch REAL context via MCP</li>
                <li><strong>Review Findings</strong> — Verify evidence (code citations, logs, DB queries). Store patterns in MEMORY.md</li>
              </ol>
            </div>

            <div className="highlight-box mt-4" style={{borderLeft: '4px solid #7B2FF7', background: '#f9f5ff'}}>
              <p className="mb-0"><strong style={{color: '#333'}}><i className="fas fa-check-circle"></i> Core Truth:</strong> This system works because it combines <strong>precise prompting</strong> + <strong>real context</strong> + <strong>autonomous agents</strong> + <strong>automatic guardrails</strong>. No component alone is sufficient. Together, they create reliable, intelligent testing.</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
