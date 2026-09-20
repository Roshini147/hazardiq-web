import React from 'react';

interface HazardIQBrandProps {
  className?: string;
  hazardClass?: string;
  iqClass?: string;
  showTagline?: boolean;
  taglineClass?: string;
  taglineText?: string;
}

export const HazardIQBrand: React.FC<HazardIQBrandProps> = ({
  className = 'text-2xl font-black tracking-tight',
  hazardClass = 'text-inherit',
  iqClass = 'text-red-600',
  showTagline = false,
  taglineClass = 'text-xs text-slate-500',
  taglineText = 'AI-Powered Multi-Hazard Risk & Relocation Intelligence Platform',
}) => {
  return (
    <div className="inline-flex flex-col">
      <span className={className}>
        <span className={hazardClass}>HAZARD</span>
        <span className={iqClass}>IQ</span>
      </span>
      {showTagline && (
        <span className={taglineClass}>{taglineText}</span>
      )}
    </div>
  );
};

export default HazardIQBrand;
