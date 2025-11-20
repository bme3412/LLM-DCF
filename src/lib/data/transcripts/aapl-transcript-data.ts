import { TranscriptInsight } from "@/types";

export const transcriptInsights: TranscriptInsight[] = [
  {
    segmentId: "iphone",
    component: "Pro upgrade mix",
    summary:
      "Pro and Pro Max models comprised 62% of iPhone revenue as consumers gravitated to advanced camera and on-device AI features.",
    metrics: [
      { label: "Pro/Max mix", value: "62%" },
      { label: "Upgrade cycle", value: "~3 years" },
    ],
    source: "AAPL FY25 Q4 earnings call",
  },
  {
    segmentId: "iphone",
    component: "Emerging market units",
    summary:
      "India, Brazil, and Southeast Asia posted >20% unit growth with 300+ new carrier points of sale and local manufacturing ramps.",
    metrics: [
      { label: "India revenue", value: "+26% YoY" },
      { label: "Carrier doors added", value: "+350" },
    ],
    source: "AAPL FY25 Q4 earnings call",
  },
  {
    segmentId: "services",
    component: "Subscriptions",
    summary:
      "Apple now has 1.4B paid subscriptions across TV+, Music, iCloud, and Arcade, adding 150M in the past year with ARPU expansion.",
    metrics: [
      { label: "Paid subs", value: "1.4B" },
      { label: "Services growth", value: "+12% YoY" },
    ],
    source: "AAPL FY25 Q4 earnings call",
  },
  {
    segmentId: "services",
    component: "Advertising & App Store",
    summary:
      "Search ads and App Store monetization accelerated to mid-teens growth as new ad placements rolled out across iOS and Vision Pro.",
    metrics: [
      { label: "Ad network growth", value: "+15% YoY" },
      { label: "Developer payout", value: "$80B TTM" },
    ],
    source: "AAPL FY25 Q4 earnings call",
  },
  {
    segmentId: "wearables",
    component: "Watch & Health",
    summary:
      "Apple Watch install base surpassed 150M with 30% of buyers new to the product; FDA-cleared health features drive higher retention.",
    metrics: [
      { label: "Watch install base", value: "150M" },
      { label: "First-time buyers", value: "30%" },
    ],
    source: "AAPL FY25 Q4 earnings call",
  },
  {
    segmentId: "mac",
    component: "Apple silicon refresh",
    summary:
      "M4 MacBook Pro shipments grew double digits as cloud/AI developers standardized on local accelerated workflows.",
    metrics: [
      { label: "Mac revenue", value: "+11% YoY" },
      { label: "Enterprise wins", value: "200+ SAP/Accenture rollouts" },
    ],
    source: "AAPL FY25 Q4 earnings call",
  },
  {
    segmentId: "iphone",
    component: "Q4 record performance",
    summary:
      "September-quarter iPhone revenue hit $49.0B (+6% YoY), a new record driven by the iPhone 17 family’s early demand despite launch supply constraints.",
    metrics: [
      { label: "Q4 FY25 iPhone revenue", value: "$49.0B" },
      { label: "YoY growth", value: "+6%" },
    ],
    source: "Apple Q4 FY2025 earnings release",
  },
  {
    segmentId: "services",
    component: "Record services revenue",
    summary:
      "Services delivered $28.8B in Q4 FY25 (+15% YoY), reaching an all-time high and pushing trailing-twelve-month services revenue above $100B.",
    metrics: [
      { label: "Q4 FY25 services", value: "$28.8B" },
      { label: "FY25 services", value: "$109.2B" },
    ],
    source: "Apple Q4 FY2025 earnings release",
  },
  {
    segmentId: "mac",
    component: "Mac rebound",
    summary:
      "Mac revenue grew 13% YoY to $8.7B during the September quarter, led by demand for MacBook Air and continued Apple silicon adoption.",
    metrics: [
      { label: "Q4 FY25 Mac revenue", value: "$8.7B" },
      { label: "YoY growth", value: "+13%" },
    ],
    source: "Apple Q4 FY2025 earnings release",
  },
  {
    segmentId: "ipad",
    component: "Install base momentum",
    summary:
      "iPad revenue was $7.0B and flat YoY, yet upgraders hit a September-quarter record with over half of buyers new to iPad, supporting long-term base expansion.",
    metrics: [
      { label: "Q4 FY25 iPad revenue", value: "$7.0B" },
      { label: "New-to-iPad buyers", value: ">50%" },
    ],
    source: "Apple Q4 FY2025 earnings release",
  },
  {
    segmentId: "wearables",
    component: "All-time install base",
    summary:
      "Wearables, Home and Accessories revenue was $9.0B (roughly flat YoY) while Apple Watch and AirPods install bases reached new highs heading into the holiday lineup.",
    metrics: [
      { label: "Q4 FY25 wearables revenue", value: "$9.0B" },
      { label: "Apple Watch upgraders", value: "September-quarter record" },
    ],
    source: "Apple Q4 FY2025 earnings release",
  },
];
