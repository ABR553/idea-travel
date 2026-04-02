"use client";

import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import type { RouteStep, RecommendedProduct } from "@/domain/models/pack.types";
import { Badge } from "@/components/atoms/Badge";
import { formatPrice } from "@/lib/format";

interface RouteStepDetailProps {
  step: RouteStep;
  isLast: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onNext?: () => void;
}

function ProductMiniCard({ product }: { product: RecommendedProduct }) {
  const href = product.affiliateUrl;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-warning-200 bg-warning-50 p-3 transition-shadow hover:shadow-[var(--shadow-md)] dark:bg-warning-950/30 dark:border-warning-800"
    >
      <div className="relative w-12 h-12 rounded-[var(--radius-md)] overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="48px"
          className="object-contain p-1"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">
          {product.name}
        </p>
        {product.contextText && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
            {product.contextText}
          </p>
        )}
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-success-600 dark:text-success-400">
          {formatPrice(product.price, product.currency)}
        </p>
        <p className="text-xs text-primary-500 dark:text-primary-400">
          Ver producto &rarr;
        </p>
      </div>
    </a>
  );
}

export function RouteStepDetail({
  step,
  isLast,
  isOpen,
  onToggle,
  onNext,
}: RouteStepDetailProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const hasDetail = !!step.detailedDescription;
  const hasProducts = step.recommendedProducts.length > 0;
  const hasExpandableContent = hasDetail || hasProducts;

  const productsBySlug = new Map(
    step.recommendedProducts.map((p) => [p.slug, p])
  );

  // Track which product slugs are rendered inline via markdown
  const renderedProductSlugs = useRef(new Set<string>());

  useEffect(() => {
    renderedProductSlugs.current.clear();
  }, [step.detailedDescription]);

  return (
    <div className="flex gap-4">
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        <button
          onClick={onToggle}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-primary-500 text-white scale-110 shadow-lg shadow-primary-500/30"
              : "bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800"
          }`}
        >
          {step.day}
        </button>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 mt-2 transition-colors duration-300 ${
              isOpen
                ? "bg-primary-400 dark:bg-primary-600"
                : "bg-primary-200 dark:bg-primary-800"
            }`}
          />
        )}
      </div>

      {/* Content column */}
      <div className="pb-6 flex-1 min-w-0">
        <button
          onClick={onToggle}
          className="w-full text-left group"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {step.description}
              </p>
              <Badge variant="budget" className="mt-2">
                {step.destination}
              </Badge>
            </div>
            {hasExpandableContent && (
              <span
                className={`text-sm text-primary-500 dark:text-primary-400 font-medium shrink-0 mt-1 transition-transform duration-300 inline-block ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                &#9660;
              </span>
            )}
          </div>
        </button>

        {/* Expandable detail panel */}
        {hasExpandableContent && (
          <div
            ref={contentRef}
            className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              display: "grid",
              gridTemplateRows: isOpen ? "1fr" : "0fr",
              opacity: isOpen ? 1 : 0,
              marginTop: isOpen ? "1rem" : 0,
            }}
          >
            <div className="overflow-hidden">
              {hasDetail && (
                <div className="rounded-[var(--radius-xl)] border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/50 p-6">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ href, children }) => {
                        if (href?.startsWith("/tienda/")) {
                          const slug = href.replace("/tienda/", "");
                          const product = productsBySlug.get(slug);
                          if (product) {
                            renderedProductSlugs.current.add(slug);
                            return <ProductMiniCard product={product} />;
                          }
                          return (
                            <Link
                              href={href}
                              className="text-primary-500 hover:text-primary-600 dark:text-primary-400 underline decoration-primary-300 underline-offset-2 font-medium"
                            >
                              {children}
                            </Link>
                          );
                        }
                        return (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 underline decoration-primary-300 underline-offset-2 font-medium"
                          >
                            {children}
                            <span className="text-xs ml-1">&nearr;</span>
                          </a>
                        );
                      },
                      blockquote: ({ children }) => {
                        const text = extractText(children);
                        if (text.startsWith("\u{1F4A1}")) {
                          return (
                            <div className="border-l-4 border-success-400 bg-success-50 dark:bg-success-950/30 dark:border-success-600 rounded-r-[var(--radius-lg)] p-4 my-4">
                              <div className="text-sm text-neutral-700 dark:text-neutral-200 [&>p]:m-0">
                                {children}
                              </div>
                            </div>
                          );
                        }
                        return (
                          <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 my-4 italic text-neutral-600 dark:text-neutral-400">
                            {children}
                          </blockquote>
                        );
                      },
                      p: ({ children }) => (
                        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4 last:mb-0">
                          {children}
                        </p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
                          {children}
                        </strong>
                      ),
                    }}
                  >
                    {step.detailedDescription}
                  </ReactMarkdown>
                </div>
              )}

              {/* Productos recomendados que no aparecieron inline en el markdown */}
              {hasProducts && (
                <div className={hasDetail ? "mt-4" : ""}>
                  <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                    Productos recomendados para este dia
                  </p>
                  <div className="flex flex-col gap-2">
                    {step.recommendedProducts
                      .filter((p) => !renderedProductSlugs.current.has(p.slug))
                      .map((product) => (
                        <ProductMiniCard key={product.slug} product={product} />
                      ))}
                  </div>
                </div>
              )}

              {/* Boton siguiente paso */}
              {onNext && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-lg)] bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 active:bg-primary-700 transition-colors shadow-sm hover:shadow-md"
                  >
                    Siguiente paso
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Extracts plain text from React children for content detection (e.g., tip blockquotes).
 */
function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    const el = children as React.ReactElement<{ children?: React.ReactNode }>;
    return extractText(el.props.children);
  }
  return "";
}
