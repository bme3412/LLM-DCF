'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { YearProjection } from '@/types';
import { formatCurrency } from '@/lib/utils/formatters';
import { AnimatedNumber } from '@/components/ui/animated-number';

interface Props {
  data: YearProjection[];
}

export function RevenueProjections({ data }: Props) {
  return (
    <div className="glass-panel p-6 h-full overflow-hidden flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Revenue Trajectory by Segment</h3>
        <p className="text-sm text-muted-foreground">Projected revenue breakdown (10-Year)</p>
      </div>
      
      <div className="flex-1 overflow-x-auto">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="w-[200px] text-muted-foreground font-normal pl-6 sticky left-0 bg-background/95 backdrop-blur-sm z-10">Segment ($B)</TableHead>
              {data.map((p) => (
                <TableHead key={p.year} className="text-right text-muted-foreground font-normal font-mono text-xs min-w-[80px]">{p.year}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-secondary/10 border-border transition-colors">
              <TableCell className="font-medium text-foreground/80 pl-6 sticky left-0 bg-background/95 backdrop-blur-sm z-10 border-r border-border/50">Productivity</TableCell>
              {data.map((p) => (
                <TableCell key={p.year} className="text-right font-mono text-muted-foreground">
                    <AnimatedNumber value={p.productivity} formatter={(v) => formatCurrency(v).replace('$', '')} highlightColor="text-foreground" />
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="hover:bg-secondary/10 border-border transition-colors">
              <TableCell className="font-medium text-foreground/80 pl-6 sticky left-0 bg-background/95 backdrop-blur-sm z-10 border-r border-border/50">Intelligent Cloud</TableCell>
              {data.map((p) => (
                <TableCell key={p.year} className="text-right font-mono text-muted-foreground">
                    <AnimatedNumber value={p.intelligentCloud} formatter={(v) => formatCurrency(v).replace('$', '')} highlightColor="text-foreground" />
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="hover:bg-secondary/10 border-border transition-colors">
              <TableCell className="font-medium text-foreground/80 pl-6 sticky left-0 bg-background/95 backdrop-blur-sm z-10 border-r border-border/50">More Personal Computing</TableCell>
              {data.map((p) => (
                <TableCell key={p.year} className="text-right font-mono text-muted-foreground">
                    <AnimatedNumber value={p.personalComputing} formatter={(v) => formatCurrency(v).replace('$', '')} highlightColor="text-foreground" />
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-primary/5 hover:bg-primary/10 border-border transition-colors font-bold">
              <TableCell className="font-bold text-primary pl-6 sticky left-0 bg-background/95 backdrop-blur-sm z-10 border-r border-border/50">Total Revenue</TableCell>
              {data.map((p) => (
                <TableCell key={p.year} className="text-right font-mono font-bold text-primary">
                    <AnimatedNumber value={p.totalRevenue} formatter={(v) => formatCurrency(v).replace('$', '')} highlightColor="text-primary" />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
