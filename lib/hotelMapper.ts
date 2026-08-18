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
    if (!Array.isArray(hotels)) return [];
  
    return hotels.map((hotel: any) => {
      const room =
        hotel.roomTypes?.[0] ??
        hotel.rooms?.[0] ??
        hotel.room ??
        {};
  
      const rate =
        room.rates?.[0] ??
        hotel.rates?.[0] ??
        hotel.rate ??
        {};
  
      const rawPrice =
        rate.retailRate?.total?.[0]?.amount ??
        rate.retailRate?.amount ??
        rate.retailRate ??
        rate.sellingRate ??
        rate.price ??
        rate.net ??
        rate.amount ??
        hotel.minRate ??
        hotel.minPrice ??
        0;
  
      const price = Number(rawPrice) || 0;
  
      // --- GERÇEK RESİM AYIKLAYICI (Fallback yok, sadece API verisi) ---
      let rawImg = 
        hotel.main_photo ??
        hotel.thumbnail ??
        hotel.image ??
        hotel.photo ??
        hotel.hotelImages?.[0]?.url ??
        hotel.hotelImages?.[0] ??
        hotel.images?.[0]?.url ??
        hotel.images?.[0] ??
        hotel.photos?.[0]?.url ??
        hotel.photos?.[0];

      // Eğer resim bir obje olarak gelip içinde url barındırıyorsa
      if (typeof rawImg === 'object' && rawImg !== null) {
        rawImg = rawImg.url ?? rawImg.src ?? rawImg.highResUrl ?? "";
      }

      const hotelImage = (typeof rawImg === 'string' && rawImg.startsWith('http')) ? rawImg : "";
  
      const roomRawImg = room.images?.[0]?.url ?? room.images?.[0] ?? room.image ?? "";
      const roomImage = (typeof roomRawImg === 'string' && roomRawImg.startsWith('http')) ? roomRawImg : hotelImage;
  
      return {
        id: String(hotel.id ?? hotel.hotelId ?? Math.random()),
        name: hotel.name ?? hotel.hotelName ?? "Unknown Hotel",
        image: hotelImage,
        roomImage,
        roomName:
          room.name ??
          room.roomName ??
          room.description ??
          "Standard Room",
        address: hotel.address ?? hotel.location?.address ?? "",
        city: hotel.city ?? hotel.location?.city ?? "",
        country: hotel.country ?? hotel.location?.country ?? "",
        stars: Number(hotel.starRating ?? hotel.stars ?? hotel.category ?? 0),
        rating: Number(hotel.rating ?? hotel.reviewScore ?? hotel.review_rating ?? 0),
        reviewCount: Number(hotel.reviewCount ?? hotel.review_count ?? hotel.reviews ?? 0),
        price,
        oldPrice: price > 0 ? Math.round(price * 1.18) : 0,
        currency:
          rate.retailRate?.total?.[0]?.currency ??
          rate.currency ??
          hotel.currency ??
          "USD",
        latitude: hotel.location?.latitude ?? hotel.latitude ?? 0,
        longitude: hotel.location?.longitude ?? hotel.longitude ?? 0,
        breakfastIncluded: String(rate.boardType ?? rate.mealPlan ?? "")
          .toLowerCase()
          .includes("breakfast"),
        refundable:
          rate.cancellationPolicies?.refundableTag === "RFN" ||
          rate.refundable === true,
        freeCancellation:
          rate.cancellationPolicies?.refundableTag === "RFN" ||
          rate.freeCancellation === true,
      };
    });
  }