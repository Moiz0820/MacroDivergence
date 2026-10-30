# MacroDivergence

An institutional-grade Cross-National Macroeconomic Regression & Empirical Analytics Terminal built with React 19, Tailwind CSS v4, and Chart.js, powered by official World Bank Development Indicators.

Live Application: https://moiz0820.github.io/MacroDivergence/

---

## Overview

MacroDivergence provides empirical researchers and economic analysts with real-time cross-country econometric modeling capabilities.

Adhering to a Swiss typographic broadsheet aesthetic, the application calculates Ordinary Least Squares (OLS) bivariate linear regressions, Pearson correlation coefficients, and longitudinal trajectories across advanced and emerging economies (United Arab Emirates, United States, United Kingdom, Singapore, China, India, Germany, Japan).

---

## Core Capabilities

- **Bivariate OLS Linear Regression**:
  - Dynamically plots any independent vs dependent indicator pairs (Inflation, GDP Growth, Trade % of GDP, FDI Inflows).
  - Computes real-time Pearson's correlation coefficient (r), coefficient of determination (R²), slope, and intercept.
  - Renders best-fit regression lines against cross-sectional country clusters.
- **Longitudinal Trend Trajectories**:
  - Multi-country time-series comparison (2019 – 2024).
  - Individual country toggles to isolate divergence and post-shock recovery paths.
- **Harmonized National Observation Dataset**:
  - Comprehensive empirical data table comparing global economies across key metrics.
  - 1-Click CSV dataset export formatted for statistical analysis in Python (Pandas/Statsmodels), R Studio, and Stata.
- **World Bank API Integration**:
  - Direct connection to World Bank National Accounts and Balance of Payments data pipelines.

---

## Architecture & Tech Stack

- **Framework**: React 19, Vite 8
- **Styling**: Tailwind CSS v4, Swiss Monochromatic Typographic Style
- **Statistical Visualization**: Chart.js, React-ChartJS-2 (Scatter & Line)
- **Data Source**: World Bank Open Development Indicators API

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Moiz0820/MacroDivergence.git

# Navigate into the project directory
cd MacroDivergence

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## Deployment

Configured for automated continuous deployment to GitHub Pages via GitHub Actions.

Live URL: https://moiz0820.github.io/MacroDivergence/

---

## Author

**Moiz Anwar**
- GitHub: [@Moiz0820](https://github.com/Moiz0820)
- Role: AI & Data Science Engineer / Business Data & Analytics Specialist
- Portfolio: https://github.com/Moiz0820/Portfolio
