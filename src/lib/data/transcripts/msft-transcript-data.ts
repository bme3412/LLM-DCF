import { TranscriptInsight } from "@/types";

export const transcriptInsights: TranscriptInsight[] = [
  {
    segmentId: "productivity",
    component: "Office Commercial",
    summary:
      "Microsoft 365 commercial cloud revenue grew 17% YoY, with Copilot and E5 mix driving ARPU while paid seats expanded 6%.",
    metrics: [
      { label: "M365 commercial cloud revenue", value: "+17% YoY" },
      { label: "Paid commercial seats", value: "+6% YoY" },
      { label: "Copilot family MAU", value: "150M+" },
    ],
    timeSeries: [
      { period: "FY25 Q1 (est.)", value: "$28.2B" },
      { period: "FY26 Q1", value: "$33B" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "productivity",
    component: "Office Consumer",
    summary:
      "Consumer cloud revenue jumped 26% with premium tiers lifting ARPU; subscriptions rose 7% past 90M households.",
    metrics: [
      { label: "Consumer cloud revenue", value: "+26% YoY" },
      { label: "Consumer subscriptions", value: "90M+ (+7% YoY)" },
    ],
    timeSeries: [
      { period: "FY25 Q1 (est.)", value: "$2.5B" },
      { period: "FY26 Q1", value: "$3.2B" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "productivity",
    component: "LinkedIn",
    summary:
      "LinkedIn revenue grew 10% YoY, fueled by marketing solutions while Talent Solutions softened alongside the hiring market.",
    metrics: [
      { label: "LinkedIn members", value: "1.3B" },
      { label: "Marketing Solutions growth", value: "double-digit" },
    ],
    timeSeries: [
      { period: "FY25 Q1 (est.)", value: "$3.7B" },
      { period: "FY26 Q1", value: "$4.1B" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "productivity",
    component: "Dynamics 365",
    summary:
      "Dynamics 365 maintained high-teens momentum with broad-based demand across workloads and Fabric-driven analytics pull-through.",
    metrics: [{ label: "Dynamics 365 revenue", value: "+18% YoY" }],
    timeSeries: [
      { period: "FY25 Q1 (est.)", value: "$2.8B" },
      { period: "FY26 Q1", value: "$3.3B" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "intelligent-cloud",
    component: "Azure & Cloud Services",
    summary:
      "Azure and other cloud services revenue surged 40% YoY; AI demand continues to outstrip supply even as capacity ramps globally.",
    metrics: [
      { label: "Azure revenue growth", value: "+40% YoY" },
      { label: "Microsoft Cloud revenue", value: "$49.1B (+26% YoY)" },
      { label: "Commercial RPO", value: "$392B (+51% YoY)" },
    ],
    timeSeries: [
      { period: "FY25 Q1 (est.)", value: "$31.0B" },
      { period: "FY26 Q1", value: "$43.4B" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "intelligent-cloud",
    component: "Server Products",
    summary:
      "On-premises server revenue inched up 1% YoY, helped by Windows Server 2025 transactional purchasing even as customers migrate to Azure.",
    metrics: [{ label: "On-prem server revenue", value: "+1% YoY" }],
    timeSeries: [
      { period: "FY25 Q1 (est.)", value: "$5.6B" },
      { period: "FY26 Q1", value: "$5.7B" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "intelligent-cloud",
    component: "GitHub",
    summary:
      "GitHub Copilot now serves 26M developers; 80% of new GitHub users start with Copilot within a week, driving record pull-request volume.",
    metrics: [
      { label: "GitHub developers", value: "180M+" },
      { label: "Copilot users", value: "26M+" },
      {
        label: "Copilot adoption",
        value: "80% of new devs onboard within 1 week",
      },
    ],
    timeSeries: [
      { period: "FY25 Q1", value: "15M Copilot users" },
      { period: "FY26 Q1", value: "26M Copilot users" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "intelligent-cloud",
    component: "Nuance",
    summary:
      "Dragon Ambient Copilot documented 17M patient encounters in the quarter, up nearly 5x YoY as 650+ providers deploy the solution.",
    metrics: [
      { label: "Ambient documentation", value: "17M visits (+~5x YoY)" },
      { label: "Healthcare orgs", value: "650+ using ambient listening" },
    ],
    timeSeries: [
      { period: "FY25 Q1", value: "≈3.5M encounters" },
      { period: "FY26 Q1", value: "17M encounters" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "intelligent-cloud",
    component: "Enterprise Services",
    summary:
      "Azure AI Foundry now counts 80,000+ customers (80% of Fortune 500) building bespoke agents, underscoring services pull-through.",
    metrics: [
      { label: "Foundry customers", value: "80,000+" },
      { label: "Fortune 500 penetration", value: "80%" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "personal-computing",
    component: "Windows OEM",
    summary:
      "Windows OEM and devices revenue climbed 6% YoY ahead of Windows 10 end-of-support and elevated inventory drawdown.",
    metrics: [{ label: "Windows OEM & devices revenue", value: "+6% YoY" }],
    timeSeries: [
      { period: "FY25 Q1 (est.)", value: "$12.9B" },
      { period: "FY26 Q1", value: "$13.8B" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "personal-computing",
    component: "Windows Commercial",
    summary:
      "Microsoft highlighted Windows 11 AI PCs and new Copilot experiences (Vision, Action, wake word) as catalysts for commercial refresh.",
    metrics: [
      { label: "Edge share", value: "18 consecutive quarters of gains" },
      { label: "AI PC narrative", value: "Every Windows 11 PC now an AI PC" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "personal-computing",
    component: "Search & News Ads",
    summary:
      "Search and news advertising ex-TAC grew 16% YoY, driven by higher volume and improved monetization via Edge/Bing AI integration.",
    metrics: [
      { label: "Search & news ads ex-TAC", value: "+16% YoY" },
      { label: "Daily Copilot app users", value: "+50% QoQ" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "personal-computing",
    component: "Gaming",
    summary:
      "Gaming revenue dipped 2%, but Minecraft hit 155M MAU and Xbox content/services eked out 1% growth amid strong third-party content.",
    metrics: [
      { label: "Minecraft MAU", value: "155M (record high)" },
      { label: "Xbox content & services", value: "+1% YoY" },
    ],
    timeSeries: [
      { period: "FY25 Q1", value: "≈150M MAU" },
      { period: "FY26 Q1", value: "155M MAU" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
  {
    segmentId: "personal-computing",
    component: "Devices",
    summary:
      "Hardware revenue is expected to decline YoY, but Microsoft emphasized the rollout of Copilot-enabled AI PCs and Xbox Ally momentum.",
    metrics: [
      { label: "Windows 11 AI features", value: "Vision + Action modes" },
      { label: "Xbox Ally launch", value: "Set new PC engagement records" },
    ],
    source: "MSFT FY26 Q1 earnings call",
  },
];
