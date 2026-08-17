export interface HotelCard {
    id: string;
  
    name: string;
  
    address: string;
  
    city: string;
  
    country: string;
  
    stars: number;
  
    reviewScore: number;
  
    reviewCount: number;
  
    image: string;
  
    images: string[];
  
    latitude: number;
  
    longitude: number;
  
    price: number;
  
    currency: string;
  
    freeCancellation: boolean;
  
    breakfastIncluded: boolean;
  
    refundable: boolean;
  
    roomType: string;
  
    provider: string;
  }
  
  export function mapHotel(rate: any): HotelCard {
    const hotel = rate.hotel ?? {};
    const room = rate.rooms?.[0] ?? {};
    const offer = room.rates?.[0] ?? {};
  
    return {
      id: hotel.hotelId ?? hotel.id ?? "",
  
      name: hotel.name ?? "",
  
      address: hotel.address ?? "",
  
      city: hotel.city ?? "",
  
      country: hotel.country ?? "",
  
      stars: Number(hotel.starRating ?? hotel.stars ?? 0),
  
      reviewScore: Number(
        hotel.reviewScore ??
          hotel.rating ??
          0
      ),
  
      reviewCount: Number(
        hotel.reviewCount ?? 0
      ),
  
      image:
        hotel.mainImage ??
        hotel.thumbnail ??
        hotel.images?.[0] ??
        "/images/hotel-placeholder.jpg",
  
      images: hotel.images ?? [],
  
      latitude: Number(
        hotel.latitude ?? 0
      ),
  
      longitude: Number(
        hotel.longitude ?? 0
      ),
  
      price: Number(
        offer.retailRate?.total ??
          offer.total ??
          offer.price ??
          0
      ),
  
      currency:
        offer.retailRate?.currency ??
        offer.currency ??
        "USD",
  
      freeCancellation:
        offer.freeCancellation ??
        false,
  
      breakfastIncluded:
        offer.boardName
          ?.toLowerCase()
          .includes("breakfast") ??
        false,
  
      refundable:
        offer.refundable ??
        false,
  
      roomType:
        room.name ??
        offer.roomName ??
        "Standard Room",
  
      provider: "LiteAPI",
    };
  }
  
  export function mapHotels(data: any): HotelCard[] {
    if (!Array.isArray(data)) return [];
  
    return data.map(mapHotel);
  }