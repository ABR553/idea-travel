"use client";

import { useState } from "react";
import { useAdminSecret } from "../admin-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8100";

interface AIAccommodation {
  tier: string;
  name_es: string;
  name_en: string;
  description_es: string;
  description_en: string;
  price_per_night: number;
  currency: string;
  amenities: string[];
  rating: number;
  image: string;
  nights: number;
}

interface AIExperience {
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  duration_es: string;
  duration_en: string;
  provider: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
}

interface AIDestination {
  name_es: string;
  name_en: string;
  country_es: string;
  country_en: string;
  description_es: string;
  description_en: string;
  image: string;
  days: number;
  accommodations: AIAccommodation[];
  experiences: AIExperience[];
}

interface AIRouteStep {
  day: number;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  destination_name: string;
}

interface AIPack {
  slug: string;
  cover_image: string;
  duration_days: number;
  price_from: number;
  price_to: number;
  featured: boolean;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  short_description_es: string;
  short_description_en: string;
  duration_es: string;
  duration_en: string;
  destinations: AIDestination[];
  route_steps: AIRouteStep[];
}

interface AIBlogPost {
  slug: string;
  cover_image: string;
  category: string;
  title_es: string;
  title_en: string;
  excerpt_es: string;
  excerpt_en: string;
  content_es: string;
  content_en: string;
}

interface AIGenerateResponse {
  pack: AIPack;
  blog: AIBlogPost;
}

type ViewState = "input" | "preview" | "success";

const TIER_LABELS: Record<string, string> = {
  budget: "Budget",
  standard: "Standard",
  premium: "Premium",
};

const TIER_COLORS: Record<string, string> = {
  budget: "bg-green-100 text-green-800",
  standard: "bg-blue-100 text-blue-800",
  premium: "bg-purple-100 text-purple-800",
};

export default function AIGeneratorPage() {
  const secret = useAdminSecret();
  const [view, setView] = useState<ViewState>("input");
  const [description, setDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [approving, setApproving] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AIGenerateResponse | null>(null);
  const [locale, setLocale] = useState<"es" | "en">("es");
  const [activeTab, setActiveTab] = useState<"pack" | "blog">("pack");
  const [approvedSlugs, setApprovedSlugs] = useState<{ pack: string; blog: string } | null>(null);

  async function handleGenerate() {
    if (!description.trim() || description.trim().length < 10) {
      setError("La descripcion debe tener al menos 10 caracteres");
      return;
    }
    setGenerating(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/v1/ai/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Secret": secret,
        },
        body: JSON.stringify({ description: description.trim() }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || `Error ${res.status}`);
      }
      const data: AIGenerateResponse = await res.json();
      setResult(data);
      setView("preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error generando contenido");
    } finally {
      setGenerating(false);
    }
  }

  async function handleApprove() {
    if (!result) return;
    setApproving(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/v1/ai/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Secret": secret,
        },
        body: JSON.stringify(result),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || `Error ${res.status}`);
      }
      setApprovedSlugs({ pack: result.pack.slug, blog: result.blog.slug });
      setView("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error guardando contenido");
    } finally {
      setApproving(false);
    }
  }

  function handleDiscard() {
    setResult(null);
    setView("input");
    setError("");
  }

  function handleNewGeneration() {
    setResult(null);
    setDescription("");
    setApprovedSlugs(null);
    setView("input");
    setError("");
  }

  // ── Input view ──
  if (view === "input") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">AI Content Generator</h1>
        <p className="text-neutral-600 mb-6">
          Describe el viaje que quieres crear y la IA generara un pack completo con destinos,
          alojamientos, experiencias, ruta dia a dia y un articulo de blog asociado.
        </p>

        {error && <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">{error}</div>}

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
            Descripcion del viaje
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
            rows={5}
            placeholder="Ej: Un viaje de 7 dias por Japon visitando Tokio, Kioto y Osaka. Enfocado en cultura, templos y gastronomia japonesa. Presupuesto medio-alto."
            disabled={generating}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleGenerate}
              disabled={generating || !description.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
            >
              {generating ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generando...
                </>
              ) : (
                "Generar con IA"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Success view ──
  if (view === "success" && approvedSlugs) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Contenido creado</h1>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-600 text-4xl mb-3">&#10003;</div>
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            Pack y blog creados correctamente
          </h2>
          <p className="text-green-700 mb-4">
            El pack <span className="font-mono font-medium">{approvedSlugs.pack}</span> y el blog{" "}
            <span className="font-mono font-medium">{approvedSlugs.blog}</span> se han guardado en la base de datos.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleNewGeneration}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Generar otro
            </button>
            <a
              href="/admin/blog"
              className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors text-sm font-medium"
            >
              Ver Blog
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Preview view ──
  if (!result) return null;
  const pack = result.pack;
  const blog = result.blog;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={handleDiscard} className="text-neutral-500 hover:text-neutral-700">
            &larr; Descartar
          </button>
          <h1 className="text-2xl font-bold">Previsualizacion</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Locale toggle */}
          <div className="flex bg-neutral-100 rounded-md p-0.5">
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  locale === l ? "bg-white text-blue-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={handleApprove}
            disabled={approving}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
          >
            {approving ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Guardando...
              </>
            ) : (
              "Aprobar y Guardar"
            )}
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">{error}</div>}

      {/* Tab navigation */}
      <div className="flex bg-neutral-100 rounded-md p-0.5 mb-6 w-fit">
        <button
          onClick={() => setActiveTab("pack")}
          className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
            activeTab === "pack" ? "bg-white text-blue-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Pack
        </button>
        <button
          onClick={() => setActiveTab("blog")}
          className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
            activeTab === "blog" ? "bg-white text-blue-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Blog
        </button>
      </div>

      {activeTab === "pack" ? (
        <PackPreview pack={pack} locale={locale} />
      ) : (
        <BlogPreview blog={blog} locale={locale} />
      )}
    </div>
  );
}

function PackPreview({ pack, locale }: { pack: AIPack; locale: "es" | "en" }) {
  const t = (es: string, en: string) => (locale === "es" ? es : en);

  return (
    <div className="space-y-6">
      {/* Pack header */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="h-48 bg-neutral-200 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pack.cover_image} alt={t(pack.title_es, pack.title_en)} className="w-full h-full object-cover" />
          {pack.featured && (
            <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
              FEATURED
            </span>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl font-bold">{t(pack.title_es, pack.title_en)}</h2>
            <span className="text-sm font-mono text-neutral-500">{pack.slug}</span>
          </div>
          <p className="text-neutral-600 mb-3">{t(pack.description_es, pack.description_en)}</p>
          <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
            <span>{t(pack.duration_es, pack.duration_en)}</span>
            <span>{pack.price_from} - {pack.price_to} EUR</span>
            <span>{pack.destinations.length} destino(s)</span>
          </div>
        </div>
      </div>

      {/* Destinations */}
      {pack.destinations.map((dest, i) => (
        <div key={i} className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={dest.image} alt={t(dest.name_es, dest.name_en)} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t(dest.name_es, dest.name_en)}</h3>
              <p className="text-sm text-neutral-500">{t(dest.country_es, dest.country_en)} - {dest.days} dia(s)</p>
              <p className="text-sm text-neutral-600 mt-1">{t(dest.description_es, dest.description_en)}</p>
            </div>
          </div>

          {/* Accommodations */}
          <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">Alojamientos</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {dest.accommodations.map((acc, j) => (
              <div key={j} className="border border-neutral-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TIER_COLORS[acc.tier] ?? "bg-neutral-100 text-neutral-800"}`}>
                    {TIER_LABELS[acc.tier] ?? acc.tier}
                  </span>
                  <span className="text-xs text-neutral-400">{acc.rating}/5</span>
                </div>
                <p className="font-medium text-sm">{t(acc.name_es, acc.name_en)}</p>
                <p className="text-xs text-neutral-500 mt-1">{t(acc.description_es, acc.description_en)}</p>
                <p className="text-sm font-semibold mt-2">{acc.price_per_night} {acc.currency}/noche - {acc.nights} noches</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {acc.amenities.map((a, k) => (
                    <span key={k} className="text-xs bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">{a}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Experiences */}
          <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">Experiencias</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dest.experiences.map((exp, j) => (
              <div key={j} className="border border-neutral-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">{exp.provider}</span>
                  <span className="text-xs text-neutral-400">{exp.rating}/5</span>
                </div>
                <p className="font-medium text-sm">{t(exp.title_es, exp.title_en)}</p>
                <p className="text-xs text-neutral-500 mt-1">{t(exp.description_es, exp.description_en)}</p>
                <div className="flex items-center gap-3 mt-2 text-sm">
                  <span className="font-semibold">{exp.price} {exp.currency}</span>
                  <span className="text-neutral-400">{t(exp.duration_es, exp.duration_en)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Route Steps */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-4">Itinerario dia a dia</h3>
        <div className="space-y-3">
          {pack.route_steps.map((step) => (
            <div key={step.day} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                {step.day}
              </div>
              <div>
                <h4 className="font-medium">{t(step.title_es, step.title_en)}</h4>
                <p className="text-sm text-neutral-600">{t(step.description_es, step.description_en)}</p>
                <p className="text-xs text-neutral-400 mt-1">{step.destination_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogPreview({ blog, locale }: { blog: AIBlogPost; locale: "es" | "en" }) {
  const t = (es: string, en: string) => (locale === "es" ? es : en);

  return (
    <div className="space-y-6">
      {/* Blog header */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="h-48 bg-neutral-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={blog.cover_image} alt={t(blog.title_es, blog.title_en)} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
              {blog.category}
            </span>
            <span className="text-xs font-mono text-neutral-400">{blog.slug}</span>
          </div>
          <h2 className="text-xl font-bold mb-2">{t(blog.title_es, blog.title_en)}</h2>
          <p className="text-neutral-600 italic">{t(blog.excerpt_es, blog.excerpt_en)}</p>
        </div>
      </div>

      {/* Blog content */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-4">Contenido</h3>
        <div
          className="prose prose-sm max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-a:text-blue-600 prose-strong:text-neutral-900"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(t(blog.content_es, blog.content_en)) }}
        />
      </div>
    </div>
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
      if (inList) { htmlParts.push(`</${listType}>`); inList = false; }
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      if (inList) { htmlParts.push(`</${listType}>`); inList = false; }
      const level = headingMatch[1]!.length;
      htmlParts.push(`<h${level}>${processInline(headingMatch[2]!)}</h${level}>`);
      continue;
    }

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

    const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || listType !== "ol") {
        if (inList) htmlParts.push(`</${listType}>`);
        htmlParts.push("<ol>");
        inList = true;
        listType = "ol";
      }
      htmlParts.push(`<li>${processInline(olMatch[2]!)}</li>`);
      continue;
    }

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
