// src/components/DiskonPalindrom.jsx
import { useState } from 'react';
import './DiskonPalindrom.css';

const formatRupiah = (angka) => 'Rp ' + angka.toLocaleString('id-ID');

const DiskonPalindrom = () => {
  const [harga, setHarga] = useState('');
  const [nama, setNama] = useState('');
  const [hasil, setHasil] = useState(null);
  const [error, setError] = useState('');

  const handleCek = (e) => {
    e.preventDefault();

    const hargaVal = parseFloat(harga);

    // Validasi input
    if (isNaN(hargaVal) || hargaVal <= 0 || !nama.trim()) {
      setHasil(null);
      setError('Total harga harus lebih dari 0 dan nama pelanggan wajib diisi!');
      return;
    }
    setError('');

    // Abaikan spasi dan perbedaan huruf besar/kecil
    const bersih = nama.replace(/\s+/g, '').toLowerCase();
    const terbalik = bersih.split('').reverse().join('');

    // Palindrom jika sama dibaca terbalik dan minimal 3 karakter
    const isPalindrom = bersih.length >= 3 && bersih === terbalik;

    // Jumlah karakter unik (karakter yang sama tidak dihitung dua kali)
    const jumlahUnik = new Set(bersih).size;

    // Hitung persentase diskon
    const persenDiskon = isPalindrom ? 25 : jumlahUnik * 1;

    const totalPotongan = (hargaVal * persenDiskon) / 100;
    const hargaAkhir = hargaVal - totalPotongan;

    setHasil({
      status: isPalindrom ? 'Palindrom' : 'Bukan Palindrom',
      jumlahUnik,
      persenDiskon,
      hargaAkhir,
      totalPotongan,
    });
  };

  return (
    <div className="container">
      <h2>Program Diskon Palindrom Nama</h2>
      <form onSubmit={handleCek} className="form">
        <label className="label">
          Total Harga Pembelian:
          <input
            type="number"
            className="input"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            placeholder="Contoh: 100000"
          />
        </label>

        <label className="label">
          Nama Pelanggan:
          <input
            type="text"
            className="input"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Contoh: Farhan Ghulam Azhar"
          />
        </label>

        <button type="submit" className="button">Cek &amp; Hitung</button>
      </form>

      {error && <p className="error">{error}</p>}

      {hasil && (
        <div className="result">
          <p><strong>Status Nama:</strong> {hasil.status}</p>
          <p><strong>Jumlah Karakter Unik:</strong> {hasil.jumlahUnik}</p>
          <p><strong>Persentase Diskon:</strong> {hasil.persenDiskon}%</p>
          <p><strong>Total Potongan Harga:</strong> {formatRupiah(hasil.totalPotongan)}</p>
          <p><strong>Harga Setelah Diskon:</strong> {formatRupiah(hasil.hargaAkhir)}</p>
        </div>
      )}
    </div>
  );
};

export default DiskonPalindrom;