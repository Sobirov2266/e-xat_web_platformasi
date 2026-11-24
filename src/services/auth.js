const STORAGE_KEY = 'exat_user';

export function login(user) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function logout() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}