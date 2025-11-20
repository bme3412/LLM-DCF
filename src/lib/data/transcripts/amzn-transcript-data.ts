import { TranscriptInsight } from "@/types";

export const transcriptInsights: TranscriptInsight[] = [
  {
    segmentId: "aws",
    component: "AI workloads",
    summary:
      "AWS revenue accelerated to 23% YoY as Bedrock and custom Trainium/Inferentia silicon unlocked 85% of top GenAI wins across regions.",
    metrics: [
      { label: "AWS revenue", value: "$109B run-rate" },
      { label: "GenAI backlog", value: "$25B" },
    ],
    source: "AMZN Q3 FY25 earnings call",
  },
  {
    segmentId: "aws",
    component: "Migration pipeline",
    summary:
      "Over 400 enterprise workloads (notably UnitedHealth, Mercedes) moved to AWS this quarter, driving a record $150B RPO.",
    metrics: [
      { label: "Commercial RPO", value: "$150B" },
      { label: "Large migrations", value: "400+" },
    ],
    source: "AMZN Q3 FY25 earnings call",
  },
  {
    segmentId: "north-america",
    component: "Same-day network",
    summary:
      "40% of Prime orders in top metros now arrive same day; regionalized fulfillment cut per-unit cost by 20% YoY.",
    metrics: [
      { label: "Same-day penetration", value: "40%" },
      { label: "Cost per unit", value: "-20% YoY" },
    ],
    source: "AMZN Q3 FY25 earnings call",
  },
  {
    segmentId: "north-america",
    component: "Third-party mix",
    summary:
      "3P sellers reached 61% of unit mix with ad attach boosting blended take rate above 20%.",
    metrics: [
      { label: "3P unit mix", value: "61%" },
      { label: "Ad attach", value: ">70% of sellers" },
    ],
    source: "AMZN Q3 FY25 earnings call",
  },
  {
    segmentId: "international",
    component: "Emerging markets",
    summary:
      "India and Brazil revenue rose >25% constant currency with 12 new fulfillment centers supporting Prime expansion.",
    metrics: [
      { label: "Intl constant-currency", value: "+18%" },
      { label: "New FCs", value: "12" },
    ],
    source: "AMZN Q3 FY25 earnings call",
  },
  {
    segmentId: "advertising",
    component: "Prime Video ads",
    summary:
      "Prime Video ads launched in nine markets, adding a $5B run-rate and 8 pts to advertising growth.",
    metrics: [
      { label: "Ad revenue", value: "$55B run-rate" },
      { label: "Growth contribution", value: "+8 pts" },
    ],
    source: "AMZN Q3 FY25 earnings call",
  },
  {
    segmentId: "subscription",
    component: "Prime ARPU",
    summary:
      "Prime membership topped 270M with higher-priced tiers (Music HD, Grocery) lifting ARPU mid-single digits.",
    metrics: [
      { label: "Prime members", value: "270M" },
      { label: "ARPU", value: "+5% YoY" },
    ],
    source: "AMZN Q3 FY25 earnings call",
  },
  {
    segmentId: "aws",
    component: "Q3 AWS acceleration",
    summary:
      "AWS revenue reached $33.0B in Q3 FY25 (+20% YoY), its fastest growth since 2022, with operating income of $11.4B even after severance charges.",
    metrics: [
      { label: "Q3 FY25 AWS revenue", value: "$33.0B" },
      { label: "YoY growth", value: "+20%" },
    ],
    source: "Amazon Q3 FY2025 earnings release",
  },
  {
    segmentId: "advertising",
    component: "Retail media flywheel",
    summary:
      "Amazon Ads generated $17.7B in Q3 FY25 revenue (+22% YoY), with DSP, Prime Video, Netflix/Spotify partnerships, and live sports fueling demand.",
    metrics: [
      { label: "Q3 FY25 ads revenue", value: "$17.7B" },
      { label: "YoY growth", value: "+22%" },
    ],
    source: "Amazon Q3 FY2025 earnings release",
  },
  {
    segmentId: "north-america",
    component: "Record North America revenue",
    summary:
      "North America segment delivered $106.3B revenue (+11% YoY) despite $2.5B FTC settlement; excluding the charge, operating income would have been $7.3B (6.9% margin).",
    metrics: [
      { label: "Q3 FY25 NA revenue", value: "$106.3B" },
      { label: "Adj. operating margin", value: "6.9%" },
    ],
    source: "Amazon Q3 FY2025 earnings release",
  },
  {
    segmentId: "international",
    component: "International expansion",
    summary:
      "International revenue climbed to $40.9B (+14% YoY) with Flipkart ads at $2B run-rate and PhonePe TPV surpassing $1T.",
    metrics: [
      { label: "Q3 FY25 Intl. revenue", value: "$40.9B" },
      { label: "YoY growth (ex-FX)", value: "+10%" },
    ],
    source: "Amazon Q3 FY2025 earnings release",
  },
  {
    segmentId: "subscription",
    component: "Rufus & grocery engagement",
    summary:
      "250M customers used Rufus (AI shopping assistant) in 2025 with users 60% more likely to purchase; same-day perishable delivery now reaches 1,000+ U.S. cities with plans for 2,300+ by year-end.",
    metrics: [
      { label: "Rufus users", value: "250M in 2025" },
      { label: "Same-day grocery footprint", value: "1,000+ cities → 2,300+" },
    ],
    source: "Amazon Q3 FY2025 earnings release",
  },
];
