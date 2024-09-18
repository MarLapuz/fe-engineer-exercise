import {
  LocationSearchQueryParams,
  LocationSearchResponse,
} from "@/lib/definitions";


export async function searchLocations(
  query?: LocationSearchQueryParams,
): Promise<LocationSearchResponse> {
  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, item));
      } else if (value !== undefined) {
        params.append(key, value.toString());
      }
    });
  }

  const response = await fetch(`/api/locations/search?${params.toString()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
