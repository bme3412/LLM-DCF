`use client`;

import { X } from "lucide-react";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

interface FloatingPanelProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  width?: number;
}

export function FloatingPanel({
  open,
  onOpenChange,
  title,
  children,
  width = 460,
}: FloatingPanelProps) {
  const [mounted, setMounted] = useState(false);
  const [{ x, y }, setPosition] = useState({ x: 40, y: 80 });
  const dragData = useRef<{ dragging: boolean; offsetX: number; offsetY: number }>(
    { dragging: false, offsetX: 0, offsetY: 0 }
  );

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setPosition((pos) => ({
        x: Math.min(pos.x, window.innerWidth - width - 24),
        y: Math.min(pos.y, window.innerHeight - 200),
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const stopDragging = useCallback(() => {
    dragData.current.dragging = false;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", stopDragging);
  }, []);

  const onPointerMove = useCallback((event: PointerEvent) => {
    if (!dragData.current.dragging) return;
    setPosition({
      x: event.clientX - dragData.current.offsetX,
      y: event.clientY - dragData.current.offsetY,
    });
  }, []);

  const startDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    dragData.current = {
      dragging: true,
      offsetX: event.clientX - x,
      offsetY: event.clientY - y,
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopDragging);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDragging);
    };
  }, [onPointerMove, stopDragging]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      style={{ width, transform: `translate(${x}px, ${y}px)` }}
      className="fixed left-0 top-0 z-50 rounded-2xl border border-border bg-background shadow-2xl"
    >
      <div
        className="flex cursor-grab items-center justify-between rounded-t-2xl border-b border-border bg-secondary/80 px-4 py-3"
        onPointerDown={startDragging}
      >
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          {title}
        </p>
        <button
          className="rounded-full p-1 text-muted-foreground transition hover:bg-white/50"
          onClick={() => onOpenChange?.(false)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto p-4">{children}</div>
    </div>,
    document.body
  );
}


