import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CitizenReport } from '../data/reports';
import {
  FileText,
  MapPin,
  AlertTriangle,
  Camera,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CitizenReportPage: React.FC = () => {
  const { addCitizenReport, reports, zones, t, language } = useApp();

  const [location, setLocation] = useState('');
  const [zone, setZone] = useState('Zone A');
  const [hazardType, setHazardType] = useState<CitizenReport['hazardType']>('Flooding');
  const [severity, setSeverity] = useState<CitizenReport['severity']>('Critical');
  const [description, setDescription] = useState('');
  const [photoSelected, setPhotoSelected] = useState<string>('https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80');
  const [submittedReport, setSubmittedReport] = useState<CitizenReport | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !description.trim()) {
      alert(language === 'ta' ? 'இடம் மற்றும் விவரத்தை நிரப்பவும்.' : 'Please fill out the location and description fields.');
      return;
    }

    const report = addCitizenReport({
      location,
      zone,
      hazardType,
      severity,
      description,
      photoUrl: photoSelected,
    });

    setSubmittedReport(report);
  };

  const handleResetForm = () => {
    setSubmittedReport(null);
    setLocation('');
    setDescription('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-red-600 text-white">
            {language === 'ta' ? 'பொதுமக்கள் அவசர தகவல் பதிவு' : 'CITIZEN REPORTING PORTAL'}
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
            {language === 'ta' ? 'நேரடி பேரிடர் கண்காணிப்பு' : 'DIRECT FIELD FEEDBACK'}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white">
          {language === 'ta' ? 'அபாயகரமான சூழ்நிலையை புகாரளிக்கவும்' : 'Report a Dangerous Condition'}
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          {language === 'ta'
            ? 'திடீர் வெள்ள நீர் நுழைவு, வடிகால் அடைப்பு அல்லது சாலைத் துண்டிப்பு பற்றிய கள நிலவரங்களை சமர்ப்பிக்கவும். சரிபார்க்கப்பட்ட புகார்கள் உடனடியாக மண்டல மீட்பு குழுவுக்கு அனுப்பப்படும்.'
            : 'Submit field observations of sudden water ingress, drainage breaches, or road blockages. Validated submissions immediately alert the zonal response authority.'}
        </p>
      </div>

      {/* Submission Success View */}
      {submittedReport ? (
        <div className="bg-white rounded-2xl border-2 border-emerald-500 p-8 shadow-xl text-center space-y-5 animate-in zoom-in-95 duration-200">
          <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest block mb-1">
              REPORT FORWARDED TO COMMAND CENTER
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Report Submitted Successfully
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
              Your report has been forwarded to the disaster-management monitoring team and logged in the persistent state cache.
            </p>
          </div>

          {/* Generated Report ID Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <span className="text-slate-500 font-semibold">Report Tracking ID:</span>
              <strong className="text-base font-mono font-black text-red-600">
                {submittedReport.reportId}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Location:</span>
              <strong className="text-slate-800 font-bold">{submittedReport.location}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Hazard Type:</span>
              <strong className="text-slate-800 font-bold">{submittedReport.hazardType}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Severity:</span>
              <strong className="text-red-700 font-bold">{submittedReport.severity}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 font-mono">
                {submittedReport.status}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={handleResetForm}
              className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow"
            >
              Submit Another Report
            </button>
            <Link
              to="/admin/dashboard"
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1.5"
            >
              <span>View in Government Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        /* Report Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Location Field */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-red-600" />
                <span>
                  {language === 'ta' ? 'சம்பவ இடம் (தெரு / முக்கிய அடையாளம் / வார்டு எண்) *' : 'Incident Location (Street / Landmark / Ward) *'}
                </span>
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={
                  language === 'ta'
                    ? 'எ.கா: வேளச்சேரி 100 அடி சாலை சந்திப்பு, எம்.ஆர்.டி.எஸ் நிலையம் அருகில்'
                    : 'e.g. Velachery 100 Feet Road Junction near MRTS station'
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-slate-900"
              />
            </div>

            {/* Target Zone */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">
                {language === 'ta' ? 'சென்னை நிர்வாக மண்டலம் *' : 'Chennai Administrative Zone *'}
              </label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-slate-900 font-medium"
              >
                {zones.map(z => (
                  <option key={z.id} value={z.code}>
                    {z.code} — {z.areaName}
                  </option>
                ))}
              </select>
            </div>

            {/* Hazard Type */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-800">
                {language === 'ta' ? 'ஆபத்து வகை *' : 'Hazard Type *'}
              </label>
              <select
                value={hazardType}
                onChange={(e) => setHazardType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-slate-900 font-medium"
              >
                <option value="Flooding">{language === 'ta' ? 'வெள்ளம் (கடும் நீர் தேக்கம்)' : 'Flooding (Extreme Inundation)'}</option>
                <option value="Waterlogging">{language === 'ta' ? 'நீர் தேங்குதல்' : 'Waterlogging (Subsurface Ponding)'}</option>
                <option value="Coastal Risk">{language === 'ta' ? 'கடலோர ஆபத்து (உயர் அலைகள்)' : 'Coastal Risk (High Wave Breaches)'}</option>
                <option value="Road Blockage">{language === 'ta' ? 'சாலைத் தடை (போக்குவரத்து துண்டிப்பு)' : 'Road Blockage (Access Constriction)'}</option>
                <option value="Building Damage">{language === 'ta' ? 'கட்டிட சேதம் / கட்டமைப்பு ஆபத்து' : 'Building Damage / Structural Risk'}</option>
                <option value="Other">{language === 'ta' ? 'பிற அவசர நிலை' : 'Other Emergency'}</option>
              </select>
            </div>

            {/* Severity */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="font-bold text-slate-800">
                {language === 'ta' ? 'ஆபத்தின் தீவிரம் *' : 'Estimated Hazard Severity *'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['Low', 'Medium', 'High', 'Critical'] as const).map((sev) => {
                  const isChecked = severity === sev;
                  const color =
                    sev === 'Critical' ? 'border-red-600 bg-red-50 text-red-700' :
                    sev === 'High' ? 'border-orange-500 bg-orange-50 text-orange-700' :
                    sev === 'Medium' ? 'border-amber-500 bg-amber-50 text-amber-700' :
                    'border-emerald-500 bg-emerald-50 text-emerald-700';

                  const label =
                    language === 'ta'
                      ? sev === 'Critical' ? 'மிகத் தீவிரம் (Critical)' :
                        sev === 'High' ? 'அதிகம் (High)' :
                        sev === 'Medium' ? 'நடுத்தரம் (Medium)' : 'குறைவு (Low)'
                      : sev;

                  return (
                    <button
                      type="button"
                      key={sev}
                      onClick={() => setSeverity(sev)}
                      className={`py-2.5 px-3 rounded-lg border font-bold text-xs text-center transition-all ${
                        isChecked ? `${color} ring-2 ring-slate-900` : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="font-bold text-slate-800">
                {language === 'ta' ? 'அவசர நிலை & பாதிக்கப்பட்ட நபர்கள் பற்றிய விவரம் *' : 'Description of Emergency & Stranded Persons *'}
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={
                  language === 'ta'
                    ? 'தற்போதைய நீர் மட்டம், சிக்கித் தவிக்கும் நபர்கள் (குழந்தைகள், முதியவர்கள்), தடுக்கப்பட்ட வெளியேற்ற வழிகள் பற்றி விளக்கவும்...'
                    : 'Describe current water height, stranded individuals (e.g. infants, elderly persons), blocked evacuation routes...'
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-slate-900"
              />
            </div>

            {/* Photo Upload UI */}
            <div className="space-y-2 md:col-span-2">
              <label className="font-bold text-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Camera className="h-3.5 w-3.5 text-slate-600" />
                  <span>{language === 'ta' ? 'கள புகைப்பட ஆதாரம் இணைக்கவும்' : 'Attach Photographic Evidence'}</span>
                </span>
                <span className="text-[11px] text-slate-400 font-normal">
                  {language === 'ta' ? 'கள புகைப்படம்' : 'Field Evidence Image'}
                </span>
              </label>

              <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center space-y-3">
                <img
                  src={photoSelected}
                  alt="Incident Preview"
                  className="h-36 w-full object-cover rounded-lg border border-slate-200 mx-auto"
                />
                <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
                  <span className="text-slate-500 font-medium">
                    {language === 'ta' ? 'கள புகைப்பட மாதிரியை தேர்வு செய்யவும்:' : 'Select field photo reference:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPhotoSelected('https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80')}
                    className="px-2 py-1 rounded bg-white border border-slate-200 hover:bg-slate-100 font-bold"
                  >
                    {language === 'ta' ? 'தெரு வெள்ளம்' : 'Street Flooding'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoSelected('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80')}
                    className="px-2 py-1 rounded bg-white border border-slate-200 hover:bg-slate-100 font-bold"
                  >
                    {language === 'ta' ? 'சாலை மூழ்குதல்' : 'Road Inundation'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoSelected('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80')}
                    className="px-2 py-1 rounded bg-white border border-slate-200 hover:bg-slate-100 font-bold"
                  >
                    {language === 'ta' ? 'கடல் அலை சீற்றம்' : 'Coastal Waves'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-md transition-all transform hover:-translate-y-0.5"
            >
              {t.submitReport}
            </button>
          </div>
        </form>
      )}

      {/* Recent Citizen Reports Stream */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              {language === 'ta'
                ? `சமீபத்திய கள அவசர பதிவுகள் (${reports.length})`
                : `Recent Verified Field Submissions (${reports.length})`}
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {language === 'ta' ? 'நிகழ்நேர களத் தரவு' : 'Real-time Emergency Feed'}
          </span>
        </div>

        <div className="space-y-3">
          {reports.slice(0, 3).map((rep) => (
            <div
              key={rep.id}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-red-600">{rep.reportId}</span>
                  <span className="font-bold text-slate-900">{rep.location}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      rep.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {rep.severity}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] line-clamp-1">{rep.description}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 text-[11px]">
                <span className="text-slate-400">{rep.timestamp}</span>
                <span className="px-2 py-0.5 rounded font-bold bg-slate-200 text-slate-800">
                  {rep.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
