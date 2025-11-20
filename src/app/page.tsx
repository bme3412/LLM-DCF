'use client';

import { useState, useEffect, useMemo } from 'react';
import { SegmentBreakdown } from '@/components/dcf/SegmentBreakdown';
import { RevenueProjections } from '@/components/dcf/RevenueProjections';
import { DCFCalculator } from '@/components/dcf/DCFCalculator';
import { SensitivityAnalysis } from '@/components/dcf/SensitivityAnalysis';
import { InvestmentRecommendation } from '@/components/dcf/InvestmentRecommendation';

import { companyRegistry, companyOptions, defaultCompanySymbol } from '@/lib/data/company-registry';
import { makeComponentKey } from '@/lib/utils/company';
import { DCFModel } from '@/types';
import { recalculateDCFModel } from '@/lib/utils/dcf-calculations';
import { AnimatedNumber } from '@/components/ui/animated-number';

export default function Dashboard() {
  const [selectedSymbol, setSelectedSymbol] = useState(defaultCompanySymbol);
  const company = companyRegistry[selectedSymbol];

  const [componentRates, setComponentRates] = useState<Record<string, number>>({});
  const [wacc, setWacc] = useState<number>(company.baseCaseDCF.wacc);
  const [terminalGrowth, setTerminalGrowth] = useState<number>(company.baseCaseDCF.terminalGrowth);

  const [activeModel, setActiveModel] = useState<DCFModel>(company.baseCaseDCF);
  const [anthropicSummary, setAnthropicSummary] = useState<string>(
    'Generating updated DCF summary...'
  );
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    setComponentRates({});
    setWacc(company.baseCaseDCF.wacc);
    setTerminalGrowth(company.baseCaseDCF.terminalGrowth);
    setActiveModel(company.baseCaseDCF);
  }, [company]);

  const componentInsightsMap = useMemo(
    () =>
      company.transcriptInsights.reduce<Record<string, string>>((map, insight) => {
        const key = makeComponentKey(insight.segmentId, insight.component);
        map[key] = insight.summary;
        return map;
      }, {}),
    [company]
  );

  const flexHighlights = company.segments
    .flatMap((segment) =>
      segment.components.map((comp) => {
        const key = makeComponentKey(segment.id, comp.name);
        const currentRate = componentRates[key] ?? comp.growthRate;
        const delta = currentRate - comp.growthRate;
        return {
          segment: segment.name,
          component: comp.name,
          base: comp.growthRate,
          rate: currentRate,
          delta,
          summary: componentInsightsMap[key],
        };
      })
    )
    .filter((item) => Math.abs(item.delta) >= 0.002)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
    .slice(0, 4);

  useEffect(() => {
    const newModel = recalculateDCFModel(
      company.segments,
      componentRates,
      wacc,
      terminalGrowth,
      company.baseCaseDCF
    );
    setActiveModel(newModel);
  }, [componentRates, wacc, terminalGrowth, company]);

  const handleRateChange = (componentKey: string, newRate: number) => {
    setComponentRates((prev) => ({
      ...prev,
      [componentKey]: newRate,
    }));
  };

  useEffect(() => {
    const controller = new AbortController();
    async function fetchSummary() {
      setSummaryLoading(true);
      try {
        const segmentSnapshots = company.segments.map((segment) => {
          const fy25Revenue = segment.components.reduce((sum, comp) => sum + comp.revenue, 0);
          const components = segment.components.map((comp) => {
            const key = makeComponentKey(segment.id, comp.name);
            const appliedGrowth = componentRates[key] ?? comp.growthRate;
            const deltaFromBase = appliedGrowth - comp.growthRate;
            return {
              name: comp.name,
              baseRevenue: comp.revenue,
              baseGrowth: comp.growthRate,
              appliedGrowth,
              deltaFromBase,
              transcriptSummary: componentInsightsMap[key] ?? '',
            };
          });
          const projected = components.reduce(
            (sum, comp) => sum + comp.baseRevenue * (1 + comp.appliedGrowth),
            0
          );
          const impliedGrowth = fy25Revenue > 0 ? (projected - fy25Revenue) / fy25Revenue : 0;
          return {
            name: segment.name,
            percentOfTotal: segment.percentOfTotal,
            fy25Revenue,
            impliedGrowth,
            components,
          };
        });

        const driverHighlights = segmentSnapshots
          .flatMap((segment) =>
            segment.components?.map((comp) => ({
              segment: segment.name,
              component: comp.name,
              baseRevenue: comp.baseRevenue,
              appliedGrowth: comp.appliedGrowth,
              deltaFromBase: comp.deltaFromBase,
              revenueContribution: comp.baseRevenue * (1 + comp.appliedGrowth),
              transcriptSummary: comp.transcriptSummary,
            })) ?? []
          )
          .sort((a, b) => b.revenueContribution - a.revenueContribution)
          .slice(0, 5);

        setAnthropicSummary('');
        const res = await fetch('/api/anthropic-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companySymbol: company.symbol,
            companyName: company.name,
            fairValue: activeModel.fairValuePerShare,
            currentPrice: company.marketData.currentPrice,
            enterpriseValue: activeModel.enterpriseValue,
            wacc,
            terminalGrowth,
            segmentSnapshots,
            driverHighlights,
          }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Failed to fetch summary');

        if (!res.body) {
          throw new Error('Empty response body');
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let aggregate = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          aggregate += chunk;
          setAnthropicSummary(aggregate);
        }

        aggregate += decoder.decode();

        if (!aggregate) {
          setAnthropicSummary('No commentary returned from AI service.');
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setAnthropicSummary('Unable to refresh summary. Please adjust an assumption to retry.');
        }
      } finally {
        setSummaryLoading(false);
      }
    }
    fetchSummary();
    return () => controller.abort();
  }, [
    company,
    activeModel.fairValuePerShare,
    activeModel.enterpriseValue,
    componentRates,
    componentInsightsMap,
    wacc,
    terminalGrowth,
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col h-screen overflow-hidden">
      <header className="flex-none z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                {company.symbol} / DCF Model v1.0
              </p>
              <p className="text-xl font-semibold tracking-tight">
                {company.name} <span className="text-muted-foreground font-normal">({company.symbol})</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {companyOptions.map((option) => {
                const isActive = option.symbol === selectedSymbol;
                return (
                  <button
                    key={option.symbol}
                    onClick={() => setSelectedSymbol(option.symbol)}
                    className={`px-3 py-1 rounded-full border text-xs font-semibold tracking-wide uppercase transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                        : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'
                    }`}
                  >
                    {option.symbol}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Fair Value
              </span>
              <span className="font-mono font-bold text-primary text-lg">
                $<AnimatedNumber value={activeModel.fairValuePerShare} highlightColor="text-primary" />
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-0">
        <div className="xl:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 pb-20 custom-scrollbar">
            <div className="flex items-baseline justify-between border-b border-border pb-4 sticky top-0 bg-background z-10 pt-2">
                <div>
                    <h2 className="text-2xl font-serif font-light">Assumptions</h2>
                    <p className="text-sm text-muted-foreground">Adjust component growth drivers</p>
                </div>
            </div>
            
            <SegmentBreakdown 
                segments={company.segments} 
                componentRates={componentRates} 
                onRateChange={handleRateChange}
                insights={company.transcriptInsights}
                className="grid-cols-1" 
            />
        </div>

        <div className="xl:col-span-8 flex flex-col gap-8 overflow-y-auto pb-20 custom-scrollbar">
             <div className="flex flex-col gap-4 border-b border-border pb-4 sticky top-0 bg-background z-10 pt-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Valuation Model</p>
                        <h2 className="text-3xl font-serif font-light">{company.name} ({company.symbol})</h2>
                        <p className="text-sm text-muted-foreground">Real-time financial projections and AI-written summary</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">Enterprise Value</p>
                        <p className="text-xl font-mono font-light">
                            $<AnimatedNumber value={activeModel.enterpriseValue / 1000} formatter={(v) => v.toFixed(2)} highlightColor="text-foreground" />T
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Fair Value ${activeModel.fairValuePerShare} | Upside {((activeModel.fairValuePerShare / company.marketData.currentPrice -1)*100).toFixed(1)}%
                        </p>
                    </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                    {summaryLoading ? 'Refreshing AI summary...' : anthropicSummary}
                </p>
                {flexHighlights.length > 0 && (
                  <div className="mt-3 border-t border-border/70 pt-3">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Key flexed drivers
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {flexHighlights.map((item) => (
                        <div
                          key={`${item.component}-${item.segment}`}
                          className="rounded-xl border border-border/70 bg-white/60 px-3 py-2 text-xs text-slate-700 shadow-sm"
                        >
                          <p className="font-semibold text-foreground">
                            {item.component} ({item.segment})
                          </p>
                          <p className="font-mono text-sm text-primary">
                            {(item.rate * 100).toFixed(1)}% ({item.delta > 0 ? '+' : ''}{(item.delta * 100).toFixed(1)} pts)
                          </p>
                          {item.summary && (
                            <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                              {item.summary.length > 120
                                ? `${item.summary.slice(0, 120)}…`
                                : item.summary}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div className="space-y-8">
                <DCFCalculator 
                    model={activeModel} 
                    segments={company.segments}
                    wacc={wacc}
                    terminalGrowth={terminalGrowth}
                    onWaccChange={setWacc}
                    onTerminalGrowthChange={setTerminalGrowth}
                />
                
                <div className="space-y-6">
                  <RevenueProjections data={activeModel.projections} segments={company.segments} />
                  <div className="flex flex-col gap-6">
                    <SensitivityAnalysis model={activeModel} />
                    <InvestmentRecommendation
                      rec={company.recommendation}
                      currentPrice={company.marketData.currentPrice}
                    />
                  </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
