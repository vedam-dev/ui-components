import { SyntheticEvent } from 'react';

export interface INavigationItem {
  uri: string;
  label: string;
  accessibilityLabel: string;
  selected: boolean;
  isExternal: boolean;
  key?: string;
  hidden?: boolean;
  onClick?: (e: SyntheticEvent) => void;
}

export interface INavigationItemMultiple extends INavigationItem {
  subItems: INavigationItem[];
}

export type NavigationMenuItem = INavigationItem | INavigationItemMultiple;

export type OnNavigationClick = (
  e: SyntheticEvent,
  item: Pick<NavigationMenuItem, 'uri' | 'isExternal' | 'onClick' | 'label'>
) => void | Promise<void>;

export type onDropdownClick = (item: Pick<NavigationMenuItem, 'label'>) => void | Promise<void>;

export type NavigationMenuItems = NavigationMenuItem[];
