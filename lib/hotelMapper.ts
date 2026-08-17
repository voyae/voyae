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
        hotel.roomTypes?.[0]?.rates?.[0] ??
        hotel.rooms?.[0]?.rates?.[0] ??
        {};
  
      const image =
        hotel.hotelImages?.[0]?.url ??
        hotel.images?.[0]?.url ??
        hotel.images?.[0] ??
        hotel.main_photo ??
        hotel.image ??
        "/hotel-placeholder.jpg";
  
      const address =
        hotel.address ??
        hotel.location?.address ??
        "";
  
      const city =
        hotel.city ??
        hotel.location?.city ??
        "";
  
      const country =
        hotel.country ??
        hotel.location?.country ??
        "";
  
      const rawPrice =
  rate.retailRate ??
  rate.sellingRate ??
  rate.price ??
  rate.net ??
  rate.amount ??
  hotel.minRate ??
  hotel.minPrice;

const price =
  rawPrice == null
    ? 0
    : Number(rawPrice);
  
      const currency =
        rate.currency ??
        hotel.currency ??
        "USD";
  
      const stars =
        Number(
          hotel.starRating ??
          hotel.stars ??
          hotel.category ??
          0
        );
  
      const rating =
        Number(
          hotel.rating ??
          hotel.reviewScore ??
          hotel.review_rating ??
          0
        );
  
      const reviewCount =
        Number(
          hotel.reviewCount ??
          hotel.reviews ??
          hotel.review_count ??
          0
        );
  
      const breakfastIncluded =
        String(
          rate.boardType ??
          rate.mealPlan ??
          ""
        )
          .toLowerCase()
          .includes("breakfast");
  
      const refundable =
        rate.cancellationPolicies?.refundableTag === "RFN" ||
        rate.refundable === true;
  
      const freeCancellation =
        refundable ||
        Boolean(rate.freeCancellation);
  
      return {
        id: String(hotel.id),
  
        name:
          hotel.name ??
          hotel.hotelName ??
          "Unknown Hotel",
  
        image,
  
        address,
  
        city,
  
        country,
  
        stars,
  
        rating,
  
        reviewCount,
  
        price,
  
        currency,
  
        latitude:
          hotel.location?.latitude ??
          hotel.latitude ??
          0,
  
        longitude:
          hotel.location?.longitude ??
          hotel.longitude ??
          0,
  
        breakfastIncluded,
  
        freeCancellation,
  
        refundable,
      };
    });
  }