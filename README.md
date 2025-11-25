# Interactive Multi-Company DCF Dashboard

An advanced, interactive Discounted Cash Flow (DCF) valuation dashboard built with Next.js 16 and React 19. This application provides real-time financial modeling, revenue projections, and investment recommendations for major tech companies, powered by AI-generated insights.

## Features

- **Multi-Company Support**: comprehensive valuation models for AAPL, AMD, AMZN, GOOGL, META, MSFT, NFLX, and NVDA.
- **Interactive DCF Calculator**: Real-time updates to Enterprise Value, Fair Value, and Implied Upside based on adjustable inputs (WACC, Terminal Growth).
- **Dynamic Revenue Projections**:
  - Detailed segment-by-segment breakdown.
  - Adjustable growth rates (CAGR) for individual business segments.
  - Visual impact analysis of growth assumptions.
- **Sensitivity Analysis**: Matrix view of Fair Value sensitivity to WACC and Terminal Growth variations.
- **AI-Powered Insights**: Integrated Anthropic Claude API to generate bespoke, analyst-grade investment commentary based on your specific model inputs.
- **Executive Summary**: High-level overview of valuation metrics and key drivers.
- **Responsive Design**: Modern, clean UI built with Tailwind CSS and Shadcn/UI.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/), [Shadcn/UI](https://ui.shadcn.com/) (Radix UI)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charting**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [Anthropic API](https://www.anthropic.com/api) (Claude Sonnet)


## 📊 Usage

1.  **Select a Company**: Choose a ticker (e.g., MSFT) to load its financial data.
2.  **Adjust Assumptions**:
    - Use the **Revenue Projections** tab to tweak growth rates for specific segments (e.g., "Intelligent Cloud").
    - Use the sliders in the **DCF Calculator** to adjust WACC and Terminal Growth.
3.  **Analyze Results**:
    - View the updated **Fair Value** and **Implied Upside** in real-time.
    - Check the **Sensitivity Analysis** to see how robust your valuation is.
    - Read the **Investment Recommendation** for an AI-generated summary of your unique scenario.
