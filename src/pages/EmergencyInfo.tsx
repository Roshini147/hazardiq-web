import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { PhoneCall, ShieldAlert, HeartHandshake, CheckCircle2, AlertTriangle, LifeBuoy } from 'lucide-react';

export default function EmergencyInfo() {
  const { t, language } = useTranslation();

  const emergencyContacts = [
    { name: 'Greater Chennai Corporation Flood Helpline', name_ta: 'சென்னை மாநகராட்சி வெள்ள அவசர உதவி', number: '1913', desc: 'Waterlogging, fallen trees, relief shelter activation' },
    { name: 'State Disaster Management Control Room', name_ta: 'மாநில பேரிடர் மேலாண்மை கட்டுப்பாட்டு அறை', number: '1070', desc: 'TNSDMA 24x7 State Emergency Operations Centre' },
    { name: 'Chennai District Collectorate Control Room', name_ta: 'சென்னை மாவட்ட ஆட்சியர் கட்டுப்பாட்டு அறை', number: '1077', desc: 'District administrative coordination & NDRF/SDRF dispatch' },
    { name: 'Emergency Medical Ambulance', name_ta: 'அவசர மருத்துவ ஆம்புலன்ஸ் சேவை', number: '108', desc: 'Immediate trauma and emergency medical evacuation' },
    { name: 'Tamil Nadu Fire & Rescue Services', name_ta: 'தீயணைப்பு & மீட்புப் பணிகள் துறை', number: '101', desc: 'Boat rescue operations & hazardous structural rescue' },
    { name: 'Coastal Security & Marine Emergency', name_ta: 'கடலோர பாதுகாப்பு கட்டுப்பாட்டு மையம்', number: '1093', desc: 'Coastal storm surge & fisherman rescue coordination' },
  ];

  return (
    <div>
      <div className="page-title">
        <div>
          <h2>{language === 'ta' ? 'அவசரகால தகவல் & தொடர்பு எண்கள்' : 'Emergency Information & Helplines'}</h2>
          <p>
            {language === 'ta'
              ? 'சென்னை மாநகர பேரிடர் கட்டுப்பாட்டு மையங்களின் 24 மணி நேர அதிகாரப்பூர்வ அவசர உதவி எண்கள் மற்றும் வழிகாட்டுதல்கள்.'
              : 'Verified 24x7 government emergency helplines and standard operating procedures for Chennai.'}
          </p>
        </div>
      </div>

      {/* Emergency Contacts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {emergencyContacts.map((c, idx) => (
          <div key={idx} className="panel" style={{ padding: '18px 20px', borderLeft: '4px solid #1e3a8a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <strong style={{ fontSize: '14px', color: '#0f172a' }}>
                  {language === 'ta' ? c.name_ta : c.name}
                </strong>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>{c.desc}</p>
              </div>
              <PhoneCall size={18} color="#1e3a8a" />
            </div>

            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <a
                href={`tel:${c.number}`}
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#b91c1c',
                  textDecoration: 'none',
                  letterSpacing: '0.05em'
                }}
              >
                {c.number}
              </a>
              <span style={{ fontSize: '11px', background: '#fee2e2', color: '#991b1b', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                24x7 TOLL FREE
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* SOPs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Do's */}
        <div className="panel" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#047857', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={20} color="#059669" />
            {language === 'ta' ? 'செய்ய வேண்டியவை (Do’s)' : 'Flood & Cyclone Safety Protocols (Do’s)'}
          </h3>
          <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.8 }}>
            <li>{language === 'ta' ? 'அதிகாரப்பூர்வ பேரிடர் எச்சரிக்கைகளை HAZARDIQ தளம் மூலம் தொடர்ந்து கண்காணிக்கவும்.' : 'Keep emergency go-bag ready with drinking water, dry rations, torch, powerbank, and essential medicines.'}</li>
            <li>{language === 'ta' ? 'ரேஷன் கார்டு, ஆதார் போன்ற முக்கிய ஆவணங்களை நீர்புகா பைகளில் பத்திரப்படுத்தவும்.' : 'Wrap identity cards, property records, and medical papers in waterproof polythene pouches.'}</li>
            <li>{language === 'ta' ? 'தாழ்வான பகுதிகளில் உள்ளவர்கள் உடனடியாக அருகிலுள்ள கார்ப்பரேஷன் நிவாரண மையங்களுக்குச் செல்லவும்.' : 'Move early to the nearest designated GCC relief shelter before flood roads become impassable.'}</li>
            <li>{language === 'ta' ? 'குடிநீரைக் காய்ச்சி வடிகட்டியே பருகவும்; க்ளோரின் மாத்திரைகளைப் பயன்படுத்தவும்.' : 'Drink only boiled or chlorinated water to prevent waterborne contamination.'}</li>
            <li>{language === 'ta' ? 'வீட்டு மின் இணைப்பை உடனடியாக துண்டிக்கவும்.' : 'Switch off main electrical breakers and LPG cylinders if water enters premises.'}</li>
          </ul>
        </div>

        {/* Don'ts */}
        <div className="panel" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} color="#dc2626" />
            {language === 'ta' ? 'செய்யக் கூடாதவை (Don’ts)' : 'Critical Hazards to Avoid (Don’ts)'}
          </h3>
          <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '13px', color: '#334155', lineHeight: 1.8 }}>
            <li>{language === 'ta' ? 'வெள்ளம் பெருக்கெடுத்து ஓடும் சாலைகள் அல்லது சுரங்கப்பாதைகளில் வாகனங்களை இயக்க வேண்டாம்.' : 'Never drive through flooded subways, storm drains, or low bridges.'}</li>
            <li>{language === 'ta' ? 'அறுந்து கிடக்கும் மின் கம்பிகள் அல்லது மின் கம்பங்கள் அருகில் செல்ல வேண்டாம்.' : 'Stay clear of fallen electrical poles, downed wires, and waterlogged transformer posts.'}</li>
            <li>{language === 'ta' ? 'சமூக ஊடகங்களில் வரும் ஆதாரமற்ற வதந்திகளைப் பகிர வேண்டாம்.' : 'Do not forward unverified rumors or panic messages on social media.'}</li>
            <li>{language === 'ta' ? 'முழு கொள்ளளவு எட்டிய நிவாரண மையங்களை நோக்கி மேலும் மக்கள் செல்ல வேண்டாம்.' : 'Do not proceed to shelters flagged as FULL in HAZARDIQ; seek available alternate centers.'}</li>
            <li>{language === 'ta' ? 'வெள்ள நீரில் குழந்தைகள் விளையாடவோ, குளிக்கவோ அனுமதிக்கக் கூடாது.' : 'Do not allow children to swim or walk in stagnant flood runoff.'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
