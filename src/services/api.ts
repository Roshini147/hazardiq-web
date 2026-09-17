import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '';

export const api = axios.create({
  baseURL: BASE_URL ? `${BASE_URL}/api` : '/api',
  timeout: 15000
});

export const apiV1 = axios.create({
  baseURL: BASE_URL ? `${BASE_URL}/api/v1` : '/api/v1',
  timeout: 15000
});

// Interceptor to inject token
apiV1.interceptors.request.use((config) => {
  const token = localStorage.getItem('hazardiq_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Preserved Existing API endpoints (100% Backwards Compatible)
export const getDashboard = () => api.get('/dashboard').then(r => r.data);
export const getRisk = () => api.get('/risk').then(r => r.data);
export const getHazards = () => api.get('/hazards').then(r => r.data);
export const getCapacity = () => api.get('/capacity').then(r => r.data);
export const getRelocation = () => api.get('/relocation').then(r => r.data);
export const getSafeAreas = () => api.get('/safe-areas').then(r => r.data);
export const getResources = () => api.get('/resources').then(r => r.data);
export const getSources = () => api.get('/data-sources').then(r => r.data);
export const getAreas = () => api.get('/areas').then(r => r.data);
export const getZones = () => api.get('/zones').then(r => r.data);
export const getWards = () => api.get('/wards').then(r => r.data);

// Modern v1 API endpoints
export const getShelters = (params?: any) => apiV1.get('/shelters', { params }).then(r => r.data.data);
export const getShelterById = (id: string | number) => apiV1.get(`/shelters/${id}`).then(r => r.data.data);
export const getShelterCapacity = (id: string | number) => apiV1.get(`/shelters/${id}/capacity`).then(r => r.data.data);
export const allocateCapacity = (id: string | number, payload: { count: number; affected_zone: string; affected_ward?: string; notes?: string }) =>
  apiV1.post(`/shelters/${id}/allocate`, payload).then(r => r.data);
export const checkInShelter = (id: string | number, count: number) =>
  apiV1.post(`/shelters/${id}/check-in`, { count }).then(r => r.data);
export const checkOutShelter = (id: string | number, count: number) =>
  apiV1.post(`/shelters/${id}/check-out`, { count }).then(r => r.data);

// Alerts & In-App Notifications
export const getAlerts = (params?: any) => apiV1.get('/alerts', { params }).then(r => r.data.data);
export const publishAlert = (data: any) => apiV1.post('/alerts', data).then(r => r.data);
export const getNotifications = () => apiV1.get('/notifications').then(r => r.data.data);
export const markNotificationAsRead = (id: number) => apiV1.patch(`/notifications/${id}/read`).then(r => r.data);
export const markAllNotificationsRead = () => apiV1.post('/notifications/mark-all-read').then(r => r.data);

// Citizen Incident Reporting
export const submitIncident = (data: any) => apiV1.post('/incidents', data).then(r => r.data);
export const getIncidents = (params?: any) => apiV1.get('/incidents', { params }).then(r => r.data.data);
export const updateIncidentStatus = (id: number, status: string) => apiV1.patch(`/incidents/${id}/status`, { status }).then(r => r.data);

// Audit & Analytics
export const getAuditLogs = (params?: any) => apiV1.get('/audit-logs', { params }).then(r => r.data.data);
export const getAnalyticsOverview = () => apiV1.get('/analytics/overview').then(r => r.data.data);
export const getHistoricalDisasters = () => apiV1.get('/analytics/historical-disasters').then(r => r.data.data);

// Auth
export const loginUser = (data: any) => apiV1.post('/auth/login', data).then(r => r.data);
export const loginAuthority = (data: any) => apiV1.post('/auth/authority-login', data).then(r => r.data);
export const registerCitizen = (data: any) => apiV1.post('/auth/register', data).then(r => r.data);
export const getMe = () => apiV1.get('/auth/me').then(r => r.data.data);
