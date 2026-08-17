export interface HotelCard {
    id: string;
  
    name: string;
  
    image: string;
  
    roomImage: string;
  
    roomName: string;
  
    address: string;
  
    city: string;
  
    country: string;
  
    stars: number;
  
    rating: number;
  
    reviewCount: number;
  
    price: number;
  
    oldPrice: number;
  
    currency: string;
  
    latitude: number;
  
    longitude: number;
  
    breakfastIncluded: boolean;
  
    freeCancellation: boolean;
  
    refundable: boolean;
  }
  
  export function mapHotels(hotels: any[]): HotelCard[] {
    return hotels.map((hotel: any) => {
      const room =
        hotel.roomTypes?.[0] ??
        hotel.rooms?.[0] ??
        {};
  
      const rate =
        room.rates?.[0] ??
        hotel.rates?.[0] ??
        {};
  
      const roomImage =
        room.images?.[0]?.url ??
        room.images?.[0] ??
        hotel.hotelImages?.[0]?.url ??
        hotel.images?.[0]?.url ??
        hotel.main_photo ??
        hotel.image ??
        "/hotel-placeholder.jpg";
  
      const hotelImage =
        hotel.hotelImages?.[0]?.url ??
        hotel.images?.[0]?.url ??
        hotel.images?.[0] ??
        roomImage;
  
      const rawPrice =
        rate.retailRate ??
        rate.sellingRate ??
        rate.price ??
        rate.net ??
        rate.amount ??
        hotel.minRate ??
        hotel.minPrice ??
        0;
  
      const price = Number(rawPrice) || 0;
  
      return {
        id: String(hotel.id),
  
        name:
          hotel.name ??
          hotel.hotelName ??
          "Unknown Hotel",
  
        image: hotelImage,
  
        roomImage,
  
        roomName:
          room.name ??
          room.roomName ??
          room.description ??
          "Standard Room",
  
        address:
          hotel.address ??
          hotel.location?.address ??
          "",
  
        city:
          hotel.city ??
          hotel.location?.city ??
          "",
  
        country:
          hotel.country ??
          hotel.location?.country ??
          "",
  
        stars: Number(
          hotel.starRating ??
          hotel.stars ??
          hotel.category ??
          0
        ),
  
        rating: Number(
          hotel.rating ??
          hotel.reviewScore ??
          hotel.review_rating ??
          0
        ),
  
        reviewCount: Number(
          hotel.reviewCount ??
          hotel.review_count ??
          hotel.reviews ??
          0
        ),
  
        price,
  
        oldPrice:
          price > 0
            ? Math.round(price * 1.18)
            : 0,
  
        currency:
          rate.currency ??
          hotel.currency ??
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
          String(
            rate.boardType ??
            rate.mealPlan ??
            ""
          )
            .toLowerCase()
            .includes("breakfast"),
  
        refundable:
          rate.cancellationPolicies?.refundableTag ===
            "RFN" ||
          rate.refundable === true,
  
        freeCancellation:
          rate.cancellationPolicies?.refundableTag ===
            "RFN" ||
          rate.freeCancellation === true,
      };
    });
  }