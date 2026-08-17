export interface HotelImage {
    url: string;
    caption: string;
  }
  
  export interface HotelDetails {
    id: string;
    name: string;
  
    description: string;
    importantInformation: string;
  
    address: string;
    city: string;
    country: string;
  
    latitude: number;
    longitude: number;
  
    starRating: number;
    rating: number;
    reviewCount: number;
  
    checkin: string;
    checkout: string;
  
    images: HotelImage[];
  
    facilities: string[];
  
    rooms: any[];
  }
  
  export function mapHotelDetails(data: any): HotelDetails {
    return {
      id: data.id,
  
      name: data.name ?? "",
  
      description: data.hotelDescription ?? "",
  
      importantInformation:
        data.hotelImportantInformation ?? "",
  
      address: data.address ?? "",
  
      city: data.city ?? "",
  
      country: data.country ?? "",
  
      latitude: data.location?.latitude ?? 0,
  
      longitude: data.location?.longitude ?? 0,
  
      starRating: data.starRating ?? 0,
  
      rating: data.rating ?? 0,
  
      reviewCount: data.reviewCount ?? 0,
  
      checkin:
        data.checkinCheckoutTimes?.checkin ?? "",
  
      checkout:
        data.checkinCheckoutTimes?.checkout ?? "",
  
      images:
        data.hotelImages?.map((img: any) => ({
          url: img.url,
          caption: img.caption ?? "",
        })) ?? [],
  
      facilities: data.hotelFacilities ?? [],
  
      rooms: data.rooms ?? [],
    };
  }