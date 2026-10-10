"use client";

import { motion } from "framer-motion";
import { cx } from "@/app/lib/cx";
import { useLocale } from "./LocaleProvider";
import { useTheme } from "./ThemeProvider";
import { MoonIcon, MonitorIcon, SunIcon } from "./Icons";

type ThemeOption = {
  mode: "light" | "system" | "dark";
  label: string;
  Icon: typeof SunIcon;
};

export function ThemeSwitch({ compact = false }: { compact?: boolean }) {
  const { t } = useLocale();
  const { mode, setMode } = useTheme();

  const options: ThemeOption[] = [
    { mode: "light", label: t.nav.theme.light, Icon: SunIcon },
    { mode: "system", label: t.nav.theme.system, Icon: MonitorIcon },
    { mode: "dark", label: t.nav.theme.dark, Icon: MoonIcon },
  ];

  return (
    <div
      role="group"
      aria-label={t.nav.theme.label}
      className={cx(
        "relative flex items-center rounded-full border border-rule bg-surface/70 p-0.5",
        compact && "bg-transparent"
      )}
    >
      {options.map(({ mode: option, label, Icon }) => {
        const isActive = mode === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setMode(option)}
            aria-pressed={isActive}
            aria-label={label}
            title={label}
            className={cx(
              "relative flex h-7 w-8 items-center justify-center rounded-full transition-colors",
              isActive ? "text-paper" : "text-ink-mute hover:text-ink"
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <Icon className="relative h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}