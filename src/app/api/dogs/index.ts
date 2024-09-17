import {
  Dog,
  DogSearchQueryParams,
  DogSearchResponse,
} from "@/lib/definitions";

import { BACKEND_FQDN } from "../fqdn";

export async function searchDogs(
  query?: DogSearchQueryParams,
): Promise<DogSearchResponse> {
  const url = new URL(`${BACKEND_FQDN}/dogs/search`);

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
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to search dogs: ${response.status}, ${await response.text()}`,
    );
  }

  return await response.json();
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function listDogBreeds(): Promise<string[]> {
  const response = await fetch(`${BACKEND_FQDN}/dogs/breeds`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to list dog breeds: ${response.status}, ${await response.text()}`,
    );
  }

  return await response.json();
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function fetchDogs(ids: string[]): Promise<Dog[]> {
  const response = await fetch(`${BACKEND_FQDN}/dogs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(ids),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch dogs: ${response.status}, ${await response.text()}`,
    );
  }

  return await response.json();
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export type FetchMatchDogRequest = {
  ids: string[];
};

export async function fetchMatchDog(
  request: FetchMatchDogRequest,
): Promise<Dog> {
  const response = await fetch(`${BACKEND_FQDN}/dogs/match`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(request.ids),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch match dog: ${response.status}, ${await response.text()}`,
    );
  }

  const matchedDogId: string = await response.json().then((data) => data.match);

  return fetchDogs([matchedDogId]).then((data) => data[0]);
}
