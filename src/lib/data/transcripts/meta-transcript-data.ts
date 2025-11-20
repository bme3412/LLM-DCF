import { TranscriptInsight } from "@/types";

export const transcriptInsights: TranscriptInsight[] = [
  {
    segmentId: "family-ads",
    component: "Record FOA ads quarter",
    summary:
      "Advertising revenue reached $50.1B in Q3 FY25 (+26% YoY) as ad impressions grew 14% and average price per ad rose 10% with 3.54B daily actives.",
    metrics: [
      { label: "Q3 FY25 ad revenue", value: "$50.1B" },
      { label: "Ad impressions", value: "+14% YoY" },
      { label: "Avg price per ad", value: "+10% YoY" },
    ],
    source: "Meta Platforms Q3 FY2025 results release",
  },
  {
    segmentId: "family-ads",
    component: "Reels & AI ranking lift",
    summary:
      "Video time spent on Instagram is up more than 30% YoY, Reels now carries a $50B+ annual run-rate, and new runtime ranking plus Andromeda delivered better conversions and ad quality.",
    metrics: [
      { label: "Reels run-rate", value: "$50B+" },
      { label: "IG video time", value: "+30% YoY" },
      { label: "Andromeda impact", value: "+14% ad quality" },
    ],
    source: "META Q3 FY2025 earnings call",
  },
  {
    segmentId: "messaging",
    component: "Business messaging flywheel",
    summary:
      "Click-to-WhatsApp ads revenue grew 60% YoY and people now run over 1B daily active threads with businesses as Business AI rolls out in Mexico and the Philippines.",
    metrics: [
      { label: "Click-to-WhatsApp revenue", value: "+60% YoY" },
      { label: "Daily business threads", value: "1B+" },
    ],
    source: "META Q3 FY2025 earnings call",
  },
  {
    segmentId: "commerce",
    component: "Subscriptions & other revenue",
    summary:
      "Family of Apps other revenue climbed 59% YoY to $690M in Q3, driven by WhatsApp paid messaging and Meta Verified subscriptions.",
    metrics: [
      { label: "Q3 FY25 other revenue", value: "$690M" },
      { label: "YoY growth", value: "+59%" },
    ],
    source: "Meta Platforms Q3 FY2025 results release",
  },
  {
    segmentId: "reality-labs",
    component: "Reality Labs momentum",
    summary:
      "Reality Labs revenue rose 74% YoY to $470M as retailers stocked Quest headsets early and Ray-Ban Meta glasses sold out within 48 hours, though the segment still posted a $4.4B loss.",
    metrics: [
      { label: "Q3 FY25 RL revenue", value: "$470M" },
      { label: "YoY growth", value: "+74%" },
      { label: "Operating loss", value: "-$4.4B" },
    ],
    source: "Meta Platforms Q3 FY2025 results release",
  },
  {
    segmentId: "infrastructure",
    component: "CapEx & compute surge",
    summary:
      "CapEx totaled $19.4B in Q3, FY25 guidance increased to $70–72B, and management expects 2026 CapEx dollar growth to be notably larger to meet Meta Superintelligence Labs demand.",
    metrics: [
      { label: "Q3 FY25 CapEx", value: "$19.4B" },
      { label: "FY25 CapEx guide", value: "$70-72B" },
      { label: "2026 outlook", value: "Higher vs FY25" },
    ],
    source: "Meta Platforms Q3 FY2025 results release",
  },
];

