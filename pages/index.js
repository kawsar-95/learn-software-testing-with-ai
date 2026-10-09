import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const BASE_URL = 'https://roadtocareer.github.io/learn-software-testing-with-claude-code'
const PAGE_TITLE = 'Software Testing with AI - Complete Tutorial'
const PAGE_DESCRIPTION = 'Master software testing with Claude AI. Complete tutorial covering prompt engineering, context engineering, skills, agents, MCP servers, and more for QA engineers and SDETs.'
const OG_IMAGE = `${BASE_URL}/resources/mermaid-diagram.png`

export default function Home() {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={`${BASE_URL}/`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Software Testing with AI" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Extra SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Road to Career" />
        <meta name="keywords" content="software testing, Claude AI, QA engineer, SDET, prompt engineering, test automation, AI testing, Claude Code, Learn Claude Code" />
      </Head>
      {/* Hero */}
      <div className="hero">
        <div className="container">
          <h1 className="display-3">🤖 Software Testing with Claude AI</h1>
          <p className="lead">Master Prompt Engineering, Context Engineering, Skills, Agents &amp; MCP Servers in Claude</p>
          <Link href="/setup" className="btn btn-light btn-lg mt-4"><i className="fas fa-rocket"></i> Get Started</Link>
        </div>
      </div>

      {/* Overview */}
      <div className="container-fluid py-5">
        <div className="container">
          <h2 style={{color: '#7B2FF7', textAlign: 'center', marginBottom: '40px'}}>
            <i className="fas fa-map"></i> Tutorial Overview
          </h2>
          <p className="text-center mb-5" style={{color: '#555', fontSize: '1.1rem'}}>
            A complete guide to building autonomous AI testing systems with Claude Code.<br />
            Each section is a dedicated page — click any card to dive in.
          </p>

          <div className="row">
            {/* Setup */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/setup" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-download"></i></div>
                    <h5 className="card-title text-center">Install Claude</h5>
                    <p className="card-text text-center">Step-by-step setup: subscription, API key, CLI, VSCode extension.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Models */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/models" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-microchip"></i></div>
                    <h5 className="card-title text-center">Claude Models</h5>
                    <p className="card-text text-center">Opus vs Sonnet vs Haiku — pricing, when to use each model.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Modes */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/modes" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-sliders"></i></div>
                    <h5 className="card-title text-center">Plan vs Act Mode</h5>
                    <p className="card-text text-center">Two core modes — when Claude plans first vs acts immediately.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Claude Architecture */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/structure" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-folder-tree"></i></div>
                    <h5 className="card-title text-center">Claude Architecture</h5>
                    <p className="card-text text-center">Inside <code>.claude/</code> — memory, skills, agents, commands &amp; <code>.claude.json</code> explained.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* CLAUDE.md */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/claude-md" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-file-code"></i></div>
                    <h5 className="card-title text-center">CLAUDE.md</h5>
                    <p className="card-text text-center">Project config file — teach Claude your stack, conventions, and routing once.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Memory */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/memory" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-memory"></i></div>
                    <h5 className="card-title text-center">Memory</h5>
                    <p className="card-text text-center">Persistent knowledge across sessions — token costs, update methods.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Prompt Eng. */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/prompt" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-pen-fancy"></i></div>
                    <h5 className="card-title text-center">Prompt Engineering</h5>
                    <p className="card-text text-center">Role + Context + Scope + Constraints — how to write effective prompts.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Context Eng. */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/context" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-brain"></i></div>
                    <h5 className="card-title text-center">Context Engineering</h5>
                    <p className="card-text text-center">Design what the AI sees — RAG, real data, dynamic context injection.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* AI Systems */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/ai-systems" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-layer-group"></i></div>
                    <h5 className="card-title text-center">AI Systems</h5>
                    <p className="card-text text-center">Core + Context + Interface layers — how modern AI systems work end-to-end.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Skills */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/skills" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-wand-magic-sparkles"></i></div>
                    <h5 className="card-title text-center">Skills</h5>
                    <p className="card-text text-center">6 reusable skill files: find-bug, test-design, explain-code, analyze-rootcause, and more.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Agents */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/agents" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-robot"></i></div>
                    <h5 className="card-title text-center">Agents</h5>
                    <p className="card-text text-center">qa-agent + sdet-agent — orchestrator patterns, parallel/sequential spawning, cross-agent delegation.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Hooks */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/hooks" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-anchor"></i></div>
                    <h5 className="card-title text-center">Hooks</h5>
                    <p className="card-text text-center">PreToolUse + PostToolUse — intercept Claude&apos;s actions, auto-format, block protected files.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Commands */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/commands" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-terminal"></i></div>
                    <h5 className="card-title text-center">Commands</h5>
                    <p className="card-text text-center">Slash commands — /qa-agent, /sdet-agent, /save-memory — how to create them.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* MCP Server */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/mcp" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-server"></i></div>
                    <h5 className="card-title text-center">MCP Server</h5>
                    <p className="card-text text-center">Bridge AI to Jira, DB, GitHub, Slack — install from marketplace or CLI.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Superpower */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/superpower" style={{textDecoration: 'none'}}>
                <div className="card h-100" style={{borderColor: '#ffd700'}}>
                  <div className="card-body">
                    <div className="icon-box" style={{background: 'linear-gradient(135deg, #ffd700, #ff9500)'}}><i className="fas fa-bolt"></i></div>
                    <h5 className="card-title text-center" style={{color: '#ffd700'}}>⚡ Superpower Mode</h5>
                    <p className="card-text text-center">Remove approval prompts — Claude runs fully autonomous with hooks as guardrails.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Key Principles */}
            <div className="col-lg-4 col-md-6 mb-4">
              <Link href="/principles" style={{textDecoration: 'none'}}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="icon-box"><i className="fas fa-star"></i></div>
                    <h5 className="card-title text-center">Key Principles</h5>
                    <p className="card-text text-center">8 core principles for building reliable, autonomous AI testing systems.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
