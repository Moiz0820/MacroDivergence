import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-6 px-4 font-mono text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <div className="font-bold text-black uppercase">
            MACRODIVERGENCE WORKING PAPER SERIES // EDITION 2026
          </div>
          <p className="text-[11px] text-zinc-500 font-sans">
            Engineered by Moiz Anwar • Empirical data sourced from World Bank Open Development Indicators API.
          </p>
        </div>

        <div className="flex items-center gap-4 text-zinc-600">
          <a
            href="https://github.com/Moiz0820"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black underline"
          >
            GitHub: Moiz0820
          </a>
          <span>•</span>
          <a
            href="https://data.worldbank.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black underline"
          >
            World Bank Open Data
          </a>
        </div>
      </div>
    </footer>
  );
}
