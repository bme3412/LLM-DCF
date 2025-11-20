import { TranscriptInsight } from "@/types";

export const transcriptInsights: TranscriptInsight[] = [
  {
    segmentId: "search-ads",
    component: "AI Overviews",
    summary:
      "AI Overviews now touch 1B+ queries per month and lifted commercial queries by mid-single digits as merchants adopt new ad formats.",
    metrics: [
      { label: "Covered queries", value: "1B+/mo" },
      { label: "Merchant adoption", value: "70% of top retailers" },
    ],
    source: "GOOGL Q3 FY25 earnings call",
  },
  {
    segmentId: "search-ads",
    component: "Performance Max",
    summary:
      "Performance Max campaigns grew 35% with AI creative tools improving ROAS by 18% for omnichannel advertisers.",
    metrics: [
      { label: "PMax spend", value: "+35% YoY" },
      { label: "ROAS uplift", value: "+18%" },
    ],
    source: "GOOGL Q3 FY25 earnings call",
  },
  {
    segmentId: "youtube",
    component: "Shorts monetization",
    summary:
      "Shorts watch time jumped 75% YoY and ad revenue crossed a $20B run-rate as Shopping and AI-powered creative roll out globally.",
    metrics: [
      { label: "Shorts watch time", value: "+75% YoY" },
      { label: "Ad run-rate", value: "$20B+" },
    ],
    source: "GOOGL Q3 FY25 earnings call",
  },
  {
    segmentId: "youtube",
    component: "YouTube TV",
    summary:
      "YouTube TV surpassed 10M subs with Sunday Ticket driving engagement; churn remained below pay-TV averages.",
    metrics: [
      { label: "Subscribers", value: "10M+" },
      { label: "Churn", value: "<3%" },
    ],
    source: "GOOGL Q3 FY25 earnings call",
  },
  {
    segmentId: "google-cloud",
    component: "Vertex AI",
    summary:
      "Vertex AI revenue doubled YoY as 60% of top platform customers deploy Gemini models across data analytics and agents.",
    metrics: [
      { label: "Vertex growth", value: "2x" },
      { label: "Gemini adoption", value: "60% of top customers" },
    ],
    source: "GOOGL Q3 FY25 earnings call",
  },
  {
    segmentId: "google-cloud",
    component: "Workspace AI",
    summary:
      "Workspace MAU reached 3.7B with 1M+ paid Gemini for Workspace seats driving upsell into enterprise tiers.",
    metrics: [
      { label: "Gemini seats", value: "1M+" },
      { label: "Workspace MAU", value: "3.7B" },
    ],
    source: "GOOGL Q3 FY25 earnings call",
  },
  {
    segmentId: "hardware",
    component: "Pixel Devices",
    summary:
      "Pixel shipments grew 30% YoY as Tensor G4 enables on-device Gemini Nano; Pixel Fold expanded to five new markets.",
    metrics: [
      { label: "Pixel shipment growth", value: "+30%" },
      { label: "Markets", value: "25" },
    ],
    source: "GOOGL Q3 FY25 earnings call",
  },
  {
    segmentId: "other-bets",
    component: "Waymo",
    summary:
      "Waymo operates 25M cumulative autonomous miles with Phoenix and LA generating positive contribution margins on pilot routes.",
    metrics: [
      { label: "Autonomous miles", value: "25M" },
      { label: "Cities", value: "Phoenix + LA" },
    ],
    source: "GOOGL Q3 FY25 earnings call",
  },
  {
    segmentId: "search-ads",
    component: "Record Search revenue",
    summary:
      "Google Search & other delivered $56.6B in Q3 FY25 revenue (+15% YoY) as AI Overviews and AI Mode drove incremental query growth.",
    metrics: [
      { label: "Q3 FY25 Search revenue", value: "$56.6B" },
      { label: "YoY growth", value: "+15%" },
    ],
    source: "Alphabet Q3 FY2025 earnings release",
  },
  {
    segmentId: "youtube",
    component: "YouTube ads momentum",
    summary:
      "YouTube ads revenue reached $10.3B in Q3 FY25 (+15% YoY), led by direct response strength, Shorts engagement, and NFL Sunday Ticket.",
    metrics: [
      { label: "Q3 FY25 YouTube ads", value: "$10.3B" },
      { label: "YoY growth", value: "+15%" },
    ],
    source: "Alphabet Q3 FY2025 earnings release",
  },
  {
    segmentId: "google-cloud",
    component: "Cloud acceleration",
    summary:
      "Google Cloud revenue climbed to $15.2B in Q3 FY25 (+34% YoY) with backlog surging to $155B on enterprise AI demand.",
    metrics: [
      { label: "Q3 FY25 Cloud revenue", value: "$15.2B" },
      { label: "Cloud backlog", value: "$155B" },
    ],
    source: "Alphabet Q3 FY2025 earnings release",
  },
  {
    segmentId: "hardware",
    component: "Subscriptions scale",
    summary:
      "Google subscriptions, platforms, and devices generated $12.9B in Q3 FY25 (+21% YoY) while paid subs surpassed 300M led by Google One and YouTube Premium.",
    metrics: [
      { label: "Q3 FY25 subs revenue", value: "$12.9B" },
      { label: "Paid subscriptions", value: "300M+" },
    ],
    source: "Alphabet Q3 FY2025 earnings release",
  },
  {
    segmentId: "other-bets",
    component: "Capex outlook",
    summary:
      "Alphabet now plans $91B–$93B in 2025 capex (up from $85B) to meet AI infrastructure demand, with further increases expected in 2026.",
    metrics: [
      { label: "2025 capex guide", value: "$91–$93B" },
      { label: "2026 view", value: "Capex to increase meaningfully" },
    ],
    source: "Alphabet Q3 FY2025 earnings release",
  },
];
