import Link from 'next/link';
import Layout from '../components/Layout';

export default function Context() {
  return (
    <Layout title="Context Engineering - Software Testing with AI" description="Learn context engineering for AI testing systems. Design what Claude sees using RAG, real database data, Jira tickets, and dynamic context injection.">
      <div className="container-fluid py-5" style={{background: '#fff'}}>
        <div className="container">
          <section id="context" className="section">
            <h2><i className="fas fa-brain"></i> Context Engineering</h2>
            <div className="row mb-4">
              <div className="col-lg-6">
                <h4 >Definition</h4>
                <p>Designing what information the AI sees, not just how you ask.</p>
                <h5 >✅ What it focuses on:</h5>
                <ul className="list-item">
                  <li>Supplying relevant data dynamically</li>
                  <li>Using RAG (Retrieval-Augmented Generation)</li>
                  <li>Feeding: Codebase chunks, Jira tickets, Logs, DB data, Commit history</li>
                </ul>
              </div>
              <div className="col-lg-6">
                <h5 >💡 Example:</h5>
                <p><strong>Instead of:</strong></p>
                <div className="code-block">Explain this error</div>
                <p><strong>You do:</strong></p>
                <div className="code-block">Context:
- API endpoint: /user/login
- Stack trace: ...
- Related code: (retrieved from vector DB / Attached File)
- Last commits: ...

Task: Analyze root cause</div>
              </div>
            </div>
            <h4  className="mt-5">Prompt Engineering vs Context Engineering</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr><th>Aspect</th><th>Prompt Engineering</th><th>Context Engineering</th></tr>
                </thead>
                <tbody>
                  <tr><td>Focus</td><td>How you ask</td><td>What AI knows</td></tr>
                  <tr><td>Power</td><td>Limited</td><td>Massive</td></tr>
                  <tr><td>Accuracy</td><td>Medium</td><td>High</td></tr>
                  <tr><td>Scalability</td><td>Poor</td><td>Excellent</td></tr>
                  <tr><td>Use Case</td><td>Simple Q&amp;A</td><td>Real systems</td></tr>
                  <tr><td>Dependency</td><td>Prompt wording</td><td>Data quality</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
