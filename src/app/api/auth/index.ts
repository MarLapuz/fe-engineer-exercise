
import { AuthenticateRequest } from "@/lib/definitions";


export async function authenticate(
  request: AuthenticateRequest,
): Promise<Response> {
  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to authenticate user: ${await response.text()}`);
  }

  return response
}

////////////////////////////////////////////////////////////////////////////////

export async function logout() {
  const response = await fetch(`/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to authenticate user: ${await response.text()}`);
  }

  return response
}
