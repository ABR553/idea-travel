"use client";

import { useState } from "react";
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
}

function ProductMiniCard({ product }: { product: RecommendedProduct }) {
  const href = product.affiliateUrl;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-warning-200 bg-warning-50 p-3 my-4 transition-shadow hover:shadow-[var(--shadow-md)] dark:bg-warning-950/30 dark:border-warning-800"
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

export function RouteStepDetail({ step, isLast }: RouteStepDetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasDetail = !!step.detailedDescription;

  const productsBySlug = new Map(
    step.recommendedProducts.map((p) => [p.slug, p])
  );

  return (
    <div className="flex gap-4">
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
          {step.day}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-primary-200 dark:bg-primary-800 mt-2" />
        )}
      </div>

      {/* Content column */}
      <div className="pb-6 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)]">
              {step.title}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {step.description}
            </p>
            <Badge variant="budget" className="mt-2">
              {step.destination}
            </Badge>
          </div>
          {hasDetail && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium shrink-0 mt-1 transition-colors"
            >
              {isOpen ? "Ocultar \u25B2" : "Ver detalles \u25BC"}
            </button>
          )}
        </div>

        {/* Expandable detail panel */}
        {hasDetail && (
          <div
            className={`grid transition-all duration-[var(--transition-slow)] ease-[var(--ease-out)] ${
              isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="rounded-[var(--radius-xl)] border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/50 p-6">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children }) => {
                      if (href?.startsWith("/tienda/")) {
                        const slug = href.replace("/tienda/", "");
                        const product = productsBySlug.get(slug);
                        if (product) {
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
