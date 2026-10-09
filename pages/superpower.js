import Layout from '../components/Layout';

export default function Superpower() {
  return (
    <Layout title="Superpower Mode - Software Testing with AI" description="Enable Claude Superpower Mode for fully autonomous software testing. Remove approval prompts and use hooks as guardrails for unattended test execution.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="superpower" className="section">
            <h2><i className="fas fa-bolt" style={{color: '#ffd700'}}></i> ⚡ Superpowers Agent</h2>
            <p className="lead">An autonomous agent with 14 mandatory skills and full tool calling power. Superpowers IS an agent — not a mode or plugin wrapper.</p>

            <h4  className="mt-5">What is Superpowers?</h4>
            <p><strong>Superpowers is an autonomous agent</strong> that has every skill and comprehensive tool access built in. It operates with full autonomy to analyze, plan, and execute complex testing workflows without restrictions.</p>

            <h4  className="mt-4">14 Mandatory Superpowers Skills</h4>
            <p>The Superpowers agent includes these core capabilities:</p>
            <div className="row mt-3">
              <div className="col-lg-6">
                <div className="highlight-box" style={{background: '#f9f5ff', borderLeftColor: '#7B2FF7'}}>
                  <ol style={{fontSize: '0.9rem', marginBottom: 0}}>
                    <li><strong>Analyze Requirements</strong> — Extract scope, flow, risks</li>
                    <li><strong>Explain Code</strong> — Trace logic and behavior</li>
                    <li><strong>Find Bugs</strong> — Identify high-probability defects</li>
                    <li><strong>Design Tests</strong> — Create sanity-focused test cases</li>
                    <li><strong>Analyze Security</strong> — Identify exploitable vulnerabilities</li>
                    <li><strong>Analyze Root Cause</strong> — Trace errors to source</li>
                    <li><strong>Research (Custom)</strong> — Web search and data lookup</li>
                  </ol>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="highlight-box" style={{background: '#f9f5ff', borderLeftColor: '#7B2FF7'}}>
                  <ol start="8" style={{fontSize: '0.9rem', marginBottom: 0}}>
                    <li><strong>Brainstorm</strong> — Generate ideas and solutions</li>
                    <li><strong>Execute Plan</strong> — Run multi-step workflows</li>
                    <li><strong>Code Review</strong> — Validate code quality</li>
                    <li><strong>Performance Analysis</strong> — Optimize execution</li>
                    <li><strong>Integration Testing</strong> — Verify system interactions</li>
                    <li><strong>Regression Detect</strong> — Compare before/after states</li>
                    <li><strong>Report Generation</strong> — Document findings</li>
                  </ol>
                </div>
              </div>
            </div>

            <h4  className="mt-5">Installation &amp; Setup</h4>
            <div className="row mt-3">
              <div className="col-lg-6 mb-3">
                <h5 >1. Install Superpowers Plugin</h5>
                <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.9rem'}}>{`npm install -g @obra/superpowers
# or
claude install superpowers`}</pre></div>
              </div>
              <div className="col-lg-6 mb-3">
                <h5 >2. Verify Installation</h5>
                <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.9rem'}}>{`claude /using-superpowers
# Shows available commands and skills`}</pre></div>
              </div>
            </div>

            <h4  className="mt-4">Core Commands</h4>
            <table className="table" style={{marginTop: '15px'}}>
              <thead>
                <tr style={{borderBottom: '2px solid #7B2FF7'}}>
                  <th style={{color: '#7B2FF7', fontWeight: 'bold'}}>Command</th>
                  <th style={{color: '#7B2FF7', fontWeight: 'bold'}}>Description</th>
                  <th style={{color: '#7B2FF7', fontWeight: 'bold'}}>Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code style={{color: '#333'}}>/using-superpowers</code></td>
                  <td>Display all available Superpowers skills and commands</td>
                  <td>Get help, discover capabilities</td>
                </tr>
                <tr>
                  <td><code style={{color: '#333'}}>/brainstorming</code></td>
                  <td>AI brainstorms creative solutions for a problem</td>
                  <td>Generate test strategies, edge cases</td>
                </tr>
                <tr>
                  <td><code style={{color: '#333'}}>/executing-plans</code></td>
                  <td>Execute multi-step workflows without human intervention</td>
                  <td>Full autonomous test runs, analysis chains</td>
                </tr>
              </tbody>
            </table>

            <h4  className="mt-5">Usage Examples</h4>
            <div className="highlight-box">
              <p><strong>Example 1: Brainstorm edge cases for a login form</strong></p>
              <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`/brainstorming
Task: Generate 50 edge case test scenarios for user authentication including SQL injection, rate limiting, session hijacking, 2FA bypass, concurrent login, password reset exploits

Result: Superpowers generates comprehensive test matrix with scenarios, payloads, and expected behaviors.`}</pre></div>
            </div>

            <div className="highlight-box">
              <p><strong>Example 2: Execute full test scenario autonomously</strong></p>
              <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`/executing-plans
Steps:
1. Analyze this payment processor requirement
2. Identify security risks
3. Design integration tests
4. Generate test code
5. Run tests and report results

Result: Fully autonomous execution — no intervention until complete report.`}</pre></div>
            </div>

            <h4  className="mt-5">When to Invoke Superpowers</h4>
            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <div className="card" style={{borderColor: '#ddd'}}>
                  <div className="card-body">
                    <h5 className="card-title" style={{color: '#333'}}>✅ Perfect For:</h5>
                    <ul style={{fontSize: '0.9rem'}}>
                      <li>Complex multi-step testing workflows</li>
                      <li>Comprehensive edge case generation</li>
                      <li>Security vulnerability discovery</li>
                      <li>Full end-to-end test planning + execution</li>
                      <li>Root cause analysis chains</li>
                      <li>Autonomous QA research</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card" style={{borderColor: '#ff9500'}}>
                  <div className="card-body">
                    <h5 className="card-title" style={{color: '#ff9500'}}>⚠️ Use With Caution:</h5>
                    <ul style={{fontSize: '0.9rem'}}>
                      <li>Always configure CLAUDE.md constraints first</li>
                      <li>Set Hooks to block dangerous operations</li>
                      <li>Start with /brainstorming before /executing-plans</li>
                      <li>Review generated test plans before execution</li>
                      <li>Never skip approval on production systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="highlight-box mt-4" style={{border: '2px solid #ffd700', background: 'linear-gradient(135deg, rgba(255,215,0,0.05), rgba(255,149,0,0.05))'}}>
              <strong style={{color: '#ffd700', fontSize: '1.05rem'}}><i className="fas fa-bolt"></i> Key Insight:</strong>
              <p className="mt-2 mb-0">Superpowers is not a mode — it's a fully autonomous agent. Pair it with <strong>Hooks</strong> for automatic guardrails and <strong>CLAUDE.md</strong> for project constraints. Use <strong>Plan Mode</strong> first to review the strategy, then invoke Superpowers for full execution.</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
