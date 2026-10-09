const fs = require('fs');
const { Readable, Writable } = require('stream');

// ===== Readable stream (dari kode sebelumnya) =====
const readableStream = new Readable({ encoding: 'utf-8' });
const filePath = 'example.txt';
let hasRead = false;

readableStream._read = function () {
  if (hasRead) return;
  hasRead = true;

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      this.emit('error', err);
    } else {
      this.push(data);
      this.push(null); // tandai stream selesai
    }
  });
};

// ===== Writable stream =====
const outputPath = 'output.txt';

const writableStream = new Writable({ decodeStrings: false });

writableStream._write = function (chunk, encoding, callback) {
  fs.appendFile(outputPath, chunk, (err) => {
    if (err) {
      return callback(err); // kirim error ke stream
    }
    callback(); // beri tahu stream bahwa chunk ini selesai ditulis
  });
};

// ===== Event listener =====
writableStream.on('finish', () => {
  console.log('Semua data selesai ditulis ke', outputPath);
});

writableStream.on('error', (err) => {
  console.error('Error saat menulis:', err.message);
});

readableStream.on('error', (err) => {
  console.error('Error saat membaca:', err.message);
});

// ===== Hubungkan: baca example.txt -> tulis ke output.txt =====
readableStream.pipe(writableStream);