import { User, UpdateUserPayload } from "@/types/user";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      body?.message || body?.error || `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }

  const payload = body?.data ?? body;
  return (payload?.profile ?? payload) as T;
}

export async function getCurrentUser(): Promise<User> {
  const res = await fetch(`${API_BASE}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return handleResponse<User>(res);
}

/**
 * PATCH /api/users/myUser
 * Change to PUT below if your backend expects that instead.
 */
export async function updateCurrentUser(
  payload: UpdateUserPayload,
): Promise<User> {
  const res = await fetch(`${API_BASE}/users/myUser`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<User>(res);
}
