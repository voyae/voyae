// lib/liteapi.ts

const BASE_URL = 'https://api.liteapi.travel/v3.0';

const getApiKey = (): string => {
  const apiKey = process.env.NUITEE_API_KEY || process.env.LITEAPI_API_KEY;
  if (!apiKey) {
    console.warn('Uyarı: NUITEE_API_KEY veya LITEAPI_API_KEY tanımlanmamış!');
  }
  return apiKey || '';
};

export async function fetchFromLiteAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const apiKey = getApiKey();

  const headers: Record<string, string> = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'X-API-Key': apiKey,
    ...(options.headers as Record<string, string>),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      throw new Error('LiteAPI Yetkilendirme Hatası (401): API anahtarınızı (.env.local) kontrol edin.');
    }

    if (response.status === 429 || response.status === 4290) {
      throw new Error('LiteAPI İstek Limiti Aşıldı (4290): Çok fazla istek atıldı, lütfen biraz bekleyin.');
    }

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`LiteAPI Hatası (${response.status}): ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`LiteAPI İsteği Başarısız (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Şehre göre otel arama fonksiyonu
 */
export async function searchHotelsByCity(countryCode: string, cityName: string) {
  const endpoint = `/data/hotels?countryCode=${encodeURIComponent(countryCode)}&cityName=${encodeURIComponent(cityName)}`;
  return await fetchFromLiteAPI(endpoint, { method: 'GET' });
}

/**
 * Otel detaylarını getiren fonksiyon
 */
export async function getHotelDetails(hotelId: string) {
  const endpoint = `/data/hotel?hotelId=${encodeURIComponent(hotelId)}`;
  return await fetchFromLiteAPI(endpoint, { method: 'GET' });
}

/**
 * Otel fiyat ve müsaitlik bilgilerini getiren fonksiyon
 */
export async function getHotelRates(payload: {
  hotelIds: string[];
  checkin: string;
  checkout: string;
  occupancies: any[];
  guestNationality?: string;
  currency?: string;
  roomMapping?: boolean;
  maxRatesPerHotel?: number;
}) {
  return await fetchFromLiteAPI('/hotels/rates', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Rezervasyon öncesi kontrol (prebook) fonksiyonu
 */
export async function prebookHotel(payload: {
  rateId: string;
  // LiteAPI prebook payload parametrelerine göre burayı genişletebilirsiniz
  [key: string]: any;
}) {
  return await fetchFromLiteAPI('/rates/prebook', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Rezervasyon oluşturma (book) fonksiyonu
 */
export async function bookHotel(payload: {
  prebookId?: string;
  holder: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  // Diğer rezervasyon parametreleri
  [key: string]: any;
}) {
  return await fetchFromLiteAPI('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchInChunks<T, R>(
  items: T[],
  chunkSize: number = 5,
  delayMs: number = 200,
  fetchFn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    
    const chunkResults = await Promise.all(
      chunk.map(async (item) => {
        try {
          return await fetchFn(item);
        } catch (err) {
          console.error(`Item işlenirken hata oluştu:`, err);
          return null;
        }
      })
    );

    results.push(...(chunkResults.filter(Boolean) as R[]));

    if (i + chunkSize < items.length) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}