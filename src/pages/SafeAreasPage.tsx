import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SafeArea } from '../data/shelters';
import { CapacityRecommendationCard } from '../components/CapacityRecommendationCard';
import { evaluateShelterCapacity } from '../utils/capacityEngine';
import {
  Building2,
  Users,
  ShieldCheck,
  AlertOctagon,
  ArrowRight,
  Filter,
  CheckCircle2,
  Navigation,
  Activity,
  Phone,
  Sparkles,
} from 'lucide-react';

export const SafeAreasPage: React.FC = () => {
  const { shelters, t, language } = useApp();
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'AVAILABLE' | 'LIMITED' | 'FULL'>('ALL');
  const [inspectedShelter, setInspectedShelter] = useState<SafeArea>(
    shelters.find(s => s.code === 'SAFE AREA C') || shelters[2]
  );

  const filteredShelters = shelters.filter(s => {
    if (filterStatus === 'ALL') return true;
    return s.status === filterStatus;
  });

  const capacityEvaluation = evaluateShelterCapacity(inspectedShelter, 0, shelters);
  const fullShelterC = shelters.find(s => s.code === 'SAFE AREA C') || shelters[2];
  const alternativeShelterD = shelters.find(s => s.code === 'SAFE AREA D') || shelters[3];

  const totalCapacity = shelters.reduce((acc, s) => acc + s.capacity, 0);
  const totalOccupancy = shelters.reduce((acc, s) => acc + s.occupancy, 0);
  const totalAvailable = totalCapacity - totalOccupancy;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-600 text-white">
                {language === 'ta' ? 'தாங்கும் திறன் பகுப்பாய்வு' : 'CARRYING CAPACITY INTELLIGENCE'}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {language === 'ta' ? '8 சென்னை நிவாரண மையங்கள்' : '8 CHENNAI RELIEF HUBS'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              {language === 'ta'
                ? 'பாதுகாப்பான பகுதிகள் & தாங்கும் திறன் மதிப்பீடு'
                : 'Safe Areas & Carrying Capacity Assessment'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {language === 'ta'
                ? 'நிவாரண முகாம்களின் ஆக்கிரமிப்பு நிலை, கொள்ளளவு வரம்புகள் மற்றும் முகாம் நிரம்பும்போது தானியங்கி மாற்று வழிகாட்டுதல் முறை.'
                : 'Real-time monitoring of shelter occupancy, threshold limits, and dynamic redirection logic when safe areas reach maximum carrying capacity.'}
            </p>
          </div>

          {/* Quick Aggregate Indicators */}
          <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">
                {language === 'ta' ? 'மொத்த கொள்ளளவு' : 'Total Capacity'}
              </span>
              <span className="text-base font-extrabold text-white">{totalCapacity.toLocaleString()}</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[11px]">
                {language === 'ta' ? 'தற்போதைய ஆக்கிரமிப்பு' : 'Total Occupancy'}
              </span>
              <span className="text-base font-extrabold text-amber-400">{totalOccupancy.toLocaleString()}</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[11px]">
                {language === 'ta' ? 'கிடைக்கும் இடம்' : 'Available Capacity'}
              </span>
              <span className="text-base font-extrabold text-emerald-400">{totalAvailable.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* AUTOMATED CARRYING CAPACITY PROTECTION & REDIRECTION LOGIC */}
      <section className="bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border-2 border-red-500/50 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-sm">
              !
            </span>
            <div>
              <h2 className="text-lg font-black text-white">
                {language === 'ta'
                  ? 'தானியங்கி முகாம் தாங்கும் திறன் பாதுகாப்பு & மாற்று வழிகாட்டுதல்'
                  : 'Automated Carrying Capacity Protection & Shelter Redirect Engine'}
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'ta'
                  ? 'நிறைந்த முகாம்களில் நெரிசலைத் தடுத்து மக்களை அருகிலுள்ள பாதுகாப்பான மையங்களுக்கு தானாக வழிகாட்டுகிறது.'
                  : 'Real-time automated overflow prevention, capacity deficit mitigation, and intelligent evacuation redirection.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setInspectedShelter(fullShelterC)}
            className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>
              {language === 'ta' ? 'நிறைந்த முகாம் ஆய்வு (Safe Area C)' : 'Inspect Saturated Hub (Safe Area C - FULL)'}
            </span>
          </button>
        </div>

        {/* Dynamic Evaluation Output */}
        {inspectedShelter.status === 'FULL' && capacityEvaluation.recommendedAlternative && (
          <CapacityRecommendationCard
            fullShelter={inspectedShelter}
            recommendedAlternative={capacityEvaluation.recommendedAlternative.shelter}
            onSelectAlternative={(s) => setInspectedShelter(s)}
          />
        )}

        {inspectedShelter.status !== 'FULL' && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-emerald-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              <span>
                {language === 'ta' ? 'தற்போது கண்காணிக்கப்படும் மையம்: ' : 'Currently inspecting '}{' '}
                <strong>{inspectedShelter.name}</strong> — {language === 'ta' ? 'நிலை:' : 'Status:'}{' '}
                <strong className="text-emerald-300">{inspectedShelter.status}</strong> ({inspectedShelter.available.toLocaleString()} {language === 'ta' ? 'இடங்கள் உள்ளன' : 'slots available'}).
              </span>
            </div>
            <button
              onClick={() => setInspectedShelter(fullShelterC)}
              className="text-xs text-amber-300 font-bold underline hover:text-amber-200"
            >
              {language === 'ta' ? 'நிறைந்த முகாமுக்கு மாறுக (Safe Area C) →' : 'Switch to Full Shelter (Safe Area C) →'}
            </button>
          </div>
        )}
      </section>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {language === 'ta' ? 'முகாம் வடிகட்டல்:' : 'Filter Shelters:'}
          </span>
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 text-xs">
            {(['ALL', 'AVAILABLE', 'LIMITED', 'FULL'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-md font-bold transition-colors ${
                  filterStatus === status
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status === 'ALL'
                  ? language === 'ta' ? 'அனைத்தும்' : 'ALL'
                  : status === 'AVAILABLE'
                  ? language === 'ta' ? 'கிடைக்கிறது' : 'AVAILABLE'
                  : status === 'LIMITED'
                  ? language === 'ta' ? 'வரம்பிற்குட்பட்டது' : 'LIMITED'
                  : language === 'ta' ? 'நிறைந்தது' : 'FULL'}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs text-slate-500 font-medium">
          {language === 'ta'
            ? `8 சென்னை பாதுகாப்பான முகாம்களில் ${filteredShelters.length} காட்டப்படுகிறது`
            : `Showing ${filteredShelters.length} of ${shelters.length} designated Chennai safe areas`}
        </span>
      </div>

      {/* 8 Safe Area Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredShelters.map((shelter) => {
          const isSelected = inspectedShelter.id === shelter.id;
          const isFull = shelter.status === 'FULL';
          const isLimited = shelter.status === 'LIMITED';
          const occupancyRate = Math.round((shelter.occupancy / shelter.capacity) * 100);

          return (
            <div
              key={shelter.id}
              onClick={() => setInspectedShelter(shelter)}
              className={`bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative ${
                isSelected
                  ? 'border-slate-900 ring-2 ring-slate-900'
                  : isFull
                  ? 'border-red-300 hover:border-red-400'
                  : 'border-slate-200'
              }`}
            >
              {/* Card Top */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[11px] font-mono font-black text-slate-500 uppercase tracking-wider block">
                      {shelter.code}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 leading-tight">
                      {shelter.name}
                    </h3>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                      isFull
                        ? 'bg-red-100 text-red-700 border-red-300 animate-pulse'
                        : isLimited
                        ? 'bg-amber-100 text-amber-700 border-amber-300'
                        : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                    }`}
                  >
                    {isFull
                      ? language === 'ta' ? '🔴 நிறைந்தது' : '🔴 FULL'
                      : isLimited
                      ? language === 'ta' ? '🟠 வரம்பிற்குட்பட்டது' : '🟠 LIMITED'
                      : language === 'ta' ? '🟢 கிடைக்கிறது' : '🟢 AVAILABLE'}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-3 line-clamp-1">{shelter.location}</p>

                {/* Progress Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">{language === 'ta' ? 'ஆக்கிரமிப்பு:' : 'Occupancy:'}</span>
                    <span className="font-bold text-slate-800">
                      {shelter.occupancy.toLocaleString()} / {shelter.capacity.toLocaleString()} ({occupancyRate}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isFull ? 'bg-red-600' : isLimited ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, occupancyRate)}%` }}
                    />
                  </div>
                </div>

                {/* Capacity Stats Box */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs mb-3">
                  <div>
                    <span className="text-[11px] text-slate-500 block">
                      {language === 'ta' ? 'கிடைக்கும் இடம்:' : 'Available:'}
                    </span>
                    <strong className={`text-base font-black ${isFull ? 'text-red-600' : 'text-emerald-700'}`}>
                      {shelter.available.toLocaleString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">
                      {language === 'ta' ? 'தொலைவு:' : 'Distance:'}
                    </span>
                    <strong className="text-base font-black text-slate-800">
                      {shelter.distanceKm} km
                    </strong>
                  </div>
                </div>

                {/* Scores */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-100 pt-2.5">
                  <span>
                    {language === 'ta' ? 'அணுகல்தன்மை:' : 'Accessibility:'} <strong className="text-slate-900">{shelter.accessibilityScore}/100</strong>
                  </span>
                  <span>
                    {language === 'ta' ? 'பொருத்தம்:' : 'Suitability:'} <strong className="text-slate-900">{shelter.suitabilityScore}/100</strong>
                  </span>
                </div>
              </div>

              {/* Card Bottom / Interactive Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {isFull ? (
                  <span className="text-red-600 font-bold text-[11px]">
                    ⛔ {language === 'ta' ? 'அதிகபட்ச கொள்ளளவு அடைந்தது' : 'Max Capacity Reached'}
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{language === 'ta' ? 'மக்களை ஏற்கிறது' : 'Accepting Evacuees'}</span>
                  </span>
                )}
                <span className="text-slate-400 font-semibold group-hover:text-slate-800 text-[11px]">
                  {isSelected
                    ? (language === 'ta' ? 'ஆய்வில் உள்ளது ✓' : 'Inspecting ✓')
                    : (language === 'ta' ? 'ஆய்வு செய் →' : 'Inspect →')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
