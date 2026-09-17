export type Language = 'en' | 'ta';

export const TRANSLATIONS = {
  en: {
    appTitle: 'HAZARDIQ',
    appSubtitle: 'AI-Powered Multi-Hazard Risk & Relocation Intelligence Platform',
    operationalNotice: 'GOVERNMENT DISASTER MANAGEMENT PLATFORM — OPERATIONAL',
    authorityStatement: 'DISASTER RISK INTELLIGENCE COMMAND | GREATER CHENNAI REGION',
    authoritySubtitle: 'State Disaster Management Authority & Greater Chennai Corporation Unified Decision Support',
    officialAlert: 'OFFICIAL EMERGENCY BROADCAST — TNSDMA / GCC',
    operationalOnly: 'OFFICIAL OPERATIONAL DISASTER INTELLIGENCE PLATFORM',
    
    // Core Disaster Management Terminology (Prompt Section 14)
    riskAssessment: 'Risk Assessment',
    hazardAnalysis: 'Hazard Analysis',
    vulnerableHabitations: 'Vulnerable Habitations',
    populationExposure: 'Population Exposure',
    carryingCapacity: 'Carrying Capacity',
    capacityDeficit: 'Capacity Deficit',
    relocationPriority: 'Relocation Priority',
    safeRelocationZone: 'Safe Relocation Zone',
    emergencyAlert: 'Emergency Alert',
    affectedArea: 'Affected Area',
    riskLevel: 'Risk Level',
    riskScore: 'Risk Score',
    evacuationRoute: 'Evacuation Route',
    disasterResponse: 'Disaster Response',
    multiHazardAnalysis: 'Multi-Hazard Analysis',

    // Nav
    navHome: 'Home',
    navRiskMap: 'Risk Map',
    navSafeAreas: 'Safe Areas',
    navAlerts: 'Alerts',
    navReport: 'Report Hazard',
    navRelocation: 'Relocation Priority',
    navVulnerability: 'Vulnerability',
    navHowItWorks: 'How It Works',
    navEmergency: 'Emergency: 112',
    navLowBandwidth: 'Low Bandwidth',

    // Hero
    heroTitle: 'From Risk Identification to Safe Relocation',
    heroDescription: 'HAZARDIQ provides real-time multi-hazard intelligence, identifies vulnerable habitations, calculates safe-area carrying capacity, prioritizes evacuation, and coordinates emergency alerts for the Greater Chennai Metropolitan Area.',
    coreMessage1: 'HAZARDIQ connects hazard identification, vulnerability assessment, carrying capacity and relocation prioritization into one unified decision-support workflow.',
    coreMessage2: 'HAZARDIQ recommends. Authorized officials decide.',
    exploreMapCta: 'Explore Chennai Risk Map',
    viewRelocationCta: 'View Relocation Options',
    reportHazardCta: 'Report Incident',

    // Features
    featHazardTitle: 'Hazard Identification',
    featHazardDesc: 'Identify high-risk and critical inundation and storm-surge red zones across Chennai with real-time GIS mapping.',
    featCapacityTitle: 'Carrying Capacity',
    featCapacityDesc: 'Assess in real-time whether safe shelters and relief centres can accommodate affected populations without exceeding capacity thresholds.',
    featRelocationTitle: 'Relocation Prioritization',
    featRelocationDesc: 'Identify who must be relocated first and dynamically match vulnerable habitations to viable designated safe areas.',

    // Risk Levels
    riskCritical: 'Critical / Extreme Risk',
    riskHigh: 'High Risk',
    riskModerate: 'Moderate Risk',
    riskLow: 'Low Risk',

    // Status
    statusAvailable: 'AVAILABLE',
    statusLimited: 'LIMITED',
    statusFull: 'FULL',

    // Priority
    priorityP1: 'P1 — IMMEDIATE',
    priorityP2: 'P2 — WITHIN 6 HRS',
    priorityP3: 'P3 — PREPARE',
    priorityP4: 'P4 — MONITOR',

    // Actions
    viewSafeAreas: 'View Safe Areas',
    openApp: 'Open HAZARDIQ',
    relocationGuidance: 'Relocation Guidance',
    submitReport: 'Submit Incident Report',
    sendAlert: 'SEND ALERT',
    simulateEscalation: 'SIMULATE RISK ESCALATION',
    revertSimulation: 'RESET SIMULATION',
    review: 'Review',
    verify: 'Verify',
    createAlert: 'Create Alert',
    copyNotepad: 'Copy to Notepad',
    exportLog: 'Export Alert Log (.txt)',

    // Map & Layers
    allLayers: 'All Layers',
    floodLayer: '1. Flood',
    cycloneLayer: '2. Cyclone',
    multiHazardLayer: '3. Multi-Hazard',
    vulnerabilityLayer: '4. Vulnerability',
    exposureLayer: '5. Exposure',
    capacityLayer: '6. Carrying Capacity',
    priorityLayer: '7. Relocation Priority',
    routes: 'Evacuation Routes',
    shelters: 'Relief Shelters',
    hospitals: 'Emergency Hospitals',
    recenter: 'Recenter Chennai',

    // Metrics
    totalCapacity: 'Total Capacity',
    currentOccupancy: 'Current Occupancy',
    availableCapacity: 'Available Capacity',
    statusFullWarning: 'SHELTER AT MAXIMUM CARRYING CAPACITY — REDIRECT REQUIRED',
  },
  ta: {
    appTitle: 'ஹசார்ட் ஐக்யூ (HAZARDIQ)',
    appSubtitle: 'செயற்கை நுண்ணறிவு பல-அபாய இடர் & மறுகுடியேற்ற நுண்ணறிவு தளம்',
    operationalNotice: 'அதிகாரப்பூர்வ அரசு பேரிடர் மேலாண்மை தளம் — செயல்பாட்டில் உள்ளது',
    authorityStatement: 'பேரிடர் அபாய நுண்ணறிவு கட்டுப்பாட்டு மையம் | பெருநகர சென்னை பகுதி',
    authoritySubtitle: 'தமிழ்நாடு மாநில பேரிடர் மேலாண்மை ஆணையம் & பெருநகர சென்னை மாநகராட்சி ஒருங்கிணைந்த முடிவெடுக்கும் தளம்',
    officialAlert: 'அதிகாரப்பூர்வ அவசர எச்சரிக்கை ஒளிபரப்பு — TNSDMA / GCC',
    operationalOnly: 'அங்கீகரிக்கப்பட்ட பேரிடர் நுண்ணறிவு தளம்',

    // Core Disaster Management Terminology (Prompt Section 15)
    riskAssessment: 'ஆபத்து மதிப்பீடு',
    hazardAnalysis: 'பேரிடர் அபாய பகுப்பாய்வு',
    vulnerableHabitations: 'பாதிப்புக்குள்ளாகக்கூடிய குடியிருப்புகள்',
    populationExposure: 'மக்கள் வெளிப்பாடு',
    carryingCapacity: 'தாங்கும் திறன்',
    capacityDeficit: 'தாங்கும் திறன் பற்றாக்குறை',
    relocationPriority: 'இடமாற்ற முன்னுரிமை',
    safeRelocationZone: 'பாதுகாப்பான இடமாற்றப் பகுதி',
    emergencyAlert: 'அவசர எச்சரிக்கை',
    affectedArea: 'பாதிக்கப்பட்ட பகுதி',
    riskLevel: 'ஆபத்து நிலை',
    riskScore: 'ஆபத்து மதிப்பெண்',
    evacuationRoute: 'வெளியேற்றப் பாதை',
    disasterResponse: 'பேரிடர் மீட்பு நடவடிக்கை',
    multiHazardAnalysis: 'பல்வேறு பேரிடர் அபாய பகுப்பாய்வு',

    // Nav
    navHome: 'முகப்பு',
    navRiskMap: 'ஆபத்து வரைபடம்',
    navSafeAreas: 'பாதுகாப்பான பகுதிகள்',
    navAlerts: 'எச்சரிக்கைகள்',
    navReport: 'ஆபத்தைப் புகாரளிக்கவும்',
    navRelocation: 'மறுகுடியேற்ற முன்னுரிமை',
    navVulnerability: 'பாதிப்புத்தன்மை',
    navHowItWorks: 'செயல்முறை விளக்கம்',
    navEmergency: 'அவசர எண்: 112',
    navLowBandwidth: 'குறைந்த அலைவரிசை பயன்முறை',

    // Hero
    heroTitle: 'ஆபத்தை அடையாளம் காண்பதிலிருந்து பாதுகாப்பான மறுகுடியேற்றம் வரை',
    heroDescription: 'சென்னையில் பேரிடர் அபாயங்களை உடனுக்குடன் கண்டறிந்து, பாதிக்கப்படக்கூடிய குடியிருப்புகளை அடையாளம் கண்டு, நிவாரண முகாம்களின் தாங்கும் திறனைக் கணித்து, உடனடி அவசர எச்சரிக்கைகளை வழங்க HAZARDIQ உதவுகிறது.',
    coreMessage1: 'HAZARDIQ ஆபத்து அடையாளம், பாதிப்பு மதிப்பீடு, கொள்ளளவு மற்றும் மறுகுடியேற்ற முன்னுரிமை ஆகியவற்றை ஒரே முடிவெடுக்கும் பணிப்பாய்வில் இணைக்கிறது.',
    coreMessage2: 'HAZARDIQ பரிந்துரைக்கிறது. அங்கீகரிக்கப்பட்ட அதிகாரிகளே முடிவெடுக்கின்றனர்.',
    exploreMapCta: 'சென்னை வரைபடத்தை ஆராயுங்கள்',
    viewRelocationCta: 'மறுகுடியேற்ற வழிகளைக் காண்க',
    reportHazardCta: 'சம்பவத்தைப் புகாரளிக்கவும்',

    // Features
    featHazardTitle: 'ஆபத்து அடையாளம் காணல்',
    featHazardDesc: 'சென்னையில் தீவிர வெள்ளம் மற்றும் புயல் அலை அபாய சிவப்பு மண்டலங்களை துல்லிய புவிசார் வரைபடத்தின் மூலம் கண்டறிகிறது.',
    featCapacityTitle: 'முகாம் கொள்ளளவு மதிப்பீடு',
    featCapacityDesc: 'பாதிக்கப்பட்ட மக்களுக்கு நிவாரண முகாம்களில் போதுமான இடம் உள்ளதா என்பதை நேரடியாக சரிபார்க்கிறது.',
    featRelocationTitle: 'மறுகுடியேற்ற முன்னுரிமை',
    featRelocationDesc: 'யாரை முதலில் வெளியேற்ற வேண்டும் என்பதை அடையாளம் கண்டு தகுந்த பாதுகாப்பான பகுதிக்கு வழிகாட்டுகிறது.',

    // Risk Levels
    riskCritical: 'தீவிர ஆபத்து',
    riskHigh: 'அதிக ஆபத்து',
    riskModerate: 'மிதமான ஆபத்து',
    riskLow: 'குறைந்த ஆபத்து',

    // Status
    statusAvailable: 'கிடைக்கக்கூடியது',
    statusLimited: 'வரம்பிற்குட்பட்டது',
    statusFull: 'முழுமையாக நிறைந்தது',

    // Priority
    priorityP1: 'P1 — உடனடி வெளியேற்றம்',
    priorityP2: 'P2 — 6 மணி நேரத்திற்குள்',
    priorityP3: 'P3 — தயார் நிலை',
    priorityP4: 'P4 — கண்காணிப்பு நிலை',

    // Actions
    viewSafeAreas: 'பாதுகாப்பான பகுதிகளைக் காண்க',
    openApp: 'தளத்தைத் திறக்கவும்',
    relocationGuidance: 'மறுகுடியேற்ற வழிகாட்டுதல்',
    submitReport: 'புகாரை சமர்ப்பிக்கவும்',
    sendAlert: 'எச்சரிக்கை அனுப்புக',
    simulateEscalation: 'அபாய தீவிரத்தை உருவகப்படுத்துக',
    revertSimulation: 'உருவகப்படுத்துதலை மீட்டமை',
    review: 'மதிப்பாய்வு',
    verify: 'சரிபார்',
    createAlert: 'எச்சரிக்கை உருவாக்கு',
    copyNotepad: 'குறிப்பேட்டில் நகலெடு',
    exportLog: 'பதிவிறக்கம் (.txt)',

    // Map & Layers
    allLayers: 'அனைத்து அடுக்குகள்',
    floodLayer: '1. வெள்ளம் (Flood)',
    cycloneLayer: '2. புயல் (Cyclone)',
    multiHazardLayer: '3. பல-அபாயம் (Multi-Hazard)',
    vulnerabilityLayer: '4. பாதிப்புத்தன்மை',
    exposureLayer: '5. மக்கள் வெளிப்பாடு',
    capacityLayer: '6. தாங்கும் திறன்',
    priorityLayer: '7. இடமாற்ற முன்னுரிமை',
    routes: 'வெளியேற்றப் பாதைகள்',
    shelters: 'நிவாரண முகாம்கள்',
    hospitals: 'அவசர மருத்துவமனைகள்',
    recenter: 'சென்னை வரைபட மையம்',

    // Metrics
    totalCapacity: 'மொத்த கொள்ளளவு',
    currentOccupancy: 'தற்போதைய ஆக்கிரமிப்பு',
    availableCapacity: 'கிடைக்கும் கொள்ளளவு',
    statusFullWarning: 'முகாம் முழுமையாக நிறைந்தது — மாற்று முகாமுக்கு வழிகாட்டவும்',
  },
};

export const translations: Record<string, any> = TRANSLATIONS;
