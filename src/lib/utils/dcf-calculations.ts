import { DCFModel, YearProjection, Segment } from "@/types";
import { makeComponentKey } from "@/lib/utils/company";

export function calculateWACC(
  riskFreeRate: number,
  beta: number,
  marketRiskPremium: number,
  costOfDebt: number,
  taxRate: number,
  debtToEquity: number
): number {
  const costOfEquity = riskFreeRate + beta * marketRiskPremium;
  const weightOfEquity = 1 / (1 + debtToEquity);
  const weightOfDebt = debtToEquity / (1 + debtToEquity);
  const afterTaxCostOfDebt = costOfDebt * (1 - taxRate);
  
  return costOfEquity * weightOfEquity + afterTaxCostOfDebt * weightOfDebt;
}

export function calculateTerminalValue(
  finalYearFCF: number,
  terminalGrowth: number,
  wacc: number
): number {
  return (finalYearFCF * (1 + terminalGrowth)) / (wacc - terminalGrowth);
}

export function calculatePresentValue(
  futureValue: number,
  discountRate: number,
  years: number
): number {
  return futureValue / Math.pow(1 + discountRate, years);
}

export function calculateFairValue(
  projections: YearProjection[],
  wacc: number,
  terminalGrowth: number,
  cash: number,
  debt: number,
  sharesOutstanding: number,
  yearsToProject: number = 10
): number {
  const sumPVFCF = projections.reduce((acc, p, i) => {
    const discountFactor = 1 / Math.pow(1 + wacc, i + 1);
    return acc + p.fcf * discountFactor;
  }, 0);

  const finalFCF = projections[projections.length - 1].fcf;
  const terminalVal = calculateTerminalValue(finalFCF, terminalGrowth, wacc);
  const pvTerminal = calculatePresentValue(terminalVal, wacc, yearsToProject);

  const enterpriseVal = sumPVFCF + pvTerminal;
  const equityVal = enterpriseVal + cash - debt;
  return equityVal / sharesOutstanding;
}

export function recalculateDCFModel(
  baseSegments: Segment[],
  componentRates: Record<string, number>,
  waccOverride: number | null,
  terminalGrowthOverride: number | null,
  baseModel: DCFModel
): DCFModel {
  const wacc = waccOverride ?? baseModel.wacc;
  const terminalGrowth = terminalGrowthOverride ?? baseModel.terminalGrowth;
  const { cash, debt, sharesOutstanding } = baseModel;
  
  const startYear = 2026;
  const yearsToProject = 10;

  const newProjections: YearProjection[] = [];
  const currentComponentRevenues: Record<string, number> = {};

  baseSegments.forEach((segment) => {
    segment.components.forEach((comp) => {
      const key = makeComponentKey(segment.id, comp.name);
      currentComponentRevenues[key] = comp.revenue;
    });
  });

  for (let i = 0; i < yearsToProject; i++) {
    const year = startYear + i;
    const segmentTotals: Record<string, number> = {};
    let totalRevenue = 0;

    baseSegments.forEach((segment) => {
      let segmentSum = 0;
      segment.components.forEach((comp) => {
        const key = makeComponentKey(segment.id, comp.name);
        const growthRate = componentRates[key] ?? comp.growthRate;
        const currentRevenue = currentComponentRevenues[key];
        const newRev = currentRevenue * (1 + growthRate);
        currentComponentRevenues[key] = newRev;
        segmentSum += newRev;
      });
      segmentTotals[segment.id] = segmentSum;
      totalRevenue += segmentSum;
    });

    const fcfMargin = baseModel.projections[i]?.fcfMargin ?? 0.27;
    const fcf = totalRevenue * fcfMargin;
    const discountFactor = 1 / Math.pow(1 + wacc, i + 1);
    const presentValue = fcf * discountFactor;

    newProjections.push({
      year,
      segmentRevenue: { ...segmentTotals },
      totalRevenue,
      fcfMargin,
      fcf,
      discountFactor,
      presentValue,
    });
  }

  const finalFCF = newProjections[newProjections.length - 1].fcf;
  const terminalVal = calculateTerminalValue(finalFCF, terminalGrowth, wacc);
  const pvTerminal = calculatePresentValue(terminalVal, wacc, yearsToProject);

  const sumPVFCF = newProjections.reduce((acc, p) => acc + p.presentValue, 0);
  const enterpriseVal = sumPVFCF + pvTerminal;
  const equityVal = enterpriseVal + cash - debt;
  const fairValue = equityVal / sharesOutstanding;

  return {
    ...baseModel,
    wacc,
    terminalGrowth,
    projections: newProjections,
    terminalValue: terminalVal,
    pvTerminalValue: pvTerminal,
    enterpriseValue: enterpriseVal,
    equityValue: equityVal,
    fairValuePerShare: Number(fairValue.toFixed(2)),
  };
}
