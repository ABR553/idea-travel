import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { blogRepository } from "@/infrastructure/repositories/blog.repository";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { AffiliateDisclosure } from "@/components/molecules/AffiliateDisclosure";
import { generateBlogPostJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await blogRepository.getPostBySlug(slug, locale).catch(() => null);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        es: `/es/blog/${slug}`,
        en: `/en/blog/${slug}`,
        "x-default": `/es/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  const post = await blogRepository.getPostBySlug(slug, locale).catch(() => null);
  if (!post) notFound();

  const jsonLd = generateBlogPostJsonLd(post, locale);
  const breadcrumbs = [
    { name: t("title"), url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-16">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-6 mb-8">
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt}
              className="text-sm text-neutral-400 dark:text-neutral-500"
            >
              {new Date(post.publishedAt).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          <h1 className="mt-2 font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div className="relative aspect-[16/9] rounded-[var(--radius-xl)] overflow-hidden mb-10">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div
          className="prose prose-neutral dark:prose-invert max-w-none
            prose-headings:font-[family-name:var(--font-heading)] prose-headings:text-neutral-800 dark:prose-headings:text-neutral-100
            prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:underline-offset-2
            prose-img:rounded-[var(--radius-lg)]
            prose-p:leading-relaxed prose-li:leading-relaxed"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a href={href} rel="nofollow sponsored" target="_blank">
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <AffiliateDisclosure variant="banner" />
        </div>
      </article>
    </>
  );
}

