import React from 'react';
import { StaticChennaiMap } from './StaticChennaiMap';

interface ChennaiMapProps {
  risks?: any[];
  selectedCategory?: 'all' | 'safe' | 'risk' | 'shelters' | 'hospitals';
  onSelectFeature?: (feature: any) => void;
}

export default function ChennaiMap({
  risks,
  selectedCategory = 'all',
  onSelectFeature,
}: ChennaiMapProps) {
  return (
    <StaticChennaiMap
      onSelectFeature={onSelectFeature}
    />
  );
}
