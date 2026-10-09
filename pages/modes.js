import Layout from '../components/Layout';

export default function Modes() {
  return (
    <Layout title="Plan vs Act Mode - Software Testing with AI" description="Understand Claude's Plan Mode vs Act Mode for AI-driven software testing. Learn when Claude plans first vs acts immediately for better test automation.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="modes" className="section">
            <h2><i className="fas fa-sliders"></i> Plan Mode vs Act Mode</h2>
            <p className="lead">Two modes that control how Claude thinks before it acts.</p>
            <p>Claude Code operates in two distinct modes. Understanding when to use each one is the difference between a well-planned output and a rushed, incorrect one — especially for complex QA tasks.</p>

            <div className="row mt-4 mb-4">
              <div className="col-lg-6 mb-4">
                <div className="card h-100" style={{borderColor: '#a855f7'}}>
                  <div className="card-body">
                    <div className="icon-box" style={{background: 'linear-gradient(135deg, #a855f7, #7c3aed)'}}><i className="fas fa-map"></i></div>
                    <h5 className="card-title text-center" style={{color: '#a855f7'}}>Plan Mode</h5>
                    <p className="text-center" style={{color: '#555', fontSize: '0.85rem'}}>Think first, don&apos;t act yet</p>
                    <hr style={{borderColor: '#a855f7'}} />
                    <p><strong style={{color: '#a855f7'}}>What it does:</strong></p>
                    <ul style={{fontSize: '0.9rem'}}>
                      <li>Claude explores the problem, reads files, asks clarifying questions</li>
                      <li>Presents a step-by-step plan before doing anything</li>
                      <li>Does <strong>NOT</strong> make any changes or run any commands</li>
                      <li>You review and approve the plan first</li>
                    </ul>
                    <p className="mt-3"><strong style={{color: '#a855f7'}}>Use when:</strong></p>
                    <ul style={{fontSize: '0.9rem'}}>
                      <li>The task is complex or risky</li>
                      <li>You want to review the approach before execution</li>
                      <li>Multi-file or multi-step operations</li>
                    </ul>
                    <div className="code-block" style={{fontSize: '0.85rem', marginTop: '10px', borderColor: '#a855f7'}}>Shift+Tab  (toggle in Claude Code VSCode)</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card h-100" style={{borderColor: '#ddd'}}>
                  <div className="card-body">
                    <div className="icon-box" style={{background: '#5a1fc0'}}><i className="fas fa-play"></i></div>
                    <h5 className="card-title text-center" style={{color: '#333'}}>Act Mode</h5>
                    <p className="text-center" style={{color: '#555', fontSize: '0.85rem'}}>Think and act immediately</p>
                    <hr style={{borderColor: '#ddd'}} />
                    <p><strong style={{color: '#333'}}>What it does:</strong></p>
                    <ul style={{fontSize: '0.9rem'}}>
                      <li>Claude reads context and executes the task directly</li>
                      <li>Runs tools, reads files, and produces output in one go</li>
                      <li>Requests your approval before destructive actions</li>
                      <li>Faster for well-defined, familiar tasks</li>
                    </ul>
                    <p className="mt-3"><strong style={{color: '#333'}}>Use when:</strong></p>
                    <ul style={{fontSize: '0.9rem'}}>
                      <li>The task is clear and well-scoped</li>
                      <li>Running a known command like <code>/qa-agent</code></li>
                      <li>Quick analysis or read-only operations</li>
                    </ul>
                    <div className="code-block" style={{fontSize: '0.85rem', marginTop: '10px', borderColor: '#ddd'}}>Default mode in Claude Code</div>
                  </div>
                </div>
              </div>
            </div>

            <h4  className="mt-4">How They Differ in Practice</h4>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: '0', whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>
  Same command — different behavior per mode:

  You type:  /qa-agent Find bugs and design tests for payment.js

  ─────────────────────────────────────────────────────────────

  ACT MODE (default):
    Claude immediately:
    1. Reads payment.js
    2. Applies find-bug skill
    3. Applies test-design skill
    4. Returns full output
    → Fast, direct, no check-in

  ─────────────────────────────────────────────────────────────

  PLAN MODE (Shift+Tab to toggle):
    Claude first presents:
    &quot;Here&apos;s my plan:
     1. Read payment.js to understand the code
     2. Apply find-bug: trace execution flow, check for null handling...
     3. Apply test-design: cover happy path + 2 negative cases...
     Do you want me to proceed?&quot;
    → You review → approve → Claude executes
</pre></div>

            <div className="highlight-box mt-4">
              <strong ><i className="fas fa-lightbulb"></i> When to Use Plan Mode for QA Work:</strong>
              <div className="row mt-3">
                <div className="col-md-6">
                  <p style={{color: '#333', fontWeight: 'bold'}}>✅ Use Plan Mode when:</p>
                  <ul style={{fontSize: '0.9rem'}}>
                    <li>Running a new agent on an unfamiliar codebase</li>
                    <li>Agent will touch multiple files or run DB queries</li>
                    <li>You&apos;re debugging why an agent gave wrong output</li>
                    <li>Complex orchestration with multiple sub-agents</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <p style={{color: '#ff6b6b', fontWeight: 'bold'}}>⚡ Stay in Act Mode when:</p>
                  <ul style={{fontSize: '0.9rem'}}>
                    <li>Running known, trusted commands like <code>/qa-agent</code></li>
                    <li>Quick read-only analysis (explain-code, find-bug)</li>
                    <li>You&apos;ve already validated the agent&apos;s behavior</li>
                    <li>Routine regression analysis on familiar code</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
