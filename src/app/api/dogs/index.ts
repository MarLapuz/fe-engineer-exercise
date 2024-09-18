import {
  Dog,
  DogSearchQueryParams,
  DogSearchResponse,
} from "@/lib/definitions";

export async function searchDogs(
  query?: DogSearchQueryParams,
): Promise<DogSearchResponse> {
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
  console.log(params.toString());

  const response = await fetch(`/api/dogs/search?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
  const response = await fetch(`/api/dogs/breeds`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
  const response = await fetch(`/api/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  const response = await fetch(`/api/dogs/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
