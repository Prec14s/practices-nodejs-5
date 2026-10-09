const fs = require('fs');
const { Readable } = require('stream');

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

// Consumer
readableStream.on('data', (chunk) => {
  console.log('Data diterima:', chunk);
});

readableStream.on('end', () => {
  console.log('Selesai membaca file');
});

readableStream.on('error', (err) => {
  console.error('Terjadi error:', err.message);
});

// start reading proses streams

readableStream.read()