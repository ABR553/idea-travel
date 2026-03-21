import type { PackListItem } from "@/domain/models/pack.types";
import { PackCard } from "@/components/molecules/PackCard";

interface PackGridProps {
  packs: PackListItem[];
}

export function PackGrid({ packs }: PackGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {packs.map((pack, index) => (
        <div
          key={pack.id}
          className="animate-[fadeInUp_var(--duration-slower)_var(--ease-out)_both]"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <PackCard pack={pack} />
        </div>
      ))}
    </div>
  );
}
