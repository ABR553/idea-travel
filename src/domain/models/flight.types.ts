export type FlightClass = "economy" | "business" | "first";
export type TripType = "roundtrip" | "oneway";

export interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

export interface FlightSearch {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: PassengerCount;
  flightClass: FlightClass;
  tripType: TripType;
}
