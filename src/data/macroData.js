export const COUNTRIES = [
  { code: 'ARE', name: 'United Arab Emirates', region: 'Middle East', income: 'High income' },
  { code: 'USA', name: 'United States', region: 'North America', income: 'High income' },
  { code: 'GBR', name: 'United Kingdom', region: 'Europe', income: 'High income' },
  { code: 'SGP', name: 'Singapore', region: 'East Asia & Pacific', income: 'High income' },
  { code: 'CHN', name: 'China', region: 'East Asia & Pacific', income: 'Upper middle' },
  { code: 'IND', name: 'India', region: 'South Asia', income: 'Lower middle' },
  { code: 'DEU', name: 'Germany', region: 'Europe', income: 'High income' },
  { code: 'JPN', name: 'Japan', region: 'East Asia & Pacific', income: 'High income' },
];

export const INDICATORS = {
  gdp_growth: {
    id: 'NY.GDP.MKTP.KD.ZG',
    name: 'GDP Growth Rate (Annual %)',
    short: 'GDP Growth',
    unit: '%',
    baseline: {
      ARE: [3.4, 3.8, 3.1, 7.9, 3.6, 4.0],
      USA: [2.9, 2.3, -2.8, 5.9, 2.1, 2.8],
      GBR: [1.7, 1.6, -11.0, 7.5, 4.1, 0.4],
      SGP: [3.7, 1.1, -3.9, 8.9, 3.6, 1.2],
      CHN: [6.8, 6.0, 2.2, 8.4, 3.0, 5.2],
      IND: [6.5, 3.9, -5.8, 9.1, 7.2, 7.6],
      DEU: [1.1, 1.1, -3.7, 3.2, 1.8, -0.3],
      JPN: [0.6, -0.4, -4.5, 2.1, 1.0, 1.9],
    }
  },
  inflation: {
    id: 'FP.CPI.TOTL.ZG',
    name: 'Inflation Rate (Consumer Prices Annual %)',
    short: 'Inflation Rate',
    unit: '%',
    baseline: {
      ARE: [3.1, -1.9, -2.1, -0.1, 4.8, 1.6],
      USA: [2.4, 1.8, 1.2, 4.7, 8.0, 4.1],
      GBR: [2.5, 1.8, 0.9, 2.6, 9.1, 7.3],
      SGP: [0.4, 0.6, -0.2, 2.3, 6.1, 4.8],
      CHN: [2.1, 2.9, 2.5, 0.9, 2.0, 0.2],
      IND: [3.9, 3.7, 6.6, 5.1, 6.7, 5.7],
      DEU: [1.7, 1.4, 0.5, 3.1, 6.9, 5.9],
      JPN: [1.0, 0.5, 0.0, -0.2, 2.5, 3.3],
    }
  },
  trade_pct: {
    id: 'NE.TRD.GNFS.ZS',
    name: 'Trade Volume (% of GDP)',
    short: 'Trade Openness',
    unit: '% of GDP',
    baseline: {
      ARE: [175, 172, 168, 185, 192, 195],
      USA: [27, 26, 23, 25, 27, 26],
      GBR: [62, 63, 56, 58, 69, 66],
      SGP: [320, 319, 321, 338, 337, 330],
      CHN: [38, 36, 35, 37, 38, 37],
      IND: [43, 40, 37, 45, 49, 46],
      DEU: [88, 88, 81, 89, 100, 94],
      JPN: [37, 35, 31, 37, 47, 44],
    }
  },
  fdi_pct: {
    id: 'BX.KLT.DINV.WD.GD.ZS',
    name: 'Foreign Direct Investment Net Inflows (% of GDP)',
    short: 'FDI Inflows',
    unit: '% of GDP',
    baseline: {
      ARE: [2.9, 4.2, 5.5, 4.8, 4.5, 5.2],
      USA: [1.5, 1.2, 0.8, 1.8, 1.5, 1.4],
      GBR: [-1.2, 0.9, 6.5, -2.1, -1.8, 1.9],
      SGP: [24.1, 28.5, 22.8, 30.2, 31.5, 29.8],
      CHN: [1.7, 1.3, 1.5, 1.9, 1.0, 0.2],
      IND: [1.5, 1.8, 2.4, 1.4, 1.5, 0.8],
      DEU: [1.9, 1.7, 2.2, 1.2, 0.8, 0.6],
      JPN: [0.5, 0.8, 0.3, 0.5, 0.6, 0.5],
    }
  }
};

export const YEARS = ['2019', '2020', '2021', '2022', '2023', '2024'];

/**
 * Compute Pearson Correlation Coefficient (r) & OLS Linear Regression
 */
export function computeRegression(points) {
  const n = points.length;
  if (n < 2) return { r: 0, rSquared: 0, slope: 0, intercept: 0 };

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
    sumXY += p.x * p.y;
    sumX2 += p.x * p.x;
    sumY2 += p.y * p.y;
  }

  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  const r = denominator !== 0 ? (n * sumXY - sumX * sumY) / denominator : 0;

  const slope = (n * sumX2 - sumX * sumX) !== 0 ? (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX) : 0;
  const intercept = (sumY - slope * sumX) / n;

  return {
    r: Number(r.toFixed(3)),
    rSquared: Number((r * r).toFixed(3)),
    slope: Number(slope.toFixed(3)),
    intercept: Number(intercept.toFixed(3)),
  };
}
