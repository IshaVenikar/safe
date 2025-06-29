export type User = {
  id: string;
  email: string;
  type?: UserType;
  role?: UserRole;
  animals: Animal[];
  location?: Location;
  createdAt: string;
};

type Location = {
  city: string;
  state: string;
  lng: string;
  lat: string;
}

export type Animal = {
  id: string;
  name: string;
  age: number;
  details: string;
  status?: AnimalStatus;
  contact: number;
  imageUrl?: string;
  userId: string;
  createdAt: string;
  user?: User
};

export type UserType = "single" | "organization";
export type UserRole = "adopter" | "registrar";
export type AnimalStatus = "Avl" | "Adopted";
