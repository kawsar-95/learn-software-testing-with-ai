import Link from 'next/link';
import Layout from '../components/Layout';

export default function Prompt() {
  return (
    <Layout title="Prompt Engineering - Software Testing with AI" description="Master prompt engineering for software testing with Claude AI. Apply Role + Context + Scope + Constraints to write effective testing prompts.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="prompt" className="section">
            <h2><i className="fas fa-pen-fancy"></i> Prompt Engineering</h2>
            <div className="row mb-4">
              <div className="col-lg-6">
                <h4 >Definition</h4>
                <p>Designing the input instruction (prompt) to guide the AI's response.</p>
                <h5 >✅ What it focuses on:</h5>
                <ul className="list-item">
                  <li>Writing better prompts</li>
                  <li>Structuring instructions clearly</li>
                  <li>Adding role, scope, constraints</li>
                </ul>
              </div>
              <div className="col-lg-6">
                <h5 >💡 Example:</h5>
                <p><strong>Bad Prompt:</strong></p>
                <div className="code-block">Explain this code</div>
                <p><strong>Good Prompt:</strong></p>
                <div className="code-block">You are a Senior SDET. Read the provided file.
Explain code flow, dependencies, and internal
function calling. Do not generate test cases.</div>
              </div>
            </div>
            <div className="highlight-box">
              <h5 >Always define:</h5>
              <ul>
                <li><strong>Role:</strong> You are a Senior SDET</li>
                <li><strong>Context:</strong> Read the Provided file / Jira ticket / code snippet carefully</li>
                <li><strong>Scope:</strong> Explain code flow, dependencies, and internal function calling</li>
                <li><strong>Constraints:</strong> Do not generate test cases</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
