const fs = require("fs");
const http = require("http");
const path = require("path");
const createServer = require("http");
const WebSocketServer = require("ws");

const server = createServer(); // error: not a function...
const wss = new WebSocketServer({noServer: true});


wss.on('connection', function connection(ws) {
    ws.on('error', console.error)
})

server.on('upgrade', function upgrade(request, socket, head){
    const {pathname} = new URL(request.url, 'wss://base.url');
    if (pathname === 'foo') {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        })
    } else {
        socket.destroy();
    }
})

server.listen(8080);

const PORT = 8000;

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "text/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const STATIC_PATH = path.join(process.cwd(), "client");

const toBool = [() => true, () => false];

// Translates a url path to a file name.
function lookupPath(url_path) {
  if (url_path == "/") return "index.html";
  return url_path;
}

async function requestHandler(req, res) {
  const file_path = path.join(STATIC_PATH, lookupPath(req.url));
  console.log(file_path);
  const file_exists = await fs.promises.access(file_path).then(...toBool);

  var status_code = 200;
  if (file_exists) {
    const ext = path.extname(file_path).substring(1).toLowerCase();
    const stream = fs.createReadStream(file_path);
    const mimeType = MIME_TYPES[ext] || MIME_TYPES.default;
    res.writeHead(status_code, { "Content-Type": mimeType });
    stream.pipe(res);
  } else {
    status_code = 404;
    res.writeHead(status_code);
    res.end("Not found\n");
  }

  console.log(`${req.method} ${req.url} ${status_code}`);
}

http.createServer(requestHandler).listen(PORT);
console.log(`Server running at http://127.0.0.1:${PORT}/`);
