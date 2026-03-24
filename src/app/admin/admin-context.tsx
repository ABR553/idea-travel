"use client";

import { createContext, useContext } from "react";

export const AdminSecretContext = createContext<string>("");

export function useAdminSecret() {
  return useContext(AdminSecretContext);
}
