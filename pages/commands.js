import Layout from '../components/Layout';

export default function Commands() {
  return (
    <Layout title="Commands - Software Testing with AI" description="Create custom slash commands for software testing with Claude AI. Build /qa-agent, /sdet-agent, /save-memory, and reusable test workflow commands.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="commands" className="section">
            <h2><i className="fas fa-terminal"></i> Commands</h2>
            <p className="lead">Structured ways to tell Claude what to do instantly.</p>

            <h4  className="mt-5">What is Command?</h4>
            <p>A command is a structured way to tell Claude what to do instantly. Example usage: <span className="badge-custom">/qa-agent payment.js</span></p>

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">/sdet-agent</h5>
                    <p className="card-text">Invoke sdet-agent to complete SDET-focused tasks.</p>
                    <p><strong>Example:</strong></p>
                    <div className="code-block">/sdet-agent analyze payment.js</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">/qa-agent</h5>
                    <p className="card-text">Invoke qa-agent to complete QA-focused tasks.</p>
                    <p><strong>Example:</strong></p>
                    <div className="code-block">/qa-agent find-bugs payment.js</div>
                  </div>
                </div>
              </div>
            </div>

            <h4  className="mt-5">Create Command</h4>
            <p>Create a folder named <strong>commands</strong> inside the <strong>.claude</strong> folder. Create 2 files:</p>
            <ul>
              <li>sdet-agent.md</li>
              <li>qa-agent.md</li>
            </ul>

            <div className="row mt-4">
              <div className="col-md-6 mb-4">
                <h5 >sdet-agent.md</h5>
                <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.9rem'}}>{`Use the sdet-agent to complete the following task:


$ARGUMENTS`}</pre></div>
              </div>
              <div className="col-md-6 mb-4">
                <h5 >qa-agent.md</h5>
                <div className="code-block"><pre style={{color: '#d4d4d4', margin: 0, whiteSpace: 'pre-wrap', fontFamily: "'Courier New', monospace", fontSize: '0.9rem'}}>{`Use the qa-agent to complete the following task:


$ARGUMENTS`}</pre></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
