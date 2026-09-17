import React from 'react';
import { ShieldCheck, AlertOctagon, CheckCircle2, ArrowRight } from 'lucide-react';
import { SafeArea } from '../data/shelters';

interface CapacityRecommendationCardProps {
  fullShelter: SafeArea;
  recommendedAlternative: SafeArea;
  onSelectAlternative?: (shelter: SafeArea) => void;
}

export const CapacityRecommendationCard: React.FC<CapacityRecommendationCardProps> = ({
  fullShelter,
  recommendedAlternative,
  onSelectAlternative,
}) => {
  return (
    <div className="rounded-xl border-2 border-red-500/80 bg-red-50/50 p-5 shadow-lg space-y-4 animate-in fade-in zoom-in-95 duration-200">
      {/* Critical Alert Ribbon */}
      <div className="flex items-start gap-3 p-3.5 bg-red-600 text-white rounded-lg shadow-sm">
        <AlertOctagon className="h-6 w-6 flex-shrink-0 animate-bounce mt-0.5" />
        <div>
          <div className="font-black text-sm uppercase tracking-wide">
            CAPACITY CEILING REACHED — {fullShelter.code}
          </div>
          <p className="text-xs text-red-100 mt-0.5 font-medium">
            Occupancy: {fullShelter.occupancy.toLocaleString()} / {fullShelter.capacity.toLocaleString()} (Available: 0).
            <strong className="block text-white mt-1">
              Do not assign additional population to this location.
            </strong>
          </p>
        </div>
      </div>

      {/* HAZARDIQ Automated Recommendation */}
      <div className="bg-white border border-emerald-300 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                HAZARDIQ RECOMMENDATION
              </span>
              <h4 className="text-sm font-black text-slate-900">
                Alternative Safe Area Identified
              </h4>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            🟢 AVAILABLE
          </span>
        </div>

        {/* Recommended Shelter Metrics */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 mb-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                {recommendedAlternative.code}
              </span>
              <div className="text-base font-bold text-slate-900">
                {recommendedAlternative.name}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{recommendedAlternative.location}</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Available Capacity</div>
              <div className="text-2xl font-black text-emerald-600">
                {recommendedAlternative.available.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-200 text-center text-xs">
            <div>
              <span className="text-slate-500 block">Total Capacity</span>
              <strong className="text-slate-900 font-bold">{recommendedAlternative.capacity.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Current Occupancy</span>
              <strong className="text-slate-900 font-bold">{recommendedAlternative.occupancy.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Distance</span>
              <strong className="text-slate-900 font-bold">{recommendedAlternative.distanceKm} km</strong>
            </div>
          </div>
        </div>

        {/* Reason Checklist */}
        <div className="space-y-1.5 text-xs text-slate-700">
          <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
            Decision-Support Rationale:
          </div>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>Safe from current flood hazard and secondary inundation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>Sufficient available capacity to absorb evacuees without overflow</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>Accessible arterial roads with high accessibility rating ({recommendedAlternative.accessibilityScore}/100)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>Fully equipped with medical post, power backup, and food supply ({recommendedAlternative.suitabilityScore}/100)</span>
            </li>
          </ul>
        </div>

        {onSelectAlternative && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => onSelectAlternative(recommendedAlternative)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-colors"
            >
              <span>Assign to {recommendedAlternative.code}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
