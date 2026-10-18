// src/components/DiskonKonsonan.jsx
import { useState } from 'react';
import './DiskonKonsonan.css';

const formatRupiah = (angka) => 'Rp ' + angka.toLocaleString('id-ID');

const DiskonKonsonan = () => {
  const [harga, setHarga] = useState('');
  const [nama, setNama] = useState('');
  const [hasil, setHasil] = useState(null);
  const [error, setError] = useState('');

  const handleHitung = (e) => {
    e.preventDefault();

    const hargaVal = parseFloat(harga);

    // Validasi input
    if (isNaN(hargaVal) || hargaVal <= 0 || !nama.trim()) {
      setHasil(null);
      setError('Total harga harus lebih dari 0 dan nama pelanggan wajib diisi!');
      return;
    }
    setError('');

    // Hitung jumlah huruf konsonan (huruf selain a, e, i, o, u; spasi dan simbol diabaikan)
    const vokal = ['a', 'e', 'i', 'o', 'u'];
    let jumlahKonsonan = 0;
    for (const char of nama.toLowerCase()) {
      if (/[a-z]/.test(char) && !vokal.includes(char)) {
        jumlahKonsonan++;
      }
    }

    // Hitung jumlah kata (dipisahkan spasi)
    const jumlahKata = nama.trim().split(/\s+/).length;

    // Hitung persentase diskon
    let persenDiskon = jumlahKonsonan * 2; // 2% per huruf konsonan
    if (jumlahKata > 2) {
      persenDiskon += 5; // bonus jika lebih dari 2 kata
    }
    if (persenDiskon > 20) {
      persenDiskon = 20; // maksimal 20%
    }

    const totalPotongan = (hargaVal * persenDiskon) / 100;
    const hargaAkhir = hargaVal - totalPotongan;

    setHasil({
      jumlahKonsonan,
      jumlahKata,
      persenDiskon,
      totalPotongan,
      hargaAkhir,
    });
  };

  return (
    <div className="container">
      <h2>Program Diskon Huruf Konsonan</h2>
      <form onSubmit={handleHitung} className="form">
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

        <button type="submit" className="button">Hitung Diskon</button>
      </form>

      {error && <p className="error">{error}</p>}

      {hasil && (
        <div className="result">
          <p><strong>Jumlah Huruf Konsonan:</strong> {hasil.jumlahKonsonan}</p>
          <p><strong>Jumlah Kata:</strong> {hasil.jumlahKata}</p>
          <p><strong>Persentase Diskon:</strong> {hasil.persenDiskon}%</p>
          <p><strong>Total Potongan Harga:</strong> {formatRupiah(hasil.totalPotongan)}</p>
          <p><strong>Harga Setelah Diskon:</strong> {formatRupiah(hasil.hargaAkhir)}</p>
        </div>
      )}
    </div>
  );
};

export default DiskonKonsonan;