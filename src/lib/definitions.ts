import { z } from "zod";

export const AuthenticateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email(),
});

export type AuthenticateRequest = z.infer<typeof AuthenticateSchema>;

////////////////////////////////////////////////////////////////////////////////////////////////////

export const DogSearchQueryParams = z.object({
  breeds: z.array(z.string()).optional(),
  zipCodes: z.array(z.string()).optional(),
  ageMin: z.number().optional(),
  ageMax: z.number().optional(),
  size: z.number().default(25),
  from: z.string().optional(),
  sort: z.string().optional(),
});

export type DogSearchQueryParams = z.infer<typeof DogSearchQueryParams>;
export type DogSearchResponse = {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////

export type Dog = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

export type Location = {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
};

export type Coordinates = {
  lat: number;
  lon: number;
};

export type LocationSearchQueryParams = {
  city?: string;
  state?: string;
  geoBoundingBox?: {
    top?: Coordinates;
    left?: Coordinates;
    bottom?: Coordinates;
    right?: Coordinates;
    bottom_left?: Coordinates;
    top_left?: Coordinates;
  };
  size?: number;
  from?: number;
};
export type LocationSearchResponse = {
  results: Location[];
  total: number;
};
