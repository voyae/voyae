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
    // API'nin olası tüm resim dizisi anahtarlarını kontrol edelim
    const rawImages = 
      data.hotelImages ?? 
      data.images ?? 
      data.pictures ?? 
      data.photos ?? 
      data.gallery ?? 
      [];

    const mappedImages: HotelImage[] = Array.isArray(rawImages) 
      ? rawImages.map((img: any) => {
          // Eğer img direkt string bir URL ise
          if (typeof img === 'string') {
            return { url: img, caption: data.name ?? "" };
          }
          // Eğer obje ise olası url alanlarını tarayalım
          return {
            url: img?.url ?? img?.highResUrl ?? img?.thumbnail ?? img?.src ?? "",
            caption: img?.caption ?? img?.title ?? data.name ?? "",
          };
        }).filter((img) => img.url && img.url.startsWith('http'))
      : [];

    return {
      id: data.id ?? data.hotelId ?? "",
      name: data.name ?? data.hotelName ?? "",
      description: data.hotelDescription ?? data.description ?? "",
      importantInformation: data.hotelImportantInformation ?? data.importantInformation ?? "",
      address: data.address ?? data.location?.address ?? "",
      city: data.city ?? data.location?.city ?? "",
      country: data.country ?? data.location?.country ?? "",
      latitude: data.location?.latitude ?? data.latitude ?? 0,
      longitude: data.location?.longitude ?? data.longitude ?? 0,
      starRating: data.starRating ?? data.stars ?? 0,
      rating: data.rating ?? data.reviewScore ?? 0,
      reviewCount: data.reviewCount ?? data.reviewsCount ?? 0,
      checkin: data.checkinCheckoutTimes?.checkin ?? data.checkin ?? "",
      checkout: data.checkinCheckoutTimes?.checkout ?? data.checkout ?? "",
      images: mappedImages,
      facilities: data.hotelFacilities ?? data.facilities ?? [],
      rooms: data.rooms ?? data.roomTypes ?? [],
    };
  }