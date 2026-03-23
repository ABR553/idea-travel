import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BlogPostListItem } from "@/domain/models/blog.types";
import { Badge } from "@/components/atoms/Badge";

interface BlogCardProps {
  post: BlogPostListItem;
}

export function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations("blog");

  return (
    <article className="group relative bg-white dark:bg-neutral-800 rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-md)] transition-all duration-[var(--duration-normal)] ease-[var(--ease-in-out)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block" aria-label={post.title}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-in-out)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 via-transparent to-transparent" />
          <Badge variant="default" className="absolute top-4 left-4">
            {t(`category_${post.category}`)}
          </Badge>
        </div>
        <div className="p-5">
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt}
              className="text-xs text-neutral-400 dark:text-neutral-500"
            >
              {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          <h3 className="mt-1 text-lg font-bold text-neutral-800 dark:text-neutral-100 font-[family-name:var(--font-heading)] group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors duration-[var(--duration-fast)] line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
            {post.excerpt}
          </p>
          <span className="mt-3 inline-block text-sm text-primary-600 font-semibold group-hover:underline underline-offset-4">
            {t("readMore")} &rarr;
          </span>
        </div>
      </Link>
    </article>
  );
}
