"use client";

import { useState, useEffect, type ReactNode } from "react";
import { AdminSecretContext } from "./admin-context";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("admin-secret");
    if (stored) {
      setSecret(stored);
      setAuthenticated(true);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sessionStorage.setItem("admin-secret", input.trim());
    setSecret(input.trim());
    setAuthenticated(true);
  }

  function handleLogout() {
    sessionStorage.removeItem("admin-secret");
    setSecret("");
    setAuthenticated(false);
    setInput("");
  }

  if (!authenticated) {
    return (
      <html lang="es">
        <body className="bg-neutral-100 min-h-screen flex items-center justify-center">
          <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
            <h1 className="text-xl font-bold mb-4">Admin - IdeaTravel</h1>
            <label htmlFor="admin-secret" className="block text-sm font-medium text-neutral-700 mb-1">
              Admin Secret
            </label>
            <input
              id="admin-secret"
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Introduce el admin secret"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Entrar
            </button>
          </form>
        </body>
      </html>
    );
  }

  return (
    <html lang="es">
      <body className="bg-neutral-50 min-h-screen">
        <nav className="bg-white border-b border-neutral-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-lg font-bold">
              Idea<span className="text-blue-600">Travel</span> Admin
            </span>
            <a href="/admin/blog" className="text-sm text-neutral-600 hover:text-blue-600 transition-colors">
              Blog
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-neutral-500 hover:text-neutral-700">
              Ver sitio
            </a>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Salir
            </button>
          </div>
        </nav>
        <AdminSecretContext.Provider value={secret}>
          <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
        </AdminSecretContext.Provider>
      </body>
    </html>
  );
}
