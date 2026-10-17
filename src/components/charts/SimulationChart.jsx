/**
 * Komponen Grafik Garis Simulasi Finansial - KitaInvest
 * Agent 5: Financial Engine & Chart.js
 * Domain: /src/components/charts/
 *
 * Mematuhi RULES.md Bagian 4.C:
 * - Grafik garis (Line Chart) dengan sumbu X = Bulan (0 s.d. N) dan sumbu Y = Rupiah.
 * - Menampilkan 3 garis sekaligus dengan legenda jelas:
 *   1. Akumulasi Dana (Modal Sendiri)
 *   2. Saldo Nominal (Modal + Pertumbuhan Majemuk)
 *   3. Daya Beli (Daya Beli setelah terdiskon inflasi)
 * - Responsif di layar laptop dan ponsel.
 */

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatRupiah } from '../../engine/calculator.js';

// Registrasi modul Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function SimulationChart({
  monthlyData = [],
  targetDana = 0,
  namaTujuan = 'Rencana Dana',
}) {
  if (!monthlyData || monthlyData.length === 0) {
    return (
      <div className="chart-empty-state">
        <p>Data simulasi tidak tersedia. Silakan masukkan parameter rencana dana.</p>
      </div>
    );
  }

  // Label Sumbu X: Bulan 0, Bulan 1, ... Bulan N
  const labels = monthlyData.map((d) => `Bln ${d.bulan}`);

  const datasets = [
    {
      label: 'Saldo Nominal (Modal + Imbal Hasil)',
      data: monthlyData.map((d) => d.saldoNominal),
      borderColor: '#65D61E', // Neon Lime KitaInvest
      backgroundColor: 'rgba(101, 214, 30, 0.14)',
      borderWidth: 3,
      pointRadius: monthlyData.length > 36 ? 0 : 2,
      pointHoverRadius: 6,
      tension: 0.2,
      fill: true,
    },
    {
      label: 'Akumulasi Modal (Uang Setoran Sendiri)',
      data: monthlyData.map((d) => d.akumulasiModal),
      borderColor: '#3B82F6', // Vibrant Blue
      backgroundColor: 'rgba(59, 130, 246, 0.06)',
      borderWidth: 2.5,
      borderDash: [5, 5],
      pointRadius: monthlyData.length > 36 ? 0 : 2,
      pointHoverRadius: 5,
      tension: 0,
      fill: false,
    },
    {
      label: 'Daya Beli Riil (Terdiskon Inflasi)',
      data: monthlyData.map((d) => d.dayaBeli),
      borderColor: '#F59E0B', // Amber / Gold
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: monthlyData.length > 36 ? 0 : 2,
      pointHoverRadius: 5,
      tension: 0.2,
      fill: false,
    },
  ];

  // Garis Target Dana (Target Horizontal Guide jika target > 0)
  if (targetDana > 0) {
    datasets.push({
      label: `Target Sasaran (${formatRupiah(targetDana)})`,
      data: monthlyData.map(() => targetDana),
      borderColor: '#ef4444', // Merah
      borderWidth: 1.5,
      borderDash: [3, 3],
      pointRadius: 0,
      pointHoverRadius: 0,
      fill: false,
    });
  }

  const chartData = {
    labels,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 12,
        right: 8,
        top: 0,
        bottom: 0,
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          boxWidth: 16,
          boxHeight: 12,
          usePointStyle: false,
          color: '#334155',
          font: {
            family: 'system-ui, sans-serif',
            size: 12,
            weight: '600',
          },
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        titleColor: '#f8fafc',
        bodyColor: '#f8fafc',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 13,
          weight: '700',
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return ` ${label}: ${formatRupiah(value)}`;
          },
          afterBody: function (context) {
            const index = context[0].dataIndex;
            const item = monthlyData[index];
            if (!item) return [];
            const imbalHasil = Math.max(0, item.saldoNominal - item.akumulasiModal);
            return [
              `-------------------------`,
              `Tambahan Keuntungan: +${formatRupiah(imbalHasil)}`,
              `Faktor Pengurang Inflasi: ${item.faktorInflasi.toFixed(4)}x`,
            ];
          },
        },
      },
      title: {
        display: false,
        text: `Grafik Pertumbuhan: ${namaTujuan}`,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#f1f5f9',
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
          },
          maxTicksLimit: 12,
        },
        title: {
          display: true,
          text: 'Jangka Waktu (Bulan)',
          color: '#64748b',
          font: {
            size: 12,
            weight: '600',
          },
        },
      },
      y: {
        grid: {
          color: '#f1f5f9',
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
          },
          callback: function (val) {
            return formatRupiah(val);
          },
        },
        title: {
          display: true,
          text: 'Jumlah Dana (Rupiah)',
          color: '#64748b',
          font: {
            size: 12,
            weight: '600',
          },
        },
      },
    },
  };

  return (
    <div className="chart-canvas-wrapper" style={{ height: '360px', width: '100%', minWidth: 0, position: 'relative', paddingLeft: '12px', boxSizing: 'border-box' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default SimulationChart;
