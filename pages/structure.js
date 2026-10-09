import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function Structure() {
  const { basePath } = useRouter();
  return (
    <Layout title="Claude Architecture - Software Testing with AI" description="Explore Claude Code architecture for software testing: memory, skills, agents, commands, and .claude.json configuration explained in detail.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="structure" className="section">
            <h2><i className="fas fa-folder-tree"></i> Claude Context Engineering Architecture</h2>
            <p className="lead">How the <code>.claude/</code> directory is structured to give Claude persistent knowledge, reusable behaviors, and autonomous capabilities.</p>
            <p>Every Claude Code project uses the <code>.claude/</code> folder as its context engineering workspace. Each subfolder has a specific role — together they turn Claude from a blank-slate assistant into a context-aware, skill-equipped, autonomous agent.</p>

            {/* Directory Tree */}
            <div className="code-block mt-4 mb-4">
<pre style={{color: '#d4d4d4', margin: 0, fontFamily: "'Courier New', monospace", fontSize: '0.9rem'}}>
{`~/.claude/                         ← Global Claude config (all projects)
│
├── memory/                        ← Persistent facts Claude recalls across sessions
│   ├── user_profile.md
│   ├── feedback_testing.md
│   └── MEMORY.md                  ← Index file loaded into every conversation
│
├── skills/                        ← Reusable slash-command modules (the /skill library)
│   ├── find-bug.md
│   ├── test-design.md
│   ├── analyze-rootcause.md
│   ├── explain-code.md
│   ├── analyze-security.md
│   └── analyze-requirement.md
│
├── agents/                        ← Specialized sub-agents with defined roles & tools
│   ├── qa-agent.md
│   └── sdet-agent.md
│
├── commands/                      ← Custom slash commands that invoke agents or skills
│   ├── qa-agent.md                ← Becomes /qa-agent
│   └── sdet-agent.md             ← Becomes /sdet-agent
│
└── settings.json                  ← Permissions, hooks, env vars, model config

.claude.json  (project root)       ← Project-level MCP server config & overrides`}
</pre>
            </div>

            {/* Cards: each folder */}
            <h4  className="mt-5 mb-4"><i className="fas fa-layer-group"></i> What Each Part Does</h4>
            <div className="row">

              {/* Memory */}
              <div className="col-lg-6 mb-4">
                <div className="card h-100" style={{borderColor: '#ddd'}}>
                  <div className="card-body">
                    <div className="icon-box" style={{background: '#7B2FF7'}}><i className="fas fa-memory"></i></div>
                    <h5 className="card-title text-center" >memory/</h5>
                    <p className="text-center" style={{color: '#555', fontSize: '0.85rem'}}>Persistent knowledge that survives across conversations</p>
                    <hr style={{borderColor: '#eee'}} />
                    <p style={{fontSize: '0.9rem'}}>Markdown files storing facts about the user, project decisions, and preferred behaviors — loaded automatically at session start via <code>MEMORY.md</code> as an index.</p>
                    <div className="code-block" style={{fontSize: '0.82rem', borderColor: '#ddd', marginTop: '10px'}}>
                      <strong >Types:</strong> user · feedback · project · reference
                    </div>
                    <p style={{fontSize: '0.82rem', marginTop: '10px', color: '#555'}}><i className="fas fa-circle-info" ></i> Example: <em>"User prefers integration tests over mocks — burned by a failed prod migration."</em></p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="col-lg-6 mb-4">
                <div className="card h-100" style={{borderColor: '#7b2ff7'}}>
                  <div className="card-body">
                    <div className="icon-box" style={{background: 'linear-gradient(135deg, #7b2ff7, #4a1aab)'}}><i className="fas fa-wand-magic-sparkles"></i></div>
                    <h5 className="card-title text-center" style={{color: '#a855f7'}}>skills/</h5>
                    <p className="text-center" style={{color: '#555', fontSize: '0.85rem'}}>Reusable instruction modules invoked as slash commands</p>
                    <hr style={{borderColor: '#7b2ff733'}} />
                    <p style={{fontSize: '0.9rem'}}>Each <code>.md</code> file is a self-contained workflow — a structured prompt that tells Claude exactly how to approach a specific task type when triggered via the <code>Skill</code> tool.</p>
                    <div className="code-block" style={{fontSize: '0.82rem', borderColor: '#7b2ff7', marginTop: '10px'}}>
                      find-bug · test-design · explain-code<br />
                      analyze-rootcause · analyze-security · analyze-requirement
                    </div>
                    <p style={{fontSize: '0.82rem', marginTop: '10px', color: '#555'}}><i className="fas fa-circle-info" style={{color: '#a855f7'}}></i> Skills are <em>rigid</em> (TDD, debugging) or <em>flexible</em> (pattern-based) — the file itself declares which.</p>
                  </div>
                </div>
              </div>

              {/* Agents */}
              <div className="col-lg-6 mb-4">
                <div className="card h-100" style={{borderColor: '#ddd'}}>
                  <div className="card-body">
                    <div className="icon-box" style={{background: '#5a1fc0'}}><i className="fas fa-robot"></i></div>
                    <h5 className="card-title text-center" style={{color: '#333'}}>agents/</h5>
                    <p className="text-center" style={{color: '#555', fontSize: '0.85rem'}}>Specialized sub-agents with defined roles, tools, and delegation rules</p>
                    <hr style={{borderColor: '#eee'}} />
                    <p style={{fontSize: '0.9rem'}}>Agent definition files describe the agent's persona, which skills it applies, which tools it has access to, and when to delegate to a sibling agent — enabling orchestration patterns.</p>
                    <div className="code-block" style={{fontSize: '0.82rem', borderColor: '#ddd', marginTop: '10px'}}>
                      <strong style={{color: '#333'}}>qa-agent</strong> — requirements, bugs, test design<br />
                      <strong style={{color: '#333'}}>sdet-agent</strong> — code flow, root cause, security
                    </div>
                    <p style={{fontSize: '0.82rem', marginTop: '10px', color: '#555'}}><i className="fas fa-circle-info" style={{color: '#333'}}></i> Agents can spawn other agents in parallel or sequentially for complex pipelines.</p>
                  </div>
                </div>
              </div>

              {/* Commands */}
              <div className="col-lg-6 mb-4">
                <div className="card h-100" style={{borderColor: '#ff9500'}}>
                  <div className="card-body">
                    <div className="icon-box" style={{background: 'linear-gradient(135deg, #ff9500, #c45f00)'}}><i className="fas fa-terminal"></i></div>
                    <h5 className="card-title text-center" style={{color: '#ff9500'}}>commands/</h5>
                    <p className="text-center" style={{color: '#555', fontSize: '0.85rem'}}>Custom slash commands that surface agents and skills from the chat bar</p>
                    <hr style={{borderColor: '#ff950033'}} />
                    <p style={{fontSize: '0.9rem'}}>Each file in <code>commands/</code> becomes a <code>/command-name</code> shortcut. Typing <code>/qa-agent</code> expands into the full prompt defined in <code>commands/qa-agent.md</code>, routing to the correct agent automatically.</p>
                    <div className="code-block" style={{fontSize: '0.82rem', borderColor: '#ff9500', marginTop: '10px'}}>
                      /qa-agent  →  commands/qa-agent.md<br />
                      /sdet-agent  →  commands/sdet-agent.md
                    </div>
                    <p style={{fontSize: '0.82rem', marginTop: '10px', color: '#555'}}><i className="fas fa-circle-info" style={{color: '#ff9500'}}></i> Commands are the user-facing entry point — skills and agents are the backend logic.</p>
                  </div>
                </div>
              </div>

              {/* .claude.json */}
              <div className="col-lg-12 mb-4">
                <div className="card" style={{borderColor: '#ffd700'}}>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-2 text-center">
                        <div className="icon-box" style={{background: 'linear-gradient(135deg, #ffd700, #c49a00)', margin: '0 auto'}}><i className="fas fa-cog"></i></div>
                      </div>
                      <div className="col-md-10">
                        <h5 style={{color: '#ffd700'}}>~/.claude.json &nbsp;<span style={{fontSize: '0.75rem', color: '#555', fontWeight: 'normal'}}>(project root)</span></h5>
                        <p style={{fontSize: '0.9rem', marginBottom: '8px'}}>Project-level config file that registers MCP servers, sets model overrides, and stores project-specific permissions — separate from the global <code>settings.json</code>.</p>
                        <div className="code-block" style={{fontSize: '0.82rem', borderColor: '#ffd700'}}>
                          Registers: Jira MCP · Database MCP · GitHub MCP · Slack MCP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* How it flows together */}
            <h4  className="mt-4 mb-3"><i className="fas fa-diagram-project"></i> How It All Flows Together</h4>
            <p style={{color: '#555'}}>When you type a prompt or a slash command, Claude orchestrates all these layers in sequence:</p>

            <div className="highlight-box mt-3 mb-4">
              <div className="row text-center">
                <div className="col" style={{borderRight: '1px solid #eee'}}>
                  <p style={{color: '#7B2FF7', fontWeight: 'bold', fontSize: '0.9rem'}}><i className="fas fa-keyboard"></i><br />User Prompt</p>
                  <p style={{fontSize: '0.8rem', color: '#555'}}>You type a message or <code>/command</code></p>
                </div>
                <div className="col" style={{borderRight: '1px solid #eee'}}>
                  <p style={{color: '#a855f7', fontWeight: 'bold', fontSize: '0.9rem'}}><i className="fas fa-memory"></i><br />Load Memory</p>
                  <p style={{fontSize: '0.8rem', color: '#555'}}><code>MEMORY.md</code> index injected into context</p>
                </div>
                <div className="col" style={{borderRight: '1px solid #eee'}}>
                  <p style={{color: '#ff9500', fontWeight: 'bold', fontSize: '0.9rem'}}><i className="fas fa-terminal"></i><br />Select Command</p>
                  <p style={{fontSize: '0.8rem', color: '#555'}}>Slash command expands from <code>commands/</code></p>
                </div>
                <div className="col" style={{borderRight: '1px solid #eee'}}>
                  <p style={{color: '#333', fontWeight: 'bold', fontSize: '0.9rem'}}><i className="fas fa-robot"></i><br />Invoke Agent</p>
                  <p style={{fontSize: '0.8rem', color: '#555'}}>Agent definition loaded from <code>agents/</code></p>
                </div>
                <div className="col">
                  <p style={{color: '#ffd700', fontWeight: 'bold', fontSize: '0.9rem'}}><i className="fas fa-wand-magic-sparkles"></i><br />Execute Skills</p>
                  <p style={{fontSize: '0.8rem', color: '#555'}}>Agent applies skill logic from <code>skills/</code></p>
                </div>
              </div>
            </div>

            {/* Mermaid Diagram */}
            <h4  className="mt-5 mb-3"><i className="fas fa-sitemap"></i> Agent Decision Flow</h4>
            <p style={{color: '#555'}}>This diagram shows the full decision engine — from user prompt through agent selection, skill execution, and whether external data (MCP) is needed before returning a response.</p>

            <div className="text-center mt-4">
              <img
                src={`${basePath}/resources/mermaid-diagram.png`}
                alt="Claude Agent Decision Flow — from User Prompt through Agent Decision Engine, Skill Selection, MCP External Data, to Final Response"
                style={{maxWidth: '480px', width: '100%', border: '2px solid #ddd', borderRadius: '12px', background: '#fff', padding: '16px'}}
              />
              <p style={{fontSize: '0.8rem', color: '#555', marginTop: '12px'}}>
                <i className="fas fa-circle-info" ></i>
                The Agent Decision Engine selects one or more skills, then determines whether to call an MCP server for live data before preparing the final response.
              </p>
            </div>

            {/* Quick Reference */}
            <h4  className="mt-5 mb-3"><i className="fas fa-table"></i> Quick Reference</h4>
            <div className="table-responsive">
              <table className="table" style={{color: '#e0e0e0', borderColor: '#2a2a4a'}}>
                <thead>
                  <tr style={{borderColor: '#2a2a4a', background: '#12122a'}}>
                    <th style={{color: '#7B2FF7', borderColor: '#2a2a4a'}}>Path</th>
                    <th style={{color: '#7B2FF7', borderColor: '#2a2a4a'}}>Scope</th>
                    <th style={{color: '#7B2FF7', borderColor: '#2a2a4a'}}>What lives here</th>
                    <th style={{color: '#7B2FF7', borderColor: '#2a2a4a'}}>When it loads</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{borderColor: '#2a2a4a'}}>
                    <td><code >~/.claude/memory/</code></td>
                    <td><span style={{color: '#555'}}>Global</span></td>
                    <td>User facts, feedback, project context</td>
                    <td>Every session start</td>
                  </tr>
                  <tr style={{borderColor: '#2a2a4a'}}>
                    <td><code style={{color: '#a855f7'}}>~/.claude/skills/</code></td>
                    <td><span style={{color: '#555'}}>Global</span></td>
                    <td>Reusable task-specific instruction modules</td>
                    <td>On demand via <code>Skill</code> tool</td>
                  </tr>
                  <tr style={{borderColor: '#2a2a4a'}}>
                    <td><code style={{color: '#333'}}>~/.claude/agents/</code></td>
                    <td><span style={{color: '#555'}}>Global</span></td>
                    <td>Sub-agent role definitions &amp; delegation rules</td>
                    <td>When agent is invoked</td>
                  </tr>
                  <tr style={{borderColor: '#2a2a4a'}}>
                    <td><code style={{color: '#ff9500'}}>~/.claude/commands/</code></td>
                    <td><span style={{color: '#555'}}>Global</span></td>
                    <td>Custom slash command definitions</td>
                    <td>When <code>/command</code> is typed</td>
                  </tr>
                  <tr style={{borderColor: '#2a2a4a'}}>
                    <td><code style={{color: '#ffd700'}}>.claude.json</code></td>
                    <td><span style={{color: '#555'}}>Project</span></td>
                    <td>MCP server config, model &amp; permission overrides</td>
                    <td>On project open</td>
                  </tr>
                  <tr style={{borderColor: '#2a2a4a'}}>
                    <td><code style={{color: '#ff6b6b'}}>~/.claude/settings.json</code></td>
                    <td><span style={{color: '#555'}}>Global</span></td>
                    <td>Hooks, allowed tools, env vars, model config</td>
                    <td>On Claude Code start</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </section>
        </div>
      </div>
    </Layout>
  );
}
