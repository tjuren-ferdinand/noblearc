// Server-side access gate for Cloudflare Pages.
// Blocks every request until the correct code has been entered.
// Code is checked server-side; page content is never sent without a valid cookie.

const COOKIE_NAME = 'na_auth';
const FALLBACK_CODE = '0101';
const FALLBACK_SECRET = 'na-7f3k9xq2v8w1z5t4y6u0i9o8p7a6s5d4f3g2h1j0k9l8m7n6b5v4c3x2z1';

// Assets the gate page itself needs (logo + favicon only)
const PUBLIC_PATHS = new Set(['/logo_noble.png', '/favicon.svg']);

async function expectedToken(env) {
  const code = env.ACCESS_CODE || FALLBACK_CODE;
  const secret = env.COOKIE_SECRET || FALLBACK_SECRET;
  const data = new TextEncoder().encode(code + ':' + secret);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function readCookie(request, name) {
  const header = request.headers.get('Cookie') || '';
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) return part.slice(idx + 1).trim();
  }
  return null;
}

function gatePage(denied) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<title>NobleArc</title>
<link rel="icon" type="image/png" href="/logo_noble.png" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a0a;
    color: #f2f2f2;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 300;
    padding: 2rem 4%;
  }
  .card {
    width: min(460px, 92%);
    text-align: center;
    padding: 2.5rem;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(18, 18, 18, 0.78);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  }
  .logo { height: 34px; width: auto; margin-bottom: 1.5rem; opacity: 0.9; }
  .eyebrow {
    display: block;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 0.75rem;
  }
  h1 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 400; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
  p { color: #888; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; }
  form { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
  input {
    width: 12rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    padding: 0.7rem 1rem;
    color: #f2f2f2;
    font: inherit;
    outline: none;
    text-align: center;
    letter-spacing: 0.3em;
    transition: border-color 0.2s;
  }
  input:focus { border-color: rgba(255, 255, 255, 0.25); }
  button {
    padding: 0.7rem 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    background: transparent;
    color: #f2f2f2;
    font: inherit;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  button:hover { background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.25); }
  .hint { min-height: 1.5rem; margin-top: 1rem; font-size: 0.85rem; color: #b87333; }
  @media (max-width: 768px) {
    .card { padding: 2rem 1.5rem; }
    form { flex-direction: column; align-items: center; }
    input { width: 100%; }
  }
</style>
</head>
<body>
  <div class="card">
    <img class="logo" src="/logo_noble.png" alt="NobleArc" />
    <span class="eyebrow">Locked page</span>
    <h1>Enter code</h1>
    <p>To view this page, enter the code.</p>
    <form method="post" action="">
      <input type="password" name="code" inputmode="numeric" pattern="[0-9]*" maxlength="4" aria-label="Access code" placeholder="••••" autocomplete="off" autofocus />
      <button type="submit">Unlock →</button>
    </form>
    <div class="hint">${denied ? 'The code does not match.' : '&nbsp;'}</div>
  </div>
</body>
</html>`;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (PUBLIC_PATHS.has(url.pathname)) {
    return context.next();
  }

  const token = await expectedToken(env);
  const accessCode = env.ACCESS_CODE || FALLBACK_CODE;

  if (request.method === 'POST') {
    let code = '';
    try {
      const form = await request.formData();
      code = String(form.get('code') || '').trim();
    } catch (e) {
      code = '';
    }
    if (code === accessCode) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: url.pathname + url.search,
          'Set-Cookie': `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`,
          'Cache-Control': 'no-store',
        },
      });
    }
    return new Response(gatePage(true), {
      status: 401,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  if (readCookie(request, COOKIE_NAME) === token) {
    return context.next();
  }

  return new Response(gatePage(false), {
    status: 401,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
