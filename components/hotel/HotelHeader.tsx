import {
    MapPin,
    Star,
  } from "lucide-react";
  
  interface Props {
    name: string;
  
    address: string;
  
    city: string;
  
    country: string;
  
    starRating: number;
  
    rating: number;
  
    reviewCount: number;
  }
  
  export default function HotelHeader({
    name,
    address,
    city,
    country,
    starRating,
    rating,
    reviewCount,
  }: Props) {
    return (
      <div className="space-y-4">
  
        <div>
          <h1 className="text-4xl font-bold">
            {name}
          </h1>
  
          <div className="mt-3 flex items-center gap-2 text-neutral-500">
  
            <MapPin size={18} />
  
            <span>
              {address}, {city}, {country}
            </span>
  
          </div>
        </div>
  
        <div className="flex items-center gap-6">
  
          <div className="flex">
  
            {Array.from({
              length: starRating,
            }).map((_, index) => (
              <Star
                key={index}
                size={18}
                fill="currentColor"
                className="text-yellow-500"
              />
            ))}
  
          </div>
  
          <div className="text-sm">
  
            Guest Rating
  
            <span className="ml-2 rounded-lg bg-emerald-700 px-2 py-1 text-white">
              {rating}
            </span>
  
          </div>
  
          <div className="text-sm text-neutral-500">
            {reviewCount} Reviews
          </div>
  
        </div>
  
      </div>
    );
  }