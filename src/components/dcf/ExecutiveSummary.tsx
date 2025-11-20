'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils/formatters';
import { TrendingUp, DollarSign, Activity, ArrowRight } from 'lucide-react';

interface Props {
  fairValue: number;
  currentPrice: number;
  rating: 'BUY' | 'HOLD' | 'SELL';
  marketCap: number;
  sharesOutstanding: number;
  onScenarioChange: (s: 'bull' | 'base' | 'bear') => void;
  currentScenario: 'bull' | 'base' | 'bear';
}

export function ExecutiveSummary({ 
  fairValue, 
  currentPrice, 
  rating, 
  marketCap, 
  sharesOutstanding,
  currentScenario,
  onScenarioChange 
}: Props) {
  const premium = ((currentPrice - fairValue) / fairValue) * 100;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="col-span-full grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Main Status Card */}
      <motion.div variants={item} className="lg:col-span-8 glass-panel p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <h1 className="text-9xl font-bold tracking-tighter">MSFT</h1>
        </div>
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-4xl font-light tracking-tight">Microsoft Corp.</h2>
                <Badge variant="outline" className="border-primary/50 text-primary uppercase tracking-widest text-[10px]">
                  NASDAQ: MSFT
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-lg text-lg">
                Discounted Cash Flow Analysis & Valuation Report
              </p>
            </div>
            <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg backdrop-blur-md border border-white/5">
              {(['bull', 'base', 'bear'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => onScenarioChange(s)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                    currentScenario === s 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'hover:bg-white/5 text-muted-foreground'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-12 border-t border-white/10 pt-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-widest">Market Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-light font-mono">${currentPrice}</span>
                <span className="text-xs text-muted-foreground">USD</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-widest">Fair Value</p>
              <div className="flex items-baseline gap-2">
                <motion.span 
                  key={fairValue}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-light font-mono text-primary"
                >
                  ${fairValue}
                </motion.span>
                <span className="text-xs text-primary/70">DCF</span>
              </div>
            </div>

            <div>
               <p className="text-sm text-muted-foreground mb-1 uppercase tracking-widest">Spread</p>
               <div className="flex items-center gap-2">
                 <span className={`text-4xl font-mono ${premium > 0 ? 'text-loss' : 'text-profit'}`}>
                   {premium > 0 ? '+' : ''}{premium.toFixed(1)}%
                 </span>
                 <TrendingUp className={`h-5 w-5 ${premium > 0 ? 'text-loss rotate-180' : 'text-profit'}`} />
               </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Secondary Stats Panel */}
      <motion.div variants={item} className="lg:col-span-4 space-y-6">
        <div className="glass-panel p-6 flex flex-col justify-between h-full border-l-4 border-l-primary">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Analyst Rating
              </h3>
              <div className="flex items-center gap-4">
                <span className={`text-5xl font-bold ${
                    rating === 'BUY' ? 'text-profit' : 
                    rating === 'SELL' ? 'text-loss' : 'text-warn'
                }`}>
                    {rating}
                </span>
                <div className="text-sm text-muted-foreground leading-tight">
                    Based on {currentScenario} case<br/>
                    assumptions
                </div>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm text-muted-foreground">Market Cap</span>
                    <span className="font-mono font-medium">{formatCurrency(marketCap)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm text-muted-foreground">Shares Out</span>
                    <span className="font-mono font-medium">{sharesOutstanding}B</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Implied EV</span>
                    <span className="font-mono font-medium text-primary">
                        {formatCurrency(marketCap * (1 - (premium/100)))}
                    </span>
                </div>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
