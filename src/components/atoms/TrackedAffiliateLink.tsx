"use client";

import { trackAffiliateClick } from "@/lib/analytics";
import type { AffiliateProvider } from "@/lib/analytics";

interface TrackedAffiliateLinkProps {
  href: string;
  provider: AffiliateProvider;
  itemName?: string;
  destination?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Wrapper client para links de afiliado en Server Components.
 * Dispara trackAffiliateClick en GA4 al hacer click.
 */
export function TrackedAffiliateLink({
  href,
  provider,
  itemName,
  destination,
  className,
  children,
}: TrackedAffiliateLinkProps) {
  const handleClick = () => {
    trackAffiliateClick({
      provider,
      item_name: itemName,
      destination,
      url: href,
    });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
