import { TranscriptInsight } from "@/types";

export const transcriptInsights: TranscriptInsight[] = [
  {
    segmentId: "ucan",
    component: "Record US/UK view share",
    summary:
      "Netflix reached its highest quarterly share ever with 8.6% of US TV time and 9.4% in the UK, up 15% and 22% respectively since Q4'22 as Wednesday S2 and Happy Gilmore 2 sustained engagement.",
    metrics: [
      { label: "US share (Nielsen)", value: "8.6%" },
      { label: "UK share (BARB)", value: "9.4%" },
    ],
    source: "Netflix Q3 FY2025 shareholder letter",
  },
  {
    segmentId: "emea",
    component: "Local slate momentum",
    summary:
      "Bon Appétit, Your Majesty and The Thursday Murder Club helped EMEA revenue grow 18% YoY with local originals topping country charts and reinforcing retention after price adjustments.",
    metrics: [
      { label: "EMEA revenue growth", value: "+18% YoY" },
      { label: "Top local titles", value: "Bon Appétit, Murder Club" },
    ],
    source: "Netflix Q3 FY2025 shareholder letter",
  },
  {
    segmentId: "latam",
    component: "Brazil tax charge",
    summary:
      "A $619M gross tax expense tied to Brazil's CIDE dispute reduced Q3 operating margin by >500 bps, but management reiterated that the matter should not materially impact future periods.",
    metrics: [
      { label: "Tax expense", value: "$619M" },
      { label: "Margin drag", value: ">5 pts in Q3'25" },
    ],
    source: "Netflix Q3 FY2025 shareholder letter",
  },
  {
    segmentId: "apac",
    component: "Mobile-led growth",
    summary:
      "APAC revenue climbed 21% YoY (20% F/X neutral) as mobile-only plans and hits like Alice in Borderland and UNTAMED drove engagement up ~20% year over year.",
    metrics: [
      { label: "APAC revenue growth", value: "+21% YoY" },
      { label: "Mobile-only mix", value: "~35% of members" },
    ],
    source: "Netflix Q3 FY2025 shareholder letter",
  },
  {
    segmentId: "advertising",
    component: "Best ad sales quarter",
    summary:
      "Netflix recorded its strongest ad sales yet, doubled US upfront commitments, and highlighted faster growth in programmatic channels as the Netflix Ad Suite deepens targeting and measurement.",
    metrics: [
      { label: "US upfronts", value: "2x YoY" },
      { label: "Ad revenue outlook", value: ">2x in 2025" },
    ],
    source: "Netflix Q3 FY2025 shareholder letter",
  },
  {
    segmentId: "experiences",
    component: "Live event flywheel",
    summary:
      "Canelo vs. Crawford became the most-viewed men's championship fight this century with 41M+ viewers, validating the live playbook ahead of NFL Christmas games and Jake Paul vs. Tank Davis.",
    metrics: [
      { label: "Canelo vs Crawford viewers", value: "41M+ live+1" },
      { label: "Top countries", value: "Top 10 in 91 markets" },
    ],
    source: "Netflix Q3 FY2025 shareholder letter & call",
  },
];

