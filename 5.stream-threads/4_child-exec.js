const { exec } = require('child_process');

exec('node --version', (err, stdout, stderr) => {
  if (err) {
    console.error('Error:', err.message);
    return;
  }
  if (stderr) console.error('Stderr:', stderr);
  console.log('Versi Node:', stdout.trim());
});