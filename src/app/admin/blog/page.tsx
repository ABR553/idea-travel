"use client";

import { useState, useEffect, useCallback } from "react";
import { useAdminSecret } from "../admin-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8100";

interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  publishedAt: string | null;
  relatedPackSlug: string | null;
}

interface BlogPostFull extends BlogPostItem {
  content: string;
}

interface Translation {
  locale: string;
  title: string;
  excerpt: string;
  content: string;
}

interface PostForm {
  slug: string;
  coverImage: string;
  category: string;
  published: boolean;
  publishedAt: string;
  relatedPackSlug: string;
  translations: Translation[];
}

const EMPTY_TRANSLATION: Translation = { locale: "es", title: "", excerpt: "", content: "" };

const EMPTY_FORM: PostForm = {
  slug: "",
  coverImage: "",
  category: "guia",
  published: false,
  publishedAt: "",
  relatedPackSlug: "",
  translations: [
    { ...EMPTY_TRANSLATION, locale: "es" },
    { ...EMPTY_TRANSLATION, locale: "en" },
  ],
};

const CATEGORIES = ["guia", "presupuesto", "epoca", "consejos", "lista"];

export default function AdminBlogPage() {
  const secret = useAdminSecret();
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState<"list" | "edit">("list");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<PostForm>({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [activeLocale, setActiveLocale] = useState<"es" | "en">("es");
  const [previewMode, setPreviewMode] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/v1/blog/admin/list?locale=es&page=1&page_size=100`, {
        headers: { "X-Admin-Secret": secret },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setPosts(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error cargando posts");
    } finally {
      setLoading(false);
    }
  }, [secret]);

  useEffect(() => {
    if (secret) fetchPosts();
  }, [secret, fetchPosts]);

  async function loadPost(slug: string) {
    // Cargar traducciones ES y EN
    const translations: Translation[] = [];
    for (const locale of ["es", "en"] as const) {
      try {
        const res = await fetch(`${API_URL}/api/v1/blog/admin/${slug}?locale=${locale}`, {
          headers: { "X-Admin-Secret": secret },
        });
        if (res.ok) {
          const data: BlogPostFull = await res.json();
          translations.push({
            locale,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content,
          });
          if (locale === "es") {
            setForm((prev) => ({
              ...prev,
              slug: data.slug,
              coverImage: data.coverImage,
              category: data.category,
              published: !!data.publishedAt,
              publishedAt: data.publishedAt ?? "",
              relatedPackSlug: data.relatedPackSlug ?? "",
            }));
          }
        }
      } catch {
        // Si no hay traduccion para ese locale, dejamos vacio
        translations.push({ locale, title: "", excerpt: "", content: "" });
      }
    }
    setForm((prev) => ({ ...prev, translations }));
  }

  function handleNew() {
    setForm({
      ...EMPTY_FORM,
      translations: [
        { ...EMPTY_TRANSLATION, locale: "es" },
        { ...EMPTY_TRANSLATION, locale: "en" },
      ],
    });
    setEditingSlug(null);
    setActiveLocale("es");
    setPreviewMode(false);
    setView("edit");
  }

  async function handleEdit(slug: string) {
    setEditingSlug(slug);
    setActiveLocale("es");
    setPreviewMode(false);
    setView("edit");
    await loadPost(slug);
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Eliminar "${slug}"?`)) return;
    try {
      const res = await fetch(`${API_URL}/api/v1/blog/admin/${slug}`, {
        method: "DELETE",
        headers: { "X-Admin-Secret": secret },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      await fetchPosts();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error eliminando");
    }
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const body = {
        slug: form.slug,
        coverImage: form.coverImage,
        category: form.category,
        published: form.published,
        publishedAt: form.publishedAt || null,
        relatedPackSlug: form.relatedPackSlug || null,
        translations: form.translations.filter((t) => t.title.trim()),
      };

      const url = editingSlug
        ? `${API_URL}/api/v1/blog/admin/${editingSlug}`
        : `${API_URL}/api/v1/blog/admin`;
      const method = editingSlug ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Secret": secret,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || `Error ${res.status}`);
      }

      setView("list");
      await fetchPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error guardando");
    } finally {
      setSaving(false);
    }
  }

  async function handleSeedBlog() {
    if (!confirm("Ejecutar seed de blog posts?")) return;
    try {
      const res = await fetch(`${API_URL}/api/v1/blog/seed`, {
        method: "POST",
        headers: { "X-Admin-Secret": secret },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      await fetchPosts();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error ejecutando seed");
    }
  }

  function updateTranslation(locale: string, field: keyof Translation, value: string) {
    setForm((prev) => ({
      ...prev,
      translations: prev.translations.map((t) =>
        t.locale === locale ? { ...t, [field]: value } : t
      ),
    }));
  }

  const currentTranslation = form.translations.find((t) => t.locale === activeLocale) ?? form.translations[0];

  // ── List view ──
  if (view === "list") {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <div className="flex gap-2">
            <button
              onClick={handleSeedBlog}
              className="px-4 py-2 text-sm bg-amber-100 text-amber-800 rounded-md hover:bg-amber-200 transition-colors"
            >
              Seed Blog
            </button>
            <button
              onClick={handleNew}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              + Nuevo Post
            </button>
          </div>
        </div>

        {error && <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">{error}</div>}

        {loading ? (
          <p className="text-neutral-500">Cargando...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">
            <p className="mb-2">No hay posts todavia.</p>
            <p className="text-sm">Usa &quot;Seed Blog&quot; para cargar articulos de ejemplo o crea uno nuevo.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">Titulo</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">Slug</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">Categoria</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-600">Fecha</th>
                  <th className="text-right px-4 py-3 font-medium text-neutral-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="px-4 py-3">
                      <span className="font-medium">{post.title || <span className="text-neutral-400 italic">Sin titulo</span>}</span>
                    </td>
                    <td className="px-4 py-3 text-neutral-500 font-mono text-xs">{post.slug}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-500">{post.publishedAt ?? "Borrador"}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleEdit(post.slug)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // ── Edit view ──
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView("list")}
            className="text-neutral-500 hover:text-neutral-700"
          >
            &larr; Volver
          </button>
          <h1 className="text-2xl font-bold">
            {editingSlug ? "Editar Post" : "Nuevo Post"}
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !form.slug.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">{error}</div>}

      {/* Campos generales */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-4">Datos generales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-neutral-700 mb-1">Slug</label>
            <input
              id="slug"
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="mi-articulo-de-viaje"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">Categoria</label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-neutral-700 mb-1">Imagen de portada (URL)</label>
            <input
              id="coverImage"
              type="text"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="https://images.unsplash.com/..."
            />
          </div>
          <div>
            <label htmlFor="relatedPackSlug" className="block text-sm font-medium text-neutral-700 mb-1">Pack relacionado (slug)</label>
            <input
              id="relatedPackSlug"
              type="text"
              value={form.relatedPackSlug}
              onChange={(e) => setForm({ ...form, relatedPackSlug: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="paris-en-5-dias"
            />
          </div>
          <div>
            <label htmlFor="publishedAt" className="block text-sm font-medium text-neutral-700 mb-1">Fecha de publicacion</label>
            <input
              id="publishedAt"
              type="date"
              value={form.publishedAt}
              onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-neutral-700">Publicado</span>
            </label>
          </div>
        </div>
      </div>

      {/* Traducciones con editor markdown */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">Contenido</h2>
          <div className="flex gap-2">
            <div className="flex bg-neutral-100 rounded-md p-0.5">
              {(["es", "en"] as const).map((locale) => (
                <button
                  key={locale}
                  onClick={() => setActiveLocale(locale)}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    activeLocale === locale
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {locale.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex bg-neutral-100 rounded-md p-0.5">
              <button
                onClick={() => setPreviewMode(false)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  !previewMode
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => setPreviewMode(true)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  previewMode
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                Preview
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor={`title-${activeLocale}`} className="block text-sm font-medium text-neutral-700 mb-1">
              Titulo ({activeLocale.toUpperCase()})
            </label>
            <input
              id={`title-${activeLocale}`}
              type="text"
              value={currentTranslation?.title ?? ""}
              onChange={(e) => updateTranslation(activeLocale, "title", e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Titulo del articulo"
            />
          </div>
          <div>
            <label htmlFor={`excerpt-${activeLocale}`} className="block text-sm font-medium text-neutral-700 mb-1">
              Extracto ({activeLocale.toUpperCase()})
            </label>
            <textarea
              id={`excerpt-${activeLocale}`}
              value={currentTranslation?.excerpt ?? ""}
              onChange={(e) => updateTranslation(activeLocale, "excerpt", e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              rows={2}
              placeholder="Breve descripcion del articulo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Contenido ({activeLocale.toUpperCase()}) - Markdown
            </label>
            {previewMode ? (
              <div className="border border-neutral-300 rounded-md p-4 min-h-[500px] bg-white overflow-auto">
                <MarkdownPreview content={currentTranslation?.content ?? ""} />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <textarea
                  value={currentTranslation?.content ?? ""}
                  onChange={(e) => updateTranslation(activeLocale, "content", e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono resize-none"
                  rows={24}
                  placeholder="Escribe el contenido en Markdown..."
                />
                <div className="hidden lg:block border border-neutral-200 rounded-md p-4 bg-neutral-50 overflow-auto max-h-[600px]">
                  <div className="text-xs text-neutral-400 mb-2 uppercase tracking-wide">Vista previa</div>
                  <MarkdownPreview content={currentTranslation?.content ?? ""} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function MarkdownPreview({ content }: { content: string }) {
  const html = markdownToHtml(content);
  return (
    <div
      className="prose prose-sm max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-a:text-blue-600 prose-strong:text-neutral-900 prose-ul:text-neutral-700 prose-ol:text-neutral-700"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}


function markdownToHtml(md: string): string {
  if (!md) return "";

  const lines = md.split("\n");
  const htmlParts: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" = "ul";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const trimmed = line.trim();

    if (!trimmed) {
      if (inList) {
        htmlParts.push(`</${listType}>`);
        inList = false;
      }
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      if (inList) { htmlParts.push(`</${listType}>`); inList = false; }
      const level = headingMatch[1].length;
      htmlParts.push(`<h${level}>${processInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    // Unordered list
    if (trimmed.match(/^[-*+]\s+/)) {
      if (!inList || listType !== "ul") {
        if (inList) htmlParts.push(`</${listType}>`);
        htmlParts.push("<ul>");
        inList = true;
        listType = "ul";
      }
      htmlParts.push(`<li>${processInline(trimmed.replace(/^[-*+]\s+/, ""))}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || listType !== "ol") {
        if (inList) htmlParts.push(`</${listType}>`);
        htmlParts.push("<ol>");
        inList = true;
        listType = "ol";
      }
      htmlParts.push(`<li>${processInline(olMatch[2])}</li>`);
      continue;
    }

    // Paragraph
    if (inList) { htmlParts.push(`</${listType}>`); inList = false; }
    htmlParts.push(`<p>${processInline(trimmed)}</p>`);
  }

  if (inList) htmlParts.push(`</${listType}>`);
  return htmlParts.join("\n");
}


function processInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="nofollow sponsored">$1</a>');
}
