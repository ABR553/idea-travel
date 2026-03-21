"use client";

import { useState, useCallback } from "react";
import type { FlightSearch, FlightClass, TripType } from "@/domain/models/flight.types";

interface UseFlightSearchReturn {
  formData: FlightSearch;
  updateField: <K extends keyof FlightSearch>(key: K, value: FlightSearch[K]) => void;
  updatePassengers: (type: "adults" | "children" | "infants", delta: number) => void;
  isValid: boolean;
  handleSubmit: () => void;
}

const initialFormData: FlightSearch = {
  origin: "",
  destination: "",
  departureDate: "",
  returnDate: "",
  passengers: { adults: 1, children: 0, infants: 0 },
  flightClass: "economy",
  tripType: "roundtrip",
};

export function useFlightSearch(): UseFlightSearchReturn {
  const [formData, setFormData] = useState<FlightSearch>(initialFormData);

  const updateField = useCallback(
    <K extends keyof FlightSearch>(key: K, value: FlightSearch[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updatePassengers = useCallback(
    (type: "adults" | "children" | "infants", delta: number) => {
      setFormData((prev) => {
        const current = prev.passengers[type];
        const min = type === "adults" ? 1 : 0;
        const max = type === "infants" ? prev.passengers.adults : 9;
        const newValue = Math.max(min, Math.min(max, current + delta));
        return {
          ...prev,
          passengers: { ...prev.passengers, [type]: newValue },
        };
      });
    },
    []
  );

  const isValid =
    formData.origin.length > 0 &&
    formData.destination.length > 0 &&
    formData.departureDate.length > 0 &&
    (formData.tripType === "oneway" || formData.returnDate !== undefined && formData.returnDate.length > 0);

  const handleSubmit = useCallback(() => {
    if (!isValid) return;
    // En produccion esto redireccionaria a un buscador de vuelos como Skyscanner, Kiwi, etc.
    alert(`Busqueda de vuelos:\n${JSON.stringify(formData, null, 2)}`);
  }, [formData, isValid]);

  return { formData, updateField, updatePassengers, isValid, handleSubmit };
}
