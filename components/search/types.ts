export interface Destination {
    title: string;
    subtitle: string;
    types: string[];
  }
  
  export interface SelectedDestination {
    name: string;
    fullName: string;
  }
  
  export interface GuestState {
    adults: number;
    children: number;
    rooms: number;
  }
  
  export interface SearchState {
    destination: SelectedDestination | null;
  
    checkIn?: Date;
  
    checkOut?: Date;
  
    guests: GuestState;
  }