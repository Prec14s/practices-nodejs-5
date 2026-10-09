const { parentPort, workerData } = require('worker_threads');

const { id, total } = workerData;

parentPort.postMessage({ type: 'start', id });

let jumlah = 0;
for (let i = 1; i <= total; i++) {
  jumlah += Math.sqrt(i); // pekerjaan berat

  // Laporkan progress setiap 10%
  if (i % (total / 10) === 0) {
    parentPort.postMessage({
      type: 'progress',
      id,
      persen: Math.round((i / total) * 100),
    });
  }
}

parentPort.postMessage({ type: 'done', id, hasil: jumlah });