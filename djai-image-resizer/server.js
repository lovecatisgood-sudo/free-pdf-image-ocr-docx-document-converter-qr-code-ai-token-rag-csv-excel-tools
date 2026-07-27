const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function sendFile(res, filePath) {
  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) {
      const notFound = path.join(PUBLIC_DIR, '404.html');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFound).pipe(res);
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const isHtml = extension === '.html';
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[extension] || 'application/octet-stream',
      'Cache-Control': isHtml ? 'no-cache' : 'public, max-age=86400',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(requestUrl.pathname);

  // Makes the tool work at /, /tools/resizeimg/, /tools/resizeimg/en/, or old static subpaths.
  if (pathname === '/' || pathname.endsWith('/')) pathname += 'index.html';

  for (const prefix of ['/tools/resizeimg', '/tools/Resizeimg']) {
    if (pathname === `${prefix}/index.html` || pathname.startsWith(`${prefix}/`)) {
      pathname = pathname.slice(prefix.length) || '/index.html';
      break;
    }
  }

  const normalized = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, normalized);

  // When deployed beneath /tools/resizeimg/, fall back to the public root.
  if (!fs.existsSync(filePath)) {
    const basenamePath = path.join(PUBLIC_DIR, path.basename(normalized));
    const assetMatch = normalized.match(/assets[/\\](.+)$/);
    if (assetMatch) filePath = path.join(PUBLIC_DIR, 'assets', assetMatch[1]);
    else if (fs.existsSync(basenamePath)) filePath = basenamePath;
    else if (path.extname(normalized) === '') filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  sendFile(res, filePath);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`DJAI Image Resizer is running at http://localhost:${PORT}`);
});
