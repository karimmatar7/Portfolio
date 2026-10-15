"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { THEME_COLORS, type ResolvedTheme } from "@/app/lib/theme";

type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "theme";
const DEFAULT_MODE: ThemeMode = "system";
const DEFAULT_RESOLVED: ResolvedTheme = "light";

function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark" || value === "system";
}

function readStoredMode(): ThemeMode {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isThemeMode(stored)) return stored;
  } catch {
    /* storage unavailable: fall back to the system preference */
  }
  return DEFAULT_MODE;
}

function readSystemResolved(): ResolvedTheme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolve(mode: ThemeMode): ResolvedTheme {
  return mode === "system" ? readSystemResolved() : mode;
}

function applyModeToDocument(mode: ThemeMode, resolved: ResolvedTheme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
  // Next renders one `theme-color` per system scheme and lets the media query
  // decide. That ignores the visitor's own choice, so point every one of them at
  // the resolved theme and let it match the page in all cases.
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    meta.setAttribute("content", THEME_COLORS[resolved]);
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* storage unavailable */
  }
}

/* The theme lives outside React in a small store. This keeps the toggle pill
   reliable across navigations, and lets useSyncExternalStore re-sync the UI
   with the pre-paint document theme that the bootstrap <script> in
   app/layout.tsx already applied. */

let mode: ThemeMode = DEFAULT_MODE;
let resolved: ResolvedTheme = DEFAULT_RESOLVED;
let systemMediaQuery: MediaQueryList | null = null;
let systemListenerAttached = false;
const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getModeSnapshot(): ThemeMode {
  return mode;
}

function getResolvedSnapshot(): ResolvedTheme {
  return resolved;
}

function getServerModeSnapshot(): ThemeMode {
  return DEFAULT_MODE;
}

function getServerResolvedSnapshot(): ResolvedTheme {
  return DEFAULT_RESOLVED;
}

function onSystemPreferenceChange(event: MediaQueryListEvent): void {
  if (mode !== "system") return;
  const next = event.matches ? "dark" : "light";
  if (next !== resolved) {
    resolved = next;
    applyModeToDocument(mode, resolved);
    emit();
  }
}

function attachSystemListener(): void {
  if (systemListenerAttached) return;
  systemMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  systemMediaQuery.addEventListener("change", onSystemPreferenceChange);
  systemListenerAttached = true;
}

function detachSystemListener(): void {
  if (!systemListenerAttached) return;
  systemMediaQuery?.removeEventListener("change", onSystemPreferenceChange);
  systemMediaQuery = null;
  systemListenerAttached = false;
}

function initThemeStore(): void {
  mode = readStoredMode();
  resolved = resolve(mode);
  applyModeToDocument(mode, resolved);
  if (mode === "system") attachSystemListener();
}

if (typeof window !== "undefined") {
  initThemeStore();
}

export function setMode(next: ThemeMode): void {
  mode = next;
  resolved = resolve(next);
  applyModeToDocument(next, resolved);
  if (next === "system") {
    attachSystemListener();
  } else {
    detachSystemListener();
  }
  emit();
}

type ThemeContextValue = {
  mode: ThemeMode;
  resolved: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* Layout effects run before the browser paints, which is what keeps the theme
   from flashing when it has to be re-applied. On the server the plain effect is
   used so React does not warn about layout effects during SSR. */
const useBeforePaintEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const currentMode = useSyncExternalStore(
    subscribe,
    getModeSnapshot,
    getServerModeSnapshot
  );
  const currentResolved = useSyncExternalStore(
    subscribe,
    getResolvedSnapshot,
    getServerResolvedSnapshot
  );

  // The layout that renders <html> is keyed by the locale in the URL, so
  // switching language replaces the <html> element and React re-applies the
  // attributes it renders. That drops the theme that the bootstrap script had
  // set imperatively, and the script does not run again, so the theme is put
  // back here before the first paint of the new language.
  useBeforePaintEffect(() => {
    applyModeToDocument(getModeSnapshot(), getResolvedSnapshot());
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ mode: currentMode, resolved: currentResolved, setMode }),
    [currentMode, currentResolved]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}