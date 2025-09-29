'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import type { ReactNode } from 'react';

export interface TabItem {
  id?: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  initialIndex?: number;
  onChange?: (newIndex: number) => void;
  disableTransition?: boolean;
  tabGap?: number | string;
  minPanelHeight?: string | number;
  sx?: any;
  tabSx?: any;
  panelSx?: any;
}

/**
 * Accessible, reusable Tabs
 */
export default function Tabs({
  tabs,
  initialIndex = 0,
  onChange,
  disableTransition = false,
  tabGap = 12,
  minPanelHeight = '200px',
  sx,
  tabSx,
  panelSx,
}: TabsProps) {
  const baseId = useId();
  const [activeIdx, setActiveIdx] = useState(() =>
    Math.max(0, Math.min(initialIndex, Math.max(0, tabs.length - 1)))
  );
  const [transitioning, setTransitioning] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const timeoutRef = useRef<number | null>(null);

  // ensure tabRefs length matches tabs length (avoid stale refs)
  useEffect(() => {
    tabRefs.current = Array(tabs.length)
      .fill(null)
      .map((_, i) => tabRefs.current[i] ?? null);
  }, [tabs.length]);

  // If tabs array length or initialIndex changes, clamp activeIdx
  useEffect(() => {
    const clamped = Math.max(0, Math.min(initialIndex, Math.max(0, tabs.length - 1)));
    setActiveIdx((cur) => (cur > tabs.length - 1 ? clamped : cur));
  }, [tabs.length, initialIndex]);

  // cleanup timeout on unmount or when we create a new timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const handleActivate = (newIdx: number) => {
    if (tabs.length === 0) return;
    if (newIdx === activeIdx) return;
    if (tabs[newIdx]?.disabled) return;
    if (transitioning) return;

    if (disableTransition) {
      setActiveIdx(newIdx);
      onChange?.(newIdx);
      // focus the newly activated tab when switching immediately
      tabRefs.current[newIdx]?.focus();
      return;
    }

    setTransitioning(true);

    // clear any existing timer
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // keep the old content visible while animating out; after timeout swap
    timeoutRef.current = window.setTimeout(() => {
      setActiveIdx(newIdx);
      setTransitioning(false);
      onChange?.(newIdx);
      tabRefs.current[newIdx]?.focus();
      timeoutRef.current = null;
    }, 300);
  };

  // keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.altKey || e.metaKey || e.ctrlKey) return;
    const enabledIndexes = tabs.map((t, i) => (t.disabled ? -1 : i)).filter((i) => i !== -1);

    if (enabledIndexes.length === 0) return;

    const currentPosInEnabled = enabledIndexes.indexOf(idx);
    // If current idx is not in enabled list (shouldn't happen because disabled tabs aren't focusable),
    // fall back to the first enabled index.
    const pos = currentPosInEnabled === -1 ? 0 : currentPosInEnabled;

    switch (e.key) {
      case 'ArrowRight': {
        const next = enabledIndexes[(pos + 1) % enabledIndexes.length];
        tabRefs.current[next]?.focus();
        handleActivate(next);
        e.preventDefault();
        break;
      }
      case 'ArrowLeft': {
        const prevIndex = (pos - 1 + enabledIndexes.length) % enabledIndexes.length;
        const prev = enabledIndexes[prevIndex];
        tabRefs.current[prev]?.focus();
        handleActivate(prev);
        e.preventDefault();
        break;
      }
      case 'Home': {
        const first = enabledIndexes[0];
        tabRefs.current[first]?.focus();
        handleActivate(first);
        e.preventDefault();
        break;
      }
      case 'End': {
        const last = enabledIndexes[enabledIndexes.length - 1];
        tabRefs.current[last]?.focus();
        handleActivate(last);
        e.preventDefault();
        break;
      }
      case 'Enter':
      case ' ':
        handleActivate(idx);
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  // If no tabs provided, render nothing (or you could render a fallback)
  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', ...sx }}>
      {/* Tab list */}
      <Box
        role="tablist"
        aria-orientation="horizontal"
        sx={{
          display: 'flex',
          gap: tabGap,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {tabs.map((tab, i) => {
          const tabId = tab.id ?? `${baseId}-tab-${i}`;
          const panelId = `${baseId}-panel-${i}`;
          const selected = i === activeIdx;
          return (
            <Button
              key={tabId}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={tabId}
              aria-controls={panelId}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => handleActivate(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              disableRipple
              sx={{
                px: 0,
                pb: 2,
                minWidth: 'unset',
                fontSize: '20px',
                borderRadius: 0,
                fontWeight: 600,
                color: selected ? '#3870CA' : 'text.secondary',
                borderBottom: selected ? 2 : 0,
                borderColor: '#3870CA',
                transition: 'all 0.3s ease',
                position: 'relative',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#3870CA',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#3870CA',
                  transform: selected ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'center',
                  transition: 'transform 0.3s ease',
                },
                ...(tabSx ?? {}),
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </Box>

      {/* Panel area */}
      <Box
        sx={{
          mt: 3,
          position: 'relative',
          minHeight: minPanelHeight,
        }}
      >
        {tabs.map((tab, i) => {
          const panelId = `${baseId}-panel-${i}`;
          const tabId = tab.id ?? `${baseId}-tab-${i}`;
          const isActive = i === activeIdx;

          return (
            <Box
              key={panelId}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!isActive}
              sx={{
                position: isActive ? 'relative' : 'absolute',
                width: '100%',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                opacity: transitioning ? (isActive ? 1 : 0) : isActive ? 1 : 0,
                transform: transitioning
                  ? isActive
                    ? 'translateY(0)'
                    : 'translateY(10px)'
                  : 'none',
                pointerEvents: isActive ? 'auto' : 'none',
                ...(panelSx ?? {}),
              }}
            >
              {tab.content}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
