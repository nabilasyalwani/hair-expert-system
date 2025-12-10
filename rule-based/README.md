# Hair Expert System (Sistem Pakar Diagnosa Penyakit Rambut)

**Hair Expert System** adalah aplikasi sistem pakar berbasis pengetahuan yang dirancang untuk mendiagnosa penyakit rambut dan kulit kepala. 

Sistem ini menggunakan metode **Rule-Based Decision Tree** untuk menelusuri gejala yang dialami pengguna dan memberikan diagnosa, penyebab, serta rekomendasi pengobatan.

## Fitur 

* **Rule-Based Decision Tree:** Menggunakan logika pohon keputusan yang deterministik (White Box) untuk menentukan diagnosa.
* **Explanation Facility (XAI Sederhana):** Sistem tidak hanya memberikan hasil akhir, tetapi juga menampilkan **riwayat jawaban** pengguna ("Why this result?") untuk memvalidasi alasan di balik diagnosa.
* **Knowledge Base Terpisah:** Data penyakit dan logika percabangan disimpan dalam file JSON terpisah, sehingga mudah diedit tanpa mengubah kode program.
* **Informasi Lengkap:** Menampilkan Penyebab, Gejala, dan Rekomendasi Pengobatan (Farmakologi & Non-farmakologi).

## Struktur File

Proyek ini terdiri dari 3 file utama:

1.  `main-2.py`  
    **Inference Engine** (Mesin Pelacak). Script Python utama yang menjalankan logika penelusuran pohon keputusan dan interaksi dengan pengguna.
    
2.  `diseases.json`  
    **Knowledge Base** (Basis Pengetahuan). Berisi fakta detail tentang penyakit (nama, penyebab, gejala, pengobatan).
    
3.  `decision_tree.json`  
    **Decision Logic**. Berisi struktur pohon, pertanyaan, dan percabangan aturan (rules) yang digunakan sistem untuk navigasi diagnosa.

## Prasyarat

* Python 3.x terinstal di komputer.
* Tidak ada library eksternal (pip) yang dibutuhkan, hanya menggunakan modul bawaan `json`.

## Cara Menjalankan

1.  Pastikan ketiga file (`main-2.py`, `diseases.json`, `decision_tree.json`) berada dalam **satu folder yang sama**.
2.  Buka terminal atau CMD, arahkan ke folder tersebut.(masih pake CLI entar ganti bess)
3.  Jalankan perintah berikut:

```bash
python main-2.py
