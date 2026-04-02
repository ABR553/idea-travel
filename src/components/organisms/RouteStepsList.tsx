"use client";

import { useState } from "react";
import type { RouteStep } from "@/domain/models/pack.types";
import { RouteStepDetail } from "@/components/molecules/RouteStepDetail";

interface RouteStepsListProps {
  steps: RouteStep[];
}

export function RouteStepsList({ steps }: RouteStepsListProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleToggle(index: number) {
    setActiveIndex(activeIndex === index ? -1 : index);
  }

  function handleNext(index: number) {
    if (index < steps.length - 1) {
      setActiveIndex(index + 1);
    }
  }

  return (
    <div className="space-y-0">
      {steps.map((step, index) => (
        <RouteStepDetail
          key={step.day}
          step={step}
          isLast={index === steps.length - 1}
          isOpen={activeIndex === index}
          onToggle={() => handleToggle(index)}
          onNext={index < steps.length - 1 ? () => handleNext(index) : undefined}
        />
      ))}
    </div>
  );
}
