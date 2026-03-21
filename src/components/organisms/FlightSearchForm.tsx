"use client";

import { useTranslations } from "next-intl";
import { useFlightSearch } from "@/hooks/useFlightSearch";
import { Button } from "@/components/atoms/Button";
import type { FlightClass, TripType } from "@/domain/models/flight.types";

export function FlightSearchForm() {
  const t = useTranslations("flights");
  const { formData, updateField, updatePassengers, isValid, handleSubmit } =
    useFlightSearch();

  const CLASS_OPTIONS: { value: FlightClass; key: string }[] = [
    { value: "economy", key: "economy" },
    { value: "business", key: "business" },
    { value: "first", key: "first" },
  ];

  const TRIP_OPTIONS: { value: TripType; key: string }[] = [
    { value: "roundtrip", key: "roundtrip" },
    { value: "oneway", key: "oneway" },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="bg-white dark:bg-neutral-800 rounded-[var(--radius-2xl)] shadow-[var(--shadow-xl)] p-6 md:p-8 lg:p-10 max-w-4xl mx-auto"
    >
      {/* Trip type toggle */}
      <div className="flex gap-2 mb-6">
        {TRIP_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => updateField("tripType", option.value)}
            className={`px-4 py-2 rounded-[var(--radius-2xl)] text-sm font-medium transition-colors duration-[var(--duration-fast)] ${
              formData.tripType === option.value
                ? "bg-primary-500 text-white"
                : "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
            }`}
          >
            {t(option.key)}
          </button>
        ))}
      </div>

      {/* Origin / Destination / Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            {t("origin")}
          </label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <input
              id="origin"
              type="text"
              value={formData.origin}
              onChange={(e) => updateField("origin", e.target.value)}
              placeholder={t("originPlaceholder")}
              className="w-full pl-10 pr-4 py-3 rounded-[var(--radius-lg)] bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-600 shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-fast)] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 hover:border-neutral-300 dark:hover:border-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            {t("destination")}
          </label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              id="destination"
              type="text"
              value={formData.destination}
              onChange={(e) => updateField("destination", e.target.value)}
              placeholder={t("destinationPlaceholder")}
              className="w-full pl-10 pr-4 py-3 rounded-[var(--radius-lg)] bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-600 shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-fast)] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 hover:border-neutral-300 dark:hover:border-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="departure" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            {t("departureDate")}
          </label>
          <input
            id="departure"
            type="date"
            value={formData.departureDate}
            onChange={(e) => updateField("departureDate", e.target.value)}
            className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-600 shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-fast)] hover:border-neutral-300 dark:hover:border-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
          />
        </div>
        {formData.tripType === "roundtrip" && (
          <div>
            <label htmlFor="return" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              {t("returnDate")}
            </label>
            <input
              id="return"
              type="date"
              value={formData.returnDate ?? ""}
              onChange={(e) => updateField("returnDate", e.target.value)}
              className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-600 shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-fast)] hover:border-neutral-300 dark:hover:border-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Passengers / Class / Submit */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Passengers */}
        <div className="space-y-3">
          <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">{t("passengers")}</span>
          {(["adults", "children", "infants"] as const).map((type) => (
            <div key={type} className="flex items-center justify-between">
              <div>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">{t(type)}</span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 ml-1">({t(`${type}Age`)})</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updatePassengers(type, -1)}
                  className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-600 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors disabled:opacity-30"
                  disabled={formData.passengers[type] <= (type === "adults" ? 1 : 0)}
                  aria-label={t("reduce", { type: t(type) })}
                >
                  &minus;
                </button>
                <span className="w-6 text-center text-sm font-medium" aria-live="polite">
                  {formData.passengers[type]}
                </span>
                <button
                  type="button"
                  onClick={() => updatePassengers(type, 1)}
                  className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-600 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label={t("increase", { type: t(type) })}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Class */}
        <div>
          <label htmlFor="flight-class" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            {t("class")}
          </label>
          <select
            id="flight-class"
            value={formData.flightClass}
            onChange={(e) => updateField("flightClass", e.target.value as FlightClass)}
            className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-600 shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-fast)] hover:border-neutral-300 dark:hover:border-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
          >
            {CLASS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {t(opt.key)}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="flex items-end">
          <Button type="submit" size="lg" className="w-full" disabled={!isValid}>
            {t("searchFlights")}
          </Button>
        </div>
      </div>
    </form>
  );
}
