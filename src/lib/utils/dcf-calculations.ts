import { DCFModel, YearProjection, Segment } from "@/types";

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
  // PV of FCFs
  // Re-calculate PVs based on the new WACC if provided (assuming projections FCF are correct raw values)
  // NOTE: projections passed here usually have PV calculated with the model's WACC.
  // If we vary WACC, we must re-discount the FCFs.
  
  const sumPVFCF = projections.reduce((acc, p, i) => {
    const discountFactor = 1 / Math.pow(1 + wacc, i + 1);
    return acc + (p.fcf * discountFactor);
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
  componentRates: { [key: string]: number },
  waccOverride: number | null,
  terminalGrowthOverride: number | null,
  baseModel: DCFModel
): DCFModel {
  const wacc = waccOverride !== null ? waccOverride : baseModel.wacc;
  const terminalGrowth = terminalGrowthOverride !== null ? terminalGrowthOverride : baseModel.terminalGrowth;
  const { cash, debt, sharesOutstanding } = baseModel;
  
  const startYear = 2026;
  const yearsToProject = 10;

  const newProjections: YearProjection[] = [];
  
  // 1. Initialize current revenues for all components from base segments
  let currentComponentRevenues: { [key: string]: number } = {};
  
  baseSegments.forEach(segment => {
    segment.components.forEach(comp => {
      currentComponentRevenues[comp.name] = comp.revenue;
    });
  });

  for (let i = 0; i < yearsToProject; i++) {
    const year = startYear + i;
    
    // 2. Project next year's revenue
    let segmentTotals: { [key: string]: number } = {
      'Productivity': 0,
      'Intelligent Cloud': 0,
      'Personal Computing': 0
    };
    let totalRevenue = 0;

    baseSegments.forEach(segment => {
      let segmentSum = 0;
      segment.components.forEach(comp => {
        const growthRate = componentRates[comp.name] !== undefined 
          ? componentRates[comp.name] 
          : comp.growthRate;
          
        const newRev = currentComponentRevenues[comp.name] * (1 + growthRate);
        currentComponentRevenues[comp.name] = newRev;
        segmentSum += newRev;
      });
      
      segmentTotals[segment.name] = segmentSum;
      totalRevenue += segmentSum;
    });
    
    // 3. Calculate FCF
    const fcfMargin = baseModel.projections[i]?.fcfMargin || 0.27;
    const fcf = totalRevenue * fcfMargin;
    
    const discountFactor = 1 / Math.pow(1 + wacc, i + 1);
    const presentValue = fcf * discountFactor;

    newProjections.push({
      year,
      productivity: segmentTotals['Productivity'],
      intelligentCloud: segmentTotals['Intelligent Cloud'],
      personalComputing: segmentTotals['Personal Computing'],
      totalRevenue,
      fcfMargin,
      fcf,
      discountFactor,
      presentValue
    });
  }

  // 4. Terminal Value & Equity Value
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
    fairValuePerShare: Number(fairValue.toFixed(2))
  };
}
