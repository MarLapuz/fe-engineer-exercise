import { redirect } from "next/navigation";

import { AuthenticateRequest } from "@/lib/definitions";

import { BACKEND_FQDN } from "../fqdn";

export async function authenticate(
  request: AuthenticateRequest,
): Promise<boolean> {
  const response = await fetch(`${BACKEND_FQDN}/auth/login`, {
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

  return true;
}

////////////////////////////////////////////////////////////////////////////////

export async function logout() {
  const response = await fetch(`${BACKEND_FQDN}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to authenticate user: ${await response.text()}`);
  }

  redirect("/");
}
