import { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DCFModel, Segment } from "@/types";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/utils/formatters";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";

interface Props {
  model: DCFModel;
  segments: Segment[];
  wacc: number;
  terminalGrowth: number;
  onWaccChange: (val: number) => void;
  onTerminalGrowthChange: (val: number) => void;
}

const getYoY = (values: number[]) =>
  values.map((value, index) =>
    index === 0 ? "—" : `${(((value - values[index - 1]) / values[index - 1]) * 100).toFixed(1)}%`
  );

export function DCFCalculator({ model, segments, wacc, terminalGrowth, onWaccChange, onTerminalGrowthChange }: Props) {
  const { projections, pvTerminalValue, enterpriseValue, equityValue, fairValuePerShare } = model;

  const adjustWacc = (delta: number) => {
    onWaccChange(Math.round((wacc + delta) * 10000) / 10000);
  };

  const adjustTerm = (delta: number) => {
    onTerminalGrowthChange(Math.round((terminalGrowth + delta) * 10000) / 10000);
  };

  const segmentSeries = segments.map((segment) => {
    const values = projections.map((p) => p.segmentRevenue[segment.id] ?? 0);
    return {
      segment,
      values,
      yoy: getYoY(values),
    };
  });

  const totalRevYoY = getYoY(projections.map((p) => p.totalRevenue));
  const fcfYoY = getYoY(projections.map((p) => p.fcf));

  return (
    <div className="glass-panel overflow-hidden">
      <div className="p-6 border-b border-border flex flex-col md:flex-row justify-between items-end gap-6">
         <div className="w-full md:w-auto">
            <h3 className="text-lg font-semibold mb-4">Discounted Cash Flow Model</h3>
            <div className="flex flex-wrap gap-8">
               {/* WACC Control */}
               <div className="bg-secondary/30 rounded-lg p-3 border border-border">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">WACC (Discount Rate)</p>
                  <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => adjustWacc(-0.001)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-mono font-bold min-w-[4ch] text-center">{(wacc * 100).toFixed(1)}%</span>
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => adjustWacc(0.001)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                  </div>
               </div>

               {/* Terminal Growth Control */}
               <div className="bg-secondary/30 rounded-lg p-3 border border-border">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Terminal Growth</p>
                  <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => adjustTerm(-0.001)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-mono font-bold min-w-[4ch] text-center">{(terminalGrowth * 100).toFixed(1)}%</span>
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => adjustTerm(0.001)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="text-right bg-primary/5 p-4 rounded-xl border border-primary/10 min-w-[200px]">
            <p className="text-xs text-primary/80 uppercase tracking-widest mb-1">Implied Fair Value</p>
            <p className="text-4xl font-mono text-primary font-bold tracking-tighter">
                $<AnimatedNumber value={fairValuePerShare} highlightColor="text-primary" />
            </p>
         </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="w-[200px] text-muted-foreground font-normal pl-6">Metric ($B)</TableHead>
              {projections.map((p) => (
                <TableHead key={p.year} className="text-right text-muted-foreground font-normal font-mono text-xs">{p.year}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {segmentSeries.map(({ segment, values, yoy }) => (
              <Fragment key={segment.id}>
                <TableRow className="hover:bg-secondary/10 border-border transition-colors">
                  <TableCell className="font-medium text-foreground/80 pl-6">{segment.name}</TableCell>
                  {values.map((value, idx) => (
                    <TableCell key={`${segment.id}-${idx}`} className="text-right font-mono text-muted-foreground">
                      <AnimatedNumber value={value} formatter={formatNumber} highlightColor="text-foreground" />
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow className="bg-secondary/5 text-xs text-muted-foreground">
                  <TableCell className="pl-6 italic">% YoY</TableCell>
                  {yoy.map((val, idx) => (
                    <TableCell key={`${segment.id}-yoy-${idx}`} className="text-right">{val}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell colSpan={projections.length + 1} className="h-2 bg-transparent" />
                </TableRow>
              </Fragment>
            ))}

            <TableRow className="hover:bg-secondary/10 border-border transition-colors">
              <TableCell className="font-medium text-foreground/80 pl-6">Total Revenue</TableCell>
              {projections.map((p) => (
                <TableCell key={`total-${p.year}`} className="text-right font-mono text-muted-foreground">
                  <AnimatedNumber value={p.totalRevenue} formatter={formatNumber} highlightColor="text-foreground" />
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-secondary/5 text-xs text-muted-foreground">
              <TableCell className="pl-6 italic">% YoY</TableCell>
              {totalRevYoY.map((val, idx) => (
                <TableCell key={`total-yoy-${idx}`} className="text-right">{val}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell colSpan={projections.length + 1} className="h-2 bg-transparent" />
            </TableRow>

            <TableRow className="hover:bg-secondary/10 border-border transition-colors">
              <TableCell className="font-medium text-foreground/80 pl-6">FCF Margin</TableCell>
              {projections.map((p) => (
                <TableCell key={`fcf-margin-${p.year}`} className="text-right font-mono text-muted-foreground">
                  {formatPercent(p.fcfMargin)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-primary/5 hover:bg-primary/10 border-border transition-colors">
              <TableCell className="font-bold text-primary pl-6">Free Cash Flow</TableCell>
              {projections.map((p) => (
                <TableCell key={`fcf-${p.year}`} className="text-right font-mono font-bold text-primary">
                  <AnimatedNumber value={p.fcf} formatter={formatNumber} highlightColor="text-primary" />
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-primary/10 text-xs text-primary">
              <TableCell className="pl-6 italic">% YoY</TableCell>
              {fcfYoY.map((val, idx) => (
                <TableCell key={`fcf-yoy-${idx}`} className="text-right">{val}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell colSpan={projections.length + 1} className="h-2 bg-transparent" />
            </TableRow>

            <TableRow className="hover:bg-secondary/10 border-border transition-colors">
              <TableCell className="font-medium text-foreground/80 text-xs pl-6">Discount Factor</TableCell>
              {projections.map((p) => (
                <TableCell key={`discount-${p.year}`} className="text-right font-mono text-muted-foreground text-xs">
                  {p.discountFactor.toFixed(3)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="hover:bg-secondary/10 border-border transition-colors border-t-2 border-t-border">
              <TableCell className="font-bold text-foreground pl-6">Present Value</TableCell>
              {projections.map((p) => (
                <TableCell key={`pv-${p.year}`} className="text-right font-mono font-medium text-foreground">
                    <AnimatedNumber value={p.presentValue} formatter={formatNumber} highlightColor="text-foreground" />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
         <div className="bg-card p-4 hover:bg-secondary/20 transition-colors">
             <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">PV of 10yr FCF</p>
             <p className="text-lg font-mono text-foreground">{formatCurrency(projections.reduce((acc, curr) => acc + curr.presentValue, 0))}</p>
         </div>
         <div className="bg-card p-4 hover:bg-secondary/20 transition-colors">
             <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">PV Terminal Val</p>
             <p className="text-lg font-mono text-foreground">
                 <AnimatedNumber value={pvTerminalValue} formatter={(v) => formatCurrency(v)} highlightColor="text-foreground" />
             </p>
         </div>
         <div className="bg-card p-4 hover:bg-secondary/20 transition-colors">
             <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Enterprise Value</p>
             <p className="text-lg font-mono text-primary">
                 <AnimatedNumber value={enterpriseValue} formatter={(v) => formatCurrency(v)} highlightColor="text-primary" />
             </p>
         </div>
         <div className="bg-card p-4 hover:bg-secondary/20 transition-colors">
             <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Equity Value</p>
             <p className="text-lg font-mono text-foreground">
                 <AnimatedNumber value={equityValue} formatter={(v) => formatCurrency(v)} highlightColor="text-foreground" />
             </p>
         </div>
      </div>
    </div>
  );
}
