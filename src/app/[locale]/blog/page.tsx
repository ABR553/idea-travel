import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { blogRepository } from "@/infrastructure/repositories/blog.repository";
import { BlogCard } from "@/components/molecules/BlogCard";
import { generateBlogListJsonLd } from "@/lib/seo";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  let posts: Awaited<ReturnType<typeof blogRepository.getPosts>>["data"] = [];
  try {
    const result = await blogRepository.getPosts(locale, 1, 50);
    posts = result.data;
  } catch {
    // API unavailable
  }

  const jsonLd = generateBlogListJsonLd(posts, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        <header className="mb-10 md:mb-14">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100">
            {t("title")}
          </h1>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl">
            {t("description")}
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 dark:text-neutral-400">{t("noPosts")}</p>
        )}
      </section>
    </>
  );
}
