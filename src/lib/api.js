export async function authFetch(url, options = {}) {
  const tokenResponse = await fetch("/api/auth/token", {
    credentials: "include",
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.token) {
    throw new Error("Authentication token unavailable");
  }

  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${tokenData.token}`);

  return fetch(url, {
    ...options,
    headers,
  });
}