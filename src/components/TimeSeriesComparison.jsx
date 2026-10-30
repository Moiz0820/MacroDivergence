import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { COUNTRIES, YEARS } from '../data/macroData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const COUNTRY_COLORS = {
  ARE: '#15803d', // Pine Green
  USA: '#1d4ed8', // Deep Blue
  GBR: '#b91c1c', // Crimson
  SGP: '#7c3aed', // Violet
  CHN: '#ea580c', // Orange
  IND: '#0891b2', // Cyan
  DEU: '#334155', // Slate
  JPN: '#ca8a04', // Gold
};

export default function TimeSeriesComparison({ indicatorKey, indicators }) {
  const [selectedCountries, setSelectedCountries] = useState(['ARE', 'USA', 'SGP', 'IND']);
  const indicator = indicators[indicatorKey];

  const toggleCountry = (code) => {
    if (selectedCountries.includes(code)) {
      if (selectedCountries.length > 1) {
        setSelectedCountries(selectedCountries.filter((c) => c !== code));
      }
    } else {
      setSelectedCountries([...selectedCountries, code]);
    }
  };

  const datasets = selectedCountries.map((code) => {
    const country = COUNTRIES.find((c) => c.code === code) || { name: code };
    const data = indicator.baseline[code] || [];
    const color = COUNTRY_COLORS[code] || '#09090b';

    return {
      label: `${country.name} (${code})`,
      data,
      borderColor: color,
      backgroundColor: color,
      borderWidth: 2,
      tension: 0.2,
      pointRadius: 3,
      pointHoverRadius: 6,
    };
  });

  const chartData = {
    labels: YEARS,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          font: { family: 'JetBrains Mono', size: 10 },
          color: '#52525b',
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: '#09090b',
        titleFont: { family: 'JetBrains Mono', size: 11 },
        bodyFont: { family: 'JetBrains Mono', size: 11 },
        callbacks: {
          label: (context) => ` ${context.dataset.label}: ${context.parsed.y} ${indicator.unit}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: '#f4f4f5' },
        ticks: { font: { family: 'JetBrains Mono', size: 10 }, color: '#71717a' },
      },
      y: {
        title: {
          display: true,
          text: `${indicator.name} (${indicator.unit})`,
          font: { family: 'JetBrains Mono', size: 10, weight: 'bold' },
          color: '#52525b',
        },
        grid: { color: '#f4f4f5' },
        ticks: { font: { family: 'JetBrains Mono', size: 10 }, color: '#71717a' },
      },
    },
  };

  return (
    <div className="paper-card p-4 rounded-none font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-200 gap-2">
        <div>
          <span className="text-xs font-bold text-black uppercase tracking-wider block">
            LONGITUDINAL TIME SERIES TRAJECTORY
          </span>
          <span className="text-[10px] text-zinc-500">
            Multi-country historical trend comparisons (2019 – 2024)
          </span>
        </div>

        {/* Quick Country Filters */}
        <div className="flex flex-wrap items-center gap-1">
          {COUNTRIES.map((c) => {
            const isSelected = selectedCountries.includes(c.code);
            return (
              <button
                key={c.code}
                onClick={() => toggleCountry(c.code)}
                className={`px-2 py-0.5 text-[10px] font-bold border transition-colors ${
                  isSelected
                    ? 'bg-black text-white border-black'
                    : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {c.code}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full mt-3">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
