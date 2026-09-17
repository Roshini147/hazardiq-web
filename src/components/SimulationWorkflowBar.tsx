import React from 'react';
import { AlertCircle, Users, Building, ArrowUpRight, BellRing, Check } from 'lucide-react';

interface SimulationWorkflowBarProps {
  isEscalated: boolean;
  step?: number;
}

export const SimulationWorkflowBar: React.FC<SimulationWorkflowBarProps> = ({ isEscalated }) => {
  const stages = [
    {
      id: 1,
      title: 'RISK DETECTED',
      desc: isEscalated ? 'Zone B elevated to CRITICAL' : 'High flood runoff monitored',
      icon: AlertCircle,
      activeColor: 'bg-red-600 border-red-500 text-white',
    },
    {
      id: 2,
      title: 'IMPACT ASSESSED',
      desc: isEscalated ? 'Population surge: 3,100 → 5,500' : 'Baseline exposed: 3,100',
      icon: Users,
      activeColor: 'bg-orange-600 border-orange-500 text-white',
    },
    {
      id: 3,
      title: 'CAPACITY CHECKED',
      desc: isEscalated ? 'Safe Area C excluded (FULL)' : 'Evaluating 8 safe areas',
      icon: Building,
      activeColor: 'bg-amber-600 border-amber-500 text-white',
    },
    {
      id: 4,
      title: 'RELOCATION PRIORITIZED',
      desc: isEscalated ? 'Safe Area D recommended' : 'Priority P2 assigned',
      icon: ArrowUpRight,
      activeColor: 'bg-blue-600 border-blue-500 text-white',
    },
    {
      id: 5,
      title: 'ALERT PREPARED',
      desc: isEscalated ? 'Emergency broadcast ready' : 'Standard advisory queued',
      icon: BellRing,
      activeColor: 'bg-emerald-600 border-emerald-500 text-white',
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            Decision-Support Pipeline Status
          </span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          OPERATIONAL PROTOCOL ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 relative">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.id}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                isEscalated
                  ? `${stage.activeColor} shadow-md`
                  : 'bg-slate-950/80 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="text-[11px] font-black tracking-tight">{stage.title}</span>
                {isEscalated && <Check className="h-3 w-3 ml-auto text-white/90" />}
              </div>
              <p className="text-[10px] leading-tight opacity-90">{stage.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
