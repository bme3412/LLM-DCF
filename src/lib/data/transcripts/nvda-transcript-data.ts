import { TranscriptInsight } from "@/types";

export const transcriptInsights: TranscriptInsight[] = [
  {
    segmentId: "data-center",
    component: "Blackwell ramp",
    summary:
      "Q3 FY26 data center revenue hit $51.2B (+66% YoY) as GB300 crossed GB200, clouds stayed sold out, and NVIDIA reiterated $500B Blackwell + Rubin revenue visibility through 2026.",
    metrics: [
      { label: "Data center revenue", value: "$51.2B (+66% YoY)" },
      { label: "Visibility", value: "$500B thru 2026" },
    ],
    source: "NVIDIA Q3 FY26 call & release",
  },
  {
    segmentId: "data-center",
    component: "AI factory partnerships",
    summary:
      "Announced 10+ GW partnerships, including OpenAI’s 10 GW build, Anthropic adopting Grace Blackwell & Rubin for 1 GW, xAI Colossus 2, and AWS/Humain expanding to 150k accelerators.",
    metrics: [
      { label: "OpenAI deployment", value: "≥10 GW" },
      { label: "Anthropic commitment", value: "1 GW" },
    ],
    source: "NVIDIA Q3 FY26 call & release",
  },
  {
    segmentId: "gaming",
    component: "Gaming resilience",
    summary:
      "Gaming revenue was $4.3B (+30% YoY) on DLSS 4 launches like Borderlands 4 and Battlefield 6, plus RTX AI PC blueprints and 25th anniversary GeForce events.",
    metrics: [
      { label: "Gaming revenue", value: "$4.3B (+30% YoY)" },
      { label: "DLSS 4 titles", value: "Borderlands 4, Battlefield 6" },
    ],
    source: "NVIDIA Q3 FY26 release",
  },
  {
    segmentId: "pro-viz",
    component: "Omniverse DSX & DGX Spark",
    summary:
      "Pro Viz revenue reached $760M (+56% YoY) as NVIDIA launched Omniverse DSX for gigawatt AI factories and began shipping DGX Spark, the compact AI supercomputer.",
    metrics: [
      { label: "Pro Viz revenue", value: "$760M (+56% YoY)" },
      { label: "DGX Spark", value: "Shipping" },
    ],
    source: "NVIDIA Q3 FY26 release",
  },
  {
    segmentId: "automotive",
    component: "Drive & physical AI",
    summary:
      "Automotive revenue was $592M (+32% YoY) with partnerships like Uber’s Level 4 network, Hyperion 10 platform, and IGX Thor bringing real-time physical AI to edge deployments.",
    metrics: [
      { label: "Automotive revenue", value: "$592M (+32% YoY)" },
      { label: "Level 4 fleet target", value: "100k vehicles" },
    ],
    source: "NVIDIA Q3 FY26 release",
  },
  {
    segmentId: "oem-other",
    component: "BlueField & AI PCs",
    summary:
      "BlueField-4 launched as the AI factory operating system processor, while RTX AI PC reference designs and OEM engagements targeted the emerging AI PC TAM.",
    metrics: [
      { label: "BlueField-4 partners", value: "CoreWeave, Dell, OCI, etc." },
      { label: "AI PC TAM (CY26)", value: "40M+" },
    ],
    source: "NVIDIA Q3 FY26 release",
  },
];

