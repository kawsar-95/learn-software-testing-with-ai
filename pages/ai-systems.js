import Link from 'next/link';
import Layout from '../components/Layout';

export default function AiSystems() {
  return (
    <Layout title="AI Systems - Software Testing with AI" description="Understand AI testing system architecture: Core, Context, and Interface layers. Build modern end-to-end AI systems for software quality assurance.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="ai-systems" className="section">
            <h2><i className="fas fa-layer-group"></i> How Modern AI Systems Work</h2>
            <p className="lead mb-4" >AI System = Core Layer + Context Layer + Interface Layer</p>
            <div className="row">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-microchip"></i> 1. Core Layer</h5>
                    <p className="card-text">(AI Brain Control)</p>
                    <ul style={{fontSize: '0.9rem'}}><li>Prompt (Instruction)</li><li>Skill (Reusable Logic)</li><li>Agent (Executor)</li></ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-database"></i> 2. Context Layer</h5>
                    <p className="card-text">(AI Knowledge)</p>
                    <ul style={{fontSize: '0.9rem'}}><li>Codebase</li><li>Logs</li><li>DB</li><li>Jira</li><li>Memory (RAG)</li></ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title"><i className="fas fa-plug"></i> 3. Interface Layer</h5>
                    <p className="card-text">(Tooling)</p>
                    <ul style={{fontSize: '0.9rem'}}><li>Command (/explain-code)</li><li>VSCode / CLI / UI</li></ul>
                  </div>
                </div>
              </div>
            </div>
            <h4  className="mt-5">End-to-End Workflow</h4>
            <p>How all three layers connect when you run a real command:</p>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: '0', whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.9rem'}}>
{`  You type:  /qa-agent payment.js
                │
                ▼
  ┌─────────────────────────────────┐
  │  INTERFACE LAYER                │
  │  commands/qa-agent.md           │  ← resolves /qa-agent → agent instruction
  └──────────────┬──────────────────┘
                 │
                 ▼
  ┌─────────────────────────────────┐
  │  CORE LAYER                     │
  │  agents/qa-agent.md             │  ← sets role + reads SKILL.md files
  │    ├── analyze-requirement       │
  │    ├── find-bug                  │
  │    └── test-design               │
  └──────────────┬──────────────────┘
                 │
                 ▼
  ┌─────────────────────────────────┐
  │  CONTEXT LAYER  (real data)     │
  │  ├── Read  payment.js           │  ← code context
  │  ├── Jira MCP  → ticket #4201   │  ← requirement context
  │  └── DB MCP    → sample rows    │  ← data context
  └──────────────┬──────────────────┘
                 │
                 ▼
        ✅  Bugs found
        ✅  Test cases generated
        ✅  Evidence-backed output`}
            </pre></div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
