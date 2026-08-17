export interface PrebookRoom {
    roomId: string;
  
    roomName: string;
  
    boardName: string;
  
    price: number;
  
    currency: string;
  
    refundable: boolean;
  
    cancellationPolicies: any[];
  
    rateKey: string;
  }
  
  export function mapPrebook(data: any): PrebookRoom[] {
    const rooms =
      data.roomTypes ??
      data.rooms ??
      [];
  
    return rooms.map((room: any) => {
      const rate =
        room.rates?.[0] ?? {};
  
      return {
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
  
        price: Number(
          rate.retailRate ??
          rate.sellingRate ??
          rate.net ??
          0
        ),
  
        currency:
          rate.currency ??
          "USD",
  
        refundable:
          rate.cancellationPolicies
            ?.refundableTag === "RFN",
  
        cancellationPolicies:
          rate.cancellationPolicies
            ?.cancelPolicyInfos ??
          [],
  
        rateKey:
          rate.rateKey ??
          "",
      };
    });
  }