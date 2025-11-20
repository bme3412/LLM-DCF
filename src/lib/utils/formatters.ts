export function formatCurrency(value: number, decimals: number = 1): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(decimals)}T`;
  }
  return `$${value.toFixed(decimals)}B`;
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals: number = 1): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

