import React, { useState } from 'react';
import Header from './components/Header';
import BivariateScatter from './components/BivariateScatter';
import TimeSeriesComparison from './components/TimeSeriesComparison';
import DataTable from './components/DataTable';
import Footer from './components/Footer';
import { INDICATORS, YEARS } from './data/macroData';

export default function App() {
  const [selectedYearIndex, setSelectedYearIndex] = useState(5); // 2024
  const [xIndicatorKey, setXIndicatorKey] = useState('inflation');
  const [yIndicatorKey, setYIndicatorKey] = useState('gdp_growth');
  const [timeSeriesIndicatorKey, setTimeSeriesIndicatorKey] = useState('gdp_growth');

  const selectedYear = YEARS[selectedYearIndex];

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-black selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 font-mono space-y-6">
        {/* Executive Research Abstract & Global Parameters */}
        <div className="paper-card p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-zinc-200">
            <div>
              <span className="text-xs font-bold text-black uppercase tracking-wider block">
                RESEARCH ABSTRACT & EMPIRICAL HYPOTHESIS
              </span>
              <p className="text-xs text-zinc-600 font-sans mt-1 leading-relaxed max-w-3xl">
                This terminal examines cross-country macroeconomic divergence across emerging and advanced economies (UAE, USA, Singapore, China, India, UK, Germany, Japan). By plotting bivariate linear regressions and longitudinal trajectories, it evaluates the elasticity of national GDP growth against inflation and foreign trade dependency.
              </p>
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-1.5 self-start lg:self-auto">
              <span className="text-xs font-bold text-zinc-500 mr-1">CROSS-SECTION YEAR:</span>
              <div className="flex border border-zinc-300">
                {YEARS.map((yr, idx) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYearIndex(idx)}
                    className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                      selectedYearIndex === idx
                        ? 'bg-black text-white'
                        : 'bg-white text-zinc-600 hover:bg-zinc-100'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Regression Variables Control Strip */}
          <div className="flex flex-wrap items-center gap-4 pt-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 font-bold">X-VARIABLE (INDEPENDENT):</span>
              <select
                value={xIndicatorKey}
                onChange={(e) => setXIndicatorKey(e.target.value)}
                className="paper-input px-2 py-1 border border-zinc-300 rounded-none bg-white font-mono cursor-pointer"
              >
                {Object.keys(INDICATORS).map((k) => (
                  <option key={k} value={k}>
                    {INDICATORS[k].name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-zinc-500 font-bold">Y-VARIABLE (DEPENDENT):</span>
              <select
                value={yIndicatorKey}
                onChange={(e) => setYIndicatorKey(e.target.value)}
                className="paper-input px-2 py-1 border border-zinc-300 rounded-none bg-white font-mono cursor-pointer"
              >
                {Object.keys(INDICATORS).map((k) => (
                  <option key={k} value={k}>
                    {INDICATORS[k].name}
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-zinc-500 font-bold">TIME-SERIES METRIC:</span>
              <select
                value={timeSeriesIndicatorKey}
                onChange={(e) => setTimeSeriesIndicatorKey(e.target.value)}
                className="paper-input px-2 py-1 border border-zinc-300 rounded-none bg-white font-mono cursor-pointer"
              >
                {Object.keys(INDICATORS).map((k) => (
                  <option key={k} value={k}>
                    {INDICATORS[k].short}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Analytical Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Bivariate Scatter & OLS Fit */}
          <BivariateScatter
            xIndicatorKey={xIndicatorKey}
            yIndicatorKey={yIndicatorKey}
            indicators={INDICATORS}
            selectedYearIndex={selectedYearIndex}
          />

          {/* Chart 2: Multi-Country Time Series Trajectory */}
          <TimeSeriesComparison
            indicatorKey={timeSeriesIndicatorKey}
            indicators={INDICATORS}
          />
        </div>

        {/* Observation Table with CSV Export */}
        <DataTable selectedYearIndex={selectedYearIndex} />
      </main>

      <Footer />
    </div>
  );
}
