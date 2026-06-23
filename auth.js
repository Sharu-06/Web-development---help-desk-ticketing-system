export function saveAuth(data) {
  if (data.email) {
    localStorage.setItem("user", JSON.stringify({
      email: data.email,
      name: data.name,
      role: data.role
    }));
  }
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("user"));
}

export function logout() {
  localStorage.removeItem("user");
}

export function getAuthToken() {
  return localStorage.getItem('token'); 
}
