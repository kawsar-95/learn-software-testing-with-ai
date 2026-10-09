import Layout from '../components/Layout';

export default function Setup() {
  return (
    <Layout title="Install Claude - Software Testing with AI" description="Step-by-step guide to install Claude Code for software testing. Set up your subscription, API key, CLI, and VSCode extension.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="setup" className="section">
            <h2><i className="fas fa-download"></i> Install Claude</h2>
            <div className="row">
              <div className="col-lg-8">
                <p className="lead">Follow these steps to set up Claude for Software Testing with AI:</p>
                <div className="highlight-box">
                  <div className="list-item"><span className="step-number">1</span> <strong>Get subscription</strong> from <a href="https://www.anthropic.com/" target="_blank" >https://www.anthropic.com/</a></div>
                  <div className="list-item"><span className="step-number">2</span> <strong>Create API key</strong> from <a href="https://console.anthropic.com/" target="_blank" >https://console.anthropic.com/</a></div>
                  <div className="list-item"><span className="step-number">3</span> <strong>Install Claude CLI</strong> via npm</div>
                  <div className="code-block">npm install -g @anthropic-ai/claude-code</div>
                  <div className="list-item"><span className="step-number">4</span> <strong>Check installation</strong></div>
                  <div className="code-block">cmd&gt; claude</div>
                  <div className="list-item"><span className="step-number">5</span> <strong>Login with claude</strong></div>
                  <div className="code-block">cmd&gt; claude /login</div>
                  <div className="list-item"><span className="step-number">6</span> <strong>Authenticate</strong> with OAuth 2.0 by browser</div>
                  <div className="list-item"><span className="step-number">7</span> <strong>Install claude extension</strong> in VSCode</div>
                  <div className="list-item"><span className="step-number">8</span> <strong>Login</strong> with your subscription email and enter API key</div>
                  <div className="list-item"><span className="step-number">9</span> <strong>Done!</strong> Ask anything what you want</div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-key"></i></div>
                    <h5 className="card-title text-center">API Key Setup</h5>
                    <p className="card-text text-center">Generate your unique API key to start using Claude with your applications.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
