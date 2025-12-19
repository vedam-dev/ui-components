import React, { useEffect, useRef, useState, FC } from 'react';
import SidebarDrawer, { SidebarItem } from '../sidebardrawer/SidebarDrawer';
import TopBar, { TopBarProps } from '../topbar/TopBar';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  Payment as PaymentIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  EventNote as EventNoteIcon,
} from '@mui/icons-material';

const defaultItems: SidebarItem[] = [
  {
    id: 'dashboard',
    icon: <DashboardIcon />,
    text: 'Dashboard',
    onClick: () => console.log('Dashboard clicked'),
  },
  {
    id: 'class-session',
    icon: <EventNoteIcon />,
    text: 'Class Session',
    onClick: () => console.log('Class Session clicked'),
  },
  {
    id: 'attendance',
    icon: <SchoolIcon />,
    text: 'Attendance',
    onClick: () => console.log('Attendance clicked'),
  },
  {
    id: 'assignments',
    icon: <AssignmentIcon />,
    text: 'Assignments',
    onClick: () => console.log('Assignments clicked'),
  },
  {
    id: 'fees',
    icon: <PaymentIcon />,
    text: 'Fees',
    submenu: [
      {
        id: 'fees-dashboard',
        text: 'Dashboard',
        onClick: () => console.log('Fees Dashboard clicked'),
      },
      {
        id: 'all-fees',
        text: 'All Fees',
        onClick: () => console.log('All Fees clicked'),
      },
      {
        id: 'create-fees',
        text: 'Create Fees',
        onClick: () => console.log('Create Fees clicked'),
      },
    ],
  },
  {
    id: 'users',
    icon: <PeopleIcon />,
    text: 'Users',
    onClick: () => console.log('Users clicked'),
  },
  {
    id: 'settings',
    icon: <SettingsIcon />,
    text: 'Settings',
    onClick: () => console.log('Settings clicked'),
  },
];

interface SidebarWrapperProps extends Partial<TopBarProps> {
  items?: SidebarItem[];
  collapsedWidth?: number;
  expandedWidth?: number;
  hoverDelayMs?: number;
}

const SidebarWrapper: FC<SidebarWrapperProps> = ({
  collegeLogo,
  items = defaultItems,
  studentId = 'VED2025',
  label = 'Student Id:',
  studentName = 'Sameeksha Kapoor',
  studentPhoto = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  streakCount = 0,
  coinCount = 0,
  notificationCount = 1,
  hideStatsContainer = false,
  onProfileClick = () => console.log('Profile clicked'),
  collapsedWidth = 84,
  expandedWidth = 200,
  hoverDelayMs = 1000,
}) => {
  const topbarHeight = 106;
  const hoverTimerRef = useRef<number | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const hasExplicitSelection = items.some(
    (item) => 'selected' in item && item.selected !== undefined
  );

  const getSelectedIdFromUrl = (itemsToCheck: SidebarItem[]) => {
    if (typeof window === 'undefined') return itemsToCheck[0]?.id ?? '';
    const path = window.location.pathname || '';

    const segments = path.split('/').filter(Boolean);
    const lastSegment = segments.length > 0 ? segments[segments.length - 1] : '';

    for (const item of itemsToCheck) {
      if (item.submenu && item.submenu.length > 0) {
        const submenuMatch = item.submenu.find(
          (sub) => sub.id.toLowerCase() === lastSegment.toLowerCase()
        );
        if (submenuMatch) return submenuMatch.id;
      }
    }

    // Then check main items
    const exactMatch = itemsToCheck.find((it) => it.id.toLowerCase() === lastSegment.toLowerCase());
    if (exactMatch) return exactMatch.id;

    for (const it of itemsToCheck) {
      if (
        path.toLowerCase().includes(`/${it.id.toLowerCase()}`) ||
        path.toLowerCase().includes(it.id.toLowerCase())
      ) {
        return it.id;
      }
    }

    return itemsToCheck[0]?.id ?? '';
  };

  const [localItems, setLocalItems] = useState<SidebarItem[]>(() => {
    if (hasExplicitSelection) {
      return items.map((it) => ({ ...it })) as SidebarItem[];
    }

    const picked = getSelectedIdFromUrl(items);
    return items.map((it) => {
      const itemCopy = { ...it };
      if (itemCopy.submenu) {
        itemCopy.submenu = itemCopy.submenu.map((sub) => ({
          ...sub,
          selected: sub.id === picked,
        }));
      }
      return { ...itemCopy, selected: it.id === picked } as SidebarItem;
    });
  });

  useEffect(() => {
    if (hasExplicitSelection) {
      setLocalItems(
        items.map((it) => {
          const itemCopy = { ...it };
          if (itemCopy.submenu) {
            itemCopy.submenu = itemCopy.submenu.map((sub) => ({ ...sub }));
          }
          return itemCopy;
        }) as SidebarItem[]
      );
      return;
    }

    const picked = getSelectedIdFromUrl(items);
    setLocalItems(
      items.map((it) => {
        const itemCopy = { ...it };
        const hasSelectedSubmenu = itemCopy.submenu?.some((sub) => sub.selected === true);

        if (itemCopy.submenu) {
          itemCopy.submenu = itemCopy.submenu.map((sub) => ({
            ...sub,
            selected: sub.id === picked,
          }));
        }
        return {
          ...itemCopy,
          selected: it.selected || hasSelectedSubmenu || it.id === picked,
        } as SidebarItem;
      })
    );
  }, [items, hasExplicitSelection]);

  useEffect(() => {
    if (hasExplicitSelection) return;

    const onPop = () => {
      const picked = getSelectedIdFromUrl(items);
      setLocalItems((prev) =>
        prev.map((it) => {
          const itemCopy = { ...it };
          if (itemCopy.submenu) {
            itemCopy.submenu = itemCopy.submenu.map((sub) => ({
              ...sub,
              selected: sub.id === picked,
            }));
          }
          return { ...itemCopy, selected: it.id === picked };
        })
      );
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [items, hasExplicitSelection]);

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleHoverEnter = () => {
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      setIsSidebarExpanded(true);
      hoverTimerRef.current = null;
    }, hoverDelayMs);
  };

  const handleHoverLeave = () => {
    clearHoverTimer();
    hoverTimerRef.current = window.setTimeout(() => {
      setIsSidebarExpanded(false);
      hoverTimerRef.current = null;
    }, hoverDelayMs);
  };

  const setSidebarExpandedImmediate = (val: boolean | ((prev: boolean) => boolean)) => {
    clearHoverTimer();
    setIsSidebarExpanded((prev) =>
      typeof val === 'function' ? (val as (p: boolean) => boolean)(prev) : val
    );
  };

  useEffect(() => {
    return () => {
      clearHoverTimer();
    };
  }, []);

  const handleItemClick = (item: SidebarItem) => {
    if (!item) return;

    if (!hasExplicitSelection) {
      setLocalItems((prev) =>
        prev.map((it) => {
          const itemCopy = { ...it };
          if (itemCopy.submenu) {
            itemCopy.submenu = itemCopy.submenu.map((sub) => ({
              ...sub,
              selected: false,
            }));
          }
          return { ...itemCopy, selected: it.id === item.id };
        })
      );
    }

    try {
      item.onClick?.();
    } catch (e) {
      console.warn('sidebar item onClick error', e);
    }
    const path = (item as any).path ?? (item as any).href ?? null;
    if (path && typeof path === 'string') {
      try {
        const current = window.location.pathname + window.location.search + window.location.hash;
        if (current !== path) {
          window.history.pushState({}, '', path);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      } catch (e) {
        console.warn('history push failed', e);
      }
    }
  };

  return (
    <div>
      <TopBar
        collegeLogo={collegeLogo}
        studentId={studentId}
        label={label}
        studentName={studentName}
        studentPhoto={studentPhoto}
        streakCount={streakCount}
        coinCount={coinCount}
        notificationCount={notificationCount}
        onMenuClick={() => setSidebarExpandedImmediate((p) => !p)}
        onProfileClick={onProfileClick}
        isSidebarExpanded={isSidebarExpanded}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: isSidebarExpanded ? 0 : 20,
        }}
        hideStatsContainer={hideStatsContainer}
      />

      <div
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
        style={{
          position: 'fixed',
          top: `${topbarHeight}px`,
          left: 0,
          height: `calc(100vh - ${topbarHeight}px)`,
          width: isSidebarExpanded ? expandedWidth : collapsedWidth,
          zIndex: isSidebarExpanded ? 0 : 10,
          pointerEvents: 'auto',
        }}
      >
        <SidebarDrawer
          items={localItems}
          anchor="left"
          collapsedWidth={collapsedWidth}
          expandedWidth={expandedWidth}
          expanded={isSidebarExpanded}
          onToggleExpand={setSidebarExpandedImmediate}
          onItemClick={handleItemClick}
          transitionDuration={hoverDelayMs}
          paperSx={{
            bgcolor: 'background.default',
            marginTop: `${topbarHeight}px`,
            height: `calc(100vh - ${topbarHeight}px)`,
            zIndex: isSidebarExpanded ? 0 : 10,
            transition: `width ${hoverDelayMs}ms ease, transform ${hoverDelayMs}ms ease, opacity ${hoverDelayMs}ms ease`,
            overflow: 'hidden',
          }}
        />
      </div>
    </div>
  );
};

export default SidebarWrapper;
