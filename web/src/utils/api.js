// Base URL - đổi sang production khi deploy
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ---------- Generic helpers ----------
async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Lỗi API');
  return data;
}

// ---------- COURSES ----------
export const coursesApi = {
  getAll: (category) => request(`/api/courses${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  getOne: (id) => request(`/api/courses/${id}`),
  create: (data) => request('/api/courses', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/api/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/api/courses/${id}`, { method: 'DELETE' }),
};

// ---------- STUDENTS ----------
export const studentsApi = {
  getAll: () => request('/api/students'),
  getOne: (id) => request(`/api/students/${id}`),
  create: (data) => request('/api/students', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/api/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/api/students/${id}`, { method: 'DELETE' }),
};

// ---------- USERS ----------
export const usersApi = {
  getAll: () => request('/api/users'),
  getOne: (id) => request(`/api/users/${id}`),
  create: (data) => request('/api/users', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/api/users/${id}`, { method: 'DELETE' }),
};

// ---------- ARTICLES ----------
export const articlesApi = {
  getAll: (type) => request(`/api/articles${type ? `?type=${encodeURIComponent(type)}` : ''}`),
  getOne: (id) => request(`/api/articles/${id}`),
  create: (data) => request('/api/articles', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/api/articles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/api/articles/${id}`, { method: 'DELETE' }),
};

// ---------- LEADS / CRM DASHBOARD ----------
export const leadsApi = {
  stats: (days = 30) => request(`/api/leads/stats?days=${days}`),
  setStatus: (id, status) =>
    request(`/api/students/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};

// ---------- REFERENCE DATA (danh mục cho form đăng ký) ----------
export const refApi = {
  provinces: () => request('/api/ref/provinces'),
  districts: (provinceId) => request(`/api/ref/districts?provinceId=${encodeURIComponent(provinceId)}`),
  ethnicities: () => request('/api/ref/ethnicities'),
  religions: () => request('/api/ref/religions'),
  countries: () => request('/api/ref/countries'),
  objectTypes: () => request('/api/ref/object-types'),
};

// ---------- BANNERS ----------
export const bannersApi = {
  getAll: () => request('/api/banners'),
  getOne: (id) => request(`/api/banners/${id}`),
  create: (data) => request('/api/banners', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/api/banners/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/api/banners/${id}`, { method: 'DELETE' }),
};
