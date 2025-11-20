'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  formatter?: (val: number) => string;
  className?: string;
  highlightColor?: string; // e.g., "text-green-500"
}

export function AnimatedNumber({ value, formatter, className, highlightColor = "text-primary" }: AnimatedNumberProps) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setFlash(true);
    const timer = setTimeout(() => setFlash(false), 800);
    return () => clearTimeout(timer);
  }, [value]);

  const display = formatter ? formatter(value) : value.toString();

  return (
    <span 
      className={cn(
        "transition-all duration-500 inline-block", 
        flash ? `${highlightColor} scale-110 font-bold` : "",
        className
      )}
    >
      {display}
    </span>
  );
}

