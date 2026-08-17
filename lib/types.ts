export interface SearchRequest {
    destination: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number[];
    rooms: number;
  }
  
  export interface HotelCard {
    id: string;
    name: string;
    address: string;
    stars: number;
    reviewScore?: number;
    reviewCount?: number;
  
    image: string;
  
    price: number;
    currency: string;
  
    freeCancellation: boolean;
    breakfastIncluded: boolean;
  
    latitude: number;
    longitude: number;
  }