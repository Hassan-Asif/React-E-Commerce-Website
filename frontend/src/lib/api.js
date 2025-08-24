export async function api(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:4000/api${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (!res.ok) {
    // Safely try to read JSON or text
    let errMessage;
    try {
      errMessage = await res.json();
    } catch {
      errMessage = await res.text();
    }
    throw new Error(errMessage.message || errMessage || "API error");
  }

  // If response has no content, return null
  if (res.status === 204) return null;

  // Try JSON, fallback to null
  try {
    return await res.json();
  } catch {
    return null;
  }
}
