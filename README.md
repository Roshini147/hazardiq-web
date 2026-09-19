# HAZARDIQ — AI-Powered Multi-Hazard Risk & Relocation Intelligence Platform

> **Smart India Hackathon 2026**  
> **Problem Statement ID:** SIH26191  
> **Problem Statement:** *Intelligent Identification of Hazard-Based Red Zones, Carrying Capacity Assessment, and Immediate Relocation Needs for Vulnerable Habitations*  
> **Theme:** Disaster Management | **Category:** Software  
> **Team:**  JNN Tech Titans | **Institution:** J.N.N Institute of Engineering  

---

## 1. Executive Summary & Core Concept

**HAZARDIQ** bridges the critical gap in emergency disaster response by integrating spatial hazard identification, demographic vulnerability assessment, and real-time shelter carrying capacity into one unified decision-support workflow:

$$\mathbf{HAZARD} \longrightarrow \mathbf{EXPOSURE} \longrightarrow \mathbf{VULNERABILITY} \longrightarrow \mathbf{CAPACITY} \longrightarrow \mathbf{RELOCATION} \longrightarrow \mathbf{ALERT} \longrightarrow \mathbf{RESPONSE}$$

### Guiding Principles
* **Decision Support, Not Autocracy:** *"HAZARDIQ recommends. Authorized officials decide."*
* **Dynamic Shelter Overflow Prevention:** Automated threshold detection excludes saturated shelters and recommends viable alternatives with explicit justifications.
* **Explainable Prioritization:** Relocation priority rankings (P1 to P4) rely on deterministic weighted mathematical indexes rather than unverified black-box predictions.

---

## 2. Live Persistent Prototype URL

* **Live HTTPS Prototype URL:** https://hazardiq-web.vercel.app/


---

## 3. Technology Stack

* **Frontend Framework:** React 19 + Vite 8
* **Language:** TypeScript / JavaScript (ESNext)
* **Styling:** Tailwind CSS (v4) + Custom Design System
* **Mapping & GIS:** Leaflet + React-Leaflet + OpenStreetMap / CARTO Basemaps
* **Icons:** Lucide React
* **State & Persistence:** Browser `localStorage` (pure client-side, zero backend dependency required)
* **Bilingual Engine:** English + தமிழ் (Tamil)

---

## 4. Key Prototype Modules

| Route | Module | Key Capabilities |
|---|---|---|
| `/` | **Public Home** | Government landing page, SIH metadata, Core workflow pipeline, Chennai live status counters. |
| `/risk-map` | **Chennai GIS Risk Map** | Interactive Leaflet map with 5 Chennai risk zones (Zone A to E), layer toggles, facility markers, and slide-out Red-Zone Panel. |
| `/safe-areas` | **Safe Areas & Capacity** | 8 regional shelters with live capacity/occupancy. **Section 14 Critical Logic**: When Safe Area C is full, displays overflow alert and automatically recommends Safe Area D with rationale. |
| `/relocation` | **Relocation Priority** | P1 to P4 ranked matrix, explainable priority score breakdown (91/100 for Zone A), and multi-shelter feasible allocation plan. |
| `/vulnerability` | **Demographic Assessment** | Micro-demographic breakdown of exposed populations (children: 520, elderly: 380, PWD: 95) with visual distribution charts. |
| `/alerts` | **Citizen Alert View** | ⚠️ High-Risk Alert broadcast, nearby shelters list with Safe Area C marked FULL, and Emergency 112 hotline. |
| `/report` | **Citizen Hazard Reporting** | Dangerous condition report form with simulated photo upload; generates Tracking ID `HZR-2026-00421` and syncs to command console. |
| `/how-it-works` | **System Architecture** | 4-stage sequential pipeline: DATA $\to$ ANALYSIS $\to$ DECISION $\to$ RESPONSE. |
| `/admin/login` | **Protected Official Login** | Hidden official login (`admin` / `hazardiq`) with one-click demo credentials. |
| `/admin/dashboard` | **Government Console** | 6 KPI counters, Citizen Reports queue (Review, Verify, Create Alert), Emergency Alert Dispatcher, and **Simulate Risk Escalation** demo. |

---

## 5. Demo Credentials

* **URL:** `/admin/login` (Protected — not in public navigation)
* **Username:** `admin`
* **Password:** `hazardiq`
* *Convenience feature:* Includes a "Fill Credentials" button for quick jury evaluation.

---

## 6. End-to-End 22-Step Jury Demo Journey

1. Open HAZARDIQ Home (`/`).
2. Verify banner, bilingual toggle (`English | தமிழ்`), and low-bandwidth mode.
3. Open Chennai Risk Map (`/risk-map`).
4. Click Red Zone A (Velachery - Pallikaranai).
5. Inspect Risk Score (**91 / 100**).
6. Verify exposed population (**4,200**, 1,050 households).
7. Inspect vulnerable demographics (**Children: 520, Elderly: 380, PWD: 95**).
8. Click **"View Relocation Options"** in the Red Zone panel.
9. Navigate to Safe Areas & Capacity (`/safe-areas`).
10. Click **"Test Safe Area C (FULL)"**: Observe occupancy at 2,500/2,500 (Available: 0).
11. Observe automatic recommendation: **Safe Area D** (Capacity: 4,000, Available: 2,900) with detailed decision rationale.
12. Navigate to Relocation Priority (`/relocation`) and verify P1 priority factors.
13. Access `/admin/login` and log in with `admin` / `hazardiq`.
14. Open `/admin/dashboard` and verify 6 KPI counters.
15. Click **"SIMULATE RISK ESCALATION"**: Visibly demonstrate risk status elevation to CRITICAL, population surge, and capacity recalculation.
16. Observe 5-step pipeline update: *Risk Detected $\to$ Impact Assessed $\to$ Capacity Checked $\to$ Relocation Prioritized $\to$ Alert Prepared*.
17. In the Emergency Alert Dispatcher, click **"SEND ALERT"**.
18. Navigate to `/alerts` and verify the citizen-facing high-risk alert with Safe Area C marked *FULL — Do Not Proceed*.
19. Navigate to `/report` and submit a field condition report for Velachery.
20. Confirm Report ID **`HZR-2026-00421`** is generated and saved in `localStorage`.
21. Return to `/admin/dashboard` and verify the report appears in the reports queue; click **"Verify"**.
22. Refresh pages directly (`/risk-map`, `/safe-areas`, `/admin/dashboard`) to verify zero 404 errors.

---

## 7. Prototype Demarcation & Simulated Elements

To ensure complete transparency during hackathon presentations, all demonstration features are clearly demarcated:
* **Simulated GIS Boundaries:** Demonstration polygons modeled after Chennai Metropolitan geographical contours (Velachery, Manali, Saidapet, Royapuram, Guindy).
* **Simulated Telemetry:** Sensor water levels, tidal heights, and citizen reports are stored locally in `localStorage`.
* **Simulated Alerts:** No live SMS gateway or WhatsApp API charges incurred during demonstration.

---

## 8. Future Production Integration

In a production environment, HAZARDIQ connects directly into state emergency infrastructure:
1. **Spatial Database:** PostgreSQL / PostGIS with GeoServer WMS/WFS layers.
2. **Satellite & Sensor Telemetry:** Real-time inundation feeds from ISRO/NRSC National Disaster Emergency Management (NDEM) and Central Water Commission (CWC) telemetry gauges.
3. **Census Demographics:** Micro-census data integrated with Tamil Nadu Spatial Data Infrastructure (TNSDI).
4. **Broadcast Alerts:** Integration with Common Alerting Protocol (CAP) via C-DOT and telecom SMS gateways.

---

## 9. Local Development Instructions

```bash
# Clone or navigate to the repository
cd scratch/hazardiq/frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

*Developed with pride by Team **Tech Titans** (J.N.N Institute of Engineering) for the **Smart India Hackathon 2026**.*
