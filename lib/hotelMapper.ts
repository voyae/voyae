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
  
    offerId?: string;
  
    roomId?: string;
  
    boardName?: string;
  
    rateType?: string;
  
    cancellationPolicies?: any[];
  
    raw?: any;
  }
  
  export function mapHotels(
    hotels: any[]
  ): HotelCard[] {
    return hotels.map((hotel: any) => {
      const room =
        hotel.roomTypes?.[0] ??
        hotel.rooms?.[0] ??
        {};
  
      const rate =
        room.rates?.[0] ??
        hotel.rates?.[0] ??
        {};
  
      return {
        id:
  hotel.id ??
  hotel.hotelId ??
  hotel.hotelID ??
  crypto.randomUUID(),
  
        name:
          hotel.name ??
          "Unknown Hotel",
  
        image:
          hotel.hotelImages?.[0]?.url ??
          hotel.main_photo ??
          hotel.image ??
          "/hotel-placeholder.jpg",
  
        address:
          hotel.address ?? "",
  
        city:
          hotel.city ?? "",
  
        country:
          hotel.country ?? "",
  
        stars:
          hotel.starRating ??
          hotel.stars ??
          0,
  
        rating:
          hotel.rating ?? 0,
  
        reviewCount:
          hotel.reviewCount ?? 0,
  
        price:
          Number(
            rate.retailRate?.total?.[0]
              ?.amount ??
              rate.price ??
              rate.sellingRate ??
              0
          ),
  
        currency:
          rate.retailRate?.total?.[0]
            ?.currency ??
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
          (
            rate.boardName ??
            ""
          )
            .toLowerCase()
            .includes("breakfast"),
  
        freeCancellation:
          rate.cancellationPolicies
            ?.refundableTag === "RFN",
  
        refundable:
          rate.cancellationPolicies
            ?.refundableTag === "RFN",
  
        offerId:
          rate.offerId ??
          rate.id,
  
        roomId:
          room.roomId ??
          room.id,
  
        boardName:
          rate.boardName ??
          rate.boardType ??
          "",
  
        rateType:
          rate.rateType ??
          "",
  
        cancellationPolicies:
          rate.cancellationPolicies
            ?.cancelPolicyInfos ??
          [],
  
        raw: hotel,
      };
    });
  }