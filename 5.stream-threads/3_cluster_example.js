const cluster = require('cluster');
const http = require('http');
const os = require('os');

const numCPUs = os.cpus().length;
const PORT = 4000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} berjalan`);
  console.log(`Membuat ${numCPUs} worker...`);

  // Buat worker sebanyak jumlah core CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Kalau worker mati, buat yang baru
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} mati (code: ${code}, signal: ${signal})`);
    console.log('Membuat worker pengganti...');
    cluster.fork();
  });
} else {
  // Kode ini dijalankan di setiap worker
  http
    .createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Dilayani oleh worker ${process.pid}\n`);
    })
    .listen(PORT, () => {
      console.log(`Putra ${process.pid} mendengarkan di port ${PORT}`);
    });
}