// di dalam worker.js / child-worker.js
setInterval(() => {
  const mem = process.memoryUsage();
  const cpu = process.cpuUsage();
  parentPort.postMessage({  // untuk child process: process.send({...})
    type: 'stats',
    heapMB: (mem.heapUsed / 1024 / 1024).toFixed(1),
    cpuMs: ((cpu.user + cpu.system) / 1000).toFixed(0),
  });
}, 1000);