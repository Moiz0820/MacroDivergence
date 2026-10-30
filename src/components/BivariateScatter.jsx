import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { COUNTRIES, computeRegression } from '../data/macroData';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function BivariateScatter({
  xIndicatorKey,
  yIndicatorKey,
  indicators,
  selectedYearIndex,
}) {
  const xConfig = indicators[xIndicatorKey];
  const yConfig = indicators[yIndicatorKey];

  // Prepare points for each country at selected year
  const rawPoints = COUNTRIES.map((c) => {
    const xVal = xConfig.baseline[c.code][selectedYearIndex];
    const yVal = yConfig.baseline[c.code][selectedYearIndex];
    return {
      x: xVal,
      y: yVal,
      country: c.name,
      code: c.code,
    };
  });

  const stats = computeRegression(rawPoints);

  // Generate regression line endpoints
  const xValues = rawPoints.map((p) => p.x);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);

  const regressionLine = [
    { x: minX, y: Number((stats.slope * minX + stats.intercept).toFixed(2)) },
    { x: maxX, y: Number((stats.slope * maxX + stats.intercept).toFixed(2)) },
  ];

  const chartData = {
    datasets: [
      {
        label: 'Country Coordinates',
        data: rawPoints,
        backgroundColor: '#09090b',
        borderColor: '#09090b',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: `OLS Fit (y = ${stats.slope}x + ${stats.intercept})`,
        data: regressionLine,
        type: 'line',
        borderColor: '#dc2626', // Crimson regression line
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
      },
    ],
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
          label: (context) => {
            const raw = context.raw;
            if (raw.country) {
              return ` ${raw.country} (${raw.code}): ${xConfig.short}=${raw.x}${xConfig.unit}, ${yConfig.short}=${raw.y}${yConfig.unit}`;
            }
            return ` Fit Line: ${raw.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: `${xConfig.name} (${xConfig.unit})`,
          font: { family: 'JetBrains Mono', size: 10, weight: 'bold' },
          color: '#52525b',
        },
        grid: { color: '#f4f4f5' },
        ticks: { font: { family: 'JetBrains Mono', size: 9 }, color: '#71717a' },
      },
      y: {
        title: {
          display: true,
          text: `${yConfig.name} (${yConfig.unit})`,
          font: { family: 'JetBrains Mono', size: 10, weight: 'bold' },
          color: '#52525b',
        },
        grid: { color: '#f4f4f5' },
        ticks: { font: { family: 'JetBrains Mono', size: 9 }, color: '#71717a' },
      },
    },
  };

  return (
    <div className="paper-card p-4 rounded-none font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-200 gap-2">
        <div>
          <span className="text-xs font-bold text-black uppercase tracking-wider block">
            BIVARIATE OLS SCATTER & REGRESSION
          </span>
          <span className="text-[10px] text-zinc-500">
            Empirical cross-national correlation analysis
          </span>
        </div>

        {/* Statistical metrics badge strip */}
        <div className="flex items-center gap-3 text-xs">
          <div className="border border-zinc-200 bg-zinc-50 px-2.5 py-1">
            <span className="text-zinc-500 text-[10px] mr-1">PEARSON r:</span>
            <span className={`font-bold ${Math.abs(stats.r) > 0.4 ? 'text-blue-700' : 'text-zinc-900'}`}>
              {stats.r}
            </span>
          </div>

          <div className="border border-zinc-200 bg-zinc-50 px-2.5 py-1">
            <span className="text-zinc-500 text-[10px] mr-1">R-SQUARED (R²):</span>
            <span className="font-bold text-black">{stats.rSquared}</span>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full mt-3">
        <Scatter data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
