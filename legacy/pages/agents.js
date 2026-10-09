import Layout from '../components/Layout';

export default function Agents() {
  return (
    <Layout title="Agents - Software Testing with AI" description="Build qa-agent and sdet-agent for autonomous software testing with Claude AI. Learn orchestrator patterns, parallel spawning, and cross-agent delegation.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="agents" className="section">
            <h2><i className="fas fa-robot"></i> Agents</h2>
            <p className="lead">Separate Claude instances with their own personas that run autonomously.</p>

            <h4  className="mt-5">What is Agent?</h4>
            <p>An agent is a separate Claude instance with its own persona and tools that runs autonomously to complete tasks.</p>

            <div className="row mt-4">
              <div className="col-lg-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-toolbox"></i> sdet-agent</h5>
                    <p><strong>Senior SDET</strong> — analyzes requirements, explains code flow, investigates root causes, identifies security risks.</p>
                    <p><strong>Uses Skills:</strong> analyze-requirement, explain-code, analyze-rootcause, analyze-security</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-vial-circle-check"></i> qa-agent</h5>
                    <p><strong>Senior QA Engineer</strong> — analyzes requirements, finds high-probability bugs, generates sanity-focused test cases.</p>
                    <p><strong>Uses Skills:</strong> analyze-requirement, find-bug, test-design, analyze-security</p>
                  </div>
                </div>
              </div>
            </div>

            <h4  className="mt-5">Usage Examples</h4>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, fontFamily: "'Courier New', monospace", fontSize: '0.9rem'}}>{`/qa-agent Find bugs and design test cases for payment.js
/qa-agent Jira ticket PROJ-421 — find bugs and design tests for payment.js
/sdet-agent Explain the code flow and logic in payment.js
/sdet-agent Analyze root cause for the error in logs/error.log`}</pre></div>
            <p className="mt-2" style={{fontSize: '0.9rem', color: '#555'}}><strong >Rule:</strong> Always write a clear task instruction. The agent reads <code>$ARGUMENTS</code> literally — a path alone gives it no direction.</p>

            <h4  className="mt-5">Spawning Sub-Agents — Same Agent (Parallel)</h4>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`
  ❌ WRONG — does NOT spawn parallel agents:
  /qa-agent Find bugs for all files in auth-module/

  ✅ CORRECT — explicitly instruct the orchestrator:
  /qa-agent Spawn a separate qa-agent for each file in auth-module/
            (login.js, token.js, session.js). Each independently
            finds bugs and designs test cases. Compile all results.

       ┌─────────────────────────────────────────┐
       │  qa-agent  (Orchestrator)               │
       └──────────────────┬──────────────────────┘
              ┌───────────┼────────────┐
              ▼           ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ qa-agent │ │ qa-agent │ │ qa-agent │
        │ login.js │ │ token.js │ │session.js│
        └────┬─────┘ └────┬─────┘ └────┬─────┘
             └────────────┴────────────┘
                          ▼
              ✅ Full QA report for auth-module/
`}</pre></div>

            <h4  className="mt-5">Cross-Agent Delegation</h4>
            <div className="row mb-3">
              <div className="col-lg-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-vial-circle-check"></i> qa-agent scope</h5>
                    <p><strong>Handles itself:</strong> analyze-requirement, find-bug ✅, test-design ✅, analyze-security</p>
                    <hr style={{borderColor: '#ddd'}} />
                    <p><strong style={{color: '#ff6b6b'}}>Delegates out:</strong> explain-code → sdet-agent | analyze-rootcause → sdet-agent</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-toolbox"></i> sdet-agent scope</h5>
                    <p><strong>Handles itself:</strong> analyze-requirement, explain-code ✅, analyze-rootcause ✅, analyze-security</p>
                    <hr style={{borderColor: '#ddd'}} />
                    <p><strong style={{color: '#ff6b6b'}}>Delegates out:</strong> find-bug → qa-agent | test-design → qa-agent</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`
  /qa-agent Find bugs in payment.js AND explain the overall code flow
         │
         ▼
   ┌─────────────┐
   │  qa-agent   │  find-bug ✅ (own skill — does it itself)
   │             │  explain-code ❌ (out of scope)
   └──────┬──────┘
          │  delegates explain-code task
          ▼
   ┌─────────────┐
   │  sdet-agent │  explain-code ✅ (own skill)
   └─────────────┘
`}</pre></div>

            <div className="highlight-box mt-3">
              <strong ><i className="fas fa-lightbulb"></i> Two Key Rules:</strong>
              <ul className="mt-2 mb-0">
                <li><strong>Delegation</strong> only happens when the request goes outside an agent's defined skills.</li>
                <li><strong>Parallel sub-agents</strong> do not spawn automatically. You must explicitly instruct the orchestrator.</li>
              </ul>
            </div>

            <h4  className="mt-5">Agent Files</h4>
            <div className="accordion mb-4" id="agentsAccordion">
              <div className="accordion-item" style={{background: '#fff', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden'}}>
                <h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#agentSDET">sdet-agent.md</button></h2>
                <div id="agentSDET" className="accordion-collapse collapse"><div className="accordion-body">
                  <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`---
name: sdet-agent
description: Senior SDET — analyzes requirements, explains code flow, investigates root causes, and identifies security risks.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a Senior SDET.
Responsibilities: understand requirements, explain code, analyze logs/root cause, identify security vulnerabilities.

## Skill Usage (MANDATORY)
Before executing each skill, read its SKILL.md file first.
| Skill | File |
|---|---|
| analyze-requirement | \`~/.claude/skills/analyze-requirement/SKILL.md\` |
| explain-code | \`~/.claude/skills/explain-code/SKILL.md\` |
| analyze-rootcause | \`~/.claude/skills/analyze-rootcause/SKILL.md\` |
| analyze-security | \`~/.claude/skills/analyze-security/SKILL.md\` |

## Tool & MCP Usage (MANDATORY)
- Jira ticket → \`mcp__jira-mcp__get_jira_ticket\`
- DB validation → \`mcp__db-mcp__execute_query\` or \`mcp__db-mcp__describe_table\`

## Execution Logic
- Case 1: Requirement → Jira MCP → analyze-requirement
- Case 2: Code/File → Read → explain-code
- Case 3: Latest Changes → git show HEAD → explain-code
- Case 4: Log/Error → Read log → DB MCP → analyze-rootcause
- Case 5: Security → Read/Grep/Bash → analyze-security

## Rules
- Do NOT generate test cases — Do NOT perform QA validation tasks
- Always fetch real data — State assumptions clearly`}</pre></div>
                </div></div>
              </div>
              <div className="accordion-item" style={{background: '#fff', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '8px', overflow: 'hidden'}}>
                <h2 className="accordion-header"><button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#agentQA">qa-agent.md</button></h2>
                <div id="agentQA" className="accordion-collapse collapse"><div className="accordion-body">
                  <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.85rem'}}>{`---
name: qa-agent
description: Senior QA Engineer — analyzes requirements, finds high-probability bugs, and generates sanity-focused test cases.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a Senior QA Engineer.
Sanity scope: Critical-path only — happy path, high-risk operations, sibling impact. Not exhaustive regression.

## Skill Usage (MANDATORY)
Before executing each skill, read its SKILL.md file first.
| Skill | File |
|---|---|
| analyze-requirement | \`~/.claude/skills/analyze-requirement/SKILL.md\` |
| find-bug | \`~/.claude/skills/find-bug/SKILL.md\` |
| test-design | \`~/.claude/skills/test-design/SKILL.md\` |
| analyze-security | \`~/.claude/skills/analyze-security/SKILL.md\` |

## Tool & MCP Usage (MANDATORY)
- Jira ticket → \`mcp__jira-mcp__get_jira_ticket\`
- Bug validation/data → \`mcp__db-mcp__execute_query\` or \`mcp__db-mcp__describe_table\`

## Execution Logic
- Case 1: Requirement → Jira MCP → analyze-requirement → find-bug → test-design
- Case 2: Code/File → Read → find-bug → test-design
- Case 3: Latest Changes → git show HEAD → find-bug → test-design (if behavioral change)
- Case 4: Security → Read/Grep/Bash → analyze-security

## Rules
- Do NOT deeply explain code → delegate to sdet-agent
- Always fetch real data — State assumptions clearly — Prefer fewer, high-quality outputs`}</pre></div>
                </div></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
