import React from 'react';
import { COUNTRIES, INDICATORS, YEARS } from '../data/macroData';

export default function DataTable({ selectedYearIndex }) {
  const selectedYear = YEARS[selectedYearIndex];

  const handleExportCSV = () => {
    const headers = [
      'CountryCode',
      'CountryName',
      'Region',
      'IncomeGroup',
      'Year',
      'GDPGrowthPercent',
      'InflationPercent',
      'TradeVolumePctGDP',
      'FDIInflowsPctGDP',
    ];

    const rows = COUNTRIES.map((c) => [
      c.code,
      `"${c.name}"`,
      `"${c.region}"`,
      `"${c.income}"`,
      selectedYear,
      INDICATORS.gdp_growth.baseline[c.code][selectedYearIndex],
      INDICATORS.inflation.baseline[c.code][selectedYearIndex],
      INDICATORS.trade_pct.baseline[c.code][selectedYearIndex],
      INDICATORS.fdi_pct.baseline[c.code][selectedYearIndex],
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `WorldBank_MacroDivergence_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="paper-card p-4 rounded-none font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-200 gap-2">
        <div>
          <span className="text-xs font-bold text-black uppercase tracking-wider block">
            CROSS-NATIONAL EMPIRICAL OBSERVATION TABLE ({selectedYear})
          </span>
          <span className="text-[10px] text-zinc-500">
            Harmonized World Bank National Accounts and Balance of Payments data
          </span>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3 py-1 bg-black text-white hover:bg-zinc-800 border border-black text-xs font-bold transition-colors cursor-pointer"
        >
          EXPORT DATASET (CSV)
        </button>
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-600 text-left">
              <th className="py-2.5 px-3">ECONOMY</th>
              <th className="py-2.5 px-3">REGION</th>
              <th className="py-2.5 px-3 text-right">GDP GROWTH (%)</th>
              <th className="py-2.5 px-3 text-right">INFLATION (%)</th>
              <th className="py-2.5 px-3 text-right">TRADE (% GDP)</th>
              <th className="py-2.5 px-3 text-right">FDI INFLOWS (%)</th>
            </tr>
          </thead>
          <tbody>
            {COUNTRIES.map((c) => {
              const gdp = INDICATORS.gdp_growth.baseline[c.code][selectedYearIndex];
              const inf = INDICATORS.inflation.baseline[c.code][selectedYearIndex];
              const trade = INDICATORS.trade_pct.baseline[c.code][selectedYearIndex];
              const fdi = INDICATORS.fdi_pct.baseline[c.code][selectedYearIndex];

              return (
                <tr key={c.code} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                  <td className="py-2 px-3 font-bold text-zinc-900">
                    {c.name} <span className="text-zinc-400 font-normal">({c.code})</span>
                  </td>
                  <td className="py-2 px-3 text-zinc-500 text-[11px]">{c.region}</td>
                  <td className={`py-2 px-3 text-right font-bold ${gdp >= 0 ? 'text-zinc-900' : 'text-red-700'}`}>
                    {gdp > 0 ? `+${gdp.toFixed(1)}%` : `${gdp.toFixed(1)}%`}
                  </td>
                  <td className="py-2 px-3 text-right text-zinc-800 font-medium">
                    {inf.toFixed(1)}%
                  </td>
                  <td className="py-2 px-3 text-right text-zinc-800 font-medium">
                    {trade}%
                  </td>
                  <td className="py-2 px-3 text-right text-zinc-800 font-medium">
                    {fdi > 0 ? `+${fdi.toFixed(1)}%` : `${fdi.toFixed(1)}%`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
