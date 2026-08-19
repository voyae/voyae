export interface Hotel {
  name: string;
  description: string;
  rating: number;
  price: string;
  image?: string;
  maps: string;
  id?: string;
}

export interface Restaurant {
  name: string;
  description: string;
  cuisine: string;
  price: string;
  image?: string;
  maps: string;
}

export interface Activity {
  title: string;
  description: string;
  duration: string;
  price: string;
  image?: string;
}

export interface Weather {
  temperature: string;
  condition: string;
}

export interface BudgetBreakdown {
  hotel: string;
  food: string;
  transport: string;
  activities: string;
}

export interface DailyItineraryItem {
  title: string;
  description: string;
  estimatedCost?: string;
  activities: string[];
}

export interface TravelPlan {
  destination: string;
  duration: string;
  budget: string;
  overview: string;
  travelScore?: string;
  weather: Weather;
  hotels: Hotel[];
  restaurants: Restaurant[];
  activities: Activity[];
  dailyItinerary?: DailyItineraryItem[];
  transport: string;
  budgetBreakdown?: BudgetBreakdown;
  tips: string[];
}