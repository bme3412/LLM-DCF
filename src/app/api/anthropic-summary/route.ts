import { NextResponse } from "next/server";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-5-20250929";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 1,
});

const percentFormatter = (value: number) =>
  `${(value * 100).toFixed(1)}%`;

type SegmentComponentSnapshot = {
  name: string;
  baseRevenue?: number;
  baseGrowth?: number;
  appliedGrowth?: number;
  deltaFromBase?: number;
  transcriptSummary?: string;
};

type SegmentSnapshotPayload = {
  name: string;
  percentOfTotal?: number;
  fy25Revenue?: number;
  impliedGrowth?: number;
  components?: SegmentComponentSnapshot[];
};

type DriverHighlightPayload = {
  segment: string;
  component: string;
  baseRevenue?: number;
  appliedGrowth?: number;
  deltaFromBase?: number;
  transcriptSummary?: string;
};

type SummaryRequestPayload = {
  fairValue: number;
  currentPrice: number;
  enterpriseValue: number;
  wacc: number;
  terminalGrowth: number;
  segmentSnapshots?: SegmentSnapshotPayload[];
  driverHighlights?: DriverHighlightPayload[];
};

type AnthropicStreamEvent = {
  type: string;
  delta?: {
    type?: string;
    text?: string;
  };
};

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Anthropic API key not configured" },
      { status: 500 }
    );
  }

  try {
    const rawBody = await req.text();
    if (!rawBody?.trim()) {
      return NextResponse.json(
        { error: "Empty request body" },
        { status: 400 }
      );
    }

    let payload: SummaryRequestPayload | null = null;
    try {
      payload = JSON.parse(rawBody) as SummaryRequestPayload;
    } catch (parseError) {
      console.error("Anthropic summary body parse error:", parseError);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    if (
      !payload ||
      typeof payload.fairValue !== "number" ||
      typeof payload.currentPrice !== "number"
    ) {
      return NextResponse.json(
        { error: "Missing valuation inputs" },
        { status: 400 }
      );
    }

    const {
      fairValue,
      currentPrice,
      enterpriseValue,
      wacc,
      terminalGrowth,
      segmentSnapshots = [],
      driverHighlights = [],
    } = payload;

    const impliedUpside = currentPrice
      ? ((fairValue - currentPrice) / currentPrice) * 100
      : 0;

    const segmentNarrative =
      segmentSnapshots.length > 0
        ? segmentSnapshots
            .map((seg) => {
              const topComponents = [...(seg.components ?? [])]
                .sort(
                  (a, b) => (b.baseRevenue ?? 0) - (a.baseRevenue ?? 0)
                )
                .slice(0, 2)
                .map((comp) => {
                  const deltaPts = (comp.deltaFromBase ?? 0) * 100;
                  const deltaLabel =
                    deltaPts === 0
                      ? ""
                      : ` (${deltaPts > 0 ? "+" : ""}${deltaPts.toFixed(
                          1
                        )} pts vs base)`;
                  return `${comp.name} ${percentFormatter(
                    comp.appliedGrowth ?? 0
                  )}${deltaLabel}`;
                })
                .join("; ");

              return `- ${seg.name} (~${currencyFormatter.format(
                seg.fy25Revenue ?? 0
              )} FY25, ${seg.percentOfTotal ?? "n/a"}% of revenue) flexed to ${percentFormatter(
                seg.impliedGrowth ?? 0
              )} CAGR, led by ${topComponents}.`;
            })
            .join("\n")
        : "Segment data unavailable.";

    const driverNarrative =
      driverHighlights.length > 0
        ? driverHighlights
            .map((driver) => {
              const base = currencyFormatter.format(driver.baseRevenue ?? 0);
              const growth = percentFormatter(driver.appliedGrowth ?? 0);
              const deltaBase = driver.deltaFromBase ?? 0;
              const deltaPts = (deltaBase * 100).toFixed(1);
              const summary = driver.transcriptSummary
                ? `Transcript: ${driver.transcriptSummary}`
                : "";
              return `- ${driver.component} (${driver.segment}) | Base ${base}, CAGR ${growth} (${deltaBase >= 0 ? "+" : ""}${deltaPts} pts vs base). ${summary}`;
            })
            .join("\n")
        : "Driver detail unavailable.";

    const prompt = `You are drafting a two-sentence DCF commentary for Microsoft (MSFT) that must feel bespoke to the provided drivers.
Fair value: $${fairValue.toFixed(2)} | Current price: $${currentPrice.toFixed(
      2
    )} | Implied upside: ${impliedUpside.toFixed(1)}%
Enterprise value: ${currencyFormatter.format(
      enterpriseValue / 1000
    )}T | WACC: ${percentFormatter(wacc)} | Terminal growth: ${percentFormatter(
      terminalGrowth
    )}

Segment mix and growth posture:
${segmentNarrative}

Largest revenue contributors and transcripts:
${driverNarrative}

Rules:
1. Reference at least one Intelligent Cloud driver (e.g., Azure) and one Productivity or Personal Computing driver by name, tying their growth rates to the valuation.
2. Explicitly mention how the highlighted growth tweaks flow through to the DCF (fair value or upside).
3. Keep it to two, at most three, tightly-written sentences in a professional sell-side tone.`;

    const response = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 350,
        system:
          "You are an equity research analyst producing polished buy-side commentary with concrete financial drivers.",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic error:", err);
      return NextResponse.json(
        { error: "Failed to generate summary" },
        { status: 500 }
      );
    }

    if (!response.body) {
      return NextResponse.json(
        { error: "Anthropic returned empty body" },
        { status: 500 }
      );
    }

    const stream = new ReadableStream({
      start(controller) {
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";

        const textFromEvent = (event: AnthropicStreamEvent) => {
          if (
            event.type === "content_block_delta" &&
            event.delta?.type === "text_delta"
          ) {
            return event.delta.text ?? "";
          }
          return "";
        };

        const reader = response.body!.getReader();
        let pendingEvent: string | null = null;

        function push() {
          reader
            .read()
            .then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() ?? "";

              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed) continue;
                try {
                  if (trimmed.startsWith("event:")) {
                    pendingEvent = trimmed.slice(6).trim();
                    continue;
                  }

                  if (!trimmed.startsWith("data:")) {
                    continue;
                  }

                  const payloadRaw = trimmed.slice(5).trim();
                  if (!payloadRaw || payloadRaw === "[DONE]") {
                    controller.close();
                    return;
                  }

                  const parsed = JSON.parse(payloadRaw) as AnthropicStreamEvent;
                  const eventType = pendingEvent ?? parsed.type;
                  if (eventType === "message_stop" || parsed.type === "message_stop") {
                    controller.close();
                    return;
                  }

                  if (eventType === "error") {
                    console.error("Anthropic stream error event:", parsed);
                    controller.error(new Error("Anthropic stream error"));
                    return;
                  }

                  const text = textFromEvent(parsed);
                  if (text) {
                    controller.enqueue(encoder.encode(text));
                  }

                  pendingEvent = null;
                } catch (err) {
                  console.error("Failed to parse Anthropic stream chunk", err);
                }
              }
              push();
            })
            .catch((err) => {
              console.error("Anthropic streaming error:", err);
              controller.error(err);
            });
        }

        push();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Anthropic route error:", error);
    return NextResponse.json(
      { error: "Unexpected error generating summary" },
      { status: 500 }
    );
  }
}

