export interface HotelCard {
    id: string;
  
    name: string;
  
    image: string;
  
    address: string;
  
    city: string;
  
    country: string;
  
    stars: number;
  
    rating: number;
  
    reviewCount: number;
  
    price: number;
  
    currency: string;
  
    latitude: number;
  
    longitude: number;
  
    breakfastIncluded: boolean;
  
    freeCancellation: boolean;
  
    refundable: boolean;
  }
  
  export function mapHotels(hotels: any[]): HotelCard[] {
    return hotels.map((hotel: any) => {
      const rate =
        hotel.rates?.[0] ??
        hotel.rooms?.[0]?.rates?.[0] ??
        hotel.roomTypes?.[0]?.rates?.[0] ??
        {};
  
      return {
        id: hotel.id,
  
        name: hotel.name ?? "Unknown Hotel",
  
        image:
          hotel.hotelImages?.[0]?.url ??
          hotel.main_photo ??
          hotel.image ??
          "/hotel-placeholder.jpg",
  
        address: hotel.address ?? "",
  
        city: hotel.city ?? "",
  
        country: hotel.country ?? "",
  
        stars:
          hotel.starRating ??
          hotel.stars ??
          0,
  
        rating:
          hotel.rating ??
          0,
  
        reviewCount:
          hotel.reviewCount ??
          0,
  
        price:
          Number(
            rate.retailRate ??
            rate.sellingRate ??
            rate.price ??
            rate.net ??
            0
          ),
  
        currency:
          rate.currency ??
          "USD",
  
        latitude:
          hotel.location?.latitude ??
          hotel.latitude ??
          0,
  
        longitude:
          hotel.location?.longitude ??
          hotel.longitude ??
          0,
  
        breakfastIncluded:
          rate.boardType?.toLowerCase()?.includes("breakfast") ??
          false,
  
        freeCancellation:
          rate.cancellationPolicies
            ?.refundableTag === "RFN",
  
        refundable:
          rate.cancellationPolicies
            ?.refundableTag === "RFN",
      };
    });
  }