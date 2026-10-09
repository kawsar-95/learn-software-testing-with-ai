// ── Highlight active nav & sidebar based on current page ────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';

    // Highlight matching nav-link
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentFile) {
            link.classList.add('active');
        }
    });

    // Highlight matching sidebar-title
    document.querySelectorAll('.sidebar-title').forEach(link => {
        if (link.getAttribute('href') === currentFile) {
            link.classList.add('active');
            // Scroll sidebar to keep active item visible
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.scrollTop = link.offsetTop - sidebar.offsetTop - 100;
        }
    });

    // ── Hamburger menu toggle ────────────────────────────────────────────────
    const hamburger = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('show');
        });

        // Close sidebar when clicking on a link
        document.querySelectorAll('.sidebar-title').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                sidebar.classList.remove('show');
            });
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 576) {
                if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                    hamburger.classList.remove('active');
                    sidebar.classList.remove('show');
                }
            }
        });
    }

    // ── Scroll-in animation for cards ────────────────────────────────────────
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.card').forEach(card => observer.observe(card));

    // ── Auto-inject copy buttons into all accordion code blocks ───────────────
    document.querySelectorAll('.accordion-body .code-block').forEach(block => {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);

        const btn = document.createElement('button');
        btn.className = 'btn btn-sm btn-outline-info copy-btn';
        btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        btn.title = 'Copy to clipboard';
        btn.addEventListener('click', function () { copyCode(this); });
        wrapper.insertBefore(btn, block);
    });
});

// ── Copy to clipboard ─────────────────────────────────────────────────────────
function copyCode(btn) {
    const wrapper = btn.closest('.code-block-wrapper');
    const pre = wrapper.querySelector('pre');
    const text = (pre ? pre.textContent : wrapper.querySelector('.code-block').innerText).trim();

    navigator.clipboard.writeText(text).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.replace('btn-outline-info', 'btn-success');
        setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.replace('btn-success', 'btn-outline-info');
        }, 2000);
    }).catch(() => {
        const ta = Object.assign(document.createElement('textarea'), {
            value: text,
            style: 'position:fixed;opacity:0'
        });
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
    });
}
