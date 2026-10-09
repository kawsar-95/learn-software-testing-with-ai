import Layout from '../components/Layout';

export default function Hooks() {
  return (
    <Layout title="Hooks - Software Testing with AI" description="Implement PreToolUse and PostToolUse hooks in Claude for software testing automation. Auto-format code, block protected files, and intercept AI actions safely.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="hooks" className="section">
            <h2><i className="fas fa-anchor"></i> Hooks</h2>
            <p className="lead">Intercept Claude's tool calls — run your own code before or after every action.</p>
            <p>Hooks are shell commands that Claude Code runs automatically at specific points in its tool lifecycle. They let you inject logging, validation, formatting, or blocking without changing your agents or skills.</p>

            <div className="row mt-4 mb-4">
              <div className="col-lg-6 mb-4">
                <div className="card h-100" style={{borderColor: '#a855f7'}}>
                  <div className="card-body">
                    <div className="icon-box" style={{background: 'linear-gradient(135deg, #a855f7, #7c3aed)'}}><i className="fas fa-arrow-right-to-bracket"></i></div>
                    <h5 className="card-title text-center" style={{color: '#a855f7'}}>PreToolUse Hook</h5>
                    <p className="text-center" style={{color: '#555', fontSize: '0.85rem'}}>Runs BEFORE Claude uses a tool</p>
                    <hr style={{borderColor: '#a855f7'}} />
                    <ul style={{fontSize: '0.9rem'}}><li>Can <strong>block</strong> the action by exiting non-zero</li><li>Use for: validation, logging, approval gates</li><li>Block protected files, validate read-only queries</li></ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card h-100" style={{borderColor: '#ddd'}}>
                  <div className="card-body">
                    <div className="icon-box" style={{background: '#5a1fc0'}}><i className="fas fa-arrow-right-from-bracket"></i></div>
                    <h5 className="card-title text-center" style={{color: '#333'}}>PostToolUse Hook</h5>
                    <p className="text-center" style={{color: '#555', fontSize: '0.85rem'}}>Runs AFTER Claude uses a tool</p>
                    <hr style={{borderColor: '#ddd'}} />
                    <ul style={{fontSize: '0.9rem'}}><li>Cannot undo, but can react to it</li><li>Use for: auto-formatting, notifications, audit logging</li><li>Run prettier, lint, send Slack alerts</li></ul>
                  </div>
                </div>
              </div>
            </div>

            <h4  className="mt-4">Where to Configure Hooks</h4>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`C:\\Users\\<YourName>\\.claude\\settings.json    ← global (all projects)
your-project\\.claude\\settings.json           ← project-level only`}</pre></div>

            <h4  className="mt-5">Hook Configuration Format</h4>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "echo 'About to run: $CLAUDE_TOOL_INPUT'" }]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [{ "type": "command", "command": "npx prettier --write \\"$CLAUDE_FILE_PATH\\"" }]
      }
    ]
  }
}`}</pre></div>

            <h4  className="mt-5">Available Matchers</h4>
            <div className="table-responsive mt-3">
              <table className="table table-striped">
                <thead><tr><th>Matcher</th><th>Fires when Claude...</th></tr></thead>
                <tbody>
                  <tr><td><code>Bash</code></td><td>Runs a shell command</td></tr>
                  <tr><td><code>Write</code></td><td>Creates or overwrites a file</td></tr>
                  <tr><td><code>Edit</code></td><td>Makes a targeted edit to a file</td></tr>
                  <tr><td><code>Read</code></td><td>Reads a file</td></tr>
                  <tr><td><code>*</code></td><td>Any tool (catch-all)</td></tr>
                </tbody>
              </table>
            </div>

            <h4  className="mt-5">Environment Variables in Hooks</h4>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`$CLAUDE_TOOL_NAME        ← Name of the tool being used (e.g. "Bash", "Write")
$CLAUDE_FILE_PATH        ← Full path of file being written/read/edited
$CLAUDE_TOOL_INPUT       ← Full JSON input of the tool call`}</pre></div>

            <h4  className="mt-5">Real QA Examples</h4>

            <div className="accordion mb-4" id="hooksAccordion">
              <div className="accordion-item" style={{background: '#fff', border: '1px solid #a855f7', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden'}}>
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hookEx1" style={{background: '#fff', color: '#a855f7'}}>
                    🛡️ PreToolUse — Block writes to .env and migration files
                  </button>
                </h2>
                <div id="hookEx1" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`"PreToolUse": [{
  "matcher": "Write",
  "hooks": [{
    "type": "command",
    "command": "node -e \\"const p = process.env.CLAUDE_FILE_PATH; if (p && (p.includes('.env') || p.includes('migrations'))) { console.error('BLOCKED: ' + p); process.exit(1); }\\""
  }]
}]

→ Claude tries to write .env  →  hook exits 1  →  Claude is BLOCKED ❌
→ Claude writes payment.js    →  hook exits 0  →  write proceeds ✅`}</pre></div>
                  </div>
                </div>
              </div>
              <div className="accordion-item" style={{marginBottom: '10px'}}>
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hookEx2" style={{background: '#fff', color: '#333'}}>
                    ✨ PostToolUse — Auto-format every file Claude writes
                  </button>
                </h2>
                <div id="hookEx2" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`"PostToolUse": [{
  "matcher": "Write",
  "hooks": [{
    "type": "command",
    "command": "npx prettier --write \\"$CLAUDE_FILE_PATH\\" 2>/dev/null || true"
  }]
}]

→ Claude writes payment.js  →  prettier runs silently  →  auto-formatted ✅`}</pre></div>
                  </div>
                </div>
              </div>
              <div className="accordion-item" style={{background: '#fff', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden'}}>
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hookEx3" style={{background: '#fff', color: '#7B2FF7'}}>
                    📋 PreToolUse — Audit log all bash commands
                  </button>
                </h2>
                <div id="hookEx3" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`"PreToolUse": [{
  "matcher": "Bash",
  "hooks": [{
    "type": "command",
    "command": "echo \\"[$(date)] BASH: $CLAUDE_TOOL_INPUT\\" >> ~/.claude/bash-audit.log"
  }]
}]

→ Every bash command Claude runs logged to bash-audit.log with timestamp`}</pre></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="highlight-box">
              <strong ><i className="fas fa-lightbulb"></i> Key Rules:</strong>
              <ul className="mt-2 mb-0">
                <li><strong>Exit 0</strong> = hook passed → Claude continues. <strong>Exit non-zero</strong> = blocked (PreToolUse only)</li>
                <li>Hooks run <strong>outside</strong> Claude's context — plain shell commands, not Claude instructions</li>
                <li>Hook shell command itself = <strong>0 tokens</strong>. Hook stdout returned to Claude = tokens consumed</li>
                <li>Use <code>2&gt;/dev/null || true</code> to suppress verbose output and save tokens</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
