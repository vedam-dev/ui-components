'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Box } from '../../atom/box';
import { Button } from '../../atom/button';
import type { ReactNode } from 'react';
import { CoreTheme, useCoreTheme } from '../../../theme/core-theme';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
export interface TabItem {
  id?: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
  onDelete?: () => void | Promise<void>;
}

interface TabsProps {
  tabs: TabItem[];
  initialIndex?: number;
  onChange?: (newIndex: number) => void;
  onAdd?: () => void;
  addTooltip?: ReactNode;
  deleteConfirmMessage?: ReactNode;
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
  onAdd,
  addTooltip,
  deleteConfirmMessage,
}: TabsProps) {
  const theme = useCoreTheme() as CoreTheme;
  const baseId = useId();
  const [activeIdx, setActiveIdx] = useState(() =>
    Math.max(0, Math.min(initialIndex, Math.max(0, tabs.length - 1)))
  );
  const [transitioning, setTransitioning] = useState(false);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const deleteBtnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const timeoutRef = useRef<number | null>(null);
  const [popoverDirection, setPopoverDirection] = useState<'left' | 'right'>('right');
  const [deleteSelected, setDeleteSelected] = useState(false);

  // ensure tabRefs length matches tabs length (avoid stale refs)
  useEffect(() => {
    tabRefs.current = Array(tabs.length)
      .fill(null)
      .map((_, i) => tabRefs.current[i] ?? null);
    deleteBtnRefs.current = Array(tabs.length)
      .fill(null)
      .map((_, i) => deleteBtnRefs.current[i] ?? null);
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
            <Box
              key={tabId}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing(1),
              }}
            >
              <Button
                variant="text"
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
                  fontSize: { md: '14px', lg: '20px' },
                  textDecoration: 'none',
                  borderRadius: 0,
                  fontWeight: 600,
                  color: selected ? theme.palette.primary.main : 'text.secondary',
                  borderBottom: selected ? 2 : 0,
                  borderColor: theme.palette.primary.main,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: tab.onDelete ? -4 : 0,
                    left: 0,
                    width: tab.onDelete ? '150%' : '100%',
                    height: tab.onDelete ? '5px' : '2px',
                    backgroundColor: theme.palette.primary.main,
                    transform: selected ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'center',
                    transition: 'transform 0.3s ease',
                  },
                  ...(tabSx ?? {}),
                }}
              >
                {tab.label}
              </Button>

              {tab.onDelete && selected && (
                <IconButton
                  ref={(el) => {
                    deleteBtnRefs.current[i] = el;
                  }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();

                    setPopoverDirection(rect.left < window.innerWidth / 2 ? 'left' : 'right');

                    setConfirmDeleteIndex(i);
                    setDeleteSelected((prev) => !prev);
                  }}
                  size="small"
                >
                  <DeleteOutlinedIcon color={deleteSelected ? 'error' : 'inherit'} />
                </IconButton>
              )}
            </Box>
          );
        })}
        {onAdd && (
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              ml: theme.spacing(1),
            }}
          >
            <IconButton onClick={onAdd}>
              <AddIcon />
            </IconButton>

            {addTooltip && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '-30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1000,
                }}
              >
                {addTooltip}
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Popover
        open={confirmDeleteIndex !== null}
        anchorEl={confirmDeleteIndex !== null ? deleteBtnRefs.current[confirmDeleteIndex] : null}
        onClose={() => setConfirmDeleteIndex(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: popoverDirection,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: popoverDirection,
        }}
        slotProps={{
          paper: {
            sx: {
              p: theme.spacing(2.5),
              mt: theme.spacing(3),
              width: '340px',
              borderRadius: theme.spacing(3),
              boxShadow: '0 0 15px 0 rgba(0,0,0,0.15)',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: theme.spacing(2) }}>
            <ErrorOutlineOutlinedIcon
              color="error"
              sx={{ fontSize: 24, mr: theme.spacing(2), flexShrink: 0 }}
            />
            {deleteConfirmMessage}
          </Box>
          <Box>
            <Button
              sx={{
                fontSize: 14,
                fontWeight: 400,
                color: theme.vd.palette.textStrong,
                background: theme.palette.background.paper,
                fontFamily: theme.typography.h1.fontFamily,
                padding: theme.spacing(0),
                '&:hover': { background: theme.palette.background.paper },
              }}
              onClick={() => {
                setConfirmDeleteIndex(null);
                setDeleteSelected((prev) => !prev);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              sx={{
                px: theme.spacing(4),
                height: '30px',
                fontSize: 14,
                fontWeight: 500,
                color: theme.palette.error.main,
                borderRadius: theme.spacing(1.5),
                gap: theme.spacing(2),
                border: 1,
                borderColor: theme.palette.error.main,
                background: theme.palette.background.paper,
                fontFamily: theme.typography.h1.fontFamily,
                '&:hover': {
                  background: theme.palette.background.paper,
                  borderColor: theme.palette.error.main,
                  border: 1,
                },
              }}
              onClick={async () => {
                const idx = confirmDeleteIndex;
                setConfirmDeleteIndex(null);
                if (idx !== null) {
                  await tabs[idx]?.onDelete?.();
                }
                setDeleteSelected((prev) => !prev);
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Popover>
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
