import React from 'react';

interface RiskBadgeProps {
  level: 'Critical' | 'High' | 'Moderate' | 'Low' | string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md' }) => {
  const normalized = level.toLowerCase();

  let colorClasses = 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30';
  let dotColor = 'bg-emerald-500';

  if (normalized.includes('crit')) {
    colorClasses = 'bg-red-500/10 text-red-700 border-red-500/30 font-bold';
    dotColor = 'bg-red-600 animate-pulse';
  } else if (normalized.includes('high')) {
    colorClasses = 'bg-orange-500/10 text-orange-700 border-orange-500/30 font-semibold';
    dotColor = 'bg-orange-500';
  } else if (normalized.includes('mod')) {
    colorClasses = 'bg-amber-500/10 text-amber-700 border-amber-500/30';
    dotColor = 'bg-amber-500';
  }

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-0.5 gap-1.5',
    lg: 'text-sm px-3 py-1 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border ${colorClasses} ${sizeClasses}`}
    >
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      <span>{level}</span>
    </span>
  );
};
