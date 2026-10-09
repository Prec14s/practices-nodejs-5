const { Worker } = require('worker_threads');
const path = require('path');

const status = {}; // menyimpan kondisi tiap pekerjaan

function jalankanJob(id, total) {
  return new Promise((resolve) => {
    status[id] = { state: 'menunggu', persen: 0, mulai: null, selesai: null };

    const worker = new Worker(path.join(__dirname, 'worker.js'), {
      workerData: { id, total },
    });

    worker.on('message', (msg) => {
      if (msg.type === 'start') {
        status[id].state = 'berjalan';
        status[id].mulai = Date.now();
      } else if (msg.type === 'progress') {
        status[id].persen = msg.persen;
      } else if (msg.type === 'done') {
        status[id].state = 'selesai';
        status[id].persen = 100;
        status[id].selesai = Date.now();
      }
    });

    worker.on('error', (err) => {
      status[id].state = 'gagal';
      status[id].error = err.message;
      resolve();
    });

    worker.on('exit', () => resolve());
  });
}

// Tampilkan status berkala
const monitor = setInterval(() => {
  console.clear();
  console.log('=== MONITOR PEKERJAAN ===');
  for (const [id, s] of Object.entries(status)) {
    const bar = '#'.repeat(s.persen / 10).padEnd(10, '-');
    console.log(`Job ${id}: [${bar}] ${s.persen}% - ${s.state}`);
  }
}, 300);

async function main() {
  await Promise.all([
    jalankanJob(1, 200_000_000),
    jalankanJob(2, 300_000_000),
    jalankanJob(3, 300_000_000),
  ]);

  clearInterval(monitor);
  console.log('\nSemua pekerjaan selesai.');
  for (const [id, s] of Object.entries(status)) {
    console.log(`Job ${id}: ${s.state}, durasi ${s.selesai - s.mulai} ms`);
  }
}

main();