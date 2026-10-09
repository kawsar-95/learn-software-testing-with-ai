import Layout from '../components/Layout';

export default function Marketplace() {
  return (
    <Layout title="Marketplaces - Software Testing with AI" description="Explore Claude AI marketplace for software testing tools, MCP servers, skills, and agents. Extend Claude Code with community-built testing integrations.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="marketplace" className="section">
            <h2><i className="fas fa-store"></i> Claude Code Marketplaces</h2>
            <p className="lead">The largest directory of Claude Code extensions. Discover 2,400+ skills, 2,500+ marketplaces, and 770+ MCP servers.</p>

            <div className="highlight-box mt-4" style={{border: '2px solid #7B2FF7', background: '#f9f5ff'}}>
              <strong style={{color: '#7B2FF7', fontSize: '1.05rem'}}><i className="fas fa-link"></i> Official Directory:</strong>
              <p className="mt-2 mb-0" style={{fontSize: '0.95rem'}}>Visit <a href="https://claudemarketplaces.com/" target="_blank" >claudemarketplaces.com</a> — the complete marketplace for Claude Code extensions, sorted by installs and GitHub stars.</p>
            </div>

            <h4  className="mt-5"><i className="fas fa-compass"></i> Main Browse Categories</h4>
            <div className="row mt-3">
              <div className="col-md-4 mb-3">
                <div className="card" style={{borderColor: '#ddd'}}>
                  <div className="card-body text-center">
                    <div className="icon-box"><i className="fas fa-wand-magic-sparkles"></i></div>
                    <h5 className="card-title" >Skills</h5>
                    <p style={{fontSize: '0.85rem', color: '#555'}}>2,400+ reusable instructions</p>
                    <a href="https://claudemarketplaces.com/skills" target="_blank" className="btn btn-sm btn-outline-info">Browse →</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card" style={{borderColor: '#ddd'}}>
                  <div className="card-body text-center">
                    <div className="icon-box"><i className="fas fa-puzzle-piece"></i></div>
                    <h5 className="card-title" >Marketplaces</h5>
                    <p style={{fontSize: '0.85rem', color: '#555'}}>2,500+ GitHub registries</p>
                    <a href="https://claudemarketplaces.com/marketplaces" target="_blank" className="btn btn-sm btn-outline-info">Browse →</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card" style={{borderColor: '#ddd'}}>
                  <div className="card-body text-center">
                    <div className="icon-box"><i className="fas fa-server"></i></div>
                    <h5 className="card-title" >MCP Servers</h5>
                    <p style={{fontSize: '0.85rem', color: '#555'}}>770+ protocol integrations</p>
                    <a href="https://claudemarketplaces.com/mcp" target="_blank" className="btn btn-sm btn-outline-info">Browse →</a>
                  </div>
                </div>
              </div>
            </div>

            <h4  className="mt-5"><i className="fas fa-layer-group"></i> Skill Categories</h4>
            <p style={{fontSize: '0.9rem', color: '#555'}}>Find skills organized by development discipline:</p>
            <div className="row mt-3">
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/skills/category/frontend" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#7B2FF7', padding: '8px 12px', fontSize: '0.85rem'}}>Frontend Development</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/skills/category/backend" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#7B2FF7', padding: '8px 12px', fontSize: '0.85rem'}}>Backend &amp; APIs</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/skills/category/testing" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#7B2FF7', padding: '8px 12px', fontSize: '0.85rem'}}>Testing &amp; QA</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/skills/category/security" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#7B2FF7', padding: '8px 12px', fontSize: '0.85rem'}}>Security</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/skills/category/devops" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#7B2FF7', padding: '8px 12px', fontSize: '0.85rem'}}>DevOps &amp; CI/CD</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/skills/category/git" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#7B2FF7', padding: '8px 12px', fontSize: '0.85rem'}}>Git &amp; Pull Requests</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/skills/category/docs" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#7B2FF7', padding: '8px 12px', fontSize: '0.85rem'}}>Documentation</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/skills/category/code-review" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#7B2FF7', padding: '8px 12px', fontSize: '0.85rem'}}>Code Review &amp; Quality</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/skills/category/ai-agents" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#7B2FF7', padding: '8px 12px', fontSize: '0.85rem'}}>AI &amp; Agent Building</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/skills/category/skill-dev" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#7B2FF7', padding: '8px 12px', fontSize: '0.85rem'}}>Skill Development</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/skills/category/data-science" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#7B2FF7', padding: '8px 12px', fontSize: '0.85rem'}}>Data Science &amp; ML</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/skills/category/releases" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#7B2FF7', padding: '8px 12px', fontSize: '0.85rem'}}>Release Management</span></a></div>
            </div>

            <h4  className="mt-5"><i className="fas fa-database"></i> MCP Server Categories</h4>
            <p style={{fontSize: '0.9rem', color: '#555'}}>Extend Claude with integrations by category:</p>
            <div className="row mt-3">
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/mcp/category/web-browser" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#5a1fc0', padding: '8px 12px', fontSize: '0.85rem'}}>Web &amp; Browser Automation</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/mcp/category/database" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#5a1fc0', padding: '8px 12px', fontSize: '0.85rem'}}>Databases</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/mcp/category/ai-agents" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#5a1fc0', padding: '8px 12px', fontSize: '0.85rem'}}>AI &amp; LLM Tools</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/mcp/category/cloud-infrastructure" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#5a1fc0', padding: '8px 12px', fontSize: '0.85rem'}}>Cloud &amp; Infrastructure</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/mcp/category/communication" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#5a1fc0', padding: '8px 12px', fontSize: '0.85rem'}}>Communication &amp; Messaging</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/mcp/category/developer-tools" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#5a1fc0', padding: '8px 12px', fontSize: '0.85rem'}}>Developer Tools</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/mcp/category/design-creative" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#5a1fc0', padding: '8px 12px', fontSize: '0.85rem'}}>Design &amp; Creative</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/mcp/category/documents-knowledge" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#5a1fc0', padding: '8px 12px', fontSize: '0.85rem'}}>Documents &amp; Knowledge</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/mcp/category/search" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#5a1fc0', padding: '8px 12px', fontSize: '0.85rem'}}>Search &amp; Web Crawling</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/mcp/category/automation" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#5a1fc0', padding: '8px 12px', fontSize: '0.85rem'}}>Automation &amp; Workflows</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/mcp/category/security" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#5a1fc0', padding: '8px 12px', fontSize: '0.85rem'}}>Security &amp; Pentesting</span></a></div>
              <div className="col-md-6 col-lg-4 mb-2"><a href="https://claudemarketplaces.com/mcp/category/monitoring" target="_blank" style={{textDecoration: 'none'}}><span className="badge" style={{background: '#5a1fc0', padding: '8px 12px', fontSize: '0.85rem'}}>Monitoring &amp; Observability</span></a></div>
            </div>

            <h4  className="mt-5"><i className="fas fa-rocket"></i> Resources</h4>
            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <div className="highlight-box">
                  <ul style={{fontSize: '0.9rem', marginBottom: 0}}>
                    <li><a href="https://claudemarketplaces.com/learn" target="_blank" >Learn</a> — Educational resources and guides</li>
                    <li><a href="https://docs.claude.com/en/docs/claude-code/plugins-reference" target="_blank" >Plugins Reference</a> — Official documentation</li>
                    <li><a href="https://github.com/mert-duzgun/claudemarketplaces.com" target="_blank" >GitHub Repository</a> — Open source project</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="highlight-box">
                  <ul style={{fontSize: '0.9rem', marginBottom: 0}}>
                    <li><a href="https://claudemarketplaces.com/about" target="_blank" >About</a> — Project information</li>
                    <li><a href="https://claudemarketplaces.com/feedback" target="_blank" >Feedback</a> — Share your ideas</li>
                    <li><a href="https://claudemarketplaces.com/advertise" target="_blank" >Advertise</a> — Promote your product</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4  className="mt-5"><i className="fas fa-question-circle"></i> Quick Reference</h4>

            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                <div className="card" style={{borderColor: '#ddd'}}>
                  <div className="card-body">
                    <h5 ><strong>What's a Skill?</strong></h5>
                    <p style={{fontSize: '0.85rem', color: '#555', marginBottom: 0}}>Reusable instruction sets that teach your agent specific tasks. Install with a single command.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card" style={{borderColor: '#ddd'}}>
                  <div className="card-body">
                    <h5 ><strong>What's a Marketplace?</strong></h5>
                    <p style={{fontSize: '0.85rem', color: '#555', marginBottom: 0}}>GitHub repositories that collect and distribute plugins. Subscribe to registries of skills, MCP servers, commands, hooks, and agents.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card" style={{borderColor: '#ddd'}}>
                  <div className="card-body">
                    <h5 ><strong>What's an MCP Server?</strong></h5>
                    <p style={{fontSize: '0.85rem', color: '#555', marginBottom: 0}}>Protocol servers that extend your agent with tools, APIs, and integrations to external services (databases, APIs, cloud services, etc.)</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card" style={{borderColor: '#ddd'}}>
                  <div className="card-body">
                    <h5 ><strong>What's a Plugin?</strong></h5>
                    <p style={{fontSize: '0.85rem', color: '#555', marginBottom: 0}}>A bundle of Claude Code extensions — skills, MCP servers, commands, hooks, or agents — packaged as one installable unit.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="highlight-box mt-4" style={{border: '2px solid #7B2FF7', background: '#f9f5ff'}}>
              <strong style={{color: '#333'}}><i className="fas fa-check-circle"></i> Key Point:</strong>
              <p className="mt-2 mb-0"><strong>Completely free and open.</strong> Browse and install any extension at no cost. Quality is maintained by install count, GitHub stars, and community votes. Only actively used extensions are listed.</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
