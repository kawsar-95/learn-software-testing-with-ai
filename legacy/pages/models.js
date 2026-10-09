import Layout from '../components/Layout';

export default function Models() {
  return (
    <Layout title="Claude Models - Software Testing with AI" description="Compare Claude AI models for software testing: Opus vs Sonnet vs Haiku. Learn pricing, capabilities, and when to use each model in your test suite.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="models" className="section">
            <h2><i className="fas fa-microchip"></i> Claude Models</h2>
            <p className="lead">Choose the right model for the right task — speed vs. intelligence vs. cost.</p>
            <p>Claude comes in three model tiers. Your agent files use <code>model: sonnet</code> — but knowing <em>when</em> to use each model is essential for getting the best results without wasting tokens.</p>

            <div className="row mt-4 mb-4">
              <div className="col-lg-4 mb-4">
                <div className="card h-100" style={{borderColor: '#ff9500'}}>
                  <div className="card-body">
                    <div className="icon-box" style={{background: 'linear-gradient(135deg, #ff9500, #ff6b00)'}}><i className="fas fa-crown"></i></div>
                    <h5 className="card-title text-center" style={{color: '#ff9500'}}>claude-opus-4</h5>
                    <p className="text-center" style={{color: '#555', fontSize: '0.85rem'}}>Most Intelligent</p>
                    <hr style={{borderColor: '#ff9500'}} />
                    <ul style={{fontSize: '0.9rem'}}><li>Highest reasoning ability</li><li>Best for complex, multi-step tasks</li><li>Deepest code understanding</li><li>Highest cost per token</li></ul>
                    <div className="code-block" style={{fontSize: '0.8rem', marginTop: '10px', borderColor: '#ff9500'}}>model: opus</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="card h-100" style={{borderColor: '#ddd'}}>
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-bolt"></i></div>
                    <h5 className="card-title text-center" >claude-sonnet-4</h5>
                    <p className="text-center" style={{color: '#555', fontSize: '0.85rem'}}>Best Balance ✅ Recommended</p>
                    <hr style={{borderColor: '#ddd'}} />
                    <ul style={{fontSize: '0.9rem'}}><li>Strong reasoning + fast speed</li><li>Best cost-to-performance ratio</li><li>Ideal for agents and skills</li><li>Default choice for QA/SDET work</li></ul>
                    <div className="code-block" style={{fontSize: '0.8rem', marginTop: '10px'}}>model: sonnet</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="card h-100" style={{borderColor: '#ddd'}}>
                  <div className="card-body">
                    <div className="icon-box" style={{background: '#5a1fc0'}}><i className="fas fa-feather"></i></div>
                    <h5 className="card-title text-center" style={{color: '#333'}}>claude-haiku-3</h5>
                    <p className="text-center" style={{color: '#555', fontSize: '0.85rem'}}>Fastest &amp; Cheapest</p>
                    <hr style={{borderColor: '#ddd'}} />
                    <ul style={{fontSize: '0.9rem'}}><li>Ultra-fast response time</li><li>Lowest cost per token</li><li>Good for simple, repetitive tasks</li><li>Limited reasoning on complex logic</li></ul>
                    <div className="code-block" style={{fontSize: '0.8rem', marginTop: '10px', borderColor: '#ddd'}}>model: haiku</div>
                  </div>
                </div>
              </div>
            </div>

            <h4  className="mt-4">Pricing (per million tokens)</h4>
            <div className="table-responsive mt-3 mb-4">
              <table className="table table-striped">
                <thead><tr><th>Model</th><th>Input (per 1M tokens)</th><th>Output (per 1M tokens)</th><th>Best For</th></tr></thead>
                <tbody>
                  <tr><td><span style={{color: '#ff9500', fontWeight: 'bold'}}>claude-opus-4</span></td><td>~$15</td><td>~$75</td><td>Complex reasoning, orchestration</td></tr>
                  <tr><td><span style={{color: '#7B2FF7', fontWeight: 'bold'}}>claude-sonnet-4</span></td><td>~$3</td><td>~$15</td><td>QA/SDET agents, skills (recommended)</td></tr>
                  <tr><td><span style={{color: '#333', fontWeight: 'bold'}}>claude-haiku-3</span></td><td>~$0.25</td><td>~$1.25</td><td>High-volume sub-agents, simple tasks</td></tr>
                </tbody>
              </table>
            </div>
            <p style={{fontSize: '0.85rem', color: '#555'}}><i className="fas fa-info-circle" ></i> Prices are approximate. Always check <a href="https://www.anthropic.com/pricing" target="_blank" >anthropic.com/pricing</a>. A &quot;token&quot; ≈ 0.75 words. A typical QA task ≈ ~3,000–8,000 tokens total.</p>

            <h4  className="mt-4">When to Use Which Model</h4>
            <div className="table-responsive mt-3">
              <table className="table table-striped">
                <thead><tr><th>Task</th><th>Recommended Model</th><th>Why</th></tr></thead>
                <tbody>
                  <tr><td>find-bug, test-design, analyze-requirement</td><td><span style={{color: '#7B2FF7', fontWeight: 'bold'}}>sonnet</span></td><td>Best balance of accuracy and cost</td></tr>
                  <tr><td>explain-code, analyze-rootcause</td><td><span style={{color: '#7B2FF7', fontWeight: 'bold'}}>sonnet</span></td><td>Deep enough reasoning without Opus cost</td></tr>
                  <tr><td>Complex architecture review, multi-agent orchestration</td><td><span style={{color: '#ff9500', fontWeight: 'bold'}}>opus</span></td><td>Needs highest reasoning for multi-step planning</td></tr>
                  <tr><td>Simple classification, format conversion, summaries</td><td><span style={{color: '#333', fontWeight: 'bold'}}>haiku</span></td><td>Fast and cheap for simple operations</td></tr>
                  <tr><td>Sub-agents doing isolated, repeated tasks</td><td><span style={{color: '#333', fontWeight: 'bold'}}>haiku</span></td><td>Reduces cost when running many parallel agents</td></tr>
                </tbody>
              </table>
            </div>

            <h4  className="mt-5">Setting Model in Agent Files</h4>
            <div className="code-block"><pre style={{color: '#d4d4d4', margin: '0', whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.9rem'}}>---
name: qa-agent
description: Senior QA Engineer — finds bugs and designs test cases
tools: Read, Grep, Glob, Bash
model: sonnet          ← set the model here
---</pre></div>
            <div className="highlight-box mt-4">
              <strong ><i className="fas fa-lightbulb"></i> Rule of Thumb:</strong>
              <ul className="mt-2 mb-0">
                <li>Start with <strong >sonnet</strong> — it handles 95% of QA/SDET use cases well</li>
                <li>Upgrade to <strong style={{color: '#ff9500'}}>opus</strong> only if sonnet&apos;s reasoning is insufficient</li>
                <li>Drop to <strong style={{color: '#333'}}>haiku</strong> only for high-volume, low-complexity sub-agent work</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
