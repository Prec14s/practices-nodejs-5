# practices-nodejs-5

Repository ini berisi materi praktik dan contoh implementasi mengenai **Stream, Child Process, Cluster, dan Worker Threads** di Node.js (MySkill Backend Node.js Chapter 5).

---

## 📁 Struktur Folder dan Penjelasan File

```
be-nodejs5-myskill/
└── 5.stream-threads/
    ├── 1_readable-stream.js
    ├── 2_writeable-stream.js
    ├── 3_cluster_example.js
    ├── 4_child-exec.js
    ├── 4_child-spawn.js
    ├── example.txt
    ├── output.txt
    └── worker/
        ├── child-worker.js
        ├── main.js
        └── worker.js
```

### 📄 Penjelasan Berkas:

#### **`5.stream-threads/`**
1. **`1_readable-stream.js`**
   - Mengimplementasikan `Readable` stream kustom menggunakan modul `stream` bawaan Node.js.
   - Membaca data dari file `example.txt` secara bertahap dan memicu event `data`, `end`, serta `error`.

2. **`2_writeable-stream.js`**
   - Mengimplementasikan `Writable` stream kustom untuk menulis data ke `output.txt`.
   - Menghubungkan `Readable` stream dengan `Writable` stream menggunakan metode `.pipe()`.

3. **`3_cluster_example.js`**
   - Menggunakan modul `cluster` bawaan Node.js untuk memanfaatkan seluruh core CPU.
   - Membuat HTTP Server yang berjalan secara terdistribusi di setiap worker process (forking) dengan auto-restart jika worker terhenti.

4. **`4_child-exec.js`**
   - Menggunakan `child_process.exec()` untuk menjalankan perintah shell (contoh: `node --version`) dan menampung outputnya dalam buffer (`stdout`, `stderr`).

5. **`4_child-spawn.js`**
   - Menggunakan `child_process.spawn()` untuk mengeksekusi perintah CLI (contoh: `ls -la`) dengan streaming data secara *real-time* via event `data`.

6. **`example.txt`**
   - File teks sampel yang digunakan sebagai input data untuk percobaan readable stream.

7. **`output.txt`**
   - File teks hasil output yang ditulis oleh writable stream.

#### **`5.stream-threads/worker/`**
1. **`main.js`**
   - Script utama (Main Thread) yang mengelola dan memantau beberapa *Worker Thread* secara parallel menggunakan modul `worker_threads`.
   - Menampilkan indikator progress bar di terminal dan mengukur durasi pengerjaan setiap job.

2. **`worker.js`**
   - Script yang dijalankan di dalam worker thread terpisah. Melakukan kalkulasi berat (*CPU-intensive*) tanpa memblokir Main Thread (Event Loop) dan melaporkan progress ke main thread via `parentPort`.

3. **`child-worker.js`**
   - Contoh skrip pemantauan penggunaan memori (`process.memoryUsage()`) dan CPU (`process.cpuUsage()`) yang dikirimkan melalui IPC / messaging.

---

## 🚀 Cara Menjalankan

### 1. Menjalankan Stream Example
```bash
node 5.stream-threads/1_readable-stream.js
node 5.stream-threads/2_writeable-stream.js
```

### 2. Menjalankan Cluster
```bash
node 5.stream-threads/3_cluster_example.js
```

### 3. Menjalankan Child Process
```bash
node 5.stream-threads/4_child-exec.js
node 5.stream-threads/4_child-spawn.js
```

### 4. Menjalankan Worker Threads
```bash
node 5.stream-threads/worker/main.js
```
