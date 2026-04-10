# Hair Expert System

**Hair Expert System** adalah sistem pakar berbasis web yang dirancang untuk membantu pengguna melakukan diagnosis awal terhadap penyakit rambut dan kulit kepala. Sistem ini bekerja dengan pendekatan **rule-based reasoning** yang memanfaatkan _decision tree_ dan aturan logika **IF–THEN** untuk menghasilkan diagnosis beserta penjelasannya.

Sistem ini bersifat edukatif dan informatif, serta ditujukan sebagai alat bantu awal sebelum pengguna melakukan konsultasi langsung dengan tenaga medis profesional.

## Tujuan Sistem

Hair Expert System dikembangkan untuk:

- Memberikan diagnosis awal penyakit rambut dan kulit kepala
- Meningkatkan pemahaman pengguna terhadap gejala dan penyebab penyakit rambut
- Menyediakan rekomendasi penanganan awal berbasis literatur medis
- Menghadirkan sistem pakar yang transparan dan dapat dijelaskan (_explainable AI_)

## Konsep Sistem Pakar

Sistem ini dibangun berdasarkan tiga komponen utama sistem pakar:

1. **Knowledge Base** – Menyimpan pengetahuan penyakit rambut dan kulit kepala
2. **Inference Engine** – Mengambil keputusan diagnosis menggunakan aturan IF–THEN
3. **Explanation Facility** – Menyediakan penjelasan diagnosis secara logis dan terstruktur

Pengetahuan yang digunakan dalam sistem mencakup **10 jenis penyakit rambut/kulit kepala**.

## Perancangan Knowledge Base

### Knowledge Acquisition

Pengetahuan diperoleh melalui metode **non-wawancara**, dengan sumber:

- Jurnal dermatologi
- Artikel ilmiah
- Panduan medis
- Referensi trichology
- Literatur pendukung lainnya

Domain Expert (DE) menyediakan materi berbasis literatur, kemudian Knowledge Engineer (KE) melakukan seleksi dan ekstraksi informasi utama berupa:

- Nama penyakit
- Penyebab
- Gejala
- Rekomendasi perawatan

### Knowledge Analysis & Representation

Pengetahuan yang telah dikumpulkan diolah menjadi representasi terstruktur melalui:

- Identifikasi kemiripan gejala dan penyebab
- Clustering penyakit
- Penentuan gejala kunci (key symptoms)
- Penyusunan pertanyaan diagnostik

Hasil analisis direpresentasikan dalam bentuk:

- Frame penyakit (disease, symptoms, causes, treatment)
- Clustering penyakit
- Aturan diagnosis IF–THEN

## Decision Tree & Rule Construction

### Decision Tree Construction

Decision tree digunakan untuk memandu alur pertanyaan sistem dengan tahapan:

- Penentuan gejala pembeda utama
- Penyusunan pertanyaan dari umum ke spesifik
- Pembentukan node pertanyaan, cabang, dan terminal
- Penyimpanan struktur decision tree dalam format JSON

### IF–THEN Rule Construction

Setiap node terminal pada decision tree diturunkan menjadi aturan IF–THEN, yang kemudian:

- Dipetakan ke data penyakit (`diseases.json`)
- Diverifikasi agar tidak tumpang tindih
- Dicek konsistensi logikanya

## Knowledge Validation

Proses validasi dilakukan dengan:

- Membandingkan rule dengan literatur medis
- Menghindari konflik antar aturan
- Memastikan seluruh jalur diagnosis valid

Sistem menghasilkan **14 jalur keputusan**, terdiri dari:

- **11 jalur diagnosis valid** (memiliki `disease_name`)
- **3 jalur fallback (unknown)** untuk kasus kombinasi gejala yang tidak sesuai

Jalur fallback ini dirancang sebagai mekanisme pengamanan agar pengguna diarahkan untuk konsultasi medis lanjutan.

## Desain Inferensi

Inferensi sistem menggunakan kombinasi:

- **Decision Tree**
- **Rule-based reasoning (IF–THEN)**

Alur inferensi:

1. Sistem menampilkan pertanyaan secara sekuensial
2. Jawaban pengguna menentukan node berikutnya
3. Node terminal mengeksekusi rule yang sesuai
4. Sistem menghasilkan diagnosis
5. Diagnosis dihubungkan dengan frame penyakit untuk menampilkan detail informasi

## Explanation & Justification

Sistem menyediakan penjelasan diagnosis secara **traceable**, meliputi:

- Penyakit yang teridentifikasi
- Gejala yang dipilih pengguna
- Penyebab penyakit
- Rekomendasi penanganan

Penjelasan ini langsung merujuk pada aturan IF–THEN yang digunakan oleh sistem.

## Perancangan Interface & Alur Sistem

### Landing Page

- Deskripsi singkat sistem
- Tombol **Mulai Test**
- Tombol **Video Demo**

### Halaman Test (Diagnosis)

- Pertanyaan ditampilkan satu per satu
- Jawaban berupa tombol (Ya/Tidak, Gatal/Rontok, dll.)
- Alur mengikuti decision tree

### Halaman Hasil

- Menampilkan hasil diagnosis
- Disertai **penafian medis (disclaimer)**
- Informasi detail penyakit:
  - Nama penyakit
  - Deskripsi singkat
  - Penyebab
  - Gejala khas
  - Rekomendasi penanganan

## Teknologi yang Digunakan

- Next.js (App Router)
- React
- Tailwind CSS
- Typescript
- Rule-based reasoning
- Decision Tree

## Disclaimer

Hair Expert System merupakan alat bantu diagnosis awal dan **bukan pengganti konsultasi medis profesional**. Pengguna disarankan untuk berkonsultasi dengan dokter spesialis kulit dan rambut untuk diagnosis dan penanganan lanjutan.
