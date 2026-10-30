import React, { useState, useEffect } from 'react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUtcTime = (date) => {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  };

  return (
    <header className="border-b border-zinc-200 bg-white py-3 px-4 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-baseline justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-black text-sm tracking-widest uppercase">
              MACRODIVERGENCE
            </span>
            <span className="text-[10px] bg-zinc-100 text-zinc-800 border border-zinc-300 px-1.5 py-0.2 font-semibold">
              WORLD BANK RESEARCH TERMINAL
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 font-sans mt-0.5">
            Cross-National Bivariate Regression & Empirical Economic Divergence Engine
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-zinc-600">
          <span>DATASET: WORLD BANK (WBG)</span>
          <span>|</span>
          <span>TIMESTAMP: {formatUtcTime(time)} UTC</span>
          <span>|</span>
          <a
            href="https://github.com/Moiz0820"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-bold hover:underline"
          >
            AUTHOR: MOIZ ANWAR
          </a>
        </div>
      </div>
    </header>
  );
}
