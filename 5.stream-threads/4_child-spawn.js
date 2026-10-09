const { spawn } = require('child_process');

// Windows: ganti 'ls' dengan 'dir' dan tambahkan { shell: true }
const child = spawn('ls', ['-la']);

child.stdout.on('data', (data) => {
  console.log(`Output:\n${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`Error output: ${data}`);
});

child.on('error', (err) => {
  console.error('Gagal menjalankan proses:', err.message);
});

child.on('close', (code) => {
  console.log(`Proses selesai dengan kode ${code}`);
});