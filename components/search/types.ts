export interface Destination {
  title: string;

  subtitle: string;

  placeId: string;

  types: string[];
}

export interface SelectedDestination {
  name: string;

  fullName: string;

  placeId: string;

  city: string;

  country: string;

  countryCode: string;

  latitude: number;

  longitude: number;
}

export interface GuestState {
  adults: number;

  children: number[];

  rooms: number;

  pets: boolean;
}

export interface SearchState {
  destination: SelectedDestination | null;

  checkIn?: Date;

  checkOut?: Date;

  guests: GuestState;
}