import Layout from '../components/Layout';

export default function Skills() {
  return (
    <Layout title="Skills - Software Testing with AI" description="Discover 6 reusable Claude AI testing skills: find-bug, test-design, explain-code, analyze-rootcause, analyze-security, and analyze-requirement slash commands.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="skills" className="section">
            <h2><i className="fas fa-wand-magic-sparkles"></i> Skills</h2>
            <p className="lead">Reusable expertise you write once, use everywhere.</p>

            <h4  className="mt-5">What is Skill?</h4>
            <p>Skill is a reusable expertise. Without a skill: every time you want Claude to do a task, you'd have to explain how — which library to use, the file format, styling rules, etc.</p>

            <h4  className="mt-5">Available Skills</h4>
            <div className="row">
              <div className="col-md-6 mb-4"><div className="card"><div className="card-body"><h5 className="card-title"><i className="fas fa-list-check"></i> analyze-requirement</h5><p className="card-text">Extract business logic, system flow, scope, risks, and gaps from requirements or Jira tickets.</p></div></div></div>
              <div className="col-md-6 mb-4"><div className="card"><div className="card-body"><h5 className="card-title"><i className="fas fa-code"></i> explain-code</h5><p className="card-text">Explain code flow, logic, and business behavior from files or commits.</p></div></div></div>
              <div className="col-md-6 mb-4"><div className="card"><div className="card-body"><h5 className="card-title"><i className="fas fa-bug"></i> find-bug</h5><p className="card-text">Identify high-probability bugs from code/commits using business logic and DB context.</p></div></div></div>
              <div className="col-md-6 mb-4"><div className="card"><div className="card-body"><h5 className="card-title"><i className="fas fa-flask"></i> test-design</h5><p className="card-text">Generate sanity-focused test cases based on business logic and nearby impact.</p></div></div></div>
              <div className="col-md-6 mb-4"><div className="card"><div className="card-body"><h5 className="card-title"><i className="fas fa-shield-halved"></i> analyze-security</h5><p className="card-text">Identify real, exploitable vulnerabilities in code or flow.</p></div></div></div>
              <div className="col-md-6 mb-4"><div className="card"><div className="card-body"><h5 className="card-title"><i className="fas fa-magnifying-glass"></i> analyze-rootcause</h5><p className="card-text">Analyze logs/errors and identify root cause using code + DB.</p></div></div></div>
            </div>

            <h4  className="mt-5">When to use:</h4>
            <ul>
              <li>Only bug finding: <span className="badge-custom">/find-bug payment.js</span></li>
              <li>Only test case generation: <span className="badge-custom">/test-design payment.js</span></li>
              <li>Only root cause analysis: <span className="badge-custom">/analyze-rootcause error.log</span></li>
            </ul>

            <h4  className="mt-5">Folder Structure</h4>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`.claude/skills/
├── analyze-requirement/SKILL.md
├── explain-code/SKILL.md
├── find-bug/SKILL.md
├── test-design/SKILL.md
├── analyze-security/SKILL.md
└── analyze-rootcause/SKILL.md`}</pre></div>

            <h4  className="mt-5">SKILL.md Files</h4>
            <p>Each SKILL.md defines: role, tool usage rules, output format, and constraints. Click to expand:</p>

            <div className="accordion mb-4" id="skillsAccordion">
              <div className="accordion-item" style={{background: '#fff', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden'}}>
                <h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skillAR">analyze-requirement &gt; SKILL.md</button></h2>
                <div id="skillAR" className="accordion-collapse collapse"><div className="accordion-body">
                  <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`---
name: analyze-requirement
description: Analyze requirement or Jira ticket to extract business logic, system flow, scope, risks, and gaps
---

You are a Senior SDET and QA Engineer.

## Tool Usage (MANDATORY)
- If Jira ticket/link/ID → Fetch using \`mcp__jira-mcp__get_jira_ticket\`
- If plain-text → Analyze directly from the given text

## Output
### 1. Summary — Feature, User, Goal
### 2. Business Flow — Main flow, Key conditions, Input→output
### 3. Scope — In scope / Out of scope
### 4. System Impact — UI/API/DB/services/roles
### 5. Risks — Functional/Data/Security/Performance
### 6. Gaps — Missing requirements, Assumptions, Questions
### 7. Edge Cases — 3–5 boundary conditions / failure paths

## Rules
- Concise (bullet points only) — No test cases — No deep code explanation`}</pre></div>
                </div></div>
              </div>
              <div className="accordion-item" style={{background: '#fff', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden'}}>
                <h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skillEC">explain-code &gt; SKILL.md</button></h2>
                <div id="skillEC" className="accordion-collapse collapse"><div className="accordion-body">
                  <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`---
name: explain-code
description: Explain code flow, logic, and business behavior from file or commit
---

You are a Senior SDET. Explain code with logic + business understanding.

## Tool Usage (MANDATORY)
- File path → \`Read\` the file
- Commit hash → \`Bash\`: \`git show <hash>\`
- "latest change" / HEAD → \`Bash\`: \`git show HEAD\`
- Symbol/function → \`Grep\` to locate, then \`Read\`
- References other files → \`Read\` those files too

## Output
### 1. Purpose — What this code does
### 2. Flow — Entry point → function calls → exit/return
### 3. Logic — Conditions / decisions
### 4. Components — functions / APIs / DB
### 5. Data Flow — input → transform → store/return
### 6. Dependencies — related modules/services
### 7. Risks — logical / data / concurrency

## Rules — No test cases — No requirement analysis — Concise`}</pre></div>
                </div></div>
              </div>
              <div className="accordion-item" style={{background: '#fff', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden'}}>
                <h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skillFB">find-bug &gt; SKILL.md</button></h2>
                <div id="skillFB" className="accordion-collapse collapse"><div className="accordion-body">
                  <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`---
name: find-bug
description: Identify high-probability bugs from code/commit using business logic and DB context
---

You are a Senior QA bug hunter. Find high-probability bugs only.

## Tool Usage (MANDATORY)
- File path → \`Read\` the file
- Commit hash → \`Bash\`: \`git show <hash>\`
- References other files → \`Read\` those files
- Data/state validation → \`mcp__db-mcp__execute_query\` or \`mcp__db-mcp__describe_table\`

## Thinking (MANDATORY)
- Trace execution flow — Read surrounding functions — Identify broken assumptions

## Output per Bug
- Probability: High/Medium — Type: Functional/Security/Performance/Concurrency
- Why: (evidence from code — file:line)
- Steps to trigger — Expected vs Actual — Impact — Area

## Rules — Max 5–8 bugs — No generic guesses — Evidence required`}</pre></div>
                </div></div>
              </div>
              <div className="accordion-item" style={{background: '#fff', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden'}}>
                <h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skillTD">test-design &gt; SKILL.md</button></h2>
                <div id="skillTD" className="accordion-collapse collapse"><div className="accordion-body">
                  <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`---
name: test-design
description: Generate sanity-focused test cases based on business logic and nearby impact
---

You are a Senior QA Engineer. Design sanity test cases only.

## Tool Usage (MANDATORY)
- File path → \`Read\` — Commit → \`git show\` — Realistic data → \`mcp__db-mcp__execute_query\`

## Output per Test Case
- Test Title: Verify that [condition] when [action]
- Type: Functional/Negative/Security/Performance — Priority: High/Medium
- Preconditions — Steps (with concrete input values) — Expected Result

## Coverage Rules
- Core flow: 3–5 tests — Negative: 1–2 — Security: 1–2 (if auth/data) — Perf: 1 (if queries/loops)

## Rules — Max 6–12 cases — No trivial checks — Business-critical flows only`}</pre></div>
                </div></div>
              </div>
              <div className="accordion-item" style={{background: '#fff', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden'}}>
                <h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skillAS">analyze-security &gt; SKILL.md</button></h2>
                <div id="skillAS" className="accordion-collapse collapse"><div className="accordion-body">
                  <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`---
name: analyze-security
description: Identify real, exploitable vulnerabilities in code or flow
---

You are a Security-focused SDET. Find real security risks.

## Tool Usage (MANDATORY)
- Source files → \`Read\` — Symbols/patterns → \`Grep\` — Commit/diff → \`Bash\` git show
- DB schema → \`mcp__db-mcp__describe_table\` or \`mcp__db-mcp__execute_query\`

## Output
### 1. Context — What this feature does — Sensitive area? (auth/payment/data)
### 2. Issues (per issue): Severity — Why (evidence) — Attack steps — Impact — Fix

## Focus Areas — auth/access — input validation — data exposure — logic bypass — API misuse

## Rules — No generic OWASP list — Only real, relevant issues — Concise`}</pre></div>
                </div></div>
              </div>
              <div className="accordion-item" style={{background: '#fff', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden'}}>
                <h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skillRC">analyze-rootcause &gt; SKILL.md</button></h2>
                <div id="skillRC" className="accordion-collapse collapse"><div className="accordion-body">
                  <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`---
name: analyze-rootcause
description: Analyze logs/errors and identify root cause using code + DB
---

You are a Senior SDET debugger. Find the most probable root cause.

## Tool Usage (MANDATORY)
- Log references DB → \`mcp__db-mcp__execute_query\` / \`get_sample_rows\` / \`describe_table\`
- Related code → \`Read\` files, \`Grep\` symbols/patterns

## Output
### 1. Error — What failed — Where
### 2. Root Cause — Most likely reason (ranked by confidence) + evidence
### 3. Flow — What happened before failure
### 4. Reproduction — Specific inputs, state, environment conditions
### 5. Impact — system/data/user
### 6. Fix — Immediate fix + Preventive improvement

## Rules — Max 3 possible causes — No guessing without evidence — Concise`}</pre></div>
                </div></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
