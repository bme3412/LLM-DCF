import { TranscriptInsight } from "@/types";

export const transcriptInsights: TranscriptInsight[] = [
  {
    segmentId: "data-center",
    component: "Record Data Center revenue",
    summary:
      "Data Center revenue reached $4.3B in Q3 FY25, up 22% year over year, driven by strong demand for 5th Gen EPYC CPUs and Instinct MI350 series GPUs.",
    metrics: [
      { label: "Q3 FY25 Data Center revenue", value: "$4.3B" },
      { label: "YoY growth", value: "+22%" },
    ],
    source: "AMD Q3 FY2025 earnings release",
  },
  {
    segmentId: "data-center",
    component: "MI355 & Helios momentum",
    summary:
      "MI355 accelerator shipments ramped sharply and AMD announced multi-gigawatt Helios rack-scale engagements with OpenAI, Oracle Cloud Infrastructure, and the U.S. Department of Energy.",
    metrics: [
      { label: "OpenAI deployment", value: "6 GW Instinct GPUs" },
      { label: "OCI initial GPUs", value: "50,000 MI450" },
    ],
    source: "AMD Q3 FY2025 earnings call",
  },
  {
    segmentId: "client",
    component: "Ryzen AI PCs set record",
    summary:
      "Client revenue hit a record $2.8B (+46% YoY) as Ryzen AI notebook sell-through accelerated with all top five PC OEMs launching Copilot+ capable designs.",
    metrics: [
      { label: "Q3 FY25 Client revenue", value: "$2.8B" },
      { label: "YoY growth", value: "+46%" },
    ],
    source: "AMD Q3 FY2025 earnings release",
  },
  {
    segmentId: "gaming",
    component: "Console refresh lift",
    summary:
      "Gaming revenue climbed to $1.3B (+181% YoY) on premium console refresh shipments and stronger Radeon 9000 desktop GPU demand ahead of the holiday cycle.",
    metrics: [
      { label: "Q3 FY25 Gaming revenue", value: "$1.3B" },
      { label: "YoY growth", value: "+181%" },
    ],
    source: "AMD Q3 FY2025 earnings release",
  },
  {
    segmentId: "embedded",
    component: "Embedded stabilization",
    summary:
      "Embedded segment revenue was $857M, down 8% YoY but up 4% sequentially as Versal Prime Gen2 and Ryzen Embedded 9000 shipments picked up across industrial and carrier customers.",
    metrics: [
      { label: "Q3 FY25 Embedded revenue", value: "$857M" },
      { label: "Seq growth", value: "+4%" },
    ],
    source: "AMD Q3 FY2025 earnings call",
  },
  {
    segmentId: "data-center",
    component: "ROCm 7 software progress",
    summary:
      "ROCm 7 delivered up to 4.6x higher inference performance versus ROCm 6 with expanded day-zero framework support, reinforcing AMD’s open AI software push.",
    metrics: [
      { label: "Inference uplift vs ROCm6", value: "up to 4.6x" },
      { label: "Training uplift", value: "up to 3x" },
    ],
    source: "AMD Q3 FY2025 earnings call",
  },
];

