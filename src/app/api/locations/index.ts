import {
  LocationSearchQueryParams,
  LocationSearchResponse,
} from "@/lib/definitions";

import { BACKEND_FQDN } from "../fqdn";

export async function searchLocations(
  query?: LocationSearchQueryParams,
): Promise<LocationSearchResponse> {
  const url = new URL(`${BACKEND_FQDN}/locations/search`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => url.searchParams.append(key, item));
      } else if (value !== undefined) {
        url.searchParams.append(key, value.toString());
      }
    });
  }

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to search locations: ${response.status}, ${await response.text()}`,
    );
  }

  return await response.json();
}
