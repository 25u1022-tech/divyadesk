import React from 'react';

export type HotspotType = 'content' | 'delight' | 'action';

export interface HotspotItem {
  id: string;
  type: HotspotType;
  title: string;
  icon: React.ElementType;
  color: string;
  content?: React.ReactNode;
}
