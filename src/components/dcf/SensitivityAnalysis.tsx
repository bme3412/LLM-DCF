import { cn } from "@/lib/utils";
import { DCFModel } from "@/types";
import { calculateFairValue } from "@/lib/utils/dcf-calculations";

interface Props {
  model?: DCFModel;
}

export function SensitivityAnalysis({ model }: Props) {
  // If no model provided (e.g. loading), use default ranges or empty
  // Ideally we need the model to calculate the matrix.
  
  // We'll generate the ranges relative to the current WACC and Terminal Growth
  // Or keep them fixed for stability?
  // Fixed ranges are easier to read as a "map".
  
  const waccSteps = [0.084, 0.089, 0.094, 0.099];
  const growthSteps = [0.030, 0.035, 0.040, 0.045];

  const getCellColor = (value: number) => {
    // > 10% undervalued = Green
    // < 10% overvalued = Red
    // +/- 10% = Fair (Yellow)
    // Actually let's stick to absolute price ranges or relative to current price?
    // Let's use the "Fair Value" from the base model as the anchor? 
    // Or usually sensitivity is colored by "Upside to Market Price" ($494).
    
    // Let's stick to the previous logic roughly:
    // < 400 = Red
    // 400-450 = Yellow
    // > 450 = Green
    if (value < 400) return "bg-loss/10 text-loss border-loss/20";
    if (value <= 450) return "bg-warn/10 text-warn border-warn/20";
    return "bg-profit/10 text-profit border-profit/20";
  };

  // Calculate values dynamically if model exists
  const rows = waccSteps.map(w => {
    return growthSteps.map(g => {
      if (!model) return 0;
      
      const price = calculateFairValue(
        model.projections, // Note: these contain FCFs. We need to re-discount them inside calculateFairValue.
        w, 
        g,
        model.cash,
        model.debt,
        model.sharesOutstanding
      );
      return Math.round(price);
    });
  });

  return (
    <div className="glass-panel p-6 h-full flex flex-col">
        <div className="mb-6 flex items-end justify-between">
            <div>
                <h3 className="text-lg font-semibold">Sensitivity Matrix</h3>
                <p className="text-sm text-muted-foreground">Impact of WACC & Growth assumptions</p>
            </div>
            {/* Legend */}
            <div className="flex gap-3 text-[10px] uppercase tracking-widest font-medium">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-loss"></div>
                    <span className="text-muted-foreground">Overvalued</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-warn"></div>
                    <span className="text-muted-foreground">Fair</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-profit"></div>
                    <span className="text-muted-foreground">Undervalued</span>
                </div>
            </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left font-normal text-[10px] text-muted-foreground uppercase tracking-widest border-b border-border/50 bg-secondary/5">
                    WACC \ Growth
                  </th>
                  {growthSteps.map((col) => (
                    <th key={col} className="p-3 font-mono text-xs text-muted-foreground border-b border-border/50 bg-secondary/5">
                        {(col * 100).toFixed(1)}%
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {waccSteps.map((row, rowIndex) => (
                  <tr key={row}>
                    <td className="p-3 font-mono text-xs text-left text-muted-foreground border-r border-border/50 bg-secondary/5 font-medium">
                        {(row * 100).toFixed(1)}%
                    </td>
                    {rows[rowIndex].map((val, colIndex) => (
                      <td key={colIndex} className="p-1">
                        <div 
                            className={cn(
                                "py-3 px-1 rounded border font-mono text-sm font-bold text-center transition-all hover:scale-105 cursor-default", 
                                getCellColor(val)
                            )} 
                            title={`Implied Share Price: $${val}`}
                        >
                          ${val}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    </div>
  );
}
