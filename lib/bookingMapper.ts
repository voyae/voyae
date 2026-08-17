export interface HotelRate {
    hotelId: string;
  
    offerId: string;
  
    roomId: string;
  
    roomName: string;
  
    boardName: string;
  
    refundable: boolean;
  
    price: number;
  
    currency: string;
  
    taxes: number;
  
    rateType: string;
  
    cancellationPolicies: any[];
  
    raw: any;
  }
  
  export function mapRates(data: any): HotelRate[] {
    if (!Array.isArray(data)) return [];
  
    const rooms: HotelRate[] = [];
  
    for (const hotel of data) {
      const hotelId =
        hotel.hotelId ??
        hotel.hotelCode ??
        hotel.id ??
        "";
  
      const roomTypes =
        hotel.roomTypes ??
        hotel.rooms ??
        [];
  
      for (const room of roomTypes) {
        const rates =
          room.rates ??
          room.offers ??
          [];
  
        for (const rate of rates) {
          rooms.push({
            hotelId,
  
            offerId:
              rate.offerId ??
              rate.id ??
              "",
  
            roomId:
              room.roomId ??
              room.id ??
              "",
  
            roomName:
              room.name ??
              room.roomName ??
              "Room",
  
            boardName:
              rate.boardName ??
              rate.boardType ??
              "",
  
            refundable:
              rate.refundable ??
              false,
  
            price:
              Number(
                rate.retailRate?.total?.[0]?.amount
              ) ||
              Number(rate.price) ||
              0,
  
            taxes:
              Number(
                rate.retailRate?.taxes?.[0]?.amount
              ) || 0,
  
            currency:
              rate.retailRate?.total?.[0]?.currency ??
              rate.currency ??
              "USD",
  
            rateType:
              rate.rateType ??
              "",
  
            cancellationPolicies:
              rate.cancellationPolicies
                ?.cancelPolicyInfos ??
              [],
  
            raw: rate,
          });
        }
      }
    }
  
    return rooms.sort(
      (a, b) => a.price - b.price
    );
  }